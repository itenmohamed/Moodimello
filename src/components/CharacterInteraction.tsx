import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CharacterInteractionProps {
  worldId: string;
  characterInfo: {
    name: string;
    character: string;
    isImage: boolean;
    color: string;
  };
  onSuggestGame: (gameId: string) => void;
}

const characterDialogues: Record<
  string,
  {
    checkIn: string[];
    gameSuggestions: Record<string, string>;
    encouragement: string[];
  }
> = {
  joy: {
    checkIn: [
      "Hey there! How are you feeling today?",
      "I can see you're here! What made you happy today?",
      "Yay! Tell me, what's making you smile right now?",
    ],
    gameSuggestions: {
      "mood-mirror":
        "You seem great! Want to practice recognizing happy faces in Mood Mirror? It's super fun! 🪞",
      "breathing-dragon":
        "Feeling good? Let's keep that energy calm and steady with Breathing Dragon! 🐉",
      "feelings-quest":
        "Ready for an adventure? Feelings Quest will be AMAZING! 🗺️",
      "space-adventure":
        "You're so focused today! Space Adventure would be perfect for you! 🚀",
    },
    encouragement: [
      "You're doing AMAZING! Keep spreading joy!",
      "WOW! I'm so proud of you! That was incredible!",
      "YES! You're such a bright light! Keep going!",
    ],
  },
  sadness: {
    checkIn: [
      "Hello... how are you feeling? It's okay if you're not feeling great today...",
      "Hi there... I'm here for you. Do you want to talk about how you feel?",
      "It's okay to feel sad sometimes... I understand. Want to share what's on your mind?",
    ],
    gameSuggestions: {
      "breathing-dragon":
        "Feeling a bit down? Breathing Dragon might help you feel calmer... 🐉",
      "mood-mirror":
        "Let's understand these feelings together with Mood Mirror... 🪞",
      "feelings-quest":
        "Sometimes exploring feelings helps... want to try Feelings Quest? 🗺️",
    },
    encouragement: [
      "It's okay... you're doing your best, and that's what matters... ",
      "I know it's hard, but you're being so brave...",
      "Take your time... there's no rush... you're doing great...",
    ],
  },
  anger: {
    checkIn: [
      "HEY! How are you doing?! Feeling fired up today?!",
      "What's up?! Something making you mad? That's TOTALLY okay!",
      "Yo! Tell me - what's got you feeling strong today?!",
    ],
    gameSuggestions: {
      "breathing-dragon":
        "Feeling intense? Let's channel that energy with Breathing Dragon! YEAH! 🐉",
      "space-adventure":
        "You've got power! Use it in Space Adventure! Focus that strength! 🚀",
      "feelings-quest":
        "Ready to tackle some BIG feelings? Feelings Quest is CALLING you! 🗺️",
    },
    encouragement: [
      "YEAH! You're handling this like a CHAMP! Keep it up!",
      "WOW! That's what I'm talking about! You're STRONG!",
      "AWESOME! You're learning to control that power! INCREDIBLE!",
    ],
  },
  fear: {
    checkIn: [
      "Um... hi there... are you feeling okay? A little scared maybe?",
      "H-hello... it's okay if you're nervous... I get it...",
      "Hey... feeling worried about something? That's totally normal...",
    ],
    gameSuggestions: {
      "breathing-dragon":
        "Feeling anxious? Breathing Dragon will help us calm down together... 🐉",
      "mood-mirror":
        "Let's recognize brave moments in Mood Mirror... you can do this... 🪞",
      "feelings-quest":
        "I know it seems scary, but Feelings Quest will help us be brave... 🗺️",
    },
    encouragement: [
      "You did it! I knew you were brave! I'm so proud!",
      "See? You CAN do scary things! That was amazing!",
      "Wow... you're braver than you think... great job!",
    ],
  },
  disgust: {
    checkIn: [
      "Ugh, hi. So... what's going on? Anything bothering you?",
      "Hey. Tell me - is something not feeling right today?",
      "Okay, so... how are you really feeling? Be honest.",
    ],
    gameSuggestions: {
      "mood-mirror":
        "Let's figure out what feels RIGHT with Mood Mirror. Smart choice. 🪞",
      "feelings-quest":
        "Feelings Quest will help you make better decisions. Trust me. 🗺️",
      "space-adventure":
        "You need to focus on what MATTERS. Space Adventure. Now. 🚀",
    },
    encouragement: [
      "Okay, not bad. You're learning to make smart choices.",
      "See? That wasn't so bad. You're getting better at this.",
      "Fine. You actually did pretty well. Keep it up.",
    ],
  },
};

export function CharacterInteraction({
  worldId,
  characterInfo,
  onSuggestGame,
}: CharacterInteractionProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const dialogues = characterDialogues[worldId];

  const handleNextDialogue = () => {
    setCurrentDialogue(
      (prev) => (prev + 1) % dialogues.checkIn.length,
    );
  };

  return (
    <Card className="border-4 border-purple-400 bg-white/95 backdrop-blur-sm p-6 shadow-xl">
      <div className="flex items-start gap-4">
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${characterInfo.color} flex items-center justify-center border-4 border-white shadow-xl animate-bounce overflow-hidden`}
        >
          {characterInfo.isImage ? (
            <ImageWithFallback
              src={characterInfo.character}
              alt={characterInfo.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <span className="text-5xl">
              {characterInfo.character}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-gray-900">
              {characterInfo.name} is talking to you
            </h3>
            <MessageCircle className="h-5 w-5 text-purple-500" />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
            <p className="text-gray-800 italic">
              "{dialogues.checkIn[currentDialogue]}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextDialogue}
              className="border-2"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Keep Talking
            </Button>

            <p className="text-xs text-gray-600">
              {characterInfo.name} wants to understand how you
              feel
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}