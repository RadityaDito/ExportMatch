import BuyerCard from "@/components/profile-card";
import BottomNavigation from "@/components/bottom-navigation";
import { AiAssistantButton } from "@/components/ai-assistant-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <header className="flex-none bg-white shadow-sm py-3 px-4 relative z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {/* <h1 className="text-xl font-bold text-blue-600">Expora</h1> */}
          <Image src="/expora-logo.png" alt="Expora" width={120} height={20} />
          <AiAssistantButton />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center justify-center">
          <BuyerCard />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
