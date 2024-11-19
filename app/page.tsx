'use client'

import { useState } from 'react'
import { Bot, Loader2, Copy, Check, FileDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ReactMarkdown from 'react-markdown'
import { jsPDF } from 'jspdf'

interface Message {
  type: 'human' | 'ai'
  content: string
}

interface MessageData {
    id: string[];
    kwargs: {
      content: string;
    };
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
  const [copied, setCopied] = useState(false)

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

      const parsedMessages = data.messages
        .map((msg: MessageData) => ({
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

  const exportAsPDF = () => {
    if (!result) return

    const doc = new jsPDF()
    let yOffset = 10

    doc.setFontSize(20)
    doc.text('AI Task Planner', 10, yOffset)
    yOffset += 10

    doc.setFontSize(14)
    doc.text(`Task: ${task}`, 10, yOffset)
    yOffset += 10

    doc.setFontSize(12)
    result.messages.forEach((message) => {
      if (message.type === 'ai') {
        doc.text('AI Response:', 10, yOffset)
        yOffset += 5
        const splitContent = doc.splitTextToSize(message.content, 180)
        doc.text(splitContent, 10, yOffset)
        yOffset += splitContent.length * 5 + 5
      }
    })

    doc.save('ai-task-plan.pdf')
  }

  const exportAsMarkdown = () => {
    if (!result) return

    let markdown = `# AI Task Planner\n\n`
    markdown += `## Task: ${task}\n\n`
    result.messages.forEach((message) => {
      if (message.type === 'ai') {
        markdown += `### AI Response:\n\n${message.content}\n\n`
      }
    })

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-task-plan.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportAsPDF}>
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportAsMarkdown}>
                      Export as Markdown
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <ScrollArea className="h-[500px] rounded-md border">
                <div className="space-y-4 p-4">
                  {result.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`relative rounded-lg p-4 ${
                        message.type === 'ai' ? 'bg-muted' : 'border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {message.type === 'ai' ? (
                            <>
                              <Bot className="h-4 w-4" />
                              <span className="font-medium">AI Response:</span>
                            </>
                          ) : (
                            <span className="font-medium">Task:</span>
                          )}
                        </div>
                        {message.type === 'ai' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleCopy(message.content)}
                          >
                            {copied ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            h3: (props) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                            ul: (props) => <ul className="list-disc pl-6 space-y-1" {...props} />,
                            li: (props) => <li className="text-sm" {...props} />,
                            p: (props) => <p className="text-sm mb-2" {...props} />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
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
