"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiAssistantButton } from "@/components/ai-assistant-button";

const quickActions = ["Request Samples", "Schedule Call"];

const sampleChat = {
  id: 1,
  name: "Global Imports Co.",
  image: "/placeholder.svg",
  country: "Singapore",
  status: "Active",
  messages: [
    {
      id: 1,
      sender: "Global Imports Co.",
      content:
        "Hello! We're interested in your organic fruits. Can you tell us more about your available products and pricing?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ],
};

const simulatedResponses = [
  {
    question: "What are your shipping options and minimum order quantities?",
    answer:
      "We ship worldwide via air and sea freight. Our minimum order is 100kg for air and a full container for sea. Which option suits you?",
  },
  {
    question: "How do you ensure quality and freshness during transit?",
    answer:
      "We use cold storage and controlled packaging to maintain freshness. Temperature logs are available upon request.",
  },
  {
    question: "Do you have sustainability practices?",
    answer:
      "Yes, we use biodegradable packaging and support organic farming. Would you like details on our certifications?",
  },
];

export default function ChatPage() {
  const { id } = useParams();
  const [chat, setChat] = useState(sampleChat);
  const [newMessage, setNewMessage] = useState(
    "We offer organic mangoes, pineapples, and papayas at competitive prices. Pricing varies by quantity and season. Would you like a detailed price list?"
  );
  const [isTyping, setIsTyping] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, userMessage],
    }));
    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      if (simulationIndex < simulatedResponses.length) {
        const botMessage = {
          id: Date.now() + 1,
          sender: chat.name,
          content: simulatedResponses[simulationIndex].question,
          timestamp: new Date().toLocaleTimeString(),
        };
        setChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, botMessage],
        }));
        setIsTyping(false);
        setSimulationIndex(simulationIndex + 1);
        setNewMessage(simulatedResponses[simulationIndex].answer);
      } else {
        setIsTyping(false);
      }
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      content:
        action === "Request Samples"
          ? "I'd like to request samples of our organic fruits. What's the best way to arrange this?"
          : "I'd like to schedule a call to discuss our products in more detail. When would be a good time for you?",
      timestamp: new Date().toLocaleTimeString(),
    };
    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, newMessage],
    }));
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="flex-none bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Link href="/messages" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-3">
              <Image
                src={chat.image || "/placeholder.svg"}
                alt={chat.name}
                fill
                className="rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                  chat.status === "Active" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
            </div>
            <div>
              <h1 className="font-semibold">{chat.name}</h1>
              <p className="text-sm text-gray-500">{chat.country}</p>
            </div>
          </div>
        </div>
        <AiAssistantButton />
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-lg mx-auto p-4 space-y-4">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                <p className="text-[15px] leading-normal">{message.content}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.sender === "You" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-full px-4 py-2">
                <span className="text-gray-500 text-sm">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="flex-none bg-white border-t border-gray-200 px-4 pb-safe">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {action}
              </button>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 py-2"
          >
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 text-[16px] h-11 rounded-full px-4"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 rounded-full shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
