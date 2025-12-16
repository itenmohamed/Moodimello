import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "../ui/progress";

type BreathPhase = "inhale" | "hold" | "exhale" | "rest";

interface BreathingDragonGameProps {
  profile: any;
  onComplete: (stars: number, badge?: string) => void;
  onBack: () => void;
}

export function BreathingDragonGame({
  profile,
  onComplete,
  onBack,
}: BreathingDragonGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [timer, setTimer] = useState(4);
  const [dragonSize, setDragonSize] = useState(1);

  const totalRounds = 3;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold");
            return 2;
          } else if (phase === "hold") {
            setPhase("exhale");
            return 4;
          } else if (phase === "exhale") {
            setPhase("rest");
            return 2;
          } else {
            if (round + 1 >= totalRounds) {
              setIsPlaying(false);
              setTimeout(() => {
                onComplete(5, "🐉");
              }, 1000);
            } else {
              setRound(round + 1);
              setPhase("inhale");
              return 4;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, phase, round, onComplete]);

  useEffect(() => {
    if (phase === "inhale") {
      setDragonSize(1 + (4 - timer) * 0.2);
    } else if (phase === "exhale") {
      setDragonSize(1 + timer * 0.2);
    } else if (phase === "hold") {
      setDragonSize(1.8);
    } else {
      setDragonSize(1);
    }
  }, [phase, timer]);

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe IN slowly through your nose...";
      case "hold":
        return "Hold your breath gently...";
      case "exhale":
        return "Breathe OUT slowly through your mouth...";
      case "rest":
        return "Relax and rest for a moment...";
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "from-blue-400 via-cyan-400 to-teal-400";
      case "hold":
        return "from-purple-400 via-pink-400 to-rose-400";
      case "exhale":
        return "from-orange-400 via-red-400 to-pink-500";
      case "rest":
        return "from-green-400 via-emerald-400 to-teal-400";
    }
  };

  const getPhaseEmoji = () => {
    switch (phase) {
      case "inhale":
        return "💨";
      case "hold":
        return "🫧";
      case "exhale":
        return "🔥";
      case "rest":
        return "✨";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationName: 'float',
              animationDuration: `${4 + Math.random() * 3}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {
              ["🔥", "💨", "✨", "🌟"][
                Math.floor(Math.random() * 4)
              ]
            }
          </div>
        ))}
      </div>

      <header className="bg-white/90 backdrop-blur-md border-b-4 border-orange-400 shadow-lg relative z-20">
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
                <div className="text-3xl">🐉</div>
                <h2 className="text-gray-900">
                  Breathing Dragon
                </h2>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full border-2 border-orange-300">
              Round {round + 1} of {totalRounds}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {!isPlaying ? (
          <Card className="border-4 border-orange-400 bg-white/95 backdrop-blur-sm p-10 text-center space-y-8">
            <div className="text-8xl animate-bounce">🐉</div>
            <div className="space-y-3">
              <h1 className="text-gray-900">
                Breathing Dragon
              </h1>
              <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
                Help the magical dragon breathe! Follow along
                with breathing exercises to feel calm, relaxed,
                and powerful.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 text-left space-y-3">
              <p className="text-sm text-gray-700">
                <strong>How to play:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💨</span>
                  <span>
                    <strong>INHALE:</strong> Watch the dragon
                    grow bigger as you breathe in through your
                    nose
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🫧</span>
                  <span>
                    <strong>HOLD:</strong> Hold your breath
                    gently while the dragon stays big
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔥</span>
                  <span>
                    <strong>EXHALE:</strong> Breathe out slowly
                    through your mouth as the dragon shrinks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span>
                    <strong>REST:</strong> Relax for a moment
                    before the next breath
                  </span>
                </li>
              </ul>
              <div className="pt-3 border-t-2 border-orange-200">
                <p className="text-xs text-gray-500">
                  This exercise helps when you feel worried,
                  angry, or need to calm down!
                </p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg px-10 py-6 shadow-xl hover:shadow-2xl"
            >
              Start Breathing Exercise
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="border-4 border-orange-400 bg-white/95 backdrop-blur-sm p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      ((round +
                        (phase === "exhale" || phase === "rest"
                          ? 0.5
                          : 0)) /
                        totalRounds) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    ((round +
                      (phase === "exhale" || phase === "rest"
                        ? 0.5
                        : 0)) /
                      totalRounds) *
                    100
                  }
                  className="h-3"
                />
              </div>
            </Card>

            <div className="text-center space-y-8">
              <div
                className="relative flex items-center justify-center"
                style={{ minHeight: "400px" }}
              >
                <div
                  className={`absolute rounded-full bg-gradient-to-br ${getPhaseColor()} blur-3xl transition-all duration-1000`}
                  style={{
                    width: `${dragonSize * 250}px`,
                    height: `${dragonSize * 250}px`,
                    opacity: 0.3,
                  }}
                />

                <div
                  className={`relative rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 flex items-center justify-center shadow-2xl border-4 border-white`}
                  style={{
                    width: `${dragonSize * 200}px`,
                    height: `${dragonSize * 200}px`,
                  }}
                >
                  <span className="text-9xl filter drop-shadow-lg">
                    🐉
                  </span>
                </div>

                <div className="absolute top-0 right-0 text-6xl animate-bounce">
                  {getPhaseEmoji()}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-gray-900">
                  {getInstructions()}
                </h2>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-gray-300 shadow-xl">
                  <span className="text-6xl text-gray-700">
                    {timer}
                  </span>
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  {phase === "inhale" &&
                    "Fill your lungs with air, nice and slow..."}
                  {phase === "hold" &&
                    "Keep the air in, stay calm..."}
                  {phase === "exhale" &&
                    "Let all the air out slowly..."}
                  {phase === "rest" &&
                    "Great job! Take a moment to relax..."}
                </p>
              </div>
            </div>

            <Card className="border-4 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 p-6 text-center">
              <p className="text-sm text-gray-700">
                💭 <strong>Remember:</strong> You can use this
                breathing technique anytime you need to calm
                down or focus!
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}