import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Trophy, LogOut, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { FAQPage } from "./FAQPage";
import { ContactPage } from "./ContactPage";

const emotionWorlds = [
  {
    id: "joy",
    name: "Joy's World",
    character:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Joy_-_Inside_Out.webp/210px-Joy_-_Inside_Out.webp.png",
    isImage: true,
    description: "Bright, cheerful, and full of fun!",
    color: "from-yellow-300 via-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-400",
    image:
      "https://images.unsplash.com/photo-1571313781734-eb4f2efdcafd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjB5ZWxsb3clMjBoYXBweSUyMHN1bnNoaW5lfGVufDF8fHx8MTc2MzU1MzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    textColor: "text-yellow-900",
  },
  {
    id: "sadness",
    name: "Sadness's World",
    character:
      "https://i.pinimg.com/474x/6c/e5/ff/6ce5ff172d410a81ac96ae89fd5507ef.jpg",
    isImage: true,
    description: "Calm, gentle, and reflective.",
    color: "from-blue-300 via-blue-400 to-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
    image:
      "https://images.unsplash.com/photo-1613820070607-ef1d3ccc07f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    textColor: "text-blue-900",
  },
  {
    id: "anger",
    name: "Anger's World",
    character:
      "https://png.pngitem.com/pimgs/s/51-511692_inside-out-anger-png-vector-clipart-psd-anger.png",
    isImage: true,
    description: "Energetic, strong, and powerful!",
    color: "from-red-400 via-red-500 to-orange-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    image:
      "https://images.unsplash.com/photo-1758614424770-faf4fa6e8868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBvcmFuZ2UlMjBmaXJlJTIwZW5lcmd5fGVufDF8fHx8MTc2MzU1MzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    textColor: "text-red-900",
  },
  {
    id: "fear",
    name: "Fear's World",
    character:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3HoWA467EqylVrAzQi8NVh1eMv4Dp9KHLQ&s",
    isImage: true,
    description: "Careful, cautious, and brave.",
    color: "from-purple-300 via-purple-400 to-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-400",
    image:
      "https://images.unsplash.com/photo-1603531763662-109ff15864c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBkYXJrJTIwbXlzdGVyaW91cyUyMG5pZ2h0fGVufDF8fHx8MTc2MzU1MzA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    textColor: "text-purple-900",
  },
  {
    id: "disgust",
    name: "Disgust's World",
    character:
      "https://i.pinimg.com/736x/5f/e3/4d/5fe34d2c443182cd28c97ea1c3108d3e.jpg",
    isImage: true,
    description: "Smart, careful, and protective.",
    color: "from-green-300 via-green-400 to-teal-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-400",
    image:
      "https://media.istockphoto.com/id/1723866389/photo/healthy-green-organic-raw-broccoli-florets-ready-for-cooking.jpg?s=2048x2048&w=is&k=20&c=fTW2V08RkKm4jGa70GffbfQoakFsLzcBC-vl9deaG3w=",
    textColor: "text-green-900",
  },
];

const characterInfo: Record<
  string,
  {
    name: string;
    character: string;
    isImage: boolean;
    color: string;
  }
> = {
  joy: {
    name: "Joy",
    character:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Joy_-_Inside_Out.webp/210px-Joy_-_Inside_Out.webp.png",
    isImage: true,
    color: "from-yellow-400 to-orange-500",
  },
  sadness: {
    name: "Sadness",
    character:
      "https://i.pinimg.com/474x/6c/e5/ff/6ce5ff172d410a81ac96ae89fd5507ef.jpg",
    isImage: true,
    color: "from-blue-400 to-blue-600",
  },
  anger: {
    name: "Anger",
    character:
      "https://png.pngitem.com/pimgs/s/51-511692_inside-out-anger-png-vector-clipart-psd-anger.png",
    isImage: true,
    color: "from-red-400 to-orange-600",
  },
  fear: {
    name: "Fear",
    character:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3HoWA467EqylVrAzQi8NVh1eMv4Dp9KHLQ&s",
    isImage: true,
    color: "from-purple-400 to-purple-600",
  },
  disgust: {
    name: "Disgust",
    character:
      "https://i.pinimg.com/736x/5f/e3/4d/5fe34d2c443182cd28c97ea1c3108d3e.jpg",
    isImage: true,
    color: "from-green-400 to-teal-600",
  },
};

interface EmotionWorldSelectionProps {
  profile: any;
  selectedCharacter: string | null;
  totalStars: number;
  onSelectWorld: (worldId: string) => void;
  onViewAchievements: () => void;
  onChangeCharacter: () => void;
  onExit: () => void;
}

export function EmotionWorldSelection({
  profile,
  selectedCharacter,
  totalStars,
  onSelectWorld,
  onViewAchievements,
  onChangeCharacter,
  onExit,
}: EmotionWorldSelectionProps) {
  const character = selectedCharacter
    ? characterInfo[selectedCharacter]
    : null;
    
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 relative overflow-hidden flex flex-col">
      {/* FAQ Page */}
      {showFAQ && <FAQPage onClose={() => setShowFAQ(false)} />}
      
      {/* Contact Page */}
      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-36 h-36 bg-purple-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-44 h-44 bg-blue-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "500ms" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-4 border-purple-400 shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center border-4 border-white shadow-lg overflow-hidden`}
              >
                <ImageWithFallback
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-gray-900 flex items-center gap-2">
                  Hi, {profile.name}!
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h2>
                <p className="text-sm text-gray-600">
                  Choose your emotion world
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full border-2 border-yellow-500 shadow-lg">
                <Star className="h-5 w-5 text-white fill-white" />
                <span className="text-white">{totalStars}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={onViewAchievements}
                className="border-2 border-purple-400"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onExit}
                className="border-2"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-gray-900 flex items-center justify-center gap-3">
            Choose Your Emotion World!
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Each world has its own special character guide who
            will help you learn about that feeling!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {emotionWorlds.map((world, index) => (
            <Card
              key={world.id}
              className={`${world.borderColor} border-4 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl overflow-hidden group relative p-0`}
              onClick={() => onSelectWorld(world.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={world.image}
                  alt={world.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${world.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-110 transition-transform animate-bounce overflow-hidden">
                    {world.isImage ? (
                      <ImageWithFallback
                        src={world.character}
                        alt={world.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-6xl">
                        {world.character}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${world.bgColor} p-6 space-y-3`}
              >
                <div className="text-center space-y-2">
                  <h3 className={`${world.textColor}`}>
                    {world.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {world.description}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    className={`bg-gradient-to-r ${world.color} text-white border-2 border-white shadow-lg hover:shadow-xl transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectWorld(world.id);
                    }}
                  >
                    Enter World
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onFAQClick={() => setShowFAQ(true)}
        onContactClick={() => setShowContact(true)}
      />
    </div>
  );
}