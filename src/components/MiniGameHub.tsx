import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Star, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MiniGame {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: string;
  starsNeeded: number;
}

const allGames: Record<string, MiniGame[]> = {
  joy: [
    {
      id: "mood-mirror",
      name: "Mood Mirror",
      icon: "🪞",
      description: "Match emotions and practice empathy!",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "feelings-quest",
      name: "Feelings Quest",
      icon: "🗺️",
      description: "Navigate through emotion adventures!",
      difficulty: "Medium",
      starsNeeded: 5,
    },
  ],
  sadness: [
    {
      id: "breathing-dragon",
      name: "Breathing Dragon",
      icon: "🐉",
      description: "Learn to breathe and stay calm.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "mood-mirror",
      name: "Mood Mirror",
      icon: "🪞",
      description: "Understand your feelings better.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "feelings-quest",
      name: "Feelings Quest",
      icon: "🗺️",
      description: "Explore sad moments and healing.",
      difficulty: "Medium",
      starsNeeded: 5,
    },
    {
      id: "space-adventure",
      name: "Space Adventure",
      icon: "🚀",
      description: "Test your focus and attention!",
      difficulty: "Hard",
      starsNeeded: 10,
    },
  ],
  anger: [
    {
      id: "breathing-dragon",
      name: "Breathing Dragon",
      icon: "🐉",
      description: "Calm down with breathing exercises.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "space-adventure",
      name: "Space Adventure",
      icon: "🚀",
      description: "Control your impulses!",
      difficulty: "Hard",
      starsNeeded: 10,
    },
    {
      id: "mood-mirror",
      name: "Mood Mirror",
      icon: "🪞",
      description: "Match emotions and practice empathy!",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "feelings-quest",
      name: "Feelings Quest",
      icon: "🗺️",
      description: "Navigate through emotion adventures!",
      difficulty: "Medium",
      starsNeeded: 5,
    },
  ],
  fear: [
    {
      id: "breathing-dragon",
      name: "Breathing Dragon",
      icon: "🐉",
      description: "Face your fears with calm breathing.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "mood-mirror",
      name: "Mood Mirror",
      icon: "🪞",
      description: "Recognize brave moments.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "feelings-quest",
      name: "Feelings Quest",
      icon: "🗺️",
      description: "Build courage step by step.",
      difficulty: "Medium",
      starsNeeded: 5,
    },
    {
      id: "space-adventure",
      name: "Space Adventure",
      icon: "🚀",
      description: "Test your focus and attention!",
      difficulty: "Hard",
      starsNeeded: 10,
    },
  ],
  disgust: [
    {
      id: "mood-mirror",
      name: "Mood Mirror",
      icon: "🪞",
      description: "Learn what feels right for you.",
      difficulty: "Easy",
      starsNeeded: 0,
    },
    {
      id: "feelings-quest",
      name: "Feelings Quest",
      icon: "🗺️",
      description: "Discover healthy choices.",
      difficulty: "Medium",
      starsNeeded: 5,
    },
    {
      id: "space-adventure",
      name: "Space Adventure",
      icon: "🚀",
      description: "Stay focused on what matters!",
      difficulty: "Hard",
      starsNeeded: 10,
    },
  ],
};

const worldInfo: Record<
  string,
  {
    name: string;
    character: string;
    isImage: boolean;
    color: string;
    bgColor: string;
    image: string;
    greeting: string;
    soundEffect: string;
  }
> = {
  joy: {
    name: "Joy's World",
    character:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Joy_-_Inside_Out.webp/210px-Joy_-_Inside_Out.webp.png",
    isImage: true,
    color: "from-yellow-300 to-orange-400",
    bgColor: "bg-yellow-200",
    image:
      "https://images.unsplash.com/photo-1571313781734-eb4f2efdcafd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjB5ZWxsb3clMjBoYXBweSUyMHN1bnNoaW5lfGVufDF8fHx8MTc2MzU1MzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    greeting:
      "Woohoo! Welcome to my world! I'm SO excited you're here! Let's have some FUN and learn about happy feelings together! Ready to play?",
    soundEffect: "",
  },
  sadness: {
    name: "Sadness's World",
    character:
      "https://i.pinimg.com/474x/6c/e5/ff/6ce5ff172d410a81ac96ae89fd5507ef.jpg",
    isImage: true,
    color: "from-blue-300 to-blue-500",
    bgColor: "bg-blue-200",
    image:
      "https://images.unsplash.com/photo-1613820070607-ef1d3ccc07f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    greeting:
      "Hello... I'm Sadness. It's okay to feel sad sometimes, you know. Let's understand these feelings together. Take your time...",
    soundEffect: "",
  },
  anger: {
    name: "Anger's World",
    character:
      "https://png.pngitem.com/pimgs/s/51-511692_inside-out-anger-png-vector-clipart-psd-anger.png",
    isImage: true,
    color: "from-red-400 to-orange-500",
    bgColor: "bg-red-200",
    image:
      "https://images.unsplash.com/photo-1758614424770-faf4fa6e8868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBvcmFuZ2UlMjBmaXJlJTIwZW5lcmd5fGVufDF8fHx8MTc2MzU1MzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    greeting:
      "HEY! I'm Anger! Sometimes we get mad, and that's TOTALLY OKAY! What's NOT okay is hurting others. Let's learn to handle it together! YEAH!",
    soundEffect: "",
  },
  fear: {
    name: "Fear's World",
    character:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3HoWA467EqylVrAzQi8NVh1eMv4Dp9KHLQ&s",
    isImage: true,
    color: "from-purple-300 to-purple-500",
    bgColor: "bg-purple-200",
    image:
      "https://images.unsplash.com/photo-1603531763662-109ff15864c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBkYXJrJTIwbXlzdGVyaW91cyUyMG5pZ2h0fGVufDF8fHx8MTc2MzU1MzA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    greeting:
      "Um... hi there. I'm Fear. Being scared is totally normal - it keeps us safe! But we can also be BRAVE together. Ready to try?",
    soundEffect: "",
  },
  disgust: {
    name: "Disgust's World",
    character:
      "https://i.pinimg.com/736x/5f/e3/4d/5fe34d2c443182cd28c97ea1c3108d3e.jpg",
    isImage: true,
    color: "from-green-300 to-teal-500",
    bgColor: "bg-green-200",
    image:
      "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    greeting:
      "Ugh... hi. I'm Disgust. I help you know what's good for you and what's NOT. Let's learn to make smart choices together!",
    soundEffect: "",
  },
};

interface MiniGameHubProps {
  worldId: string;
  profile: any;
  totalStars: number;
  badges: string[];
  onSelectGame: (gameId: string) => void;
  onBack: () => void;
}

export function MiniGameHub({
  worldId,
  profile,
  totalStars,
  badges,
  onSelectGame,
  onBack,
}: MiniGameHubProps) {
  const world = worldInfo[worldId];
  const games = allGames[worldId] || [];
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen ${world.bgColor} relative overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <ImageWithFallback
          src={world.image}
          alt={world.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {world.soundEffect}
          </div>
        ))}
      </div>

      <header className="bg-white/90 backdrop-blur-md border-b-4 border-white shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Worlds
            </Button>

            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center border-4 border-white shadow-lg animate-bounce overflow-hidden`}
              >
                {world.isImage ? (
                  <ImageWithFallback
                    src={world.character}
                    alt={world.name}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="text-3xl">
                    {world.character}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-gray-900">{world.name}</h2>
                <p className="text-sm text-gray-600">
                  Choose a mini-game to play!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full border-2 border-yellow-500 shadow-lg">
              <Star className="h-5 w-5 text-white fill-white" />
              <span className="text-white">{totalStars}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {showGreeting && (
          <Card className="border-4 bg-white/95 backdrop-blur-sm mb-8 p-8 shadow-2xl">
            <div className="flex items-start gap-6">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 border-4 border-white shadow-xl animate-bounce overflow-hidden`}
              >
                {world.isImage ? (
                  <ImageWithFallback
                    src={world.character}
                    alt={world.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-5xl">
                    {world.character}
                  </span>
                )}
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-gray-900 leading-relaxed">
                    {world.greeting}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowGreeting(false)}
                    className="ml-4"
                  >
                    ✕
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Pick a game below to start learning and
                  earning stars! ⭐
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900"> Mini-Games</h3>
            <p className="text-sm text-gray-600">
              {games.length} games available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game, index) => {
              const isLocked = totalStars < game.starsNeeded;

              return (
                <Card
                  key={game.id}
                  className={`border-4 p-8 transition-all duration-300 ${
                    isLocked
                      ? "opacity-60 cursor-not-allowed bg-gray-100 border-gray-300"
                      : "hover:scale-105 cursor-pointer hover:shadow-2xl bg-white/95 backdrop-blur-sm border-white"
                  }`}
                  onClick={() =>
                    !isLocked && onSelectGame(game.id)
                  }
                >
                  <div className="space-y-4">
                    <div
                      className={`text-7xl text-center ${!isLocked && "animate-bounce"}`}
                    >
                      {isLocked ? (
                        <Lock className="h-16 w-16 mx-auto text-gray-400" />
                      ) : (
                        game.icon
                      )}
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="text-gray-900">
                        {game.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {game.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          game.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : game.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {game.difficulty}
                      </span>
                      {game.starsNeeded > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          {game.starsNeeded} stars
                        </div>
                      )}
                    </div>

                    {isLocked && (
                      <div className="text-center">
                        <p className="text-sm text-red-600">
                          🔒 Earn{" "}
                          {game.starsNeeded - totalStars} more
                          stars to unlock!
                        </p>
                      </div>
                    )}

                    {!isLocked && (
                      <Button
                        className={`w-full bg-gradient-to-r ${world.color} text-white border-2 border-white shadow-lg hover:shadow-xl`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectGame(game.id);
                        }}
                      >
                        Play Now!
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="border-4 border-white bg-white/95 backdrop-blur-sm p-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                Games Unlocked
              </p>
              <p className="text-gray-900">
                {
                  games.filter(
                    (g) => totalStars >= g.starsNeeded,
                  ).length
                }{" "}
                / {games.length}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-gray-600">
                Your Stars
              </p>
              <p className="text-gray-900 flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                {totalStars}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}