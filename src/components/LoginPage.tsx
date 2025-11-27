import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Lock, Mail, Waves } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onLogin: (email: string, isAdmin: boolean) => void;
}

export function LoginPage({ onNavigateToRegister, onNavigateToForgotPassword, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - check if admin
    const isAdmin = email.toLowerCase().includes("admin");
    onLogin(email, isAdmin);
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
          <h1 className="text-white mb-2 drop-shadow-lg">Membership Management System</h1>
          <p className="text-cyan-100 drop-shadow-md">Sign in to access your account</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-cyan-900">Welcome Back</CardTitle>
            <CardDescription className="text-cyan-700">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a
                  href="#forgot-password"
                  className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
                  onClick={onNavigateToForgotPassword}
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 shadow-xl text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                size="lg"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-b-lg">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700">New to the platform?</span>
              </div>
            </div>
            <a
              href="#register"
              className="w-full text-center"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border-2 border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                size="lg"
                onClick={onNavigateToRegister}
              >
                Register New Account
              </Button>
            </a>
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