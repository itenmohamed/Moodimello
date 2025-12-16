import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { X, Save } from 'lucide-react';
import { Badge } from './ui/badge';

interface SettingsPanelProps {
  childData: any;
  onClose: () => void;
}

export function SettingsPanel({ childData, onClose }: SettingsPanelProps) {
  const [dailyTimeLimit, setDailyTimeLimit] = useState(30);
  const [enabledGames, setEnabledGames] = useState({
    feelingsQuest: true,
    breathingDragon: true,
    spaceAdventure: true,
    moodMirror: true
  });
  const [notifications, setNotifications] = useState({
    dailyReport: true,
    weeklyReport: true,
    milestones: true
  });

  const handleSave = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
    onClose();
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Customize controls for {childData.name}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Screen Time */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Daily Screen Time Limit</Label>
            <div className="flex items-center gap-4">
              <Slider 
                value={[dailyTimeLimit]} 
                onValueChange={(value) => setDailyTimeLimit(value[0])}
                min={15}
                max={120}
                step={15}
                className="flex-1"
              />
              <Badge variant="outline" className="w-20 justify-center">
                {dailyTimeLimit} min
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              Recommended: 30-45 minutes for ages 6-12
            </p>
          </div>
        </div>

        {/* Game Access */}
        <div className="space-y-3">
          <Label>Mini-Game Access</Label>
          <div className="space-y-2">
            {Object.entries(enabledGames).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <Switch 
                  checked={value}
                  onCheckedChange={(checked) => 
                    setEnabledGames(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <Label>Notification Preferences</Label>
          <div className="space-y-2">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <Switch 
                  checked={value}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
