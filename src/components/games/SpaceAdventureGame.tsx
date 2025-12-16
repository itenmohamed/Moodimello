import { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Progress } from "../ui/progress";

type ShapeColor = "green" | "yellow" | "red";

type FallingShape = {
  id: number;
  color: ShapeColor;
  position: number; // 0-100 for vertical position
};

const SHAPES = {
  green: "🟢",
  yellow: "🟡",
  red: "🔴",
};

const INSTRUCTIONS = {
  green: "Slide Right →",
  yellow: "Slide Left ←",
  red: "Don't Move!",
};

interface SpaceAdventureGameProps {
  profile: any;
  onComplete: (stars: number, badge?: string) => void;
  onBack: () => void;
}

export function SpaceAdventureGame({
  profile,
  onComplete,
  onBack,
}: SpaceAdventureGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShape, setCurrentShape] =
    useState<FallingShape | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [characterPosition, setCharacterPosition] = useState<
    "left" | "middle" | "right"
  >("middle");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalRounds = 12;

  // Generate a new falling shape
  useEffect(() => {
    if (!isPlaying || feedback !== null) return;

    const colors: ShapeColor[] = ["green", "yellow", "red"];
    const randomColor =
      colors[Math.floor(Math.random() * colors.length)];

    setCurrentShape({
      id: round,
      color: randomColor,
      position: 0,
    });

    setCharacterPosition("middle"); // Reset to middle
  }, [isPlaying, round, feedback]);

  // Animate the falling shape
  useEffect(() => {
    if (!currentShape || feedback !== null) return;

    const interval = setInterval(() => {
      setCurrentShape((prev) => {
        if (!prev) return null;
        const newPosition = prev.position + 2;

        // When shape reaches bottom, check the answer
        if (newPosition >= 100) {
          checkAnswer();
          return prev;
        }

        return { ...prev, position: newPosition };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentShape, feedback, characterPosition]);

  const checkAnswer = () => {
    if (!currentShape) return;

    let isCorrect = false;

    if (
      currentShape.color === "green" &&
      characterPosition === "right"
    ) {
      isCorrect = true;
    } else if (
      currentShape.color === "yellow" &&
      characterPosition === "left"
    ) {
      isCorrect = true;
    } else if (
      currentShape.color === "red" &&
      characterPosition === "middle"
    ) {
      isCorrect = true;
    }

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setFeedback("incorrect");
    }

    setTimeout(() => {
      setFeedback(null);

      if (lives <= 1 && !isCorrect) {
        const earnedStars = Math.max(
          2,
          Math.floor((score / totalRounds) * 5),
        );
        onComplete(earnedStars, score >= 10 ? "🚀" : undefined);
      } else if (round + 1 >= totalRounds) {
        const earnedStars = Math.max(
          3,
          Math.floor((score / totalRounds) * 5),
        );
        onComplete(earnedStars, score >= 10 ? "🚀" : undefined);
      } else {
        setRound(round + 1);
      }
    }, 1500);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;

    const deltaX = e.clientX - dragStartX;
    const threshold = 50;

    if (deltaX > threshold && characterPosition !== "right") {
      setCharacterPosition("right");
      setDragStartX(e.clientX);
    } else if (
      deltaX < -threshold &&
      characterPosition !== "left"
    ) {
      setCharacterPosition("left");
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    const deltaX = e.touches[0].clientX - dragStartX;
    const threshold = 50;

    if (deltaX > threshold && characterPosition !== "right") {
      setCharacterPosition("right");
      setDragStartX(e.touches[0].clientX);
    } else if (
      deltaX < -threshold &&
      characterPosition !== "left"
    ) {
      setCharacterPosition("left");
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || feedback) return;

      if (
        e.key === "ArrowLeft" &&
        characterPosition !== "left"
      ) {
        setCharacterPosition("left");
      } else if (
        e.key === "ArrowRight" &&
        characterPosition !== "right"
      ) {
        setCharacterPosition("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, feedback, characterPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <header className="bg-black/60 backdrop-blur-md border-b-4 border-purple-500 shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-2 border-purple-400 text-black hover:bg-purple-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🚀</div>
                <h2 className="text-white">Space Slider</h2>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="text-sm bg-red-600 px-4 py-2 rounded-full border-2 border-red-400">
                Lives: {"❤️".repeat(lives)}
              </div>
              <div className="text-sm bg-purple-600 px-4 py-2 rounded-full border-2 border-purple-400">
                Score: {score}/{totalRounds}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {!isPlaying ? (
          <Card className="border-4 border-purple-400 bg-black/80 backdrop-blur-sm p-10 text-center space-y-8">
            <div className="text-8xl animate-bounce">🚀</div>
            <div className="space-y-3">
              <h1 className="text-white">Space Slider</h1>
              <p className="text-gray-300 max-w-lg mx-auto leading-relaxed">
                Navigate through space by sliding left and
                right! Watch the falling shapes and react
                quickly!
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border-2 border-indigo-400 rounded-xl p-6 text-left space-y-4">
              <p className="text-sm text-gray-300">
                <strong className="text-white">
                  Instructions:
                </strong>
              </p>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-green-900/30 border-2 border-green-400 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">
                      {SHAPES.green}
                    </span>
                    <span className="text-green-300">
                      Green Shape
                    </span>
                  </div>
                  <span className="text-green-200 flex items-center gap-2">
                    <ArrowRight className="w-6 h-6" />
                    Slide Right
                  </span>
                </div>
                <div className="bg-yellow-900/30 border-2 border-yellow-400 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">
                      {SHAPES.yellow}
                    </span>
                    <span className="text-yellow-300">
                      Yellow Shape
                    </span>
                  </div>
                  <span className="text-yellow-200 flex items-center gap-2">
                    <ArrowLeft className="w-6 h-6" />
                    Slide Left
                  </span>
                </div>
                <div className="bg-red-900/30 border-2 border-red-400 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">
                      {SHAPES.red}
                    </span>
                    <span className="text-red-300">
                      Red Shape
                    </span>
                  </div>
                  <span className="text-red-200">
                    Don't Move!
                  </span>
                </div>
              </div>
              <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside pt-2">
                <li>
                  Drag your character left or right to dodge or
                  catch
                </li>
                <li>
                  Use arrow keys on keyboard for quick moves
                </li>
                <li>You have 3 lives - use them wisely!</li>
                <li>Complete {totalRounds} rounds to win!</li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-10 py-6 shadow-2xl hover:shadow-purple-500/50"
            >
              Launch Mission! 🚀
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-4 border-purple-400 bg-black/80 backdrop-blur-sm p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>
                    Round {round + 1} of {totalRounds}
                  </span>
                  <span>Lives: {"❤️".repeat(lives)}</span>
                </div>
                <Progress
                  value={((round + 1) / totalRounds) * 100}
                  className="h-3"
                />
              </div>
            </Card>

            {/* Game Area */}
            <div
              className={`relative rounded-2xl border-4 h-[500px] transition-all duration-300 overflow-hidden ${
                feedback === "correct"
                  ? "bg-green-500/30 border-green-400 shadow-2xl shadow-green-500/50"
                  : feedback === "incorrect"
                    ? "bg-red-500/30 border-red-400 shadow-2xl shadow-red-500/50"
                    : "bg-black/40 border-purple-400 shadow-xl"
              }`}
              ref={trackRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Falling Shape */}
              {currentShape && !feedback && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-75 ease-linear"
                  style={{
                    top: `${currentShape.position}%`,
                  }}
                >
                  <div className="text-7xl animate-pulse filter drop-shadow-2xl">
                    {SHAPES[currentShape.color]}
                  </div>
                </div>
              )}

              {/* Track Lines */}
              <div className="absolute bottom-0 left-0 right-0 h-40 border-t-4 border-purple-500/50">
                <div className="grid grid-cols-3 h-full">
                  <div className="border-r-2 border-purple-500/30"></div>
                  <div className="border-r-2 border-purple-500/30"></div>
                  <div></div>
                </div>
              </div>

              {/* Character */}
              <div
                className={`absolute bottom-10 transition-all duration-300 ease-out ${
                  characterPosition === "left"
                    ? "left-[16.666%]"
                    : characterPosition === "right"
                      ? "left-[83.333%]"
                      : "left-1/2"
                } transform -translate-x-1/2`}
              >
                <div className="text-8xl filter drop-shadow-2xl">
                  {profile.avatar ===
                  "https://www.pngitem.com/pimgs/m/581-5814816_riley-inside-out-characters-hd-png-download.png"
                    ? "👧"
                    : "👦"}
                </div>
              </div>

              {/* Direction Hints */}
              {currentShape && !feedback && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
                  {currentShape.color === "green" && (
                    <div className="flex items-center gap-2 text-green-300 animate-pulse">
                      <ChevronRight className="w-8 h-8" />
                      <span className="text-xl">
                        Slide Right
                      </span>
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                  {currentShape.color === "yellow" && (
                    <div className="flex items-center gap-2 text-yellow-300 animate-pulse">
                      <ChevronLeft className="w-8 h-8" />
                      <span className="text-xl">
                        Slide Left
                      </span>
                      <ChevronLeft className="w-8 h-8" />
                    </div>
                  )}
                  {currentShape.color === "red" && (
                    <div className="text-red-300 text-xl animate-pulse">
                      Wait...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Instruction Card */}
            {currentShape && !feedback && (
              <Card className="border-4 border-purple-400 bg-black/80 backdrop-blur-sm p-4 text-center">
                <p className="text-white text-lg">
                  {INSTRUCTIONS[currentShape.color]}
                </p>
              </Card>
            )}

            {/* Feedback */}
            {feedback && (
              <Card
                className={`border-4 p-6 text-center ${
                  feedback === "correct"
                    ? "bg-green-900/50 border-green-400"
                    : "bg-red-900/50 border-red-400"
                }`}
              >
                <p className="text-2xl text-white">
                  {feedback === "correct"
                    ? "✅ Perfect! Great reflexes!"
                    : "❌ Oops! Try again!"}
                </p>
              </Card>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}