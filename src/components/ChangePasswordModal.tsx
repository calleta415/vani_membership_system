import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Badge } from "./ui/badge";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (oldPassword: string, newPassword: string) => void;
}

export function ChangePasswordModal({ isOpen, onClose, onUpdate }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Password strength calculation
  const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 4) return { score: 2, label: "Fair", color: "bg-orange-500" };
    if (score <= 5) return { score: 3, label: "Good", color: "bg-yellow-500" };
    return { score: 4, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);

  // Password requirements validation
  const passwordRequirements = [
    { met: formData.newPassword.length >= 8, text: "At least 8 characters" },
    { met: /[a-z]/.test(formData.newPassword), text: "One lowercase letter" },
    { met: /[A-Z]/.test(formData.newPassword), text: "One uppercase letter" },
    { met: /[0-9]/.test(formData.newPassword), text: "One number" },
    { met: /[^a-zA-Z0-9]/.test(formData.newPassword), text: "One special character" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!passwordRequirements.every(req => req.met)) {
      newErrors.newPassword = "Password doesn't meet all requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUpdate(formData.currentPassword, formData.newPassword);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white p-6 rounded-t-xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Change Password</h2>
              <p className="text-cyan-100 text-sm">Update your account password</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex gap-3">
            <div className="text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-900">
                <strong>Security Tip:</strong> Use a strong, unique password that you don't use for other accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Password */}
          <div>
            <Label htmlFor="current-password" className="text-gray-700">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                placeholder="Enter your current password"
                className={`pr-10 ${errors.currentPassword ? 'border-red-500' : 'border-cyan-200'}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

          {/* New Password */}
          <div>
            <Label htmlFor="new-password" className="text-gray-700">
              New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                placeholder="Enter your new password"
                className={`pr-10 ${errors.newPassword ? 'border-red-500' : 'border-cyan-200'}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.newPassword}
              </p>
            )}

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Password Strength:</span>
                  <Badge className={
                    passwordStrength.score === 4
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : passwordStrength.score === 3
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : passwordStrength.score === 2
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                    {passwordStrength.label}
                  </Badge>
                </div>
                <div className="flex gap-1 h-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.score
                          ? passwordStrength.color
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-700">Password must contain:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={req.met ? "text-green-700" : "text-gray-600"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirm-password" className="text-gray-700">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Confirm your new password"
                className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-cyan-200'}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword}
              </p>
            )}
            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
              <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>

          {/* Additional Security Info */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-cyan-600">ℹ️</div>
              <div className="flex-1">
                <p className="text-sm text-cyan-900">
                  <strong>Password Security Guidelines:</strong>
                </p>
                <ul className="text-sm text-cyan-800 mt-2 space-y-1 ml-4">
                  <li>• Avoid using personal information like your name or birthdate</li>
                  <li>• Don't reuse passwords from other accounts</li>
                  <li>• Consider using a password manager for better security</li>
                  <li>• Change your password regularly (every 3-6 months)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
