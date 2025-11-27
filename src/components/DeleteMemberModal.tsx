import { Button } from "./ui/button";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: string;
  joinDate: string;
}

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (memberId: number) => void;
  member: Member | null;
}

export function DeleteMemberModal({ isOpen, onClose, onDelete, member }: DeleteMemberModalProps) {
  if (!isOpen || !member) return null;

  const handleDelete = () => {
    onDelete(member.id);
    onClose();
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Delete Member</h2>
              <p className="text-red-100 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Warning Message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900">
                  <strong>Warning: Permanent Deletion</strong>
                </p>
                <p className="text-sm text-red-800 mt-1">
                  You are about to permanently delete this member from the system. 
                  All associated data including payment history and records will be removed.
                </p>
              </div>
            </div>
          </div>

          {/* Member Info Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-2">Member to be deleted:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Name:</span>
                <span className="text-gray-900">{member.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email:</span>
                <span className="text-gray-900 text-sm">{member.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Member Type:</span>
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
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Join Date:</span>
                <span className="text-gray-900">{member.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Confirmation Checklist */}
          <div className="space-y-2">
            <p className="text-sm text-gray-900">By deleting this member, you understand that:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>All member data will be permanently removed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Payment history and transaction records will be deleted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>This action cannot be reversed or undone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>The member will lose all access to their account immediately</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Member
          </Button>
        </div>
      </div>
    </div>
  );
}
