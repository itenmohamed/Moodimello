import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Progress } from "../ui/progress";

interface EmotionCard {
  id: string;
  emoji: string;
  name: string;
  color: string;
}

const emotions: EmotionCard[] = [
  {
    id: "happy",
    emoji: "😊",
    name: "Happy",
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: "sad",
    emoji: "😢",
    name: "Sad",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "angry",
    emoji: "😠",
    name: "Angry",
    color: "from-red-400 to-orange-600",
  },
  {
    id: "scared",
    emoji: "😰",
    name: "Scared",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "excited",
    emoji: "🤩",
    name: "Excited",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "calm",
    emoji: "😌",
    name: "Calm",
    color: "from-green-400 to-teal-500",
  },
];

const scenarios = [
  {
    text: "Your friend shares their favorite toy with you",
    correctEmotion: "happy",
    explanation:
      "When someone is kind and shares with us, it often makes us feel happy and grateful! 💛",
  },
  {
    text: "Your favorite toy breaks and can't be fixed",
    correctEmotion: "sad",
    explanation:
      "It's normal to feel sad when we lose something we care about. It's okay to cry! 💙",
  },
  {
    text: "Someone takes your turn without asking",
    correctEmotion: "angry",
    explanation:
      "When things feel unfair, we might feel angry. That's a normal feeling! Remember to use calm words. ❤️",
  },
  {
    text: "You hear a loud, sudden noise in the dark",
    correctEmotion: "scared",
    explanation:
      "Scary things can make our heart beat fast. It's okay to feel afraid - it helps keep us safe! 💜",
  },
  {
    text: "Tomorrow is your birthday party!",
    correctEmotion: "excited",
    explanation:
      "Looking forward to fun things makes us feel excited and full of energy! 🎉",
  },
  {
    text: "You're reading a cozy book in your favorite spot",
    correctEmotion: "calm",
    explanation:
      "Peaceful moments help us feel calm and relaxed. This is a wonderful feeling! 💚",
  },
];

interface MoodMirrorGameProps {
  profile: any;
  onComplete: (stars: number, badge?: string) => void;
  onBack: () => void;
}

export function MoodMirrorGame({
  profile,
  onComplete,
  onBack,
}: MoodMirrorGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [selectedEmotion, setSelectedEmotion] = useState<
    string | null
  >(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleEmotionSelect = (emotionId: string) => {
    const scenario = scenarios[currentScenario];
    setSelectedEmotion(emotionId);

    if (emotionId === scenario.correctEmotion) {
      setScore(score + 2);
      setFeedback("correct");
    } else {
      setScore(score + 1);
      setFeedback("incorrect");
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentScenario + 1 >= scenarios.length) {
      const stars = Math.max(3, score);
      onComplete(stars, score >= 5 ? "🪞" : undefined);
    } else {
      setCurrentScenario(currentScenario + 1);
      setSelectedEmotion(null);
      setFeedback(null);
      setShowExplanation(false);
    }
  };

  const scenario = scenarios[currentScenario];
  const correctEmotionData = emotions.find(
    (e) => e.id === scenario.correctEmotion,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-purple-300 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

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
                <div className="text-3xl">🪞</div>
                <h2 className="text-gray-900">Mood Mirror</h2>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full border-2 border-purple-300">
              Score: {score}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {!isPlaying ? (
          <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-10 text-center space-y-8">
            <div className="text-8xl animate-bounce">🪞</div>
            <div className="space-y-3">
              <h1 className="text-gray-900">Mood Mirror</h1>
              <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
                Look into the magic mirror and match emotions to
                different situations! Learn to recognize
                feelings in yourself and others.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 text-left space-y-3">
              <p className="text-sm text-gray-700">
                <strong>How to play:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>
                  Read each scenario about different situations
                </li>
                <li>Think about how it would make you feel</li>
                <li>Pick the emotion that matches best</li>
                <li>
                  Learn about all {scenarios.length} different
                  feelings!
                </li>
              </ul>
              <div className="pt-3 border-t-2 border-purple-200">
                <p className="text-xs text-gray-500">
                  There's no wrong answer - understanding
                  emotions is what matters!
                </p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-10 py-6 shadow-xl hover:shadow-2xl"
            >
              Start Playing!
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Question {currentScenario + 1} of{" "}
                    {scenarios.length}
                  </span>
                  <span>{score} ⭐</span>
                </div>
                <Progress
                  value={
                    ((currentScenario + 1) / scenarios.length) *
                    100
                  }
                  className="h-3"
                />
              </div>
            </Card>

            <Card
              className={`border-4 bg-white/95 backdrop-blur-sm p-10 text-center transition-all ${
                feedback ? "scale-105" : ""
              } ${
                feedback === "correct"
                  ? "border-green-400 bg-green-50/50"
                  : feedback === "incorrect"
                    ? "border-orange-400 bg-orange-50/50"
                    : "border-purple-400"
              }`}
            >
              <div className="space-y-6">
                <div className="text-6xl">
                  {!feedback
                    ? "🤔"
                    : feedback === "correct"
                      ? "🌟"
                      : "💭"}
                </div>
                <div className="space-y-3">
                  <h3 className="text-gray-900">
                    {!showExplanation
                      ? "How would you feel?"
                      : "Here's what we learned:"}
                  </h3>
                  <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-lg">
                    {!showExplanation
                      ? scenario.text
                      : scenario.explanation}
                  </p>
                  {showExplanation && correctEmotionData && (
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <div
                        className={`text-5xl w-20 h-20 rounded-full bg-gradient-to-br ${correctEmotionData.color} flex items-center justify-center border-4 border-white shadow-xl`}
                      >
                        {correctEmotionData.emoji}
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-600">
                          That's okay! In this situation, Moodimello would be:
                        </p>
                        <p className="text-gray-900">
                          {correctEmotionData.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {!showExplanation && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {emotions.map((emotion) => (
                  <Card
                    key={emotion.id}
                    className={`border-4 p-6 cursor-pointer transition-all duration-300 ${
                      selectedEmotion === emotion.id
                        ? feedback === "correct"
                          ? "bg-green-100 border-green-400 scale-110 shadow-2xl"
                          : "bg-orange-100 border-orange-400 scale-110 shadow-2xl"
                        : "hover:scale-105 hover:shadow-xl bg-white border-purple-300"
                    } ${feedback ? "pointer-events-none" : ""}`}
                    onClick={() =>
                      !feedback &&
                      handleEmotionSelect(emotion.id)
                    }
                  >
                    <div className="text-center space-y-3">
                      <div
                        className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${emotion.color} flex items-center justify-center text-4xl border-4 border-white shadow-lg`}
                      >
                        {emotion.emoji}
                      </div>
                      <p className="text-sm text-gray-900">
                        {emotion.name}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {feedback && (
              <Card
                className={`border-4 p-6 text-center ${
                  feedback === "correct"
                    ? "bg-green-50 border-green-400"
                    : "bg-orange-50 border-orange-400"
                }`}
              >
                <p className="text-lg text-gray-900">
                  {feedback === "correct"
                    ? "🌟 Wonderful! You understood the feeling!"
                    : "💭 That's okay! Understanding emotions takes practice!"}
                </p>
              </Card>
            )}

            {feedback && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-10 py-6 shadow-xl hover:shadow-2xl"
                >
                  {currentScenario + 1 >= scenarios.length
                    ? "Finish!"
                    : "Next!"}
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}