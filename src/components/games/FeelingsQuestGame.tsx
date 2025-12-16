import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Star, Heart } from "lucide-react";
import { Progress } from "../ui/progress";

interface StoryChoice {
  text: string;
  emotion: string;
  emoji: string;
  feedback: string;
  points: number;
}

interface StoryScenario {
  id: number;
  scene: string;
  description: string;
  character: string;
  choices: StoryChoice[];
}

const storyScenarios: StoryScenario[] = [
  {
    id: 1,
    scene: "The Playground",
    description:
      "You're at the playground and see a new kid sitting alone on a bench looking sad.",
    character: "🧒",
    choices: [
      {
        text: "Go talk to them and ask if they want to play",
        emotion: "Kindness",
        emoji: "💛",
        feedback:
          "Great choice! Showing kindness helps others feel welcome!",
        points: 3,
      },
      {
        text: "Ignore them and play with your other friends",
        emotion: "Indifference",
        emoji: "😐",
        feedback:
          "Sometimes people need a friend. Try thinking about how they might feel.",
        points: 1,
      },
      {
        text: "Wave at them from far away",
        emotion: "Shyness",
        emoji: "👋",
        feedback:
          "That's a start! Next time, try going a bit closer.",
        points: 2,
      },
    ],
  },
  {
    id: 2,
    scene: "The Lost Toy",
    description:
      "Your little sibling accidentally breaks your favorite toy.",
    character: "🧸",
    choices: [
      {
        text: "Yell at them and storm off",
        emotion: "Anger",
        emoji: "😠",
        feedback:
          "It's okay to feel upset, but yelling might hurt their feelings. Take a deep breath first.",
        points: 1,
      },
      {
        text: "Take a deep breath and explain you're sad about it",
        emotion: "Calm Communication",
        emoji: "💬",
        feedback:
          "Wonderful! You managed your feelings and communicated well!",
        points: 3,
      },
      {
        text: "Say it's okay even though you're really upset",
        emotion: "Hiding Feelings",
        emoji: "😶",
        feedback:
          "It's important to share how you feel in a kind way.",
        points: 2,
      },
    ],
  },
  {
    id: 3,
    scene: "The Test Result",
    description:
      "You studied hard for a test but didn't get the grade you hoped for.",
    character: "📝",
    choices: [
      {
        text: "Give up and say you're bad at this subject",
        emotion: "Defeat",
        emoji: "😞",
        feedback:
          "Don't give up! Everyone has challenges. What matters is trying again.",
        points: 1,
      },
      {
        text: "Ask the teacher for help and study differently next time",
        emotion: "Growth Mindset",
        emoji: "🌱",
        feedback:
          "Excellent! Learning from challenges makes you stronger!",
        points: 3,
      },
      {
        text: "Feel sad but don't tell anyone",
        emotion: "Isolation",
        emoji: "😔",
        feedback:
          "It's okay to ask for help when things are hard.",
        points: 2,
      },
    ],
  },
  {
    id: 4,
    scene: "The Birthday Party",
    description:
      "Your friend didn't invite you to their birthday party, but invited others.",
    character: "🎂",
    choices: [
      {
        text: "Stop being friends with them immediately",
        emotion: "Hurt",
        emoji: "💔",
        feedback:
          "It's okay to feel hurt, but try talking to them first about how you feel.",
        points: 1,
      },
      {
        text: "Talk to them about how it made you feel",
        emotion: "Honest Communication",
        emoji: "💭",
        feedback:
          "Perfect! Sharing your feelings honestly helps friendships grow stronger!",
        points: 3,
      },
      {
        text: "Pretend you don't care at all",
        emotion: "Avoidance",
        emoji: "🤷",
        feedback:
          "Your feelings matter! It's okay to let friends know when something hurts.",
        points: 2,
      },
    ],
  },
  {
    id: 5,
    scene: "The Big Performance",
    description:
      "You have to perform in front of the whole school and you feel very nervous.",
    character: "🎭",
    choices: [
      {
        text: "Fake being sick to avoid it",
        emotion: "Fear Avoidance",
        emoji: "🤒",
        feedback:
          "Facing fears helps us grow! You can do hard things with practice.",
        points: 1,
      },
      {
        text: "Do breathing exercises and remind yourself you prepared well",
        emotion: "Courage",
        emoji: "💪",
        feedback:
          "Amazing! You're being brave and using calming strategies!",
        points: 3,
      },
      {
        text: "Rush through it as fast as possible",
        emotion: "Anxiety",
        emoji: "😰",
        feedback:
          "Slowing down and breathing can help you do your best!",
        points: 2,
      },
    ],
  },
];

interface FeelingsQuestGameProps {
  profile: any;
  onComplete: (stars: number, badge?: string) => void;
  onBack: () => void;
}

export function FeelingsQuestGame({
  profile,
  onComplete,
  onBack,
}: FeelingsQuestGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [feedback, setFeedback] = useState<StoryChoice | null>(
    null,
  );
  const [showResults, setShowResults] = useState(false);

  const handleChoice = (choice: StoryChoice) => {
    setFeedback(choice);
    setTotalPoints(totalPoints + choice.points);

    setTimeout(() => {
      if (currentScenario + 1 >= storyScenarios.length) {
        setShowResults(true);
      } else {
        setCurrentScenario(currentScenario + 1);
        setFeedback(null);
      }
    }, 3000);
  };

  const handleFinish = () => {
    const maxPoints = storyScenarios.length * 3;
    const percentage = (totalPoints / maxPoints) * 100;
    const stars = Math.max(
      3,
      Math.round((percentage / 100) * 5),
    );
    onComplete(stars, percentage >= 80 ? "🗺️" : undefined);
  };

  const scenario = storyScenarios[currentScenario];
  const maxPoints = storyScenarios.length * 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-4 border-purple-400 shadow-lg">
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
              <h2 className="text-gray-900">
                Feelings Quest 🗺️
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                Points: {totalPoints}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {!isPlaying ? (
          <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-8 text-center space-y-6">
            <div className="text-7xl animate-bounce">🗺️</div>
            <div className="space-y-3">
              <h1 className="text-gray-900">Feelings Quest</h1>
              <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
                Embark on an emotional adventure! Make choices
                in different scenarios and learn how to handle
                feelings in positive ways.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 text-left space-y-3">
              <p className="text-sm text-gray-700">
                <strong>How to play:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Read each story scenario carefully</li>
                <li>
                  Choose how you would respond to the situation
                </li>
                <li>Learn from the feedback and earn points</li>
                <li>
                  Complete all {storyScenarios.length} scenarios
                  to finish your quest!
                </li>
              </ul>
              <div className="pt-2 border-t-2 border-purple-200">
                <p className="text-xs text-gray-500">
                  Tip: Think about how each choice might make
                  you and others feel!
                </p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-8 py-6"
            >
              Start Your Quest!
            </Button>
          </Card>
        ) : showResults ? (
          <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-8 text-center space-y-6">
            <div className="text-7xl">🏆</div>
            <div className="space-y-3">
              <h2 className="text-gray-900">Quest Complete!</h2>
              <p className="text-gray-700 max-w-lg mx-auto">
                You've finished your emotional adventure and
                learned so much about feelings!
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Your Score
                </p>
                <p className="text-4xl text-gray-900">
                  {totalPoints}
                </p>
              </div>
              <Progress
                value={(totalPoints / maxPoints) * 100}
                className="h-3"
              />
              <p className="text-sm text-gray-600">
                {totalPoints >= maxPoints * 0.8
                  ? "🌟 Outstanding! You really understand emotions!"
                  : totalPoints >= maxPoints * 0.6
                    ? "😊 Great job! You're learning well!"
                    : "💪 Good effort! Keep practicing and you'll get even better!"}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleFinish}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Finish & Collect Stars ⭐
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentScenario(0);
                  setTotalPoints(0);
                  setShowResults(false);
                }}
                className="border-2"
              >
                Play Again
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Progress */}
            <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Scenario {currentScenario + 1} of{" "}
                    {storyScenarios.length}
                  </span>
                  <span>Points: {totalPoints}</span>
                </div>
                <Progress
                  value={
                    ((currentScenario + 1) /
                      storyScenarios.length) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </Card>

            {/* Scenario Card */}
            <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-8">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="text-7xl animate-bounce">
                    {scenario.character}
                  </div>
                  <h3 className="text-gray-900">
                    {scenario.scene}
                  </h3>
                  <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
                    {scenario.description}
                  </p>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <p className="text-center text-sm text-gray-600 mb-4">
                    What would you do? Choose your response:
                  </p>
                </div>
              </div>
            </Card>

            {/* Choices */}
            <div className="grid grid-cols-1 gap-4">
              {scenario.choices.map((choice, index) => (
                <Card
                  key={index}
                  className={`border-4 p-6 cursor-pointer transition-all duration-300 ${
                    feedback
                      ? feedback === choice
                        ? choice.points >= 3
                          ? "bg-green-50 border-green-400 scale-105"
                          : "bg-yellow-50 border-yellow-400 scale-105"
                        : "opacity-50 border-gray-300"
                      : "hover:scale-105 hover:shadow-xl bg-white border-purple-300 hover:border-purple-500"
                  }`}
                  onClick={() =>
                    !feedback && handleChoice(choice)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {choice.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">
                        {choice.text}
                      </p>
                      <p className="text-xs text-gray-500">
                        {choice.emotion}
                      </p>
                    </div>
                    {feedback === choice && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        +{choice.points}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <Card
                className={`border-4 p-6 ${
                  feedback.points >= 3
                    ? "bg-green-50 border-green-400"
                    : feedback.points >= 2
                      ? "bg-yellow-50 border-yellow-400"
                      : "bg-orange-50 border-orange-400"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {feedback.points >= 3
                      ? "🌟"
                      : feedback.points >= 2
                        ? "💭"
                        : "💡"}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      {feedback.feedback}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}