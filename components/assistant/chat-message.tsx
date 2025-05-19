"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ChatMessage({ message }) {
  const isUser = message.isUser

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-2 ${isUser ? "space-x-reverse" : ""} max-w-[80%]`}
      >
        <Avatar className={`h-8 w-8 ${isUser ? "bg-vault-blue" : "bg-vault-purple"}`}>
          <AvatarFallback>{isUser ? <User size={16} /> : <Bot size={16} />}</AvatarFallback>
        </Avatar>

        <div>
          <div className={`p-3 rounded-lg ${isUser ? "bg-vault-blue/20 text-white" : "bg-vault-darker text-white"}`}>
            <p>{message.content}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
