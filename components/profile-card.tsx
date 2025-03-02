"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, type PanInfo, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { X, Check, Info, Globe, Package, DollarSign, Briefcase } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Preserve all buyer details
const buyers = [
  {
    id: 1,
    name: "Global Imports Co.",
    country: "Singapore",
    productInterest: "Organic fruits and vegetables",
    bio: "Leading importer of organic produce seeking high-quality suppliers from Southeast Asia. We specialize in bringing the freshest and most sustainable products to health-conscious consumers across the region.",
    image: "/placeholder.svg?height=600&width=400",
    annualImportVolume: "$10-20 million",
    preferredShippingTerms: "FOB",
    certifications: ["Organic Certification", "HACCP"],
    targetMarkets: ["Supermarkets", "Health Food Stores"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 4,
  },
  {
    id: 2,
    name: "Tech Gadgets Ltd.",
    country: "Vietnam",
    productInterest: "Consumer electronics and accessories",
    bio: "Fast-growing electronics retailer looking for innovative gadgets and accessories. We're interested in partnering with manufacturers who can provide cutting-edge technology products for the Southeast Asian market.",
    image: "/placeholder.svg?height=600&width=400",
    annualImportVolume: "$5-10 million",
    preferredShippingTerms: "CIF",
    certifications: ["ISO 9001"],
    targetMarkets: ["Online Retailers", "Electronics Stores"],
    isVerified: false,
    status: "Offline",
    exportReadinessScore: 3,
  },
  {
    id: 3,
    name: "Eco Textiles Thailand",
    country: "Thailand",
    productInterest: "Sustainable fabrics and clothing",
    bio: "Boutique clothing manufacturer seeking eco-friendly textiles and ready-made garments. We're committed to sustainability and are looking for partners who share our vision for environmentally responsible fashion.",
    image: "/placeholder.svg?height=600&width=400",
    annualImportVolume: "$2-5 million",
    preferredShippingTerms: "DAP",
    certifications: ["GOTS", "OEKO-TEX"],
    targetMarkets: ["Boutiques", "Online Stores"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 5,
  },
]

export default function BuyerCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedBuyer, setMatchedBuyer] = useState<(typeof buyers)[0] | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const cardControls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  const buyer = buyers[currentIndex]

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe("right")
    } else if (info.offset.x < -100) {
      handleSwipe("left")
    } else {
      cardControls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
    }
  }

  const handleSwipe = async (dir: "left" | "right") => {
    const multiplier = dir === "left" ? -1 : 1
    await cardControls.start({
      x: multiplier * (containerRef.current?.offsetWidth || 300),
      opacity: 0,
      transition: { duration: 0.3 },
    })

    if (dir === "right") {
      setMatchedBuyer(buyer)
      setTimeout(() => {
        setShowMatch(true)
      }, 500)
    }

    if (currentIndex < buyers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }

    cardControls.set({ x: 0, opacity: 1 })
  }

  if (!buyer) return null

  return (
    <div className="relative w-full max-w-sm flex flex-col min-h-[calc(100vh-16rem)]" ref={containerRef}>
      <motion.div
        className="relative bg-white rounded-xl overflow-hidden shadow-lg flex-1"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        animate={cardControls}
        onDragEnd={handleDragEnd}
      >
        <div className="relative aspect-[3/4] bg-gray-200">
          <Image src={buyer.image || "/placeholder.svg"} alt={buyer.name} fill className="object-cover" />
          <button
            className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-80"
            onClick={() => setShowInfo(true)}
          >
            <Info className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-white">{buyer.name}</h2>
            {buyer.isVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.2, 1] }}
                      transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                      className="bg-white rounded-full p-0.5"
                    >
                      <Check className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified Buyer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-white" />
            <span className="text-white">{buyer.country}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                buyer.status === "Active" ? "bg-green-500" : "bg-gray-500"
              } text-white`}
            >
              {buyer.status}
            </span>
          </div>

          <p className="text-sm text-white line-clamp-2">{buyer.bio}</p>
        </div>
      </motion.div>

      {/* Action buttons with improved positioning */}
      <div className="sticky bottom-20 left-0 right-0 flex justify-center gap-6 mt-4 pb-4 bg-gradient-to-t from-gray-50 to-transparent pt-8">
        <button
          onClick={() => handleSwipe("left")}
          className="bg-white border border-gray-300 rounded-full p-4 shadow-md active:scale-95 transition-transform hover:bg-gray-50"
        >
          <X className="h-6 w-6 text-red-500" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="bg-green-500 rounded-full p-4 shadow-md active:scale-95 transition-transform hover:bg-green-600"
        >
          <Check className="h-6 w-6 text-white" />
        </button>
      </div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {buyer.name}
              {buyer.isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="bg-white rounded-full p-0.5 ml-2">
                        <Check className="h-5 w-5 text-blue-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified Buyer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)]">
            <div className="space-y-4 p-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image src={buyer.image || "/placeholder.svg"} alt={buyer.name} fill className="object-cover" />
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-sm text-gray-600">{buyer.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Details</h3>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Country:</span> {buyer.country}
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Product Interest:</span> {buyer.productInterest}
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Annual Import Volume:</span> {buyer.annualImportVolume}
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Preferred Shipping Terms:</span> {buyer.preferredShippingTerms}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {buyer.certifications.map((cert, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Target Markets</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {buyer.targetMarkets.map((market, index) => (
                    <li key={index}>{market}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showMatch} onOpenChange={setShowMatch}>
        <DialogContent className="sm:max-w-md bg-gradient-to-r from-blue-500 to-green-500 border-0">
          <div className="flex flex-col items-center justify-center py-6 text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
              <p className="text-sm">
                You and {matchedBuyer?.name} have expressed interest in doing business together!
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative h-20 w-20 rounded-full border-2 border-white overflow-hidden">
                <Image src="/placeholder.svg?height=100&width=100" alt="Your company" fill className="object-cover" />
              </div>
              <div className="relative h-20 w-20 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src={matchedBuyer?.image || "/placeholder.svg"}
                  alt={matchedBuyer?.name || "Buyer"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="secondary" className="flex-1 text-sm" onClick={() => setShowMatch(false)}>
                Keep Browsing
              </Button>
              <Link href={`/messages/${matchedBuyer?.id}`} className="flex-1" onClick={() => setShowMatch(false)}>
                <Button className="w-full text-sm">Send Message</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

