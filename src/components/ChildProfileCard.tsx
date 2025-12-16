import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Trophy, Clock, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChildProfileCardProps {
  child: {
    name: string;
    age: number;
    avatar: string;
    totalSessions: number;
    totalMinutes: number;
    currentStreak: number;
    overallProgress: number;
    badges: number;
  };
}

export function ChildProfileCard({ child }: ChildProfileCardProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Child Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              <ImageWithFallback 
                src={child.avatar} 
                alt={child.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-gray-900">{child.name}</h3>
              <p className="text-sm text-gray-600">{child.age} years old</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                    <p className="text-sm text-gray-600">Sessions</p>
                    <p className="text-gray-900">{child.totalSessions}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Total completed sessions
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Trophy className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-gray-900">{child.currentStreak} days</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Current daily streak
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Star className="h-5 w-5 mx-auto mb-1 text-yellow-600" />
                    <p className="text-sm text-gray-600">Badges</p>
                    <p className="text-gray-900">{child.badges}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Badges earned
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-gray-900">{child.overallProgress}%</span>
              </div>
              <Progress value={child.overallProgress} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
