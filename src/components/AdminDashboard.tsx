import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  Search,
  UserPlus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  XCircle,
  UserCheck,
  Waves
} from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { TableActionsDropdown } from "./TableActionsDropdown";
import { AddMemberModal } from "./AddMemberModal";
import { EditMemberModal } from "./EditMemberModal";
import { ChangeRoleModal } from "./ChangeRoleModal";
import { DeleteMemberModal } from "./DeleteMemberModal";
import { FeeManagement } from "./FeeManagement";
import { AdminSettings } from "./AdminSettings";
import { SlideCarousel } from "./SlideCarousel";
import logo from "../assets/logo.png";

// Mock admin data
const mockAdminData = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Administrator"
};

const mockStats = {
  totalMembers: 248,
  newRegistrations: 12,
  activeMembers: 235,
  paidFees: "RM 37,200",
  outstandingFees: "RM 5,400",
  revenue: "RM 42,600"
};

const mockPendingRegistrations = [
  { id: 1, name: "Anita Devi", email: "anita.devi@example.com", date: "2025-11-25", phone: "+60 12-345-6789" },
  { id: 2, name: "Kumar Selvam", email: "kumar.s@example.com", date: "2025-11-26", phone: "+60 11-222-3333" },
  { id: 3, name: "Priya Nair", email: "priya.nair@example.com", date: "2025-11-27", phone: "+60 13-444-5555" },
];

const mockMembers = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh.kumar@example.com", phone: "+60 12-345-6789", membershipType: "Premium", status: "Active", joinDate: "2024-01-15", balance: "RM 0.00" },
  { id: 2, name: "Siti Abdullah", email: "siti.abdullah@example.com", phone: "+60 11-222-3333", membershipType: "Standard", status: "Active", joinDate: "2023-03-20", balance: "RM 150.00" },
  { id: 3, name: "Murugan Pillai", email: "murugan.p@example.com", phone: "+60 13-444-5555", membershipType: "Committee", status: "Active", joinDate: "2022-06-10", balance: "RM 0.00" },
  { id: 4, name: "Lakshmi Devi", email: "lakshmi.devi@example.com", phone: "+60 14-666-7777", membershipType: "Premium", status: "Active", joinDate: "2024-09-05", balance: "RM 150.00" },
  { id: 5, name: "Arjun Nair", email: "arjun.nair@example.com", phone: "+60 15-888-9999", membershipType: "Standard", status: "Inactive", joinDate: "2021-11-12", balance: "RM 300.00" },
];

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(mockMembers);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler functions
  const handleAddMember = (memberData: any) => {
    setMembers(prev => [...prev, memberData]);
  };

  const handleUpdateMember = (updatedMember: any) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleChangeRole = (memberId: number, newRole: string) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, membershipType: newRole } : m));
  };

  const handleDeleteMember = (memberId: number) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const openEditModal = (member: any) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const openChangeRoleModal = (member: any) => {
    setSelectedMember(member);
    setIsChangeRoleModalOpen(true);
  };

  const openDeleteModal = (member: any) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
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
              <h2 className="text-white">Admin Panel</h2>
              <p className="text-cyan-100 text-sm">Management</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("members")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "members"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </button>

          <button
            onClick={() => setActiveTab("registrations")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "registrations"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>Registrations</span>
              {mockPendingRegistrations.length > 0 && (
                <Badge className="bg-red-500 text-white hover:bg-red-500 px-2 py-0.5 text-xs">
                  {mockPendingRegistrations.length}
                </Badge>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveTab("fees")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "fees"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Fee Management</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "settings"
                ? "bg-white/20 text-white shadow-lg"
                : "text-cyan-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <p className="text-cyan-100 text-xs text-center">© 2025 MMS Admin</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Membership Management System</h1>
              <p className="text-sm text-gray-600">Administrator Dashboard</p>
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown
              name={mockAdminData.name}
              email={mockAdminData.email}
              role={mockAdminData.role}
              onSettingsClick={() => setActiveTab("settings")}
              onLogout={onLogout}
              avatarColors="from-cyan-600 to-teal-600"
              showSettings={true}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Slide Carousel */}
              <SlideCarousel />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Members */}
                <Card className="border-l-4 border-l-cyan-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Total Members</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                      <Users className="w-6 h-6 text-cyan-600" />
                      {mockStats.totalMembers}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>

                {/* New Registrations */}
                <Card className="border-l-4 border-l-orange-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Pending Registrations</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                      <UserPlus className="w-6 h-6 text-orange-600" />
                      {mockStats.newRegistrations}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-orange-600">Awaiting approval</p>
                  </CardContent>
                </Card>

                {/* Paid Fees */}
                <Card className="border-l-4 border-l-green-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Paid Fees (2025)</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      {mockStats.paidFees}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-600">87% collection rate</p>
                  </CardContent>
                </Card>

                {/* Outstanding Fees */}
                <Card className="border-l-4 border-l-red-500 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardDescription>Outstanding Fees</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      {mockStats.outstandingFees}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600">36 members pending</p>
                  </CardContent>
                </Card>
              </div>

              {/* Membership Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active vs Inactive */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                    <CardTitle>Membership Status</CardTitle>
                    <CardDescription>Active vs Inactive members</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-gray-700">Active Members</span>
                        </div>
                        <span className="text-gray-900">{mockStats.activeMembers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gray-400 rounded"></div>
                          <span className="text-gray-700">Inactive Members</span>
                        </div>
                        <span className="text-gray-900">{mockStats.totalMembers - mockStats.activeMembers}</span>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                            style={{ width: `${(mockStats.activeMembers / mockStats.totalMembers) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {((mockStats.activeMembers / mockStats.totalMembers) * 100).toFixed(1)}% Active Rate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Overview */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                    <CardTitle>Revenue Overview (2025)</CardTitle>
                    <CardDescription>Total membership fees collected</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Total Revenue</span>
                        <span className="text-2xl text-cyan-900">{mockStats.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-gray-700">Collected</span>
                        <span className="text-green-600">{mockStats.paidFees}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Outstanding</span>
                        <span className="text-red-600">{mockStats.outstandingFees}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and updates</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">Payment received from Rajesh Kumar</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                      <span className="text-green-600">RM 150.00</span>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <UserPlus className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">New registration: Priya Nair</p>
                        <p className="text-sm text-gray-600">5 hours ago</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">Membership updated: Siti Abdullah</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Updated</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "members" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search members by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-cyan-200 focus:border-cyan-500"
                      />
                    </div>
                    <Button variant="outline" className="border-cyan-500 text-cyan-700 hover:bg-cyan-50">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" onClick={() => setIsAddModalOpen(true)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Members Table */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                  <CardTitle>All Members ({filteredMembers.length})</CardTitle>
                  <CardDescription>Manage member profiles, roles, and status</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cyan-200">
                          <th className="text-left py-3 px-4 text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 text-gray-700">Contact</th>
                          <th className="text-left py-3 px-4 text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-gray-700">Balance</th>
                          <th className="text-right py-3 px-4 text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMembers.map((member) => (
                          <tr key={member.id} className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-500">Joined: {member.joinDate}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-gray-700 text-sm">{member.email}</p>
                                <p className="text-gray-600 text-sm">{member.phone}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge 
                                className={
                                  member.membershipType === "Premium" 
                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                    : member.membershipType === "Committee"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {member.membershipType}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <Badge 
                                className={
                                  member.status === "Active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {member.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <span className={member.balance !== "RM 0.00" ? "text-red-600" : "text-green-600"}>
                                {member.balance}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <TableActionsDropdown
                                onEdit={() => openEditModal(member)}
                                onManageFees={() => console.log(`Manage Fees for ${member.name}`)}
                                onChangeRole={() => openChangeRoleModal(member)}
                                onDelete={() => openDeleteModal(member)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No members found matching your search</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "registrations" && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardTitle>Pending Registration Approvals</CardTitle>
                <CardDescription>Review and approve new member registrations</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {mockPendingRegistrations.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No pending registrations</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockPendingRegistrations.map((registration) => (
                      <div key={registration.id} className="flex items-center justify-between p-4 bg-white border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h4 className="text-gray-900">{registration.name}</h4>
                          <p className="text-sm text-gray-600">{registration.email}</p>
                          <p className="text-sm text-gray-600">{registration.phone}</p>
                          <p className="text-xs text-gray-500 mt-1">Registered: {registration.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "fees" && (
            <FeeManagement />
          )}

          {activeTab === "settings" && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateMember}
        member={selectedMember}
      />

      <ChangeRoleModal
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        onChangeRole={handleChangeRole}
        member={selectedMember}
      />

      <DeleteMemberModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteMember}
        member={selectedMember}
      />
    </div>
  );
}