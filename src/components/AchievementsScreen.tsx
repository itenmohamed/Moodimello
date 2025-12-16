import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Trophy,
  Star,
  Award,
  Target,
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const allAchievements: Achievement[] = [
  {
    id: "dragon",
    name: "Breathing Master",
    description: "Complete Breathing Dragon 3 times",
    icon: "🐉",
    earned: true,
    earnedDate: "Nov 18, 2024",
  },
  {
    id: "mirror",
    name: "Emotion Expert",
    description: "Get perfect score in Mood Mirror",
    icon: "🪞",
    earned: true,
    earnedDate: "Nov 17, 2024",
  },
  {
    id: "space",
    name: "Focus Champion",
    description: "Complete Space Adventure",
    icon: "🚀",
    earned: true,
    earnedDate: "Nov 16, 2024",
  },
  {
    id: "quest",
    name: "Story Explorer",
    description: "Finish all Feelings Quest scenarios",
    icon: "🗺️",
    earned: true,
    earnedDate: "Nov 15, 2024",
  },
  {
    id: "streak",
    name: "7-Day Streak",
    description: "Play games for 7 days in a row",
    icon: "🔥",
    earned: false,
  },
  {
    id: "star100",
    name: "100 Stars",
    description: "Collect 100 stars total",
    icon: "⭐",
    earned: false,
  },
  {
    id: "allworlds",
    name: "World Explorer",
    description: "Visit all emotion worlds",
    icon: "🌍",
    earned: false,
  },
  {
    id: "helper",
    name: "Kind Helper",
    description: "Share feelings with parent 10 times",
    icon: "💝",
    earned: false,
  },
  {
    id: "brave",
    name: "Brave Heart",
    description: "Complete all Fear world games",
    icon: "🦁",
    earned: false,
  },
  {
    id: "calm",
    name: "Calm Mind",
    description: "Do breathing exercises 20 times",
    icon: "🧘",
    earned: false,
  },
  {
    id: "happy",
    name: "Joy Spreader",
    description: "Complete all Joy world games",
    icon: "🌟",
    earned: false,
  },
  {
    id: "wise",
    name: "Wise One",
    description: "Answer 50 emotion questions correctly",
    icon: "🦉",
    earned: false,
  },
];

interface AchievementsScreenProps {
  profile: any;
  totalStars: number;
  badges: string[];
  onBack: () => void;
}

export function AchievementsScreen({
  profile,
  totalStars,
  badges,
  onBack,
}: AchievementsScreenProps) {
  const earnedCount = allAchievements.filter(
    (a) => a.earned,
  ).length;
  const totalCount = allAchievements.length;
  const percentage = Math.round(
    (earnedCount / totalCount) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "500ms" }}
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
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div>
                  <h2 className="text-gray-900">
                    My Achievements
                  </h2>
                  <p className="text-sm text-gray-600">
                    {profile.name}'s collection
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
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-4 border-yellow-400 bg-white/95 backdrop-blur-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Total Stars
                </p>
                <p className="text-3xl text-gray-900">
                  {totalStars}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Badges Earned
                </p>
                <p className="text-3xl text-gray-900">
                  {earnedCount}/{totalCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-4 border-green-400 bg-white/95 backdrop-blur-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Progress
                </p>
                <p className="text-3xl text-gray-900">
                  {percentage}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Badges */}
        <div className="mb-12">
          <h3 className="text-gray-900 mb-6">
            🌟 Your Badge Collection
          </h3>
          <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-8">
            <div className="flex justify-center gap-4 flex-wrap">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl border-4 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  title={`Badge ${index + 1}`}
                >
                  {badge}
                </div>
              ))}
              {badges.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Complete games to earn badges! 🎯
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Achievement Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">
              🏆 All Achievements
            </h3>
            <p className="text-sm text-gray-600">
              {earnedCount} of {totalCount} unlocked
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`border-4 p-6 transition-all ${
                  achievement.earned
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg"
                    : "bg-gray-100 border-gray-300 opacity-60"
                }`}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl ${
                        achievement.earned
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-white shadow-xl"
                          : "bg-gray-300 grayscale"
                      }`}
                    >
                      {achievement.earned
                        ? achievement.icon
                        : "🔒"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-1">
                    <h4
                      className={`${achievement.earned ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {achievement.description}
                    </p>
                    {achievement.earned &&
                      achievement.earnedDate && (
                        <p className="text-xs text-gray-500 italic mt-2">
                          Earned: {achievement.earnedDate}
                        </p>
                      )}
                  </div>

                  {/* Status */}
                  {achievement.earned ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-100 py-2 rounded-full">
                      <Award className="h-4 w-4" />
                      <span>Unlocked!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-200 py-2 rounded-full">
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-6 mt-12">
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-900">
              {earnedCount === 0 &&
                "Start playing games to unlock amazing achievements!"}
              {earnedCount > 0 &&
                earnedCount < 4 &&
                "Great start! Keep playing to unlock more badges!"}
              {earnedCount >= 4 &&
                earnedCount < 8 &&
                "You're doing awesome! More achievements await!"}
              {earnedCount >= 8 &&
                earnedCount < totalCount &&
                "Amazing progress! You're almost there!"}
              {earnedCount === totalCount &&
                "WOW! You've unlocked everything! You're a champion!"}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}