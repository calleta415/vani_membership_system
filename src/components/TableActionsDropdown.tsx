import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { MoreVertical, Edit, DollarSign, Users, Trash2 } from "lucide-react";

interface TableActionsDropdownProps {
  onEdit: () => void;
  onManageFees: () => void;
  onChangeRole: () => void;
  onDelete: () => void;
}

export function TableActionsDropdown({ 
  onEdit, 
  onManageFees, 
  onChangeRole, 
  onDelete 
}: TableActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    {
      icon: <Edit className="w-4 h-4" />,
      label: "Edit Profile",
      onClick: onEdit,
      variant: "default" as const
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: "Manage Fees",
      onClick: onManageFees,
      variant: "default" as const
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Change Role",
      onClick: onChangeRole,
      variant: "default" as const
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      label: "Delete Member",
      onClick: onDelete,
      variant: "danger" as const
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="w-4 h-4" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {actions.map((action, index) => (
            <div key={index}>
              {action.variant === "danger" && index > 0 && (
                <div className="h-px bg-gray-200 my-1" />
              )}
              <button
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  action.variant === "danger"
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-cyan-50"
                }`}
              >
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}