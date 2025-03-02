"use client"

import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AiAssistantButton() {
  return (
    <Link href="https://ai-chatbot-website.com" target="_blank" rel="noopener noreferrer">
      <Button variant="outline" size="sm" className="text-xs">
        <Bot className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Chat with AI Assistant</span>
      </Button>
    </Link>
  )
}

