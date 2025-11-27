import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  DollarSign,
  Edit,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Send,
  FileText,
  Calendar
} from "lucide-react";
import { EditFeeModal } from "./EditFeeModal";

interface FeeStructure {
  id: number;
  membershipType: string;
  annualFee: number;
  registrationFee: number;
  description: string;
  color: string;
  benefits: string[];
}

interface OutstandingPayment {
  id: number;
  memberId: number;
  memberName: string;
  email: string;
  membershipType: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  lastReminder: string;
}

const mockFeeStructure: FeeStructure[] = [
  {
    id: 1,
    membershipType: "Standard",
    annualFee: 150,
    registrationFee: 50,
    description: "Basic membership with standard access",
    color: "gray",
    benefits: ["Access to basic facilities", "Monthly newsletter", "Community events"]
  },
  {
    id: 2,
    membershipType: "Premium",
    annualFee: 300,
    registrationFee: 75,
    description: "Enhanced membership with premium benefits",
    color: "purple",
    benefits: ["All Standard benefits", "Priority booking", "Exclusive events", "20% discount on programs"]
  },
  {
    id: 3,
    membershipType: "Committee",
    annualFee: 100,
    registrationFee: 0,
    description: "Leadership membership for committee members",
    color: "blue",
    benefits: ["All Premium benefits", "Administrative access", "Voting rights", "Committee meetings"]
  }
];

const mockOutstandingPayments: OutstandingPayment[] = [
  {
    id: 1,
    memberId: 2,
    memberName: "Siti Abdullah",
    email: "siti.abdullah@example.com",
    membershipType: "Standard",
    amount: 150,
    dueDate: "2025-01-15",
    daysOverdue: 12,
    lastReminder: "2025-11-20"
  },
  {
    id: 2,
    memberId: 4,
    memberName: "Lakshmi Devi",
    email: "lakshmi.devi@example.com",
    membershipType: "Premium",
    amount: 150,
    dueDate: "2025-02-01",
    daysOverdue: 0,
    lastReminder: "Never"
  },
  {
    id: 3,
    memberId: 5,
    memberName: "Arjun Nair",
    email: "arjun.nair@example.com",
    membershipType: "Standard",
    amount: 300,
    dueDate: "2024-11-01",
    daysOverdue: 26,
    lastReminder: "2025-11-15"
  }
];

const mockPaymentStats = {
  totalCollected: 37200,
  totalOutstanding: 5400,
  thisMonth: 4500,
  onTimePayments: 87,
  latePayments: 13
};

export function FeeManagement() {
  const [feeStructure, setFeeStructure] = useState(mockFeeStructure);
  const [outstandingPayments, setOutstandingPayments] = useState(mockOutstandingPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const [isEditFeeModalOpen, setIsEditFeeModalOpen] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  const filteredPayments = outstandingPayments.filter(payment =>
    payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditFee = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setIsEditFeeModalOpen(true);
  };

  const handleUpdateFee = (updatedFee: FeeStructure) => {
    setFeeStructure(prev => prev.map(f => f.id === updatedFee.id ? updatedFee : f));
  };

  const handleSendReminder = (paymentId: number) => {
    console.log(`Sending reminder for payment ${paymentId}`);
    // Update last reminder date
    setOutstandingPayments(prev => prev.map(p => 
      p.id === paymentId ? { ...p, lastReminder: new Date().toISOString().split('T')[0] } : p
    ));
  };

  const handleSendBulkReminders = () => {
    if (selectedPayments.length > 0) {
      console.log(`Sending reminders to ${selectedPayments.length} members`);
      const today = new Date().toISOString().split('T')[0];
      setOutstandingPayments(prev => prev.map(p => 
        selectedPayments.includes(p.id) ? { ...p, lastReminder: today } : p
      ));
      setSelectedPayments([]);
    }
  };

  const togglePaymentSelection = (paymentId: number) => {
    setSelectedPayments(prev =>
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map(p => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription>Total Collected (2025)</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
              RM {mockPaymentStats.totalCollected.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12% from last year
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription>Outstanding Fees</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
              RM {mockPaymentStats.totalOutstanding.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600">
              {outstandingPayments.length} members pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="w-6 h-6 text-cyan-600" />
              RM {mockPaymentStats.thisMonth.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-cyan-600">42 payments received</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription>Payment Rate</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              {mockPaymentStats.onTimePayments}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-600">On-time payment rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure Configuration */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
          <CardTitle>Fee Structure Configuration</CardTitle>
          <CardDescription>Manage membership fees for different member types</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feeStructure.map((fee) => (
              <div
                key={fee.id}
                className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                  fee.color === "purple"
                    ? "border-purple-200 bg-purple-50/50"
                    : fee.color === "blue"
                    ? "border-blue-200 bg-blue-50/50"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{fee.membershipType}</h3>
                    <p className="text-sm text-gray-600">{fee.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditFee(fee)}
                    className="hover:bg-white/80"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Annual Fee:</span>
                    <span className="text-gray-900">RM {fee.annualFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Registration Fee:</span>
                    <span className="text-gray-900">RM {fee.registrationFee}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Benefits included:</p>
                  <ul className="space-y-1">
                    {fee.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-xs text-gray-700 flex items-start gap-1">
                        <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                          fee.color === "purple" ? "bg-purple-500" :
                          fee.color === "blue" ? "bg-blue-500" : "bg-gray-500"
                        }`}></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Payments */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Members with pending fee payments</CardDescription>
            </div>
            {selectedPayments.length > 0 && (
              <Button
                onClick={handleSendBulkReminders}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Send {selectedPayments.length} Reminder{selectedPayments.length > 1 ? 's' : ''}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by member name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-cyan-200 focus:border-cyan-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-200">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700">Member</th>
                  <th className="text-left py-3 px-4 text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">Last Reminder</th>
                  <th className="text-right py-3 px-4 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => togglePaymentSelection(payment.id)}
                        className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-gray-900">{payment.memberName}</p>
                        <p className="text-sm text-gray-500">{payment.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          payment.membershipType === "Premium"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : payment.membershipType === "Committee"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {payment.membershipType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">RM {payment.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Calendar className="w-4 h-4" />
                        {payment.dueDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {payment.daysOverdue > 0 ? (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {payment.daysOverdue} days overdue
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{payment.lastReminder}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendReminder(payment.id)}
                        className="border-cyan-500 text-cyan-700 hover:bg-cyan-50"
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Remind
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {searchTerm ? "No payments found matching your search" : "No outstanding payments"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
            <CardTitle>Payment Breakdown</CardTitle>
            <CardDescription>By membership type</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Premium Members</span>
                </div>
                <span className="text-gray-900">RM 18,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-700">Standard Members</span>
                </div>
                <span className="text-gray-900">RM 15,750</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Committee Members</span>
                </div>
                <span className="text-gray-900">RM 3,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common fee management tasks</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                <FileText className="w-4 h-4 mr-2" />
                Generate Payment Report
              </Button>
              <Button variant="outline" className="w-full justify-start border-cyan-500 text-cyan-700 hover:bg-cyan-50">
                <Send className="w-4 h-4 mr-2" />
                Send All Reminders
              </Button>
              <Button variant="outline" className="w-full justify-start border-cyan-500 text-cyan-700 hover:bg-cyan-50">
                <Calendar className="w-4 h-4 mr-2" />
                View Payment Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Fee Modal */}
      <EditFeeModal
        isOpen={isEditFeeModalOpen}
        onClose={() => setIsEditFeeModalOpen(false)}
        onUpdate={handleUpdateFee}
        fee={selectedFee}
      />
    </div>
  );
}
