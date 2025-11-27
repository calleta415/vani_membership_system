import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { X, Users, CheckCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: string;
}

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeRole: (memberId: number, newRole: string) => void;
  member: Member | null;
}

const membershipRoles = [
  {
    value: "Standard",
    label: "Standard Member",
    description: "Basic membership with standard privileges",
    color: "gray",
    benefits: ["Access to basic facilities", "Standard voting rights", "Monthly newsletter"]
  },
  {
    value: "Premium",
    label: "Premium Member",
    description: "Enhanced membership with additional benefits",
    color: "purple",
    benefits: ["All Standard benefits", "Priority booking", "Exclusive events access", "Discounted fees"]
  },
  {
    value: "Committee",
    label: "Committee Member",
    description: "Leadership role with administrative access",
    color: "blue",
    benefits: ["All Premium benefits", "Administrative privileges", "Decision-making authority", "Committee meetings access"]
  }
];

export function ChangeRoleModal({ isOpen, onClose, onChangeRole, member }: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (member) {
      setSelectedRole(member.membershipType);
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole && selectedRole !== member.membershipType) {
      onChangeRole(member.id, selectedRole);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const hasChanged = selectedRole !== member.membershipType;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Change Membership Role</h2>
              <p className="text-purple-100 text-sm">Update member's membership type</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Info */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 border-b border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-600">{member.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Current Role</p>
              <Badge className={
                member.membershipType === "Premium" 
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  : member.membershipType === "Committee"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }>
                {member.membershipType}
              </Badge>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label className="text-gray-900 mb-4 block">
              Select New Membership Role
            </Label>
            
            <div className="space-y-4">
              {membershipRoles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    selectedRole === role.value
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedRole === role.value 
                            ? "border-purple-500 bg-purple-500" 
                            : "border-gray-300 bg-white"
                        }`}>
                          {selectedRole === role.value && (
                            <CheckCircle className="w-3 h-3 text-white fill-current" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-gray-900">{role.label}</h4>
                          {member.membershipType === role.value && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs hover:bg-blue-100 mt-1">
                              Current Role
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">{role.description}</p>
                    </div>
                    <Badge className={
                      role.color === "purple"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : role.color === "blue"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }>
                      {role.value}
                    </Badge>
                  </div>

                  {/* Benefits */}
                  <div className="ml-7 space-y-1">
                    {role.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          selectedRole === role.value ? "bg-purple-500" : "bg-gray-400"
                        }`}></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Change Warning */}
          {hasChanged && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-amber-600">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm text-amber-900">
                    <strong>Role Change Confirmation</strong>
                  </p>
                  <p className="text-sm text-amber-800 mt-1">
                    You are changing <strong>{member.name}'s</strong> membership from{" "}
                    <strong>{member.membershipType}</strong> to <strong>{selectedRole}</strong>.
                    This will update their privileges and access rights immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

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
              disabled={!hasChanged}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Users className="w-4 h-4 mr-2" />
              Update Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
