"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import {
  X,
  Check,
  Info,
  Globe,
  Package,
  DollarSign,
  Briefcase,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Preserve all buyer details
const buyers = [
  {
    id: 1,
    name: "HACO ASIA PACIFIC SDN BHD",
    country: "Malaysia",
    productInterest: "Green Coffee",
    bio: "A major importer of green coffee, HACO Asia Pacific Sdn Bhd has sourced from multiple suppliers across the globe, ensuring high-quality coffee supply for its operations. With over 1,600 total import shipments, the company is a key player in the coffee import industry in Malaysia.",
    image: "/haco-swiss.jpg?height=600&width=400",
    annualImportVolume:
      "Varies (Recent import: 75,900 KGS in Aug 2022, 38,674 KGS in Mar 2022)",
    preferredShippingTerms: "FOB",
    certifications: ["Fair Trade", "ISO 22000 - Food Safety"],
    targetMarkets: ["Food Processing", "Retail Distribution"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 5,
  },
  {
    id: 2,
    name: "Eco Textiles Thailand",
    country: "Thailand",
    productInterest: "Sustainable fabrics and clothing",
    bio: "Boutique clothing manufacturer seeking eco-friendly textiles and ready-made garments. We're committed to sustainability and are looking for partners who share our vision for environmentally responsible fashion.",
    image: "/ecotextile-product.jpg?height=600&width=400",
    annualImportVolume: "$2-5 million",
    preferredShippingTerms: "DAP",
    certifications: ["GOTS", "OEKO-TEX"],
    targetMarkets: ["Boutiques", "Online Stores"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 5,
  },
  {
    id: 3,
    name: "T M A Co Ltd",
    country: "Vietnam",
    productInterest: "Palm Oil and Food Products",
    bio: "A leading importer based in Vietnam with over 4,041 recorded import shipments. T M A Co Ltd sources palm oil, food products, and other commodities from key Southeast Asian suppliers, including Malaysia, Indonesia, and Singapore.",
    image: "/logo-TMA.png?height=600&width=400",
    annualImportVolume: "USD 109.86 million",
    preferredShippingTerms: "CIF",
    certifications: ["ISO 22000 - Food Safety", "HACCP"],
    targetMarkets: ["Food Processing", "Retail Distribution"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 5,
  },
  {
    id: 4,
    name: "INTERHERBAL CO LTD",
    country: "Vietnam",
    productInterest: "Herbal Products",
    bio: "INTERHERBAL CO LTD is a key importer of herbal products in Vietnam, with 559 recorded import shipments and a strong focus on sourcing high-quality herbal ingredients. The company collaborates with select suppliers to meet the growing demand for natural health products.",
    image: "/interherb-logo.png?height=600&width=400",
    annualImportVolume: "Not specified (Recent imports: 200 PCS, 108 PCS)",
    preferredShippingTerms: "DAP",
    certifications: ["GMP", "ISO 22000 - Food Safety"],
    targetMarkets: ["Health & Wellness", "Pharmaceutical Industry"],
    isVerified: true,
    status: "Active",
    exportReadinessScore: 4,
  },
];

export default function BuyerCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedBuyer, setMatchedBuyer] = useState<(typeof buyers)[0] | null>(
    null
  );

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const cardControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const buyer = buyers[currentIndex];

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    } else {
      cardControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  const handleSwipe = async (dir: "left" | "right") => {
    const multiplier = dir === "left" ? -1 : 1;
    await cardControls.start({
      x: multiplier * (containerRef.current?.offsetWidth || 300),
      opacity: 0,
      transition: { duration: 0.3 },
    });

    if (dir === "right") {
      // Always match with the buyer whose ID is 1
      const matchedBuyer = buyers.find((b) => b.id === 1) || buyers[0];
      setMatchedBuyer(matchedBuyer);
    }

    // random 40 % chance to setShowMatch(true)
    if (currentIndex >= 2) {
      setTimeout(() => {
        setShowMatch(true);
      }, 500);
    }

    if (currentIndex < buyers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }

    cardControls.set({ x: 0, opacity: 1 });
  };

  if (!buyer) return null;

  return (
    <div
      className="relative w-full max-w-sm flex flex-col min-h-[calc(100vh-16rem)]"
      ref={containerRef}
    >
      <motion.div
        className="relative bg-white rounded-xl overflow-hidden shadow-lg flex-1"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        animate={cardControls}
        onDragEnd={handleDragEnd}
      >
        <div className="relative aspect-[3/4] bg-gray-200">
          <Image
            src={buyer.image || "/placeholder.svg"}
            alt={buyer.name}
            fill
            className="object-fill"
          />
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
                <Image
                  src={buyer.image || "/placeholder.svg"}
                  alt={buyer.name}
                  fill
                  className="object-cover"
                />
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
                    <span className="font-medium">Country:</span>{" "}
                    {buyer.country}
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Product Interest:</span>{" "}
                    {buyer.productInterest}
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">
                      Annual Import Volume:
                    </span>{" "}
                    {buyer.annualImportVolume}
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">
                      Preferred Shipping Terms:
                    </span>{" "}
                    {buyer.preferredShippingTerms}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {buyer.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                    >
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
                You and {matchedBuyer?.name} have expressed interest in doing
                business together!
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative h-20 w-20 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src="/user-budi.jpg?height=100&width=100"
                  alt="Your company"
                  fill
                  className="object-cover"
                />
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
              <Button
                variant="secondary"
                className="flex-1 text-sm"
                onClick={() => setShowMatch(false)}
              >
                Keep Browsing
              </Button>
              <Link
                href={`/messages/${matchedBuyer?.id}`}
                className="flex-1"
                onClick={() => setShowMatch(false)}
              >
                <Button className="w-full text-sm">Send Message</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
