import BottomNavigation from "@/components/bottom-navigation";
import { Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AiAssistantButton } from "@/components/ai-assistant-button";

const conversations = [
  {
    id: 1,
    name: "HACO ASIA PACIFIC SDN BHD",
    lastMessage:
      "Hello! We're interested in sourcing high-quality green coffee. Could you provide details on your available varieties, certifications, and pricing?",
    time: "Just now",
    image: "/placeholder.svg?height=100&width=100",
    country: "Malaysia",
    status: "Active",
  },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen">
        <header className="bg-white p-3 border-b border-gray-200 shadow-sm sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold">Business Inquiries</h1>
          </div>
          <AiAssistantButton />
        </header>

        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-160px)] pb-10">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="block hover:bg-gray-50"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={conversation.image || "/placeholder.svg"}
                    alt={conversation.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      conversation.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {conversation.country}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
