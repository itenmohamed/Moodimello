import { useState } from "react";
import { Button } from "./ui/button";
import {
  LogOut,
  Settings,
  Mail,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { ChildProfileCard } from "./ChildProfileCard";
import { EmotionSummaryChart } from "./EmotionSummaryChart";
import { FocusMetrics } from "./FocusMetrics";
import { WeeklyReport } from "./WeeklyReport";
import { ConversationPrompts } from "./ConversationPrompts";
import { SettingsPanel } from "./SettingsPanel";
import { ParentChatbot } from "./ParentChatbot";
import { Footer } from "./Footer";
import { FAQPage } from "./FAQPage";
import { ContactPage } from "./ContactPage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { mockChildrenData } from "../data/mockData";
import moodimelloLogo from 'figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png';

interface ParentDashboardProps {
  selectedChildId: string;
  onLogout: () => void;
  onSwitchChild: (childId: string) => void;
}

export function ParentDashboard({
  selectedChildId,
  onLogout,
  onSwitchChild,
}: ParentDashboardProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [emailNotifications, setEmailNotifications] =
    useState(true);
  const [showChildSelector, setShowChildSelector] =
    useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const selectedChild = mockChildrenData.find(
    (c) => c.id === selectedChildId,
  )!;
  const otherChildren = mockChildrenData.filter(
    (c) => c.id !== selectedChildId,
  );

  // Show FAQ page if active
  if (showFAQ) {
    return <FAQPage onBack={() => setShowFAQ(false)} />;
  }

  // Show Contact page if active
  if (showContact) {
    return <ContactPage onBack={() => setShowContact(false)} />;
  }

  // Show chatbot screen if active
  if (showChatbot) {
    return (
      <ParentChatbot
        parentName="Sara"
        onBack={() => setShowChatbot(false)}
      />
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                    Parent Dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setShowChatbot(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat with Moodie
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Talk to your AI assistant
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        emailNotifications
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setEmailNotifications(
                          !emailNotifications,
                        )
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Reports
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {emailNotifications
                      ? "Email notifications enabled"
                      : "Enable email notifications"}
                  </TooltipContent>
                </Tooltip>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Child Profile Selector */}
          {mockChildrenData.length > 1 && (
            <div className="mb-6 relative">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() =>
                  setShowChildSelector(!showChildSelector)
                }
              >
                Viewing: {selectedChild.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              {showChildSelector &&
                otherChildren.length > 0 && (
                  <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg p-2 z-20 w-full sm:w-64">
                    {otherChildren.map((child) => (
                      <button
                        key={child.id}
                        className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          onSwitchChild(child.id);
                          setShowChildSelector(false);
                        }}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* Settings Panel (Conditional) */}
          {showSettings && (
            <div className="mb-6">
              <SettingsPanel
                childData={selectedChild}
                onClose={() => setShowSettings(false)}
              />
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile, Charts, and Weekly Report */}
            <div className="lg:col-span-2 space-y-6">
              <ChildProfileCard child={selectedChild} />
              <EmotionSummaryChart
                data={selectedChild.emotionData}
              />
              <FocusMetrics data={selectedChild.focusData} />
              <WeeklyReport
                report={selectedChild.weeklyReport}
              />
            </div>

            {/* Right Column - Conversation Prompts */}
            <div className="space-y-6">
              <ConversationPrompts
                prompts={selectedChild.conversationPrompts}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer 
          onFAQClick={() => setShowFAQ(true)}
          onContactClick={() => setShowContact(true)}
        />

        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be returned to the welcome screen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={onLogout}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Yes
              </AlertDialogAction>
              <AlertDialogCancel>No</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}