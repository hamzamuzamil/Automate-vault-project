"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Send, Mic, MicOff, Bot, Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/assistant/chat-message"
import { TemplateRecommendation } from "@/components/assistant/template-recommendation"

// Simulated template recommendations
const sampleRecommendations = [
  {
    id: 1,
    title: "LinkedIn Post Scheduler",
    description: "Schedule and automate your LinkedIn posts with this workflow",
    slug: "linkedin-post-scheduler",
    price: 5,
  },
  {
    id: 2,
    title: "AI Content Calendar Generator",
    description: "Automatically generate content calendars for your social media using AI",
    slug: "ai-content-calendar-generator",
    price: 5,
  },
]

export function ChatInterface() {
  const { user } = useSupabaseAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Hi there! I'm your AI workflow assistant. Tell me what you'd like to automate, and I'll recommend the perfect templates for you.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Save message to database if user is logged in
      if (user) {
        const supabase = getSupabaseClient()
        await supabase.from("chat_history").insert({
          user_id: user.id,
          message: input,
          is_user: true,
        })
      }

      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        // Generate AI response
        const aiResponse = {
          id: Date.now() + 1,
          content: generateAIResponse(input),
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiResponse])

        // Save AI response to database if user is logged in
        if (user) {
          const supabase = getSupabaseClient()
          supabase.from("chat_history").insert({
            user_id: user.id,
            message: aiResponse.content,
            is_user: false,
          })
        }

        // Show template recommendations
        setRecommendations(sampleRecommendations)
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Check if browser supports speech recognition
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        setIsListening(true)
        // In a real implementation, this would use the Web Speech API
        toast({
          title: "Voice Input",
          description: "Voice input is simulated in this demo.",
        })

        // Simulate voice input after a delay
        setTimeout(() => {
          setInput("I want to automate scheduling LinkedIn posts using AI")
          setIsListening(false)
        }, 2000)
      } else {
        toast({
          title: "Not Supported",
          description: "Voice input is not supported in your browser.",
          variant: "destructive",
        })
      }
    } else {
      setIsListening(false)
    }
  }

  // Simple function to generate AI responses based on user input
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("linkedin") || input.includes("social media") || input.includes("post")) {
      return "Based on your needs, I recommend these templates for automating your LinkedIn and social media posting. They'll help you schedule and create content efficiently."
    } else if (input.includes("email") || input.includes("marketing")) {
      return "For email marketing automation, I recommend checking out our Email Marketing Campaign Analyzer template. It will help you track and optimize your email campaigns."
    } else {
      return "I've found some templates that might help with your automation needs. Take a look at these recommendations."
    }
  }

  return (
    <div className="flex flex-col h-[70vh] md:h-[600px]">
      <Card className="flex-1 bg-vault-dark border-vault-purple/20 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-3 rounded-lg bg-vault-darker max-w-[80%]"
            >
              <Avatar className="h-8 w-8 bg-vault-purple">
                <AvatarFallback>
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              <Loader2 className="h-4 w-4 animate-spin text-vault-purple" />
            </motion.div>
          )}

          {recommendations.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {recommendations.map((template) => (
                <TemplateRecommendation key={template.id} template={template} />
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-vault-purple/20">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about automation..."
              disabled={isLoading || isListening}
              className="bg-vault-darker border-vault-purple/30"
            />
            <Button
              onClick={toggleVoiceInput}
              variant="outline"
              size="icon"
              className={`border-vault-purple/30 ${isListening ? "bg-vault-purple text-white" : "text-vault-purple"}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="sr-only">Toggle voice input</span>
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-vault-purple hover:bg-vault-purple/90"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
