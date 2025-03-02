"use client"

import Link from "next/link"
import { User, Search, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white z-10">
      <div className="max-w-md mx-auto flex justify-around items-center h-14">
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-1/3 ${
            pathname === "/profile" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-1/3 ${
            pathname === "/" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link
          href="/messages"
          className={`flex flex-col items-center justify-center w-1/3 ${
            pathname === "/messages" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Inquiries</span>
        </Link>
      </div>
    </div>
  )
}

