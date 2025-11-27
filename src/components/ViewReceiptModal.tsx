import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, FileText, Download, Printer, CheckCircle, Calendar, CreditCard, User, MapPin } from "lucide-react";

interface PaymentReceipt {
  id: number;
  date: string;
  amount: string;
  status: string;
  invoice: string;
  paymentMethod?: string;
  transactionId?: string;
  memberName?: string;
  memberEmail?: string;
  membershipType?: string;
  description?: string;
}

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: PaymentReceipt | null;
}

export function ViewReceiptModal({ isOpen, onClose, receipt }: ViewReceiptModalProps) {
  if (!isOpen || !receipt) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading receipt:", receipt.invoice);
    alert("Receipt download will be implemented with PDF generation");
  };

  // Get current date for receipt generation
  const currentDate = new Date().toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header - No Print */}
        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white p-6 rounded-t-xl flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Payment Receipt</h2>
              <p className="text-cyan-100 text-sm">Invoice #{receipt.invoice}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-8 space-y-6">
          {/* Organization Header */}
          <div className="text-center border-b-2 border-cyan-600 pb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-3 rounded-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl text-gray-900">Coastal Village Membership</h1>
            <p className="text-gray-600 text-sm mt-1">South Indian Coastal Community</p>
            <p className="text-gray-600 text-sm">123 Ocean Drive, Coastal Town, MY 12345</p>
            <p className="text-gray-600 text-sm">Tel: +60 3-1234-5678 | Email: info@coastalvillage.com</p>
          </div>

          {/* Receipt Title & Status */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl text-gray-900">OFFICIAL RECEIPT</h2>
              <p className="text-gray-600 mt-1">Receipt Number: <span className="text-cyan-900">{receipt.invoice}</span></p>
              <p className="text-gray-600">Generated: {currentDate}</p>
            </div>
            <Badge className={
              receipt.status === "Paid"
                ? "bg-green-100 text-green-800 hover:bg-green-100 px-4 py-2"
                : "bg-amber-100 text-amber-800 hover:bg-amber-100 px-4 py-2"
            }>
              <CheckCircle className="w-4 h-4 mr-1" />
              {receipt.status}
            </Badge>
          </div>

          {/* Member Information */}
          <div className="bg-cyan-50 rounded-lg p-5 border-l-4 border-cyan-500">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-600" />
              Member Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Name:</p>
                <p className="text-gray-900">{receipt.memberName || "Rajesh Kumar"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="text-gray-900">{receipt.memberEmail || "rajesh.kumar@example.com"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Membership Type:</p>
                <Badge className={
                  (receipt.membershipType || "Premium") === "Premium"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                    : (receipt.membershipType || "Premium") === "Committee"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }>
                  {receipt.membershipType || "Premium"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b">
              <h3 className="text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-600" />
                Payment Details
              </h3>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-gray-700">Description</th>
                    <th className="text-center py-3 px-2 text-gray-700">Period</th>
                    <th className="text-right py-3 px-2 text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-2">
                      <p className="text-gray-900">Annual Membership Fee</p>
                      <p className="text-sm text-gray-600">{receipt.description || "Premium Membership - 2025"}</p>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                        <Calendar className="w-4 h-4" />
                        {new Date(receipt.date).getFullYear()}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900">
                      {receipt.amount}
                    </td>
                  </tr>
                  
                  {/* Subtotal */}
                  <tr className="border-b">
                    <td colSpan={2} className="py-3 px-2 text-right text-gray-700">
                      Subtotal:
                    </td>
                    <td className="py-3 px-2 text-right text-gray-900">
                      {receipt.amount}
                    </td>
                  </tr>
                  
                  {/* Tax (if applicable) */}
                  <tr className="border-b">
                    <td colSpan={2} className="py-3 px-2 text-right text-gray-700">
                      Tax (0%):
                    </td>
                    <td className="py-3 px-2 text-right text-gray-900">
                      RM 0.00
                    </td>
                  </tr>
                  
                  {/* Total */}
                  <tr className="bg-cyan-50">
                    <td colSpan={2} className="py-4 px-2 text-right text-gray-900">
                      <strong>Total Amount:</strong>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <strong className="text-xl text-cyan-900">{receipt.amount}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-5">
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Date:</p>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-600" />
                {new Date(receipt.date).toLocaleDateString('en-MY', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Method:</p>
              <p className="text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-600" />
                {receipt.paymentMethod || "Billplz Gateway"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Transaction ID:</p>
              <p className="text-gray-900 font-mono text-sm">
                {receipt.transactionId || `TXN-${receipt.id.toString().padStart(8, '0')}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Status:</p>
              <Badge className={
                receipt.status === "Paid"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-100"
              }>
                {receipt.status}
              </Badge>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm text-gray-600 mb-2"><strong>Notes:</strong></p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• This is an official receipt for your membership payment</li>
              <li>• Please retain this receipt for your records</li>
              <li>• For inquiries, contact us at finance@coastalvillage.com</li>
              <li>• Membership benefits are active for the paid period</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-cyan-600 pt-5 text-center">
            <p className="text-sm text-gray-600">
              Thank you for being a valued member of our coastal community!
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This is a computer-generated receipt and does not require a signature.
            </p>
          </div>
        </div>

        {/* Action Buttons - No Print */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl print:hidden">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-300"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="border-cyan-500 text-cyan-700 hover:bg-cyan-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
