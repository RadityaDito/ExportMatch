import {
  ArrowLeft,
  Briefcase,
  Package,
  Globe,
  Mail,
  Phone,
  Award,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";

// Mock exporter profile data
const exporterProfile = {
  name: "John Smith",
  companyName: "Southeast Asian Exports Inc.",
  country: "Thailand",
  productsAvailable: [
    "Organic Fruits",
    "Sustainable Textiles",
    "Artisanal Crafts",
  ],
  businessDescription:
    "Leading exporter of high-quality organic produce and sustainable goods from Thailand. With over 15 years of experience, we pride ourselves on connecting local producers with international markets in Southeast Asia.",
  contactEmail: "john@seaexports.com",
  contactPhone: "+66 2 123 4567",
  yearsOfExperience: 15,
  certifications: [
    "Organic Thailand",
    "ASEAN Good Agricultural Practices",
    "ISO 9001",
  ],
  image: "/placeholder.svg?height=400&width=300",
};

export default function ProfilePage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 pb-safe">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Exporter Profile </h1>
          <Link href="/settings" className="text-gray-600 hover:text-gray-900">
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-md">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-green-500">
            <Image
              src={exporterProfile.image || "/placeholder.svg"}
              alt="Profile cover"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end">
              <div className="relative h-24 w-24 rounded-full border-4 border-white overflow-hidden">
                <Image
                  src={exporterProfile.image || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 text-white">
                <h2 className="text-2xl font-bold">{exporterProfile.name}</h2>
                <p className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {exporterProfile.companyName}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">About Our Business</h3>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
            <p className="text-gray-600">
              {exporterProfile.businessDescription}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Globe className="h-5 w-5 mr-2" />
                <span>{exporterProfile.country}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Package className="h-5 w-5 mr-2" />
                <span>
                  {exporterProfile.yearsOfExperience} years of export experience
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Products Available for Export
              </h3>
              <div className="flex flex-wrap gap-2">
                {exporterProfile.productsAvailable.map((product, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {exporterProfile.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    <Award className="h-4 w-4 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  {exporterProfile.contactEmail}
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  {exporterProfile.contactPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
