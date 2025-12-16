import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const emotionCharacters = [
  {
    id: "joy",
    name: "Joy",
    character:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Joy_-_Inside_Out.webp/210px-Joy_-_Inside_Out.webp.png",
    isImage: true,
    description: "Happy, energetic, and full of sunshine!",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    greeting:
      "Hi! I'm Joy! I'll help you learn about happy feelings and fun activities!",
  },
  {
    id: "sadness",
    name: "Sadness",
    character:
      "https://i.pinimg.com/474x/6c/e5/ff/6ce5ff172d410a81ac96ae89fd5507ef.jpg",
    isImage: true,
    description: "Calm, thoughtful, and understanding.",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    greeting:
      "Hello... I'm Sadness. I'll help you understand when you feel down, and that's okay.",
  },
  {
    id: "anger",
    name: "Anger",
    character:
      "https://png.pngitem.com/pimgs/s/51-511692_inside-out-anger-png-vector-clipart-psd-anger.png",
    isImage: true,
    description: "Strong, passionate, and powerful!",
    color: "from-red-400 to-orange-600",
    bgColor: "bg-red-50",
    greeting:
      "Hey! I'm Anger! I'll teach you how to handle big feelings in healthy ways!",
  },
  {
    id: "fear",
    name: "Fear",
    character:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3HoWA467EqylVrAzQi8NVh1eMv4Dp9KHLQ&s",
    isImage: true,
    description: "Careful, brave, and protective.",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    greeting:
      "Um, hi! I'm Fear. I'll help you be brave and face your worries together!",
  },
  {
    id: "disgust",
    name: "Disgust",
    character:
      "https://i.pinimg.com/736x/5f/e3/4d/5fe34d2c443182cd28c97ea1c3108d3e.jpg",
    isImage: true,
    description: "Honest, smart, and keeps you safe!",
    color: "from-green-400 to-teal-600",
    bgColor: "bg-green-50",
    greeting:
      "Hi there. I'm Disgust. I'll help you know what's good for you and what's not!",
  },
];

interface CharacterSelectionProps {
  profile: any;
  totalStars: number;
  onSelectCharacter: (characterId: string) => void;
  onBack: () => void;
}

export function CharacterSelection({
  profile,
  totalStars,
  onSelectCharacter,
  onBack,
}: CharacterSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 relative overflow-hidden">
      {/* Animated background */}
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
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-4 border-purple-400 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center border-4 border-white shadow-lg overflow-hidden`}
                >
                  <ImageWithFallback
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-gray-900">
                    {profile.name}'s Journey
                  </h2>
                  <p className="text-sm text-gray-600">
                    Choose your emotion guide
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full border-2 border-yellow-500 shadow-lg">
              <Star className="h-5 w-5 text-white fill-white" />
              <span className="text-white">{totalStars}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-gray-900">
            Choose Your Emotion Guide!
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Pick the character you feel most connected to today.
            They'll be your friend and guide through all the fun
            activities!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {emotionCharacters.map((character, index) => (
            <Card
              key={character.id}
              className={`${character.bgColor} border-4 border-gray-300 hover:border-purple-500 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl overflow-hidden group`}
              onClick={() => onSelectCharacter(character.id)}
            >
              <div className="p-8 space-y-6">
                {/* Character Avatar */}
                <div className="flex justify-center">
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center border-4 border-white shadow-2xl group-hover:scale-110 transition-transform overflow-hidden`}
                  >
                    {character.isImage ? (
                      <ImageWithFallback
                        src={character.character}
                        alt={character.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-7xl">
                        {character.character}
                      </span>
                    )}
                  </div>
                </div>

                {/* Character Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-gray-900">
                    {character.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {character.description}
                  </p>
                </div>

                {/* Character Greeting */}
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 border-2 border-gray-200`}
                >
                  <p className="text-xs text-gray-700 italic">
                    "{character.greeting}"
                  </p>
                </div>

                {/* Select Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${character.color} text-white border-2 border-white shadow-lg hover:shadow-xl`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCharacter(character.id);
                  }}
                >
                  Choose {character.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="border-4 border-purple-400 bg-white/90 backdrop-blur-sm p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> You can change your
                emotion guide anytime! Different characters help
                with different feelings.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}