import { useState } from 'react';
import { ChildProfileSelect } from './ChildProfileSelect';
import { CharacterSelection } from './CharacterSelection';
import { EmotionWorldSelection } from './EmotionWorldSelection';
import { MiniGameHub } from './MiniGameHub';
import { AchievementsScreen } from './AchievementsScreen';
import { BreathingDragonGame } from './games/BreathingDragonGame';
import { MoodMirrorGame } from './games/MoodMirrorGame';
import { SpaceAdventureGame } from './games/SpaceAdventureGame';
import { FeelingsQuestGame } from './games/FeelingsQuestGame';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

type ChildView = 'profile' | 'worlds' | 'character-select' | 'game-hub' | 'achievements' | 'breathing-dragon' | 'mood-mirror' | 'space-adventure' | 'feelings-quest';

interface ChildInterfaceProps {
  onExit: () => void;
}

export function ChildInterface({ onExit }: ChildInterfaceProps) {
  const [view, setView] = useState<ChildView>('profile');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [totalStars, setTotalStars] = useState(45);
  const [badges, setBadges] = useState(['🌟', '🎯', '🦋', '💪']);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    setShowExitDialog(false);
    onExit();
  };

  const handleProfileSelect = (profile: any) => {
    setSelectedProfile(profile);
    setView('worlds');
  };

  const handleWorldSelect = (worldId: string) => {
    setSelectedWorld(worldId);
    // Auto-assign character based on world
    setSelectedCharacter(worldId);
    setView('game-hub');
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
    setView('game-hub');
  };

  const handleGameSelect = (gameId: string) => {
    setView(gameId as ChildView);
  };

  const handleGameComplete = (starsEarned: number, badgeEarned?: string) => {
    setTotalStars(prev => prev + starsEarned);
    if (badgeEarned && !badges.includes(badgeEarned)) {
      setBadges(prev => [...prev, badgeEarned]);
    }
    setView('game-hub');
  };

  const handleBackToWorlds = () => {
    setView('worlds');
    setSelectedWorld(null);
    setSelectedCharacter(null);
  };

  const handleBackToHub = () => {
    setView('game-hub');
  };

  let content = null;

  if (view === 'profile') {
    content = <ChildProfileSelect onSelectProfile={handleProfileSelect} onBack={handleExitClick} />;
  } else if (view === 'worlds') {
    content = (
      <EmotionWorldSelection
        profile={selectedProfile}
        selectedCharacter={selectedCharacter}
        totalStars={totalStars}
        onSelectWorld={handleWorldSelect}
        onViewAchievements={() => setView('achievements')}
        onChangeCharacter={handleBackToWorlds}
        onExit={handleExitClick}
      />
    );
  } else if (view === 'achievements') {
    content = (
      <AchievementsScreen
        profile={selectedProfile}
        totalStars={totalStars}
        badges={badges}
        onBack={() => setView('worlds')}
      />
    );
  } else if (view === 'game-hub') {
    content = (
      <MiniGameHub
        worldId={selectedWorld!}
        profile={selectedProfile}
        totalStars={totalStars}
        badges={badges}
        onSelectGame={handleGameSelect}
        onBack={handleBackToWorlds}
      />
    );
  } else if (view === 'breathing-dragon') {
    content = (
      <BreathingDragonGame
        profile={selectedProfile}
        onComplete={handleGameComplete}
        onBack={handleBackToHub}
      />
    );
  } else if (view === 'mood-mirror') {
    content = (
      <MoodMirrorGame
        profile={selectedProfile}
        onComplete={handleGameComplete}
        onBack={handleBackToHub}
      />
    );
  } else if (view === 'space-adventure') {
    content = (
      <SpaceAdventureGame
        profile={selectedProfile}
        onComplete={handleGameComplete}
        onBack={handleBackToHub}
      />
    );
  } else if (view === 'feelings-quest') {
    content = (
      <FeelingsQuestGame
        profile={selectedProfile}
        onComplete={handleGameComplete}
        onBack={handleBackToHub}
      />
    );
  }

  return (
    <>
      {content}
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be returned to the welcome screen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleConfirmExit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Yes
            </AlertDialogAction>
            <AlertDialogCancel>No</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}