import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, User, Save, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  membershipType: string;
  membershipStatus: string;
  joinDate: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (profile: UserProfile) => void;
  profile: UserProfile | null;
}

export function EditProfileModal({ isOpen, onClose, onUpdate, profile }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        postalCode: profile.postalCode || ""
      });
    }
  }, [profile]);

  if (!isOpen || !profile) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedProfile = {
        ...profile,
        ...formData
      };

      onUpdate(updatedProfile);
      setErrors({});
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white p-6 rounded-t-xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Edit Profile</h2>
              <p className="text-cyan-100 text-sm">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Membership Info Banner */}
        <div className="bg-cyan-50 p-4 border-b border-cyan-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Membership Information</p>
              <p className="text-sm text-gray-600">Member since {profile.joinDate}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={
                profile.membershipType === "Premium"
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  : profile.membershipType === "Committee"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }>
                {profile.membershipType}
              </Badge>
              <Badge className={
                profile.membershipStatus === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }>
                {profile.membershipStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-600" />
              Personal Information
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
                <Label htmlFor="edit-name" className="text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`mt-1 ${errors.name ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="edit-email" className="text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={`mt-1 ${errors.email ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="edit-phone" className="text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-600" />
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+60 12-345-6789"
                  className={`mt-1 ${errors.phone ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              Address Information
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Street Address */}
              <div className="md:col-span-2">
                <Label htmlFor="edit-address" className="text-gray-700">
                  Street Address
                </Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your street address"
                  className="mt-1 border-cyan-200"
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="edit-city" className="text-gray-700">
                  City
                </Label>
                <Input
                  id="edit-city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Enter your city"
                  className="mt-1 border-cyan-200"
                />
              </div>

              {/* State */}
              <div>
                <Label htmlFor="edit-state" className="text-gray-700">
                  State
                </Label>
                <Input
                  id="edit-state"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Enter your state"
                  className="mt-1 border-cyan-200"
                />
              </div>

              {/* Postal Code */}
              <div>
                <Label htmlFor="edit-postal" className="text-gray-700">
                  Postal Code
                </Label>
                <Input
                  id="edit-postal"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  placeholder="Enter postal code"
                  className="mt-1 border-cyan-200"
                />
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-blue-600">ℹ️</div>
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Profile Update Notice</strong>
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Your membership type and status can only be updated by an administrator. 
                  Please contact support if you need to change your membership plan.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
