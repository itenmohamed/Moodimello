import { useState, useEffect } from "react";
import { ParentLogin } from "./components/ParentLogin";
import { SignupPage } from "./components/SignupPage";
import { ParentDashboard } from "./components/ParentDashboard";
import { ChildInterface } from "./components/ChildInterface";
import { Button } from "./components/ui/button";
import { Footer } from "./components/Footer";
import { FAQPage } from "./components/FAQPage";
import { ContactPage } from "./components/ContactPage";
import moodiMello from "figma:asset/774e71656417c2cd93bcf09b4d2f3245040230c1.png";
import moodimelloLogo from "figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png";

type View = "selection" | "parent" | "signup" | "child";

export default function App() {
  const [view, setView] = useState<View>("selection");
  const [isParentLoggedIn, setIsParentLoggedIn] =
    useState(false);
  const [selectedChild, setSelectedChild] = useState<
    string | null
  >(null);
  const [typedText, setTypedText] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const fullText =
    "Hello I'm Moodimello and I'm your emotional companion today!";

  useEffect(() => {
    if (view === "selection") {
      let currentIndex = 0;
      setTypedText("");

      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [view]);

  const handleParentLogin = (childId: string) => {
    setIsParentLoggedIn(true);
    setSelectedChild(childId);
  };

  const handleLogout = () => {
    setIsParentLoggedIn(false);
    setSelectedChild(null);
    setView("selection");
  };

  // Initial selection screen
  if (view === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col">
        {/* FAQ Page */}
        {showFAQ && (
          <FAQPage onClose={() => setShowFAQ(false)} />
        )}

        {/* Contact Page */}
        {showContact && (
          <ContactPage onClose={() => setShowContact(false)} />
        )}

        <div className="flex-1 flex items-center justify-center p-4 relative">
          {/* Logo in top left corner */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl overflow-hidden">
            <img
              src={moodimelloLogo}
              alt="Moodimello Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-10">
            <div className="space-y-4">
              <div className="relative flex justify-center items-start">
                <div className="w-48 h-48 flex items-center justify-center animate-bounce">
                  <img
                    src={moodiMello}
                    alt="MoodiMello"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thought Bubble */}
                <div className="absolute -top-4 left-[calc(50%+110px)] w-80 max-w-sm">
                  <div className="relative bg-white rounded-3xl p-5 shadow-lg border-4 border-purple-300">
                    <p className="text-gray-800">
                      {typedText}
                      <span className="inline-block w-0.5 h-5 bg-purple-500 ml-1 animate-pulse"></span>
                    </p>
                    {/* Thought bubble tail */}
                    <div className="absolute -left-3 top-10">
                      <div className="w-7 h-7 bg-white rounded-full border-4 border-purple-300 border-r-0 border-b-0"></div>
                    </div>
                    <div className="absolute -left-7 top-14">
                      <div className="w-5 h-5 bg-white rounded-full border-4 border-purple-300 border-r-0 border-b-0"></div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-gray-900 text-4xl animate-fade-in-up-delay-0">
                Welcome to Moodimello
              </h1>
              <p className="text-gray-600 max-w-md mx-auto text-lg animate-fade-in-up-delay-1">
                Let's play, learn feelings, and grow together!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="min-w-48 h-14 text-lg bg-white text-gray-900 transition-all hover:scale-110 hover:border-purple-500 hover:border-4 hover:bg-white hover:text-gray-900"
                onClick={() => setView("child")}
              >
                Child
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-48 h-14 text-lg bg-white text-gray-900 transition-all hover:scale-110 hover:border-purple-500 hover:border-4 hover:bg-white hover:text-gray-900"
                onClick={() => setView("parent")}
              >
                Parent
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-lg">
                Don't have an account?{" "}
                <button
                  onClick={() => setView("signup")}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer
          onFAQClick={() => setShowFAQ(true)}
          onContactClick={() => setShowContact(true)}
        />
      </div>
    );
  }

  // Signup view
  if (view === "signup") {
    return (
      <SignupPage
        onSignupComplete={() => setView("selection")}
        onBack={() => setView("selection")}
      />
    );
  }

  // Parent view
  if (view === "parent") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
        {!isParentLoggedIn ? (
          <ParentLogin
            onLogin={handleParentLogin}
            onBack={() => setView("selection")}
          />
        ) : (
          <ParentDashboard
            selectedChildId={selectedChild!}
            onLogout={handleLogout}
            onSwitchChild={setSelectedChild}
          />
        )}
      </div>
    );
  }

  // Child view
  return <ChildInterface onExit={() => setView("selection")} />;
}