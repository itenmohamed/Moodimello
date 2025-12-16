import { HelpCircle, Mail } from "lucide-react";

interface FooterProps {
  onFAQClick: () => void;
  onContactClick: () => void;
}

export function Footer({ onFAQClick, onContactClick }: FooterProps) {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-600">
              © 2025 Moodimello. All rights reserved.
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex gap-8">
            <button
              onClick={onFAQClick}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>FAQs</span>
            </button>
            <button
              onClick={onContactClick}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
