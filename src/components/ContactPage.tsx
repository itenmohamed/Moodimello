import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import moodimelloLogo from 'figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [concern, setConcern] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (concern.trim() && email.trim()) {
      setSubmitted(true);
      // Reset form after showing success message
      setTimeout(() => {
        setConcern("");
        setEmail("");
      }, 500);
    }
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
                  Contact Us
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 text-lg">
            Have a concern or question? We're here to help!
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <Alert className="mb-8 bg-green-50 border-green-300">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 text-center">
              Request submitted successfully. We will contact you soon.
            </AlertDescription>
          </Alert>
        )}

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="concern" 
                className="block text-gray-900 mb-3"
              >
                Your Concern
              </label>
              <Textarea
                id="concern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={6}
                placeholder="Please describe your concern or question..."
                required
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-gray-900 mb-3"
              >
                Your Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-12"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-700">
            Our support team typically responds within 24-48 hours.
          </p>
        </div>
      </main>
    </div>
  );
}