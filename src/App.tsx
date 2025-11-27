import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "./components/ui/sonner";

type PageType = "login" | "register" | "forgot-password" | "user-dashboard" | "admin-dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("login");

  // Mock login handler - in real app, this would verify credentials
  const handleLogin = (email: string, isAdmin: boolean = false) => {
    if (isAdmin) {
      setCurrentPage("admin-dashboard");
    } else {
      setCurrentPage("user-dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {currentPage === "login" && (
        <LoginPage 
          onNavigateToRegister={() => setCurrentPage("register")}
          onNavigateToForgotPassword={() => setCurrentPage("forgot-password")}
          onLogin={handleLogin}
        />
      )}
      {currentPage === "register" && (
        <RegistrationPage onNavigateToLogin={() => setCurrentPage("login")} />
      )}
      {currentPage === "forgot-password" && (
        <ForgotPasswordPage onNavigateToLogin={() => setCurrentPage("login")} />
      )}
      {currentPage === "user-dashboard" && (
        <UserDashboard onLogout={handleLogout} />
      )}
      {currentPage === "admin-dashboard" && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
}