import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import moodimelloLogo from 'figma:asset/5c4f9b2859a4af18cc27091d2b6694304d9255da.png';

interface ParentLoginProps {
  onLogin: (childId: string) => void;
  onBack?: () => void;
}

export function ParentLogin({ onLogin, onBack }: ParentLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if password is correct
    if (password !== 'demo123') {
      setError('Incorrect password. Please try again.');
      return;
    }
    
    // Password is correct
    setIsLoading(true);
    setError('');
    
    // Show loading for 2 seconds before logging in
    setTimeout(() => {
      onLogin('child-1');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-4">
      {onBack && (
        <Button
          variant="ghost"
          className="absolute top-4 left-4 hover:bg-gray-200"
          onClick={onBack}
          disabled={isLoading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}
      
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden">
            <img 
              src={moodimelloLogo} 
              alt="Moodimello Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle>Moodimello</CardTitle>
          <CardDescription>
            Parent Dashboard - Sign in to view your child's progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(''); // Clear error when typing
                  }}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <p className="text-xs text-gray-500">Demo: Use any password or "demo123"</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}