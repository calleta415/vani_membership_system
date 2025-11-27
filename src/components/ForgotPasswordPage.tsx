import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Mail, Waves, ArrowLeft, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ForgotPasswordPage({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset logic
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1660915640605-cd09dfa6f7cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMGNvYXN0YWwlMjB2aWxsYWdlJTIwc2VhfGVufDF8fHx8MTc2NDIwOTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Coastal Village Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/70 via-blue-900/60 to-teal-900/70"></div>
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500 rounded-3xl mb-4 shadow-2xl border-4 border-white/20">
            <Waves className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white mb-2 drop-shadow-lg">Reset Your Password</h1>
          <p className="text-cyan-100 drop-shadow-md">We'll send you instructions to reset it</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-cyan-900">Forgot Password?</CardTitle>
            <CardDescription className="text-cyan-700">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a reset link"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 shadow-xl text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  size="lg"
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Reset instructions sent to:
                  </p>
                  <p className="text-cyan-700">{email}</p>
                </div>
                <p className="text-sm text-gray-600">
                  If you don't see the email, check your spam folder
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={onNavigateToLogin}
              className="w-full border-2 border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/90 drop-shadow-lg">
          <p>© 2025 Membership Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
