import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Footer } from "./Footer";
import { FAQPage } from "./FAQPage";
import { ContactPage } from "./ContactPage";
import {
  Sparkles,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

interface SignupPageProps {
  onSignupComplete: () => void;
  onBack: () => void;
}

type SignupTab = "parent" | "child";

export function SignupPage({
  onSignupComplete,
  onBack,
}: SignupPageProps) {
  const [activeTab, setActiveTab] =
    useState<SignupTab>("parent");

  // Parent form state
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Child form state
  const [childName, setChildName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for password mismatch
  const [passwordError, setPasswordError] = useState("");
  
  // FAQ and Contact state
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleParentSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (parentPassword !== confirmPassword) {
      setPasswordError("Passwords do not match. Please try again.");
      return;
    }
    
    // Clear any previous errors
    setPasswordError("");
    
    // Switch to child signup after parent signup
    setActiveTab("child");
  };

  const handleChildSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show loading for 2 seconds before completing signup
    setTimeout(() => {
      onSignupComplete();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col">
      {/* FAQ Page */}
      {showFAQ && <FAQPage onClose={() => setShowFAQ(false)} />}
      
      {/* Contact Page */}
      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
      
      <div className="flex-1 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">Sign Up</h1>
            <p className="text-gray-600">
              {activeTab === "parent"
                ? "Create your Profile!"
                : "Create your Child's Profile!"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-1 mb-6">
            <button
              onClick={() => setActiveTab("parent")}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                activeTab === "parent"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Parent Signup
            </button>
            <button
              onClick={() => setActiveTab("child")}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                activeTab === "child"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Child Signup
            </button>
          </div>

          {/* Parent Signup Form */}
          {activeTab === "parent" && (
            <form
              onSubmit={handleParentSignup}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="parentName"
                  className="text-gray-700"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="parentName"
                    type="text"
                    placeholder="Enter your full name"
                    value={parentName}
                    onChange={(e) =>
                      setParentName(e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="parentEmail"
                  className="text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="parentEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={parentEmail}
                    onChange={(e) =>
                      setParentEmail(e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="parentPassword"
                  className="text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="parentPassword"
                    type="password"
                    placeholder="Create a password"
                    value={parentPassword}
                    onChange={(e) => {
                      setParentPassword(e.target.value);
                      setPasswordError(""); // Clear error when typing
                    }}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError(""); // Clear error when typing
                    }}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {passwordError && (
                <div className="text-red-500 text-sm mb-2">
                  {passwordError}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full mt-6"
              >
                Continue to Child Profile
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Child Signup Form */}
          {activeTab === "child" && (
            <form
              onSubmit={handleChildSignup}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="childName"
                  className="text-gray-700"
                >
                  Child's Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="childName"
                    type="text"
                    placeholder="Enter child's name"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="nickname"
                  className="text-gray-700"
                >
                  Nickname
                </Label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="nickname"
                    type="text"
                    placeholder="What should we call them?"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-700">
                  Age
                </Label>
                <select
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select age</option>
                  <option value="6">6 years old</option>
                  <option value="7">7 years old</option>
                  <option value="8">8 years old</option>
                  <option value="9">9 years old</option>
                  <option value="10">10 years old</option>
                  <option value="11">11 years old</option>
                  <option value="12">12 years old</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-700">
                  Gender
                </Label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="favoriteColor"
                  className="text-gray-700"
                >
                  Favourite Colour
                </Label>
                <select
                  id="favoriteColor"
                  value={favoriteColor}
                  onChange={(e) =>
                    setFavoriteColor(e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                  disabled={isLoading}
                >
                  <option value="">
                    Select favourite colour
                  </option>
                  <option value="red">❤️ Red</option>
                  <option value="blue">💙 Blue</option>
                  <option value="green">💚 Green</option>
                  <option value="yellow">💛 Yellow</option>
                  <option value="purple">💜 Purple</option>
                  <option value="pink">🩷 Pink</option>
                  <option value="orange">🧡 Orange</option>
                </select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Sign Up...
                  </>
                ) : (
                  'Complete Sign Up'
                )}
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Reset child form for another child
                    setChildName("");
                    setNickname("");
                    setAge("");
                    setGender("");
                    setFavoriteColor("");
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700"
                  disabled={isLoading}
                >
                  + Add another child
                </button>
              </div>
            </form>
          )}
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