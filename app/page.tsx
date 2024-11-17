// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// export default function TaskPlanner() {
//   const [task, setTask] = useState('')
//   const [result, setResult] = useState<{ messages: any[], steps: string[] } | null>(null)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const response = await fetch('/api/agent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ task }),
//       })
//       const data = await response.json()
//       setResult(data)
//     } catch (error) {
//       console.error('Error:', error)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>AI Task Planner</CardTitle>
//           <CardDescription>Enter a task and let the AI break it down and create a plan.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               type="text"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               placeholder="Enter your task here"
//               className="w-full"
//             />
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Planning...' : 'Plan Task'}
//             </Button>
//           </form>
//         </CardContent>
//         {result && (
//           <CardFooter className="flex flex-col items-start">
//             <h3 className="text-lg font-semibold mb-2">Result:</h3>
//             <div className="space-y-2">
//               {result.steps.map((step, index) => (
//                 <p key={index} className="text-sm text-muted-foreground">{step}</p>
//               ))}
//               {result.messages.slice(-2).map((message, index) => (
//                 <div key={index} className="border rounded p-2">
//                   <p className="font-semibold">{message.type === 'human' ? 'Human:' : 'AI:'}</p>
//                   <p>{message.content}</p>
//                 </div>
//               ))}
//             </div>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }










// 'use client'

// import { useState } from 'react'
// import { Bot, Loader2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

// export default function TaskPlanner() {
//   const [task, setTask] = useState('')
//   const [result, setResult] = useState<{ messages: any[], steps: string[] } | null>(null)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const response = await fetch('/api/agent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ task }),
//       })
//       const data = await response.json()
//       setResult(data)
//     } catch (error) {
//       console.error('Error:', error)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Bot className="h-6 w-6" />
//             AI Task Planner
//           </CardTitle>
//           <CardDescription>Enter a task and let the AI break it down and create a plan.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               type="text"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               placeholder="Enter your task here"
//               className="w-full"
//             />
//             <Button type="submit" disabled={loading || !task} className="w-full">
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Planning...
//                 </>
//               ) : (
//                 'Plan Task'
//               )}
//             </Button>
//           </form>

//           {result && (
//             <div className="mt-6 space-y-4">
//               <h3 className="font-semibold text-lg">Results:</h3>
//               <ScrollArea className="h-[400px] rounded-md border p-4">
//                 <div className="space-y-4">
//                   {result.messages.map((message, index) => {
//                     if (message.type === 'ai') {
//                       return (
//                         <div key={index} className="bg-muted rounded-lg p-4">
//                           <div className="flex items-center gap-2 mb-2">
//                             <Bot className="h-4 w-4" />
//                             <span className="font-medium">AI Response:</span>
//                           </div>
//                           <div className="whitespace-pre-wrap">{message.content}</div>
//                         </div>
//                       )
//                     }
//                     return null
//                   })}
//                 </div>
//               </ScrollArea>

//               <div className="bg-muted/50 rounded-lg p-4">
//                 <h4 className="font-medium mb-2">Process Steps:</h4>
//                 <ul className="list-disc list-inside space-y-1">
//                   {result.steps.map((step, index) => (
//                     <li key={index} className="text-sm text-muted-foreground">
//                       {step}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }














// 'use client'

// import { useState } from 'react'
// import { Bot, Loader2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// interface Message {
//   type: 'human' | 'ai'
//   content: string
// }

// interface Result {
//   messages: Message[]
//   steps: string[]
// }

// export default function TaskPlanner() {
//   const [task, setTask] = useState('')
//   const [result, setResult] = useState<Result | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch('/api/agent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ task }),
//       })

//       if (!response.ok) {
//         throw new Error('Failed to process task')
//       }

//       const data = await response.json()
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       // Parse the messages to extract human and AI content
//       const parsedMessages = data.messages.map((msg: any) => ({
//         type: msg.id[2] === 'HumanMessage' ? 'human' : 'ai',
//         content: msg.kwargs.content
//       })).filter((msg: Message) => msg.content.trim() !== '')

//       setResult({
//         messages: parsedMessages,
//         steps: data.steps
//       })
//     } catch (error) {
//       console.error('Error:', error)
//       setError(error instanceof Error ? error.message : 'An error occurred')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Bot className="h-6 w-6" />
//             AI Task Planner
//           </CardTitle>
//           <CardDescription>Enter a task and let the AI break it down and create a plan.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               type="text"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               placeholder="Enter your task here"
//               className="w-full"
//             />
//             <Button type="submit" disabled={loading || !task} className="w-full">
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Planning...
//                 </>
//               ) : (
//                 'Plan Task'
//               )}
//             </Button>
//           </form>

//           {error && (
//             <Alert variant="destructive" className="mt-4">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {result && (
//             <div className="mt-6 space-y-4">
//               <div className="bg-muted/50 rounded-lg p-4">
//                 <h4 className="font-medium mb-2">Process Steps:</h4>
//                 <ul className="list-disc list-inside space-y-1">
//                   {result.steps.map((step, index) => (
//                     <li key={index} className="text-sm text-muted-foreground">
//                       {step}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <ScrollArea className="h-[400px] rounded-md border p-4">
//                 <div className="space-y-4">
//                   {result.messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`rounded-lg p-4 ${
//                         message.type === 'ai' ? 'bg-muted' : 'border'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2 mb-2">
//                         {message.type === 'ai' ? (
//                           <>
//                             <Bot className="h-4 w-4" />
//                             <span className="font-medium">AI Response:</span>
//                           </>
//                         ) : (
//                           <span className="font-medium">Task:</span>
//                         )}
//                       </div>
//                       <div className="whitespace-pre-wrap">{message.content}</div>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }













'use client'

import { useState } from 'react'
import { Bot, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  type: 'human' | 'ai'
  content: string
}

interface Result {
  messages: Message[]
  steps: string[]
}

export default function TaskPlanner() {
  const [task, setTask] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      })

      if (!response.ok) {
        throw new Error('Failed to process task')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      // Parse the messages to extract human and AI content
      const parsedMessages = data.messages
        .map((msg: any) => ({
          type: msg.id[2] === 'HumanMessage' ? 'human' : 'ai',
          content: msg.kwargs.content
        }))
        .filter((msg: Message, index: number, self: Message[]) =>
          index === self.findIndex((t) => t.content === msg.content)
        )

      setResult({
        messages: parsedMessages,
        steps: data.steps
      })
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            AI Task Planner
          </CardTitle>
          <CardDescription>Enter a task and let the AI break it down and create a plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task here"
              className="w-full"
            />
            <Button type="submit" disabled={loading || !task} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Planning...
                </>
              ) : (
                'Plan Task'
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Process Steps:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.steps.filter((step, index, self) =>
                    self.indexOf(step) === index
                  ).map((step, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-4">
                  {result.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-4 ${
                        message.type === 'ai' ? 'bg-muted' : 'border'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.type === 'ai' ? (
                          <>
                            <Bot className="h-4 w-4" />
                            <span className="font-medium">AI Response:</span>
                          </>
                        ) : (
                          <span className="font-medium">Task:</span>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
