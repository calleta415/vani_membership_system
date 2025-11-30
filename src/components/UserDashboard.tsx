import { useState } from "react";
import { 
  Waves, 
  LogOut, 
  User, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock,
  DollarSign,
  AlertCircle,
  LayoutDashboard,
  History,
  ChevronDown,
  Lock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ProfileDropdown } from "./ProfileDropdown";
import { EditProfileModal } from "./EditProfileModal";
import { ViewReceiptModal } from "./ViewReceiptModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { SlideCarousel } from "./SlideCarousel";
import logo from "../assets/logo.png";

// Mock user data
const mockUserData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+60 12-345-6789",
  membershipStatus: "Active",
  membershipType: "Premium",
  joinDate: "January 15, 2024",
  nextPaymentDue: "January 15, 2026",
  nextPaymentAmount: "RM 150.00"
};

const mockPaymentHistory = [
  { id: 1, date: "2025-01-15", amount: "RM 150.00", status: "Paid", invoice: "INV-2025-001" },
  { id: 2, date: "2024-01-15", amount: "RM 150.00", status: "Paid", invoice: "INV-2024-001" },
  { id: 3, date: "2023-01-15", amount: "RM 150.00", status: "Paid", invoice: "INV-2023-001" },
];

const mockOutstandingFees = [
  { id: 4, date: "2026-01-15", amount: "RM 150.00", status: "Outstanding", invoice: "INV-2026-001", dueDate: "2026-01-31" },
];

export function UserDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isViewReceiptModalOpen, setIsViewReceiptModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [userProfile, setUserProfile] = useState({
    name: mockUserData.name,
    email: mockUserData.email,
    phone: mockUserData.phone,
    membershipStatus: mockUserData.membershipStatus,
    membershipType: mockUserData.membershipType,
    joinDate: mockUserData.joinDate,
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const handleUpdateProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
  };

  const handleViewReceipt = (payment: any) => {
    setSelectedReceipt(payment);
    setIsViewReceiptModalOpen(true);
  };

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // In a real app, this would call an API to change the password
    console.log("Password change requested");
    alert("Password updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-700 via-blue-700 to-teal-700 shadow-2xl flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl">
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <h2 className="text-white">Member Portal</h2>
              <p className="text-cyan-100 text-sm">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "dashboard"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "payments"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <History className="w-5 h-5" />
            <span>Payment History</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <p className="text-cyan-100 text-xs text-center">© 2025 MMS</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Welcome back, {mockUserData.name}</h1>
              <p className="text-sm text-gray-600">Manage your membership and payments</p>
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown
              name={mockUserData.name}
              email={mockUserData.email}
              role={mockUserData.membershipType}
              onProfileClick={() => setActiveTab("profile")}
              onLogout={onLogout}
              avatarColors="from-cyan-400 to-teal-500"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Slide Carousel */}
              <SlideCarousel />

              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Membership Status */}
                <Card className="border-l-4 border-l-green-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Membership Status</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {mockUserData.membershipStatus}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {mockUserData.membershipType}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Next Payment */}
                <Card className="border-l-4 border-l-orange-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Next Payment Due</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      {mockUserData.nextPaymentDue}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-orange-700">{mockUserData.nextPaymentAmount}</p>
                  </CardContent>
                </Card>

                {/* Member Since */}
                <Card className="border-l-4 border-l-cyan-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Member Since</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-cyan-600" />
                      {mockUserData.joinDate}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cyan-700">2 years of membership</p>
                  </CardContent>
                </Card>
              </div>

              {/* Outstanding Fees Alert */}
              {mockOutstandingFees.length > 0 && (
                <Card className="border-l-4 border-l-red-500 shadow-lg bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-900">
                      <AlertCircle className="w-5 h-5" />
                      Outstanding Payment
                    </CardTitle>
                    <CardDescription className="text-red-700">
                      You have pending payment(s) that require attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockOutstandingFees.map((fee) => (
                      <div key={fee.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div>
                          <p className="text-gray-900">{fee.amount}</p>
                          <p className="text-sm text-gray-600">Due: {fee.dueDate}</p>
                        </div>
                        <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                          Pay Now
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest membership activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPaymentHistory.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-900">Payment Received</p>
                            <p className="text-sm text-gray-600">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900">{payment.amount}</p>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 border-4 border-cyan-200">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-500 text-white text-2xl">
                        {mockUserData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-gray-900">{mockUserData.name}</h3>
                      <p className="text-cyan-700">{mockUserData.membershipType} Member</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Email Address</label>
                      <p className="text-gray-900">{mockUserData.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Phone Number</label>
                      <p className="text-gray-900">{mockUserData.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Membership Type</label>
                      <p className="text-gray-900">{mockUserData.membershipType}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Join Date</label>
                      <p className="text-gray-900">{mockUserData.joinDate}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" onClick={() => setIsEditProfileModalOpen(true)}>
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="border-cyan-500 text-cyan-700 hover:bg-cyan-50" onClick={() => setIsChangePasswordModalOpen(true)}>
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              {/* Outstanding Fees Section */}
              {mockOutstandingFees.length > 0 && (
                <Card className="shadow-lg border-l-4 border-l-red-500">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="text-red-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Outstanding Fees
                    </CardTitle>
                    <CardDescription className="text-red-700">
                      Please settle these payments by the due date
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {mockOutstandingFees.map((fee) => (
                        <div key={fee.id} className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="w-4 h-4 text-red-600" />
                              <p className="text-gray-900">{fee.amount}</p>
                            </div>
                            <p className="text-sm text-gray-600">Invoice: {fee.invoice}</p>
                            <p className="text-sm text-red-600">Due Date: {fee.dueDate}</p>
                          </div>
                          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay via Billplz
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment History Section */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Your complete payment records</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cyan-200">
                          <th className="text-left py-3 px-4 text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-gray-700">Invoice</th>
                          <th className="text-left py-3 px-4 text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 text-gray-700">Status</th>
                          <th className="text-right py-3 px-4 text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockPaymentHistory.map((payment) => (
                          <tr key={payment.id} className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors">
                            <td className="py-4 px-4 text-gray-900">{payment.date}</td>
                            <td className="py-4 px-4 text-gray-600">{payment.invoice}</td>
                            <td className="py-4 px-4 text-gray-900">{payment.amount}</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-700 hover:bg-cyan-50" onClick={() => handleViewReceipt(payment)}>
                                View Receipt
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 pt-6 border-t border-cyan-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Total Payments Made</p>
                        <p className="text-cyan-900 text-2xl">RM 450.00</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Outstanding Balance</p>
                        <p className="text-orange-600 text-2xl">RM 150.00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onUpdate={handleUpdateProfile}
        profile={userProfile}
      />

      {/* View Receipt Modal */}
      <ViewReceiptModal
        isOpen={isViewReceiptModalOpen}
        onClose={() => setIsViewReceiptModalOpen(false)}
        receipt={selectedReceipt}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onUpdate={handleChangePassword}
      />
    </div>
  );
}