import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { FAQPage } from "./FAQPage";
import { ContactPage } from "./ContactPage";
import { ArrowLeft } from "lucide-react";
import moodiMello from "figma:asset/774e71656417c2cd93bcf09b4d2f3245040230c1.png";

const childProfiles = [
  {
    id: "emma",
    name: "Emma",
    avatar:
      "https://www.pngitem.com/pimgs/m/581-5814816_riley-inside-out-characters-hd-png-download.png",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "lucas",
    name: "Lucas",
    avatar:
      "https://t3.ftcdn.net/jpg/12/73/97/74/360_F_1273977489_BSi3GP9finxxEtiBFrP2cuvpuxdpWLxL.jpg",
    color: "from-blue-400 to-purple-500",
  },
];

interface ChildProfileSelectProps {
  onSelectProfile: (profile: (typeof childProfiles)[0]) => void;
  onBack: () => void;
}

export function ChildProfileSelect({
  onSelectProfile,
  onBack,
}: ChildProfileSelectProps) {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col">
      {/* FAQ Page */}
      {showFAQ && <FAQPage onClose={() => setShowFAQ(false)} />}
      
      {/* Contact Page */}
      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
      
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-2xl w-full space-y-10">
          <div className="text-center space-y-4">
            <div className="mx-auto w-36 h-36 mb-6 animate-bounce">
              <img
                src={moodiMello}
                alt="MoodiMello"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-gray-900 text-4xl">
              Who's Playing Today?
            </h1>
            <p className="text-gray-600 text-lg">
              Select your profile to start your emotion adventure!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {childProfiles.map((profile) => (
              <Card
                key={profile.id}
                className="border-4 hover:border-purple-400 transition-all cursor-pointer hover:scale-105 hover:shadow-xl"
                onClick={() => onSelectProfile(profile)}
              >
                <button className="w-full p-10 space-y-5">
                  <div
                    className={`mx-auto w-32 h-32 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center overflow-hidden border-4 border-white shadow-lg`}
                  >
                    <ImageWithFallback
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-gray-900 text-2xl">
                    {profile.name}
                  </h2>
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer 
        onFAQClick={() => setShowFAQ(true)}
        onContactClick={() => setShowContact(true)}
      />
    </div>
  );
}