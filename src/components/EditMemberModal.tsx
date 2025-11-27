import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, Edit } from "lucide-react";
import { Badge } from "./ui/badge";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  status: string;
  joinDate: string;
  balance: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (memberData: Member) => void;
  member: Member | null;
}

export function EditMemberModal({ isOpen, onClose, onUpdate, member }: EditMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        address: member.address || "",
        emergencyContact: member.emergencyContact || "",
        emergencyPhone: member.emergencyPhone || ""
      });
    }
  }, [member]);

  if (!isOpen || !member) return null;

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
      const updatedMember = {
        ...member,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      };

      onUpdate(updatedMember);
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
        <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Edit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Edit Member Profile</h2>
              <p className="text-blue-100 text-sm">Update member information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Info Banner */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border-b border-cyan-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Member ID: #{member.id}</p>
              <p className="text-sm text-gray-600">Joined: {member.joinDate}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={
                member.membershipType === "Premium" 
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  : member.membershipType === "Committee"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }>
                {member.membershipType}
              </Badge>
              <Badge className={
                member.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }>
                {member.status}
              </Badge>
            </div>
          </div>
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
                <Label htmlFor="edit-name" className="text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
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
                <Label htmlFor="edit-email" className="text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-email"
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
                <Label htmlFor="edit-phone" className="text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-phone"
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
                <Label htmlFor="edit-address" className="text-gray-700">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter residential address"
                  className="mt-1 border-cyan-200"
                />
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
                <Label htmlFor="edit-emergencyContact" className="text-gray-700">
                  Contact Name
                </Label>
                <Input
                  id="edit-emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact name"
                  className="mt-1 border-cyan-200"
                />
              </div>

              <div>
                <Label htmlFor="edit-emergencyPhone" className="text-gray-700">
                  Contact Phone
                </Label>
                <Input
                  id="edit-emergencyPhone"
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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
