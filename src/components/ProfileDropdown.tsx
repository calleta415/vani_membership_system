import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";

interface ProfileDropdownProps {
  name: string;
  email: string;
  role: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout: () => void;
  avatarColors?: string;
  showSettings?: boolean;
}

export function ProfileDropdown({
  name,
  email,
  role,
  onProfileClick,
  onSettingsClick,
  onLogout,
  avatarColors = "from-cyan-400 to-teal-500",
  showSettings = false
}: ProfileDropdownProps) {
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

  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        className="flex items-center gap-3 hover:bg-cyan-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="w-10 h-10 border-2 border-cyan-200">
          <AvatarFallback className={`bg-gradient-to-br ${avatarColors} text-white`}>
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-left hidden md:block">
          <p className="text-sm text-gray-900">{name}</p>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-900">{name}</p>
            <p className="text-xs text-gray-600">{email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {onProfileClick && (
              <button
                onClick={() => {
                  onProfileClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-cyan-50 transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                My Profile
              </button>
            )}

            {showSettings && onSettingsClick && (
              <button
                onClick={() => {
                  onSettingsClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-cyan-50 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            )}
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-200 my-1" />

          {/* Logout */}
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
