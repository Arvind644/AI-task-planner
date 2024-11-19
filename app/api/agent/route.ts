import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { StateGraph, END, Annotation, START } from "@langchain/langgraph";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// Define the agent's state
type AgentState = {
  messages: (HumanMessage | AIMessage)[];
  steps: string[];
};

// Function to generate subtasks
const generateSubtasks = async (state: AgentState): Promise<AgentState> => {
  const result = await model.invoke([
    ...state.messages,
    new HumanMessage("Break down this task into 3-5 subtasks. Respond with a numbered list."),
  ]);
  return {
    messages: [...state.messages, result],
    steps: [...state.steps, "Generated subtasks"],
  };
};

// Function to create a plan
const createPlan = async (state: AgentState): Promise<AgentState> => {
  const result = await model.invoke([
    ...state.messages,
    new HumanMessage("Create a plan of action based on these subtasks. Respond with a numbered list."),
  ]);
  return {
    messages: [...state.messages, result],
    steps: [...state.steps, "Created plan"],
  };
};

// Define channels for GraphState
const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  steps: Annotation<string[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});

// Create the graph
const workflow = new StateGraph(GraphState)
  .addNode("Generate Subtasks", generateSubtasks)
  .addNode("Create Plan", createPlan)
  .addEdge("Generate Subtasks", "Create Plan")
  .addEdge("Create Plan", END)
  .addEdge(START, "Generate Subtasks");

// Compile the graph into a runnable
const runnable = workflow.compile();

export async function POST(req: Request) {
  const { task } = await req.json();

  const initialState: AgentState = {
    messages: [new HumanMessage(task)],
    steps: [],
  };

  const result = await runnable.invoke(initialState);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}
