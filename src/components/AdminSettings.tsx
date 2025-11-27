import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Settings,
  Building2,
  Bell,
  CreditCard,
  Shield,
  Database,
  Save,
  CheckCircle,
  Mail,
  Globe,
  Phone,
  MapPin,
  Key,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  // Organization Settings
  const [orgSettings, setOrgSettings] = useState({
    name: "Coastal Village Association",
    email: "admin@coastalvillage.org",
    phone: "+60 12-345-6789",
    address: "123 Beach Road",
    city: "Kuala Lumpur",
    state: "Selangor",
    postalCode: "50000",
    website: "www.coastalvillage.org",
    description: "A vibrant South Indian coastal village community association dedicated to preserving our cultural heritage and fostering community development."
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    membershipRenewal: true,
    systemAlerts: true,
    newMemberRegistration: true,
    paymentReceived: true,
    overduePayments: true,
    reminderDaysBefore: "7"
  });

  // Payment Gateway Settings
  const [paymentSettings, setPaymentSettings] = useState({
    billplzEnabled: true,
    billplzApiKey: "••••••••••••••••",
    billplzCollectionId: "••••••••••",
    testMode: false,
    paymentCurrency: "MYR",
    autoPaymentReceipt: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: true,
    passwordExpiryDays: "90",
    sessionTimeout: "30",
    loginAttempts: "5",
    requireStrongPassword: true
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "365",
    systemLanguage: "en",
    dateFormat: "DD/MM/YYYY"
  });

  const handleOrgChange = (field: string, value: string) => {
    setOrgSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean | string) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: boolean | string) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | string) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field: string, value: boolean | string) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-600" />
            System Settings
          </h1>
          <p className="text-gray-600 mt-1">Configure and manage system preferences</p>
        </div>
        <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          All Systems Operational
        </Badge>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="bg-cyan-50 border border-cyan-200">
          <TabsTrigger value="organization" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
            <Building2 className="w-4 h-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Gateway
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
            <Database className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Organization Settings */}
        <TabsContent value="organization">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-600" />
                Organization Information
              </CardTitle>
              <CardDescription>Manage your organization's profile and contact details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="org-name">Organization Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="org-name"
                        value={orgSettings.name}
                        onChange={(e) => handleOrgChange("name", e.target.value)}
                        className="border-cyan-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="org-website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="org-website"
                          value={orgSettings.website}
                          onChange={(e) => handleOrgChange("website", e.target.value)}
                          className="pl-10 border-cyan-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="org-description">Description</Label>
                    <Textarea
                      id="org-description"
                      value={orgSettings.description}
                      onChange={(e) => handleOrgChange("description", e.target.value)}
                      rows={3}
                      className="border-cyan-200"
                    />
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="org-email">Email Address <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="org-email"
                          type="email"
                          value={orgSettings.email}
                          onChange={(e) => handleOrgChange("email", e.target.value)}
                          className="pl-10 border-cyan-200"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="org-phone">Phone Number <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="org-phone"
                          value={orgSettings.phone}
                          onChange={(e) => handleOrgChange("phone", e.target.value)}
                          className="pl-10 border-cyan-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Address Information
                  </h3>

                  <div>
                    <Label htmlFor="org-address">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      <Input
                        id="org-address"
                        value={orgSettings.address}
                        onChange={(e) => handleOrgChange("address", e.target.value)}
                        className="pl-10 border-cyan-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="org-city">City</Label>
                      <Input
                        id="org-city"
                        value={orgSettings.city}
                        onChange={(e) => handleOrgChange("city", e.target.value)}
                        className="border-cyan-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="org-state">State</Label>
                      <Input
                        id="org-state"
                        value={orgSettings.state}
                        onChange={(e) => handleOrgChange("state", e.target.value)}
                        className="border-cyan-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="org-postal">Postal Code</Label>
                      <Input
                        id="org-postal"
                        value={orgSettings.postalCode}
                        onChange={(e) => handleOrgChange("postalCode", e.target.value)}
                        className="border-cyan-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSaveSettings("Organization")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* General Notifications */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    General Notifications
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">System Alerts</p>
                        <p className="text-sm text-gray-600">Important system messages and updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Member & Payment Notifications */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Member & Payment Notifications
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">New Member Registration</p>
                        <p className="text-sm text-gray-600">Alert when a new member registers</p>
                      </div>
                      <Switch
                        checked={notificationSettings.newMemberRegistration}
                        onCheckedChange={(checked) => handleNotificationChange("newMemberRegistration", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Payment Received</p>
                        <p className="text-sm text-gray-600">Alert when a payment is received</p>
                      </div>
                      <Switch
                        checked={notificationSettings.paymentReceived}
                        onCheckedChange={(checked) => handleNotificationChange("paymentReceived", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Payment Reminders</p>
                        <p className="text-sm text-gray-600">Send reminders for upcoming payments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.paymentReminders}
                        onCheckedChange={(checked) => handleNotificationChange("paymentReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Overdue Payments</p>
                        <p className="text-sm text-gray-600">Alert for overdue payment notifications</p>
                      </div>
                      <Switch
                        checked={notificationSettings.overduePayments}
                        onCheckedChange={(checked) => handleNotificationChange("overduePayments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Membership Renewal</p>
                        <p className="text-sm text-gray-600">Reminders for membership renewals</p>
                      </div>
                      <Switch
                        checked={notificationSettings.membershipRenewal}
                        onCheckedChange={(checked) => handleNotificationChange("membershipRenewal", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Reminder Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Reminder Timing
                  </h3>

                  <div className="max-w-md">
                    <Label htmlFor="reminder-days">Send payment reminders (days before due date)</Label>
                    <Input
                      id="reminder-days"
                      type="number"
                      value={notificationSettings.reminderDaysBefore}
                      onChange={(e) => handleNotificationChange("reminderDaysBefore", e.target.value)}
                      className="border-cyan-200"
                    />
                    <p className="text-sm text-gray-600 mt-1">Members will receive reminders this many days before payment is due</p>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSaveSettings("Notification")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateway Settings */}
        <TabsContent value="payment">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-600" />
                Payment Gateway Configuration
              </CardTitle>
              <CardDescription>Configure Billplz payment gateway integration</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Billplz Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-cyan-100 p-2 rounded-lg">
                        <CreditCard className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">Billplz Payment Gateway</p>
                        <p className="text-sm text-gray-600">Enable Billplz for online payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.billplzEnabled}
                      onCheckedChange={(checked) => handlePaymentChange("billplzEnabled", checked)}
                    />
                  </div>

                  {paymentSettings.billplzEnabled && (
                    <div className="space-y-4 pl-4 border-l-2 border-cyan-200">
                      <div>
                        <Label htmlFor="billplz-api-key">
                          Billplz API Key <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            id="billplz-api-key"
                            type="password"
                            value={paymentSettings.billplzApiKey}
                            onChange={(e) => handlePaymentChange("billplzApiKey", e.target.value)}
                            className="pl-10 border-cyan-200"
                            placeholder="Enter your Billplz API key"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Your secret API key from Billplz dashboard</p>
                      </div>

                      <div>
                        <Label htmlFor="billplz-collection">
                          Collection ID <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="billplz-collection"
                          value={paymentSettings.billplzCollectionId}
                          onChange={(e) => handlePaymentChange("billplzCollectionId", e.target.value)}
                          className="border-cyan-200"
                          placeholder="Enter your Collection ID"
                        />
                        <p className="text-sm text-gray-600 mt-1">Collection ID for membership payments</p>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-gray-900">Test Mode</p>
                          <p className="text-sm text-gray-600">Use Billplz in sandbox/test mode</p>
                        </div>
                        <Switch
                          checked={paymentSettings.testMode}
                          onCheckedChange={(checked) => handlePaymentChange("testMode", checked)}
                        />
                      </div>

                      {paymentSettings.testMode && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <p className="text-orange-900 flex items-center gap-2">
                            <span>⚠️</span>
                            <strong>Test Mode Active</strong>
                          </p>
                          <p className="text-sm text-orange-700 mt-1">
                            Payment gateway is in test mode. No real transactions will be processed.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Payment Options */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Payment Options
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="payment-currency">Payment Currency</Label>
                      <select
                        id="payment-currency"
                        value={paymentSettings.paymentCurrency}
                        onChange={(e) => handlePaymentChange("paymentCurrency", e.target.value)}
                        className="w-full px-3 py-2 border border-cyan-200 rounded-md"
                      >
                        <option value="MYR">MYR - Malaysian Ringgit</option>
                        <option value="SGD">SGD - Singapore Dollar</option>
                        <option value="USD">USD - US Dollar</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-900">Auto Payment Receipt</p>
                      <p className="text-sm text-gray-600">Automatically send receipt after successful payment</p>
                    </div>
                    <Switch
                      checked={paymentSettings.autoPaymentReceipt}
                      onCheckedChange={(checked) => handlePaymentChange("autoPaymentReceipt", checked)}
                    />
                  </div>
                </div>

                {/* Connection Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-green-900">Connection Status: Active</p>
                      <p className="text-sm text-green-700">Payment gateway is configured and operational</p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSaveSettings("Payment Gateway")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-600" />
                Security & Access Control
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Authentication Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Authentication
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Require Strong Passwords</p>
                        <p className="text-sm text-gray-600">Enforce password complexity requirements</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireStrongPassword}
                        onCheckedChange={(checked) => handleSecurityChange("requireStrongPassword", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900">Password Expiry</p>
                        <p className="text-sm text-gray-600">Force password change after specified period</p>
                      </div>
                      <Switch
                        checked={securitySettings.passwordExpiry}
                        onCheckedChange={(checked) => handleSecurityChange("passwordExpiry", checked)}
                      />
                    </div>

                    {securitySettings.passwordExpiry && (
                      <div className="pl-4 border-l-2 border-cyan-200">
                        <Label htmlFor="password-expiry-days">Password expires after (days)</Label>
                        <Input
                          id="password-expiry-days"
                          type="number"
                          value={securitySettings.passwordExpiryDays}
                          onChange={(e) => handleSecurityChange("passwordExpiryDays", e.target.value)}
                          className="max-w-xs border-cyan-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Session & Access Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Session & Access Control
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                        className="border-cyan-200"
                      />
                      <p className="text-sm text-gray-600 mt-1">Auto logout after inactivity</p>
                    </div>

                    <div>
                      <Label htmlFor="login-attempts">Max Login Attempts</Label>
                      <Input
                        id="login-attempts"
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => handleSecurityChange("loginAttempts", e.target.value)}
                        className="border-cyan-200"
                      />
                      <p className="text-sm text-gray-600 mt-1">Lock account after failed attempts</p>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-blue-600">ℹ️</div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-900">
                        <strong>Security Best Practices:</strong>
                      </p>
                      <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4">
                        <li>• Enable two-factor authentication for all admin accounts</li>
                        <li>• Use strong, unique passwords and change them regularly</li>
                        <li>• Keep session timeouts reasonable for your use case</li>
                        <li>• Monitor failed login attempts regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSaveSettings("Security")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-600" />
                System Configuration
              </CardTitle>
              <CardDescription>Configure system-level settings and maintenance options</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Maintenance Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Maintenance
                  </h3>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-900">Maintenance Mode</p>
                      <p className="text-sm text-gray-600">Disable user access for maintenance</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleSystemChange("maintenanceMode", checked)}
                    />
                  </div>

                  {systemSettings.maintenanceMode && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-orange-900 flex items-center gap-2">
                        <span>⚠️</span>
                        <strong>Maintenance Mode Active</strong>
                      </p>
                      <p className="text-sm text-orange-700 mt-1">
                        System is in maintenance mode. Users cannot access the application.
                      </p>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Backup Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Backup & Recovery
                  </h3>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-900">Automatic Backup</p>
                      <p className="text-sm text-gray-600">Enable scheduled automatic backups</p>
                    </div>
                    <Switch
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => handleSystemChange("autoBackup", checked)}
                    />
                  </div>

                  {systemSettings.autoBackup && (
                    <div className="pl-4 border-l-2 border-cyan-200">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <select
                        id="backup-frequency"
                        value={systemSettings.backupFrequency}
                        onChange={(e) => handleSystemChange("backupFrequency", e.target.value)}
                        className="w-full max-w-xs px-3 py-2 border border-cyan-200 rounded-md"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="border-cyan-500 text-cyan-700 hover:bg-cyan-50">
                      <Database className="w-4 h-4 mr-2" />
                      Create Backup Now
                    </Button>
                    <Button variant="outline" className="border-gray-300">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Data Management */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Data Management
                  </h3>

                  <div>
                    <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                    <Input
                      id="data-retention"
                      type="number"
                      value={systemSettings.dataRetention}
                      onChange={(e) => handleSystemChange("dataRetention", e.target.value)}
                      className="max-w-xs border-cyan-200"
                    />
                    <p className="text-sm text-gray-600 mt-1">How long to keep old records before archiving</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-200 via-teal-200 to-transparent"></div>

                {/* Regional Settings */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                    Regional Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="system-language">System Language</Label>
                      <select
                        id="system-language"
                        value={systemSettings.systemLanguage}
                        onChange={(e) => handleSystemChange("systemLanguage", e.target.value)}
                        className="w-full px-3 py-2 border border-cyan-200 rounded-md"
                      >
                        <option value="en">English</option>
                        <option value="ms">Bahasa Melayu</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="date-format">Date Format</Label>
                      <select
                        id="date-format"
                        value={systemSettings.dateFormat}
                        onChange={(e) => handleSystemChange("dateFormat", e.target.value)}
                        className="w-full px-3 py-2 border border-cyan-200 rounded-md"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSaveSettings("System")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
