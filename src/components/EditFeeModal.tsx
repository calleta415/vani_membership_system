import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, DollarSign, Save } from "lucide-react";
import { Badge } from "./ui/badge";

interface FeeStructure {
  id: number;
  membershipType: string;
  annualFee: number;
  registrationFee: number;
  description: string;
  color: string;
  benefits: string[];
}

interface EditFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (fee: FeeStructure) => void;
  fee: FeeStructure | null;
}

export function EditFeeModal({ isOpen, onClose, onUpdate, fee }: EditFeeModalProps) {
  const [formData, setFormData] = useState({
    annualFee: 0,
    registrationFee: 0,
    description: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (fee) {
      setFormData({
        annualFee: fee.annualFee,
        registrationFee: fee.registrationFee,
        description: fee.description
      });
    }
  }, [fee]);

  if (!isOpen || !fee) return null;

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.annualFee < 0) {
      newErrors.annualFee = "Annual fee cannot be negative";
    }

    if (formData.registrationFee < 0) {
      newErrors.registrationFee = "Registration fee cannot be negative";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedFee = {
        ...fee,
        annualFee: formData.annualFee,
        registrationFee: formData.registrationFee,
        description: formData.description
      };

      onUpdate(updatedFee);
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-br ${
          fee.color === "purple" 
            ? "from-purple-600 to-purple-700" 
            : fee.color === "blue"
            ? "from-blue-600 to-blue-700"
            : "from-gray-600 to-gray-700"
        } text-white p-6 rounded-t-xl flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Edit Fee Structure</h2>
              <p className={`text-sm ${
                fee.color === "purple" ? "text-purple-100" :
                fee.color === "blue" ? "text-blue-100" : "text-gray-100"
              }`}>
                Update fees for {fee.membershipType} membership
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Membership Info Banner */}
        <div className={`${
          fee.color === "purple" ? "bg-purple-50 border-purple-200" :
          fee.color === "blue" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
        } p-4 border-b`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">{fee.membershipType} Membership</p>
              <p className="text-sm text-gray-600">Configure fee amounts and details</p>
            </div>
            <Badge className={
              fee.color === "purple"
                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                : fee.color === "blue"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }>
              {fee.membershipType}
            </Badge>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current vs New Comparison */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-600 mb-2">Current Fees</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">Annual: <span className="text-gray-900">RM {fee.annualFee}</span></p>
                <p className="text-sm text-gray-700">Registration: <span className="text-gray-900">RM {fee.registrationFee}</span></p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2">New Fees</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">Annual: <span className="text-cyan-900">RM {formData.annualFee}</span></p>
                <p className="text-sm text-gray-700">Registration: <span className="text-cyan-900">RM {formData.registrationFee}</span></p>
              </div>
            </div>
          </div>

          {/* Fee Configuration */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Fee Configuration
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Annual Fee */}
              <div>
                <Label htmlFor="edit-annual-fee" className="text-gray-700">
                  Annual Membership Fee (RM) <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">RM</span>
                  <Input
                    id="edit-annual-fee"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.annualFee}
                    onChange={(e) => handleChange("annualFee", parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`pl-12 ${errors.annualFee ? 'border-red-500' : 'border-cyan-200'}`}
                  />
                </div>
                {errors.annualFee && (
                  <p className="text-red-500 text-sm mt-1">{errors.annualFee}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Charged annually to members</p>
              </div>

              {/* Registration Fee */}
              <div>
                <Label htmlFor="edit-registration-fee" className="text-gray-700">
                  Registration Fee (RM) <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">RM</span>
                  <Input
                    id="edit-registration-fee"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.registrationFee}
                    onChange={(e) => handleChange("registrationFee", parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`pl-12 ${errors.registrationFee ? 'border-red-500' : 'border-cyan-200'}`}
                  />
                </div>
                {errors.registrationFee && (
                  <p className="text-red-500 text-sm mt-1">{errors.registrationFee}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">One-time fee for new members</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Description
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div>
              <Label htmlFor="edit-description" className="text-gray-700">
                Membership Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter membership description"
                className={`mt-1 ${errors.description ? 'border-red-500' : 'border-cyan-200'}`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Brief description of this membership tier</p>
            </div>
          </div>

          {/* Benefits Display */}
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              Included Benefits
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-200 to-transparent"></div>
            </h3>
            
            <div className={`p-4 rounded-lg border-2 ${
              fee.color === "purple" ? "border-purple-200 bg-purple-50/50" :
              fee.color === "blue" ? "border-blue-200 bg-blue-50/50" : "border-gray-200 bg-gray-50/50"
            }`}>
              <ul className="space-y-2">
                {fee.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className={`w-2 h-2 rounded-full ${
                      fee.color === "purple" ? "bg-purple-500" :
                      fee.color === "blue" ? "bg-blue-500" : "bg-gray-500"
                    }`}></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning if fees changed */}
          {(formData.annualFee !== fee.annualFee || formData.registrationFee !== fee.registrationFee) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-amber-600">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm text-amber-900">
                    <strong>Fee Change Notice</strong>
                  </p>
                  <p className="text-sm text-amber-800 mt-1">
                    Changes to fee structure will apply to all new transactions. 
                    Existing outstanding payments will retain their original amounts.
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
              className={`bg-gradient-to-r ${
                fee.color === "purple" 
                  ? "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  : fee.color === "blue"
                  ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
