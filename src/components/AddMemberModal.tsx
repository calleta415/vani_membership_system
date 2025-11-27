import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, UserPlus } from "lucide-react";
import { Badge } from "./ui/badge";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (memberData: any) => void;
}

export function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "Standard",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
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
      const newMember = {
        id: Date.now(), // Generate temporary ID
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        membershipType: formData.membershipType,
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        balance: "RM 0.00",
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      };

      onAdd(newMember);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        membershipType: "Standard",
        address: "",
        emergencyContact: "",
        emergencyPhone: ""
      });
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-cyan-600 to-teal-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Add New Member</h2>
              <p className="text-cyan-100 text-sm">Enter member details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Personal Information
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className={`mt-1 ${errors.name ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="member@example.com"
                  className={`mt-1 ${errors.email ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+60 12-345-6789"
                  className={`mt-1 ${errors.phone ? 'border-red-500' : 'border-cyan-200'}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-gray-700">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter residential address"
                  className="mt-1 border-cyan-200"
                />
              </div>
            </div>
          </div>

          {/* Membership Type */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Membership Details
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div>
              <Label className="text-gray-700 mb-3 block">
                Membership Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-3">
                {["Standard", "Premium", "Committee"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange("membershipType", type)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      formData.membershipType === type
                        ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-cyan-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        formData.membershipType === type ? "bg-cyan-500" : "bg-gray-300"
                      }`}></div>
                      {type}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Emergency Contact
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact" className="text-gray-700">
                  Contact Name
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact name"
                  className="mt-1 border-cyan-200"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone" className="text-gray-700">
                  Contact Phone
                </Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                  placeholder="+60 12-345-6789"
                  className="mt-1 border-cyan-200"
                />
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
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
