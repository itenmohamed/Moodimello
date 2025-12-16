import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import moodimelloLogo from 'figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png';

interface FAQPageProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Moodimello and what is its purpose?",
    answer: "Moodimello is an AI-powered educational game designed for children ages 6-12. It teaches emotional consciousness, focus, and well-being through Inside Out-themed characters and engaging mini-games. The app helps children understand and manage their emotions in a fun, interactive way."
  },
  {
    question: "How do I sign up for Moodimello?",
    answer: "To sign up, click the 'Sign up here' link on the welcome screen. Fill in your email, create a password, and confirm it. After completing the sign-up form, you can log in and start setting up your child's profile."
  },
  {
    question: "How do I add a child profile?",
    answer: "After logging into your parent dashboard, you can add a child profile through the settings panel. Click on 'Settings' in the top navigation, then follow the prompts to add your child's name, age, and preferences."
  },
  {
    question: "What mini-games are available in Moodimello?",
    answer: "Moodimello features several engaging mini-games including: Breathing Dragon (breathing exercises), Mood Mirror (emotion recognition), Feelings Quest (emotion exploration adventures), and Space Adventure (focus and mindfulness). Each game is designed to teach specific emotional skills."
  },
  {
    question: "How does the AI chatbot work?",
    answer: "The AI chatbot, called 'Moodie', uses advanced language models to have natural, age-appropriate conversations with both children and parents. For children, it provides emotional support and guidance through Inside Out characters. For parents, it offers insights and advice about their child's emotional development."
  },
  {
    question: "How do I change settings for my child's account?",
    answer: "Click the 'Settings' button in the top navigation bar of your parent dashboard. From there, you can customize time limits, enable or disable specific games, adjust notification preferences, and modify other account settings."
  },
  {
    question: "What do the emotion worlds represent?",
    answer: "Each emotion world (Joy, Sadness, Anger, Fear, and Disgust) represents one of the core emotions from Inside Out. Children can explore these worlds to learn about different emotions, play themed mini-games, and interact with the corresponding character to better understand their feelings."
  },
  {
    question: "How are weekly reports generated?",
    answer: "Weekly reports are automatically generated using AI analysis of your child's activity, game progress, and emotional patterns throughout the week. These reports provide insights into your child's emotional development and suggestions for conversation topics."
  },
  {
    question: "Can I switch between multiple child profiles?",
    answer: "Yes! If you have multiple children, you can easily switch between their profiles using the 'Viewing' dropdown menu at the top of your parent dashboard. Each child maintains their own separate progress and emotional data."
  },
  {
    question: "Is Moodimello safe for my child?",
    answer: "Absolutely! Moodimello is designed with child safety as a top priority. All AI interactions are monitored and age-appropriate. We use secure encryption for all data, never share information with third parties, and provide parents with full visibility and control through the dashboard."
  }
];

export function FAQPage({ onBack }: FAQPageProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3 flex-1 justify-center mr-32">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img
                  src={moodimelloLogo}
                  alt="Moodimello Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-gray-900">
                  Moodimello
                </h1>
                <p className="text-sm text-gray-600">
                  Frequently Asked Questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 text-lg">
            Find answers to common questions about Moodimello
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
              >
                <span className="text-left text-gray-900 pr-4">
                  {faq.question}
                </span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                )}
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-5 bg-white border-t">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Contact our support team and we'll be happy to help!
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Back
          </Button>
        </div>
      </main>
    </div>
  );
}