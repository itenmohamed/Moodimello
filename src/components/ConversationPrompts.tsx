import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Bookmark, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface ConversationPrompt {
  id: string;
  category: string;
  prompt: string;
  context: string;
}

interface ConversationPromptsProps {
  prompts: ConversationPrompt[];
}

export function ConversationPrompts({ prompts }: ConversationPromptsProps) {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const toggleBookmark = (promptId: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
      } else {
        newSet.add(promptId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Joy': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Sadness': 'bg-blue-100 text-blue-700 border-blue-200',
      'Anger': 'bg-red-100 text-red-700 border-red-200',
      'Fear': 'bg-purple-100 text-purple-700 border-purple-200',
      'General': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || colors['General'];
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          Conversation Prompts
        </CardTitle>
        <CardDescription>
          AI-generated prompts to guide parent-child discussions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {prompts.map((prompt) => (
          <div 
            key={prompt.id} 
            className="bg-white border-2 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <Badge variant="outline" className={getCategoryColor(prompt.category)}>
                {prompt.category}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(prompt.id)}
                className="h-8 w-8 p-0"
              >
                <Bookmark 
                  className={`h-4 w-4 ${
                    bookmarked.has(prompt.id) 
                      ? 'fill-yellow-500 text-yellow-500' 
                      : 'text-gray-400'
                  }`}
                />
              </Button>
            </div>

            <p className="text-sm text-gray-900">
              {prompt.prompt}
            </p>

            <p className="text-xs text-gray-500 italic">
              Context: {prompt.context}
            </p>
          </div>
        ))}

        {bookmarked.size > 0 && (
          <div className="pt-3 border-t">
            <p className="text-sm text-gray-600">
              {bookmarked.size} prompt{bookmarked.size !== 1 ? 's' : ''} bookmarked for later
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
