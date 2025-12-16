import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Send, Search } from 'lucide-react';
import { Avatar } from './ui/avatar';
import moodimelloLogo from 'figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ParentChatbotProps {
  parentName: string;
  onBack: () => void;
}

export function ParentChatbot({ parentName, onBack }: ParentChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! My name is Moodie, your assistant for today',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('emotion') || input.includes('feeling')) {
      return "I can help you understand your child's emotional patterns. Based on recent activity, I've noticed some interesting trends. Would you like me to elaborate on any specific emotion?";
    } else if (input.includes('progress') || input.includes('improvement')) {
      return "Your child is making great progress! Their attention scores have improved by 15% this week, and they're becoming more confident in identifying their emotions. Keep up the great work!";
    } else if (input.includes('help') || input.includes('advice')) {
      return "I'm here to help! You can ask me about:\n• Your child's emotional patterns\n• Focus and attention metrics\n• Activity recommendations\n• Conversation starters\n• Weekly progress reports\n\nWhat would you like to know more about?";
    } else if (input.includes('activity') || input.includes('game')) {
      return "Based on your child's recent engagement, I recommend trying the Breathing Dragon game. It's been very effective for children working on emotional regulation and has a 90% completion rate!";
    } else if (input.includes('concern') || input.includes('worried')) {
      return "I understand your concern. It's completely normal to have questions about your child's development. Could you tell me more about what specifically is worrying you? I'm here to provide guidance and support.";
    } else {
      return "That's a great question! As your AI assistant, I'm here to help you track and understand your child's emotional development. I analyze their activity patterns, identify trends, and provide personalized recommendations. What specific aspect would you like to explore?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              {/* Logo in top left */}
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img 
                  src={moodimelloLogo} 
                  alt="Moodimello Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
             
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  {parentName.charAt(0).toUpperCase()}
                </div>
              </Avatar>
              <span className="text-gray-700 text-sm">Hi, {parentName}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-gray-900 mb-2">Hello, {parentName}!</h1>
            <p className="text-gray-700">My name is Moodie, your assistant for today</p>
          </div>

          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-6 py-4 rounded-3xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 text-gray-800'
                  }`}
                  style={message.sender === 'bot' && index === 0 ? { display: 'none' } : {}}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Logo to the left of textbox */}
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={moodimelloLogo} 
                alt="Moodimello Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ask me about your child's progress, emotions, or activities..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              />
              <Button
                size="sm"
                onClick={handleSend}
                className="bg-purple-500 hover:bg-purple-600 text-white"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}