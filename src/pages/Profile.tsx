import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Edit, Phone, Mail, MapPin, CreditCard, Shield, Key, Settings,
  Camera, Save, User, LogOut, HelpCircle, Bell, ChevronRight, ChevronDown,
  ShieldCheck, Lock, Eye, EyeOff, Calendar, FileText, Download, Upload,
  Globe, MessageCircle, AlertTriangle, CheckCircle, XCircle, Smartphone,
  CreditCard as CardsIcon, BanknoteIcon, LanguagesIcon, Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    address: '456 Park Street, Mumbai, 400001',
    dob: '15/06/1990',
    occupation: 'Software Engineer',
    panCard: 'ABCDE1234F',
    aadhar: '1234-5678-9012',
    customerID: 'PSB0012345',
    accountNumber: 'XXXX XXXX 1234',
    ifscCode: 'PSIB0000123',
    branch: 'Main Branch, Mumbai',
    accountType: 'Savings Account',
    kycStatus: 'verified',
    riskProfile: 'Moderate'
  });

  const [securitySettings, setSecuritySettings] = useState({
    biometricLogin: true,
    transactionAlerts: true,
    marketingEmails: false,
    appNotifications: true,
    twoFactorAuth: true
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    theme: 'System Default',
    currency: 'INR',
    statementFormat: 'PDF'
  });

  const toggleSensitiveInfo = () => {
    setShowSensitiveInfo(!showSensitiveInfo);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
      className: "bg-blue-50 border-blue-200 text-blue-800"
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  const handleSecurityChange = (setting: string, value: boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: value
    });
    
    toast({
      title: "Setting Updated",
      description: `Security setting has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const personalInfoItems = [
    { label: 'Full Name', value: profileData.name, key: 'name', editable: true, icon: User },
    { label: 'Email Address', value: profileData.email, key: 'email', editable: true, icon: Mail, verified: true },
    { label: 'Phone Number', value: profileData.phone, key: 'phone', editable: true, icon: Phone, verified: true },
    { label: 'Date of Birth', value: profileData.dob, key: 'dob', editable: false, icon: Calendar },
    { label: 'Occupation', value: profileData.occupation, key: 'occupation', editable: true, icon: User },
    { label: 'Address', value: profileData.address, key: 'address', editable: true, icon: MapPin }
  ];

  const accountInfoItems = [
    { label: 'Customer ID', value: profileData.customerID, key: 'customerID', editable: false },
    { label: 'Account Number', value: showSensitiveInfo ? '1234 5678 9012 3456' : 'XXXX XXXX XXXX 3456', key: 'accountNumber', sensitive: true },
    { label: 'Account Type', value: profileData.accountType, key: 'accountType', editable: false },
    { label: 'IFSC Code', value: profileData.ifscCode, key: 'ifscCode', editable: false },
    { label: 'Branch', value: profileData.branch, key: 'branch', editable: false },
    { label: 'PAN Card', value: profileData.panCard, key: 'panCard', editable: false },
    { label: 'Aadhar Number', value: showSensitiveInfo ? profileData.aadhar : 'XXXX-XXXX-9012', key: 'aadhar', sensitive: true }
  ];

  const securityItems = [
    { 
      label: 'Biometric Login', 
      description: 'Use fingerprint or face recognition to login',
      value: securitySettings.biometricLogin, 
      action: () => handleSecurityChange('biometricLogin', !securitySettings.biometricLogin),
      icon: Smartphone
    },
    { 
      label: 'Two-Factor Authentication', 
      description: 'Extra security layer for your account',
      value: securitySettings.twoFactorAuth, 
      action: () => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth),
      icon: Shield
    },
    { 
      label: 'Transaction Alerts', 
      description: 'Get notified for all transactions',
      value: securitySettings.transactionAlerts, 
      action: () => handleSecurityChange('transactionAlerts', !securitySettings.transactionAlerts),
      icon: Bell
    },
    { 
      label: 'App Notifications', 
      description: 'Receive app notifications',
      value: securitySettings.appNotifications, 
      action: () => handleSecurityChange('appNotifications', !securitySettings.appNotifications),
      icon: Bell
    },
    { 
      label: 'Marketing Emails', 
      description: 'Receive promotional emails',
      value: securitySettings.marketingEmails, 
      action: () => handleSecurityChange('marketingEmails', !securitySettings.marketingEmails),
      icon: Mail
    }
  ];

  const preferenceItems = [
    {
      label: 'Language',
      value: preferences.language,
      options: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu'],
      key: 'language',
      icon: LanguagesIcon
    },
    {
      label: 'Theme',
      value: preferences.theme,
      options: ['System Default', 'Light', 'Dark'],
      key: 'theme',
      icon: Palette
    },
    {
      label: 'Currency',
      value: preferences.currency,
      options: ['INR', 'USD', 'EUR', 'GBP'],
      key: 'currency',
      icon: BanknoteIcon
    },
    {
      label: 'Statement Format',
      value: preferences.statementFormat,
      options: ['PDF', 'Excel', 'CSV'],
      key: 'statementFormat',
      icon: FileText
    }
  ];

  const supportItems = [
    { label: 'Contact Support', action: () => navigate('/support'), icon: Phone },
    { label: 'FAQs', action: () => navigate('/faqs'), icon: HelpCircle },
    { label: 'Report an Issue', action: () => navigate('/report-issue'), icon: AlertTriangle }
  ];

  const legalItems = [
    { label: 'Terms & Conditions', action: () => navigate('/terms'), icon: FileText },
    { label: 'Privacy Policy', action: () => navigate('/privacy'), icon: Shield },
    { label: 'Data Consent Settings', action: () => navigate('/consent'), icon: CheckCircle }
  ];

  return (
    <BankingLayout showHeader={false}>
      <div className="min-h-screen bg-gray-50 pb-40">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 ml-2">My Profile</h1>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    className="rounded-full bg-primary hover:bg-primary/90"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="rounded-full p-2 hover:bg-gray-100"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-5 w-5 text-gray-600" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6 pt-4">
          {/* Profile Header */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="icon" 
                        className="absolute -bottom-1 -right-1 rounded-full p-1 h-8 w-8 bg-white shadow-md hover:bg-gray-100 border"
                      >
                        <Camera className="h-4 w-4 text-gray-700" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs py-1">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs py-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{profileData.occupation}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full p-2 border-gray-200 hover:border-gray-300 bg-white/80"
                  onClick={() => navigate('/qr-code')}
                >
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                Personal
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                Security
              </TabsTrigger>
              <TabsTrigger value="preferences" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                Preferences
              </TabsTrigger>
              <TabsTrigger value="support" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                Support
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 mt-0">
              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-500">Manage your personal details</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {personalInfoItems.map((item, index) => (
                      <div key={index} className="flex items-start justify-between py-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <item.icon className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                          </div>
                          {isEditing && item.editable ? (
                            <Input
                              value={item.value}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                [item.key]: e.target.value
                              })}
                              className="mt-1 rounded-xl bg-gray-50 border-gray-200"
                            />
                          ) : (
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {item.value}
                              </p>
                              {item.verified && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs ml-2">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Account Information</h3>
                      <p className="text-sm text-gray-500">Your account details</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {accountInfoItems.map((item, index) => (
                      <div key={index} className="flex items-start justify-between py-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                              {item.value}
                            </p>
                            {item.sensitive && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2 h-6 w-6 p-0 text-gray-500"
                                onClick={toggleSensitiveInfo}
                              >
                                {showSensitiveInfo ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                            )}
                          </div>
                          {item.key === 'kycStatus' && item.value === 'verified' && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4 mt-0">
              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Security Settings</h3>
                      <p className="text-sm text-gray-500">Manage your account security</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {securityItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mt-1">
                            <item.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={item.value} 
                          onCheckedChange={item.action}
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Login Security</h3>
                      <p className="text-sm text-gray-500">Manage your login methods</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Key className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Change Password</p>
                          <p className="text-xs text-gray-500">Update your login password</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:bg-blue-50 rounded-lg"
                        onClick={() => navigate('/change-password')}
                      >
                        Change
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">UPI PIN</p>
                          <p className="text-xs text-gray-500">Set or change your UPI PIN</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:bg-blue-50 rounded-lg"
                        onClick={() => navigate('/upi-pin')}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4 mt-0">
              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Settings className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">App Preferences</h3>
                      <p className="text-sm text-gray-500">Customize your app experience</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {preferenceItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">Current: {item.value}</p>
                          </div>
                        </div>
                        <Select defaultValue={item.value}>
                          <SelectTrigger className="w-32 h-8 rounded-lg">
                            <SelectValue placeholder={item.value} />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Bell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
                      <p className="text-sm text-gray-500">Manage your notification settings</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive app notifications</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive email updates</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">SMS Alerts</p>
                        <p className="text-xs text-gray-500">Receive transaction alerts via SMS</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-4 mt-0">
              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Support</h3>
                      <p className="text-sm text-gray-500">Get help and support</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {supportItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <CardHeader className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Legal & Policies</h3>
                      <p className="text-sm text-gray-500">Terms and policies</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {legalItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-100 bg-blue-50 rounded-xl">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">24/7 Customer Support</h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3" />
                          <span>1800-123-4567</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3" />
                          <span>support@psbank.in</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-3" />
                          <span>Live Chat Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Logout Button */}
          <Button 
            variant="outline" 
            className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border-red-200"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2 text-red-600" />
            Logout
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </BankingLayout>
  );
};

export default Profile;

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Edit, Phone, Mail, MapPin, CreditCard, Shield, Camera, Save, User, LogOut, HelpCircle, QrCode, Copy, Building, Bell, Star, Globe, Moon, Sun, AlertTriangle, FileText, Download, Upload,
//   ShieldCheck,
//   ChevronRight,
//   EyeOff,
//   Eye
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { Switch } from '@/components/ui/switch';
// import { Progress } from '@/components/ui/progress';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { motion, AnimatePresence } from 'framer-motion';

// interface ProfileData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   dob: string;
//   accountNumber: string;
//   customerID: string;
//   branch: string;
//   upiId: string;
//   accountType: string;
//   ifscCode: string;
// }

// interface SecuritySettings {
//   biometricLogin: boolean;
//   twoFactorAuth: boolean;
//   transactionAlerts: boolean;
// }

// interface Preferences {
//   language: string;
//   theme: 'light' | 'dark';
//   notifications: {
//     sms: boolean;
//     email: boolean;
//     push: boolean;
//   };
//   consents: {
//     dataSharing: boolean;
//     marketing: boolean;
//   };
// }

// const Profile = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileData>({
//     name: 'Deepak Yadav',
//     email: 'deepak.yadav@email.com',
//     phone: '+91 9967429975',
//     address: '123 Main Street, Mumbai, 400001',
//     dob: '1990-06-15',
//     accountNumber: '1234 5678 9012 3456',
//     customerID: 'PSB0012345',
//     branch: 'Main Branch, Mumbai',
//     upiId: 'ydavdeepakkumar56@oksbi',
//     accountType: 'Savings Account',
//     ifscCode: 'PSIB0000123',
//   });
//   const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
//     biometricLogin: true,
//     twoFactorAuth: true,
//     transactionAlerts: true,
//   });
//   const [preferences, setPreferences] = useState<Preferences>({
//     language: 'English',
//     theme: 'light',
//     notifications: { sms: true, email: false, push: true },
//     consents: { dataSharing: true, marketing: false },
//   });
//   const [errors, setErrors] = useState<Partial<ProfileData>>({});
//   const [touched, setTouched] = useState<Partial<ProfileData>>({});
//   const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Calculate profile completion
//   const profileCompletion = useMemo(() => {
//     const fields = Object.values(profileData);
//     const filledFields = fields.filter(field => field !== '').length;
//     return Math.round((filledFields / fields.length) * 100);
//   }, [profileData]);

//   // Validation functions
//   const validateName = useCallback((name: string) => {
//     if (!name) return "Name is required";
//     if (name.length < 2) return "Name must be at least 2 characters";
//     if (!/^[A-Za-z\s]+$/.test(name)) return "Name must contain only letters and spaces";
//     return "";
//   }, []);

//   const validateEmail = useCallback((email: string) => {
//     if (!email) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
//     return "";
//   }, []);

//   const validatePhone = useCallback((phone: string) => {
//     if (!phone) return "Phone number is required";
//     if (!/^\+91\s?[6-9]\d{9}$/.test(phone)) return "Invalid Indian phone number";
//     return "";
//   }, []);

//   const validateAddress = useCallback((address: string) => {
//     if (!address) return "Address is required";
//     if (address.length < 5) return "Address must be at least 5 characters";
//     return "";
//   }, []);

//   // Real-time validation
//   useEffect(() => {
//     if (!isEditing) return;

//     const validateAll = () => {
//       setErrors({
//         name: touched.name ? validateName(profileData.name) : "",
//         email: touched.email ? validateEmail(profileData.email) : "",
//         phone: touched.phone ? validatePhone(profileData.phone) : "",
//         address: touched.address ? validateAddress(profileData.address) : "",
//       });
//     };

//     const timeout = setTimeout(validateAll, 300);
//     return () => clearTimeout(timeout);
//   }, [profileData, touched, isEditing, validateName, validateEmail, validatePhone, validateAddress]);

//   const handleInputChange = useCallback((key: keyof ProfileData, value: string) => {
//     setProfileData((prev) => ({ ...prev, [key]: value }));
//     setTouched((prev) => ({ ...prev, [key]: true }));
//   }, []);

//   const handleBlur = useCallback((key: keyof ProfileData) => {
//     setTouched((prev) => ({ ...prev, [key]: true }));
//   }, []);

//   const toggleSensitiveInfo = useCallback(() => {
//     setShowSensitiveInfo((prev) => !prev);
//   }, []);

//   const copyUPIId = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(profileData.upiId);
//       toast({
//         title: "UPI ID Copied",
//         description: "UPI ID has been copied to clipboard",
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Copy Failed",
//         description: "Unable to copy UPI ID. Please try again.",
//         variant: "destructive",
//       });
//     }
//   }, [profileData.upiId, toast]);

//   const handleSave = useCallback(async () => {
//     setTouched({
//       name: "true",
//       email: "true",
//       phone: "true",
//       address: "true",
//     });

//     const newErrors = {
//       name: validateName(profileData.name),
//       email: validateEmail(profileData.email),
//       phone: validatePhone(profileData.phone),
//       address: validateAddress(profileData.address),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error)) {
//       toast({
//         title: "Validation Error",
//         description: "Please correct the errors in the form",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
//       setIsEditing(false);
//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been successfully updated",
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Unable to update profile. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [profileData, validateName, validateEmail, validatePhone, validateAddress, toast]);

//   const handleLogout = useCallback(() => {
//     setShowLogoutDialog(true);
//   }, []);

//   const confirmLogout = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
//       toast({
//         title: "Logged Out",
//         description: "You have been successfully logged out",
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//       navigate('/login');
//     } catch (error) {
//       toast({
//         title: "Logout Failed",
//         description: "Unable to log out. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//       setShowLogoutDialog(false);
//     }
//   }, [navigate, toast]);

//   const handleSecurityChange = useCallback(async (setting: keyof SecuritySettings, value: boolean) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call
//       setSecuritySettings((prev) => ({ ...prev, [setting]: value }));
//       toast({
//         title: "Setting Updated",
//         description: `Security setting has been ${value ? 'enabled' : 'disabled'}`,
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Unable to update setting. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   const handlePreferenceChange = useCallback(async (key: keyof Preferences['notifications'] | keyof Preferences['consents'], value: boolean) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call
//       setPreferences((prev) => ({
//         ...prev,
//         notifications: key in prev.notifications ? { ...prev.notifications, [key]: value } : prev.notifications,
//         consents: key in prev.consents ? { ...prev.consents, [key]: value } : prev.consents,
//       }));
//       toast({
//         title: "Preference Updated",
//         description: `Preference has been ${value ? 'enabled' : 'disabled'}`,
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Unable to update preference. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   const handleLanguageChange = useCallback(async (value: string) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call
//       setPreferences((prev) => ({ ...prev, language: value }));
//       toast({
//         title: "Language Updated",
//         description: `App language set to ${value}`,
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Unable to update language. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   const handleThemeChange = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call
//       setPreferences((prev) => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
//       toast({
//         title: "Theme Updated",
//         description: `App theme set to ${preferences.theme === 'light' ? 'dark' : 'light'}`,
//         className: "bg-blue-50 border-blue-200 text-blue-800",
//       });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Unable to update theme. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [preferences.theme, toast]);

//   const quickActions = [
//     { icon: QrCode, label: 'Scan & Pay', color: 'bg-blue-600', action: () => navigate('/qr-payment') },
//     { icon: Phone, label: 'Recharge', color: 'bg-blue-600', action: () => navigate('/recharge') },
//     { icon: Building, label: 'Bank Services', color: 'bg-purple-600', action: () => navigate('/account-summary') },
//     { icon: CreditCard, label: 'Cards', color: 'bg-orange-600', action: () => navigate('/cards') },
//   ];

//   const isFormValid = useMemo(() => !Object.values(errors).some((error) => error), [errors]);

//   return (
//     <BankingLayout showHeader={false}>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         {/* Header */}
//         <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
//             <div className="flex items-center gap-2">
//               {isEditing ? (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="rounded-full text-gray-600 hover:bg-gray-100"
//                   onClick={() => setIsEditing(false)}
//                   aria-label="Cancel editing"
//                   disabled={isLoading}
//                 >
//                   Cancel
//                 </Button>
//               ) : (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="rounded-full p-2 hover:bg-gray-100"
//                   onClick={() => setIsEditing(true)}
//                   aria-label="Edit profile"
//                   disabled={isLoading}
//                 >
//                   <Edit className="h-5 w-5 text-[#1178AC]" />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 px-6 space-y-6 pt-6 pb-24">
//           {/* Profile Completion */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="border-0 shadow-sm rounded-2xl bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Profile Completion</p>
//                     <p className="text-xs text-gray-500">Last updated: 21 Aug 2025</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Progress value={profileCompletion} className="w-24 h-2 bg-gray-200" />
//                     <span className="text-sm font-medium text-gray-900">{profileCompletion}%</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Header Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="border-0 shadow-sm rounded-2xl bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="relative">
//                       <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
//                         <AvatarImage src="/placeholder.svg" alt="Profile avatar" />
//                         <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-[#1178AC] to-[#1397DA] text-white">
//                           {profileData.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>
//                       {isEditing && (
//                         <Button
//                           size="icon"
//                           className="absolute -bottom-2 -right-2 rounded-full p-1 h-9 w-9 bg-white shadow-md hover:bg-gray-100 border border-gray-200"
//                           aria-label="Change profile picture"
//                           disabled={isLoading}
//                         >
//                           <Camera className="h-5 w-5 text-[#1178AC]" />
//                         </Button>
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
//                       <p className="text-sm font-medium text-gray-600">A/C: {showSensitiveInfo ? profileData.accountNumber : 'XXXX XXXX XXXX 3456'}</p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge className="bg-blue-100 text-blue-800 text-xs py-1 px-2">
//                           <ShieldCheck className="h-3 w-3 mr-1" />
//                           Verified
//                         </Badge>
//                         <Badge className="bg-amber-100 text-amber-800 text-xs py-1 px-2">
//                           <Star className="h-3 w-3 mr-1" />
//                           Premium
//                         </Badge>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-2">Last login: 21 Aug 2025, 04:48 PM IST</p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="rounded-full p-2 border-gray-200 hover:border-[#1178AC] hover:bg-[#1178AC]/5 bg-white"
//                     onClick={() => navigate('/qr-code')}
//                     aria-label="View QR code"
//                     disabled={isLoading}
//                   >
//                     <QrCode className="h-5 w-5 text-[#1178AC]" />
//                   </Button>
//                 </div>
//                 <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 font-medium">UPI ID</p>
//                       <p className="text-sm font-medium text-gray-900">{profileData.upiId}</p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={copyUPIId}
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       aria-label="Copy UPI ID"
//                       disabled={isLoading}
//                     >
//                       <Copy className="h-4 w-4 mr-1" />
//                       Copy
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//           >
//             <div className="relative">
//               <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
//                 <span>Quick Actions</span>
//                 <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
//               </h3>
//               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                 {quickActions.map((action, index) => {
//                   const IconComponent = action.icon;
//                   return (
//                     <Button
//                       key={index}
//                       variant="ghost"
//                       className="flex-col h-24 w-24 p-2 rounded-xl bg-white border border-gray-200 hover:border-[#1178AC]/20 hover:bg-[#1178AC]/5 transition-all duration-300 group shrink-0"
//                       onClick={action.action}
//                       aria-label={action.label}
//                       disabled={isLoading}
//                     >
//                       <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mb-2 shadow-md group-hover:scale-105 transition-transform`}>
//                         <IconComponent className="h-6 w-6 text-white" />
//                       </div>
//                       <span className="text-xs font-medium text-gray-700 group-hover:text-[#1178AC] text-center">{action.label}</span>
//                     </Button>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>

//           {/* Personal Information */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.2 }}
//           >
//             <Card className="border border-gray-200 rounded-xl shadow-sm">
//               <CardHeader className="p-4 bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                     <User className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Personal Information</h3>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="space-y-4">
//                   {[
//                     { label: 'Full Name', key: 'name', value: profileData.name, editable: true, verified: true },
//                     { label: 'Email', key: 'email', value: profileData.email, editable: true, verified: false },
//                     { label: 'Phone', key: 'phone', value: profileData.phone, editable: true, verified: true },
//                     { label: 'Address', key: 'address', value: profileData.address, editable: true },
//                     { label: 'Date of Birth', key: 'dob', value: profileData.dob, editable: false },
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-start justify-between py-3">
//                       <div className="flex-1">
//                         <Label htmlFor={item.key} className="text-sm text-gray-500 font-medium mb-1">{item.label}</Label>
//                         {isEditing && item.editable ? (
//                           <>
//                             <Input
//                               id={item.key}
//                               value={item.value}
//                               onChange={(e) => handleInputChange(item.key as keyof ProfileData, e.target.value)}
//                               onBlur={() => handleBlur(item.key as keyof ProfileData)}
//                               className={`rounded-xl bg-gray-50 border-gray-200 text-sm ${errors[item.key as keyof ProfileData] ? 'border-red-500' : ''}`}
//                               aria-invalid={!!errors[item.key as keyof ProfileData]}
//                               aria-describedby={`${item.key}-error`}
//                               disabled={isLoading}
//                             />
//                             <AnimatePresence>
//                               {errors[item.key as keyof ProfileData] && touched[item.key as keyof ProfileData] && (
//                                 <motion.p
//                                   id={`${item.key}-error`}
//                                   className="text-xs text-red-600 mt-1"
//                                   initial={{ opacity: 0, height: 0 }}
//                                   animate={{ opacity: 1, height: 'auto' }}
//                                   exit={{ opacity: 0, height: 0 }}
//                                 >
//                                   {errors[item.key as keyof ProfileData]}
//                                 </motion.p>
//                               )}
//                             </AnimatePresence>
//                           </>
//                         ) : (
//                           <div className="flex items-center">
//                             <p className="text-sm font-medium text-gray-900">{item.value}</p>
//                             {item.verified !== undefined && (
//                               <Badge className={`ml-2 text-xs py-1 px-2 ${item.verified ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
//                                 {item.verified ? <ShieldCheck className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
//                                 {item.verified ? 'Verified' : 'Pending'}
//                               </Badge>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Account Settings */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.3 }}
//           >
//             <Card className="border border-gray-200 rounded-xl shadow-sm">
//               <CardHeader className="p-4 bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                     <Shield className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Account Settings</h3>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="space-y-4">
//                   {/* Login & Security */}
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-2">Login & Security</p>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Change Password / MPIN</p>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                           onClick={() => navigate('/change-password')}
//                           aria-label="Change Password or MPIN"
//                           disabled={isLoading}
//                         >
//                           Manage
//                         </Button>
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Biometric Login</p>
//                         <Switch
//                           checked={securitySettings.biometricLogin}
//                           onCheckedChange={(value) => handleSecurityChange('biometricLogin', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle Biometric Login"
//                           disabled={isLoading}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
//                         <Switch
//                           checked={securitySettings.twoFactorAuth}
//                           onCheckedChange={(value) => handleSecurityChange('twoFactorAuth', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle Two-Factor Authentication"
//                           disabled={isLoading}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Transaction Alerts</p>
//                         <Switch
//                           checked={securitySettings.transactionAlerts}
//                           onCheckedChange={(value) => handleSecurityChange('transactionAlerts', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle Transaction Alerts"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   {/* Linked Accounts & Cards */}
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-2">Linked Accounts & Cards</p>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Customer ID: {profileData.customerID}</p>
//                         <Badge className="bg-blue-100 text-blue-800 text-xs py-1 px-2">
//                           <ShieldCheck className="h-3 w-3 mr-1" />
//                           Verified
//                         </Badge>
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Account: {showSensitiveInfo ? profileData.accountNumber : 'XXXX XXXX XXXX 3456'}</p>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-gray-500 hover:text-[#1178AC]"
//                           onClick={toggleSensitiveInfo}
//                           aria-label={showSensitiveInfo ? 'Hide account number' : 'Show account number'}
//                           disabled={isEditing || isLoading}
//                         >
//                           {showSensitiveInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </Button>
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Manage Cards</p>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                           onClick={() => navigate('/cards')}
//                           aria-label="Manage Cards"
//                           disabled={isLoading}
//                         >
//                           Manage
//                         </Button>
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Add/Remove Accounts</p>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                           onClick={() => navigate('/linked-accounts')}
//                           aria-label="Manage Linked Accounts"
//                           disabled={isLoading}
//                         >
//                           Manage
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Preferences */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.4 }}
//           >
//             <Card className="border border-gray-200 rounded-xl shadow-sm">
//               <CardHeader className="p-4 bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                     <Bell className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Preferences</h3>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-2">Language</p>
//                     <Select
//                       value={preferences.language}
//                       onValueChange={handleLanguageChange}
//                       disabled={isLoading}
//                     >
//                       <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200">
//                         <SelectValue placeholder="Select language" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="English">English</SelectItem>
//                         <SelectItem value="Hindi">Hindi</SelectItem>
//                         <SelectItem value="Marathi">Marathi</SelectItem>
//                         <SelectItem value="Tamil">Tamil</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-2">Theme</p>
//                     <div className="flex items-center justify-between py-2">
//                       <p className="text-sm font-medium text-gray-900">{preferences.theme === 'light' ? 'Light Theme' : 'Dark Theme'}</p>
//                       <Switch
//                         checked={preferences.theme === 'dark'}
//                         onCheckedChange={handleThemeChange}
//                         className="data-[state=checked]:bg-[#1178AC]"
//                         aria-label="Toggle Theme"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-2">Notifications</p>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
//                         <Switch
//                           checked={preferences.notifications.sms}
//                           onCheckedChange={(value) => handlePreferenceChange('sms', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle SMS Notifications"
//                           disabled={isLoading}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Email Notifications</p>
//                         <Switch
//                           checked={preferences.notifications.email}
//                           onCheckedChange={(value) => handlePreferenceChange('email', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle Email Notifications"
//                           disabled={isLoading}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <p className="text-sm font-medium text-gray-900">Push Notifications</p>
//                         <Switch
//                           checked={preferences.notifications.push}
//                           onCheckedChange={(value) => handlePreferenceChange('push', value)}
//                           className="data-[state=checked]:bg-[#1178AC]"
//                           aria-label="Toggle Push Notifications"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Support & Help */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.5 }}
//           >
//             <Card className="border border-blue-100 bg-blue-50 rounded-xl shadow-sm">
//               <CardHeader className="p-4 bg-blue-100/50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <HelpCircle className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Support & Help</h3>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between py-2">
//                     <div className="flex items-center gap-3">
//                       <Phone className="h-4 w-4 text-blue-600" />
//                       <p className="text-sm font-medium text-gray-900">Customer Care: 1800-123-4567</p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       onClick={() => navigate('/support/chat')}
//                       aria-label="Contact Support"
//                       disabled={isLoading}
//                     >
//                       Chat
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <div className="flex items-center gap-3">
//                       <FileText className="h-4 w-4 text-blue-600" />
//                       <p className="text-sm font-medium text-gray-900">FAQs</p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       onClick={() => navigate('/support/faqs')}
//                       aria-label="View FAQs"
//                       disabled={isLoading}
//                     >
//                       View
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <div className="flex items-center gap-3">
//                       <AlertTriangle className="h-4 w-4 text-red-600" />
//                       <p className="text-sm font-medium text-gray-900">Report Suspicious Activity</p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       onClick={() => navigate('/support/report')}
//                       aria-label="Report Suspicious Activity"
//                       disabled={isLoading}
//                     >
//                       Report
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Legal & Policies */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.6 }}
//           >
//             <Card className="border border-gray-200 rounded-xl shadow-sm">
//               <CardHeader className="p-4 bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                     <FileText className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Legal & Policies</h3>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between py-2">
//                     <p className="text-sm font-medium text-gray-900">Terms & Conditions</p>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       onClick={() => navigate('/legal/terms')}
//                       aria-label="View Terms & Conditions"
//                       disabled={isLoading}
//                     >
//                       View
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-[#1178AC] hover:bg-[#1178AC]/5 rounded-lg"
//                       onClick={() => navigate('/legal/privacy')}
//                       aria-label="View Privacy Policy"
//                       disabled={isLoading}
//                     >
//                       View
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <p className="text-sm font-medium text-gray-900">Data Sharing Consent</p>
//                     <Switch
//                       checked={preferences.consents.dataSharing}
//                       onCheckedChange={(value) => handlePreferenceChange('dataSharing', value)}
//                       className="data-[state=checked]:bg-[#1178AC]"
//                       aria-label="Toggle Data Sharing Consent"
//                       disabled={isLoading}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <p className="text-sm font-medium text-gray-900">Marketing Consent</p>
//                     <Switch
//                       checked={preferences.consents.marketing}
//                       onCheckedChange={(value) => handlePreferenceChange('marketing', value)}
//                       className="data-[state=checked]:bg-[#1178AC]"
//                       aria-label="Toggle Marketing Consent"
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Logout */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.7 }}
//           >
//             <Button
//               variant="outline"
//               className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border-red-200"
//               onClick={handleLogout}
//               aria-label="Log out"
//               disabled={isLoading}
//             >
//               <LogOut className="h-5 w-5 mr-2 text-red-600" />
//               Log Out
//             </Button>
//           </motion.div>
//         </div>

//         {/* Fixed Save Button */}
//         <AnimatePresence>
//           {isEditing && (
//             <motion.div
//               initial={{ y: 100, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 100, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20 shadow-lg"
//             >
//               <div className="max-w-md mx-auto w-full">
//                 <Button
//                   onClick={handleSave}
//                   disabled={!isFormValid || isLoading}
//                   className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Save profile changes"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                       </svg>
//                       Saving...
//                     </span>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5 mr-2" />
//                       Save Changes
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Logout Confirmation Dialog */}
//         <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
//           <DialogContent className="sm:max-w-md rounded-xl">
//             <DialogHeader>
//               <DialogTitle>Confirm Log Out</DialogTitle>
//               <DialogDescription>
//                 Are you sure you want to log out? You will need to log in again to access your account.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="sm:justify-start">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setShowLogoutDialog(false)}
//                 className="rounded-xl"
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="button"
//                 variant="destructive"
//                 onClick={confirmLogout}
//                 className="rounded-xl bg-red-600 hover:bg-red-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Logging out...
//                   </span>
//                 ) : (
//                   'Log Out'
//                 )}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <BottomNavigation />
//     </BankingLayout>
//   );
// };

// export default Profile;


// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Edit, Phone, Mail, MapPin, CreditCard, Shield, Camera, Save, User, LogOut, HelpCircle, QrCode, Copy, Trophy, Users, ChevronRight, ChevronDown,
//   ShieldCheck, Eye, EyeOff, FileText, Download, Upload,
//   Building,
//   Bell,
//   Star,
//   Clock
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { Switch } from '@/components/ui/switch';
// import { Progress } from '@/components/ui/progress';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// // Interface for profile data to ensure type safety
// interface ProfileData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   panCard: string;
//   aadhar: string;
//   customerID: string;
//   branch: string;
//   upiId: string;
//   accountType: string;
//   accountNumber: string;
//   ifscCode: string;
//   dob: string;
//   occupation: string;
//   kycStatus: string;
//   riskProfile: string;
// }

// interface SecuritySettings {
//   biometricLogin: boolean;
//   transactionAlerts: boolean;
//   marketingEmails: boolean;
//   appNotifications: boolean;
//   twoFactorAuth: boolean;
// }

// const Profile = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profileData, setProfileData] = useState<ProfileData>({
//     name: 'Deepak Yadav',
//     email: 'deepak.yadav@email.com',
//     phone: '+91 9967429975',
//     address: '123 Main Street, Mumbai, 400001',
//     panCard: 'ABCDE1234F',
//     aadhar: '1234-5678-9012',
//     customerID: 'PSB0012345',
//     branch: 'Main Branch, Mumbai',
//     upiId: 'ydavdeepakkumar56@oksbi',
//     accountType: 'Savings Account',
//     accountNumber: 'XXXX XXXX 1234',
//     ifscCode: 'PSIB0000123',
//     dob: '1990-06-15',
//     occupation: 'Software Engineer',
//     kycStatus: 'Verified',
//     riskProfile: 'Moderate'
//   });
//   const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
//     biometricLogin: true,
//     transactionAlerts: true,
//     marketingEmails: false,
//     appNotifications: true,
//     twoFactorAuth: true
//   });
//   const [errors, setErrors] = useState<Partial<ProfileData>>({});
//   const [touched, setTouched] = useState<Partial<ProfileData>>({});

//   // Validation functions
//   const validateName = useCallback((name: string) => {
//     if (!name) return "Name is required";
//     if (name.length < 2) return "Name must be at least 2 characters";
//     return "";
//   }, []);

//   const validateEmail = useCallback((email: string) => {
//     if (!email) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
//     return "";
//   }, []);

//   const validatePhone = useCallback((phone: string) => {
//     if (!phone) return "Phone number is required";
//     if (!/^\+91\s?[6-9]\d{9}$/.test(phone)) return "Invalid Indian phone number";
//     return "";
//   }, []);

//   const validateAddress = useCallback((address: string) => {
//     if (!address) return "Address is required";
//     if (address.length < 5) return "Address must be at least 5 characters";
//     return "";
//   }, []);

//   const validateOccupation = useCallback((occupation: string) => {
//     if (!occupation) return "Occupation is required";
//     return "";
//   }, []);

//   // Real-time validation for touched fields
//   useEffect(() => {
//     if (!isEditing) return;

//     const validateAll = () => {
//       setErrors({
//         name: touched.name ? validateName(profileData.name) : "",
//         email: touched.email ? validateEmail(profileData.email) : "",
//         phone: touched.phone ? validatePhone(profileData.phone) : "",
//         address: touched.address ? validateAddress(profileData.address) : "",
//         occupation: touched.occupation ? validateOccupation(profileData.occupation) : "",
//       });
//     };

//     const timeout = setTimeout(validateAll, 300); // Debounced validation
//     return () => clearTimeout(timeout);
//   }, [profileData, touched, isEditing, validateName, validateEmail, validatePhone, validateAddress, validateOccupation]);

//   const handleInputChange = useCallback((key: keyof ProfileData, value: string) => {
//     setProfileData((prev) => ({ ...prev, [key]: value }));
//     setTouched((prev) => ({ ...prev, [key]: true }));
//   }, []);

//   const handleBlur = useCallback((key: keyof ProfileData) => {
//     setTouched((prev) => ({ ...prev, [key]: true }));
//   }, []);

//   const toggleSection = useCallback((section: string) => {
//     setExpandedSection((prev) => (prev === section ? null : section));
//   }, []);

//   const toggleSensitiveInfo = useCallback(() => {
//     setShowSensitiveInfo((prev) => !prev);
//   }, []);

//   const copyUPIId = useCallback(() => {
//     navigator.clipboard.writeText(profileData.upiId);
//     toast({
//       title: "UPI ID Copied",
//       description: "UPI ID has been copied to clipboard",
//       className: "bg-blue-50 border-blue-200 text-blue-800",
//     });
//   }, [profileData.upiId, toast]);

//   const handleSave = useCallback(() => {
//     setTouched({
//       name: "true",
//       email: "true",
//       phone: "true",
//       address: "true",
//       occupation: "true",
      
//     });

//     const newErrors = {
//       name: validateName(profileData.name),
//       email: validateEmail(profileData.email),
//       phone: validatePhone(profileData.phone),
//       address: validateAddress(profileData.address),
//       occupation: validateOccupation(profileData.occupation),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error)) {
//       toast({
//         title: "Validation Error",
//         description: "Please correct the errors in the form",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsEditing(false);
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been successfully updated",
//       className: "bg-blue-50 border-blue-200 text-blue-800",
//     });
//   }, [profileData, validateName, validateEmail, validatePhone, validateAddress, validateOccupation, toast]);

//   const handleLogout = useCallback(() => {
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out",
//       className: "bg-blue-50 border-blue-200 text-blue-800",
//     });
//     navigate('/login');
//   }, [navigate, toast]);

//   const downloadProfile = useCallback(() => {
//     toast({
//       title: "Profile Downloaded",
//       description: "Your profile details have been saved",
//       className: "bg-blue-50 border-blue-200 text-blue-800",
//     });
//   }, [toast]);

//   const handleSecurityChange = useCallback((setting: keyof SecuritySettings, value: boolean) => {
//     setSecuritySettings((prev) => ({
//       ...prev,
//       [setting]: value,
//     }));
//     toast({
//       title: "Setting Updated",
//       description: `Security setting has been ${value ? 'enabled' : 'disabled'}`,
//       className: "bg-blue-50 border-blue-200 text-blue-800",
//     });
//   }, [toast]);

//   const quickActions = [
//     { icon: QrCode, label: 'Scan & Pay', color: 'bg-blue-500', action: () => navigate('/qr-payment') },
//     { icon: Phone, label: 'Recharge', color: 'bg-blue-500', action: () => navigate('/recharge') },
//     { icon: Building, label: 'Bank Services', color: 'bg-purple-500', action: () => navigate('/account-summary') },
//     { icon: CreditCard, label: 'Cards', color: 'bg-orange-500', action: () => navigate('/cards') },
//   ];

//   const accountSections = [
//     {
//       title: 'Personal Information',
//       icon: User,
//       items: [
//         { label: 'Full Name', value: profileData.name, key: 'name', editable: true },
//         { label: 'Email', value: profileData.email, key: 'email', editable: true },
//         { label: 'Phone', value: profileData.phone, key: 'phone', editable: true },
//         { label: 'Date of Birth', value: profileData.dob, key: 'dob', editable: false },
//         { label: 'Address', value: profileData.address, key: 'address', editable: true },
//         { label: 'Occupation', value: profileData.occupation, key: 'occupation', editable: true },
//       ],
//     },
//     {
//       title: 'Account Details',
//       icon: CreditCard,
//       items: [
//         { label: 'Customer ID', value: profileData.customerID, key: 'customerID', editable: false },
//         { label: 'Account Number', value: showSensitiveInfo ? '1234 5678 9012 3456' : 'XXXX XXXX XXXX 3456', key: 'accountNumber', sensitive: true },
//         { label: 'Account Type', value: profileData.accountType, key: 'accountType', editable: false },
//         { label: 'Branch', value: profileData.branch, key: 'branch', editable: false },
//         { label: 'IFSC Code', value: profileData.ifscCode, key: 'ifscCode', editable: false },
//       ],
//     },
//     {
//       title: 'Security & Verification',
//       icon: ShieldCheck,
//       items: [
//         { label: 'PAN Card', value: profileData.panCard, key: 'panCard', editable: false },
//         { label: 'Aadhar Number', value: showSensitiveInfo ? profileData.aadhar : 'XXXX-XXXX-9012', key: 'aadhar', sensitive: true },
//         { label: 'KYC Status', value: profileData.kycStatus, key: 'kycStatus', status: 'verified' },
//         { label: 'Risk Profile', value: profileData.riskProfile, key: 'riskProfile', editable: false },
//       ],
//     },
//   ];

//   const securitySections = [
//     {
//       title: 'Security Settings',
//       icon: Shield,
//       items: [
//         {
//           label: 'Biometric Login',
//           value: securitySettings.biometricLogin,
//           type: 'toggle',
//           action: () => handleSecurityChange('biometricLogin', !securitySettings.biometricLogin),
//         },
//         {
//           label: 'Two-Factor Authentication',
//           value: securitySettings.twoFactorAuth,
//           type: 'toggle',
//           action: () => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth),
//         },
//         {
//           label: 'Transaction Alerts',
//           value: securitySettings.transactionAlerts,
//           type: 'toggle',
//           action: () => handleSecurityChange('transactionAlerts', !securitySettings.transactionAlerts),
//         },
//         { label: 'Change Password', action: () => navigate('/change-password'), type: 'action' },
//         { label: 'Set UPI PIN', action: () => navigate('/upi-pin'), type: 'action' },
//       ],
//     },
//     {
//       title: 'Notification Preferences',
//       icon: Bell,
//       items: [
//         {
//           label: 'App Notifications',
//           value: securitySettings.appNotifications,
//           type: 'toggle',
//           action: () => handleSecurityChange('appNotifications', !securitySettings.appNotifications),
//         },
//         {
//           label: 'Marketing Emails',
//           value: securitySettings.marketingEmails,
//           type: 'toggle',
//           action: () => handleSecurityChange('marketingEmails', !securitySettings.marketingEmails),
//         },
//         { label: 'Notification Settings', action: () => navigate('/notifications'), type: 'action' },
//       ],
//     },
//   ];

//   const isFormValid = !Object.values(errors).some((error) => error);

//   return (
//     <BankingLayout showHeader={false}>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         {/* Header */}
//         <div className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
//             <div className="flex items-center gap-2">
//               {isEditing ? (
//                 <>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="rounded-full text-gray-600 hover:bg-gray-100"
//                     onClick={() => setIsEditing(false)}
//                     aria-label="Cancel editing"
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="rounded-full p-2 hover:bg-gray-100"
//                   onClick={() => setIsEditing(true)}
//                   aria-label="Edit profile"
//                 >
//                   <Edit className="h-5 w-5 text-gray-600" />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 px-6 space-y-6 pt-4 pb-20">
//           {/* Profile Tabs */}
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid grid-cols-3 mb-6 bg-gray-100 p-1 rounded-xl">
//               <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Profile
//               </TabsTrigger>
//               <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Security
//               </TabsTrigger>
//               <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Documents
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="profile" className="space-y-6 mt-0">
//               {/* User Profile Header */}
//               <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-4">
//                       <div className="relative">
//                         <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
//                           <AvatarImage src="/placeholder.svg" alt="Profile avatar" />
//                           <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-[#1178AC] to-[#1397DA] text-white">
//                             {profileData.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         {isEditing && (
//                           <Button
//                             size="icon"
//                             className="absolute -bottom-1 -right-1 rounded-full p-1 h-8 w-8 bg-white shadow-md hover:bg-gray-100 border"
//                             aria-label="Change profile picture"
//                           >
//                             <Camera className="h-4 w-4 text-gray-700" />
//                           </Button>
//                         )}
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
//                         <div className="flex items-center gap-2 mt-2">
//                           <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs py-1">
//                             <ShieldCheck className="h-3 w-3 mr-1" />
//                             Verified
//                           </Badge>
//                           <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs py-1">
//                             <Star className="h-3 w-3 mr-1" />
//                             Premium
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">{profileData.occupation}</p>
//                       </div>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="rounded-full p-2 border-gray-200 hover:border-gray-300 bg-white/80"
//                       onClick={() => navigate('/qr-code')}
//                       aria-label="View QR code"
//                     >
//                       <QrCode className="h-5 w-5 text-gray-600" />
//                     </Button>
//                   </div>

//                   <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-xs text-gray-500 font-medium">UPI ID</p>
//                         <p className="text-sm font-medium text-gray-900">{profileData.upiId}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={copyUPIId}
//                         className="text-primary hover:bg-blue-50 rounded-lg"
//                         aria-label="Copy UPI ID"
//                       >
//                         <Copy className="h-4 w-4 mr-1" />
//                         Copy
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Rewards Section */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden">
//                   <CardContent className="p-5">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
//                         <Trophy className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-xl font-bold text-amber-900">₹82</p>
//                         <p className="text-xs text-amber-700 font-medium">Rewards earned</p>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <Progress value={45} className="h-2 bg-amber-200" />
//                       <p className="text-xs text-amber-700 mt-1">₹18 to next reward</p>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden">
//                   <CardContent className="p-5">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
//                         <Users className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-xl font-bold text-blue-900">₹201</p>
//                         <p className="text-xs text-blue-700 font-medium">Refer a friend</p>
//                       </div>
//                     </div>
//                     <Button size="sm" className="mt-3 h-8 text-xs rounded-lg bg-blue-500 hover:bg-blue-600">
//                       Invite Friends
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>

            

//               {/* Profile Sections */}
//               <div className="space-y-4">
//                 {accountSections.map((section, sectionIndex) => (
//                   <Card key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
//                     <CardHeader
//                       className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                       onClick={() => toggleSection(section.title)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                             <section.icon className="h-5 w-5 text-gray-600" />
//                           </div>
//                           <h3 className="font-semibold text-gray-900">{section.title}</h3>
//                         </div>
//                         <ChevronDown
//                           className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === section.title ? 'rotate-180' : ''}`}
//                         />
//                       </div>
//                     </CardHeader>

//                     {(expandedSection === section.title || isEditing) && (
//                       <CardContent className="p-4 pt-0 border-t border-gray-100">
//                         <div className="space-y-4">
//                           {section.items.map((item, itemIndex) => (
//                             <div key={itemIndex} className="flex items-start justify-between py-2">
//                               <div className="flex-1">
//                                 <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
//                                 {isEditing && item.editable ? (
//                                   <>
//                                     <Input
//                                       value={item.value}
//                                       onChange={(e) => handleInputChange(item.key as keyof ProfileData, e.target.value)}
//                                       onBlur={() => handleBlur(item.key as keyof ProfileData)}
//                                       className={`rounded-xl bg-gray-50 border-gray-200 ${errors[item.key as keyof ProfileData] ? 'border-red-500' : ''}`}
//                                       aria-invalid={!!errors[item.key as keyof ProfileData]}
//                                       aria-describedby={`${item.key}-error`}
//                                     />
//                                     {errors[item.key as keyof ProfileData] && touched[item.key as keyof ProfileData] && (
//                                       <p id={`${item.key}-error`} className="text-xs text-red-600 mt-1">
//                                         {errors[item.key as keyof ProfileData]}
//                                       </p>
//                                     )}
//                                   </>
//                                 ) : (
//                                   <div className="flex items-center">
//                                     <p className="text-sm font-medium text-gray-900">
//                                       {item.value}
//                                     </p>
//                                     {item.sensitive && (
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         className="ml-2 h-6 w-6 p-0 text-gray-500"
//                                         onClick={toggleSensitiveInfo}
//                                         aria-label={showSensitiveInfo ? 'Hide sensitive info' : 'Show sensitive info'}
//                                       >
//                                         {showSensitiveInfo ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
//                                       </Button>
//                                     )}
//                                   </div>
//                                 )}
//                                 {item.status === 'verified' && (
//                                   <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">
//                                     <ShieldCheck className="h-3 w-3 mr-1" />
//                                     Verified
//                                   </Badge>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     )}
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="security" className="space-y-6 mt-0">
//               {/* Security Overview */}
//               <Card className="border-0 shadow-sm bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10 rounded-2xl">
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
//                       <ShieldCheck className="h-8 w-8 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Security Status</h3>
//                       <p className="text-sm text-gray-600">Your account is well protected</p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge className="bg-blue-100 text-blue-700">
//                           <ShieldCheck className="h-3 w-3 mr-1" />
//                           Secure
//                         </Badge>
//                         <Progress value={85} className="w-20 h-2" />
//                         <span className="text-xs text-gray-500">85%</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Security Sections */}
//               <div className="space-y-4">
//                 {securitySections.map((section, sectionIndex) => (
//                   <Card key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
//                     <CardHeader className="p-4 bg-gray-50">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                           <section.icon className="h-5 w-5 text-gray-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-900">{section.title}</h3>
//                       </div>
//                     </CardHeader>

//                     <CardContent className="p-4">
//                       <div className="space-y-4">
//                         {section.items.map((item, itemIndex) => (
//                           <div key={itemIndex} className="flex items-center justify-between py-2">
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">{item.label}</p>
//                             </div>
//                             {item.type === 'toggle' ? (
//                               <Switch
//                                 checked={item.value}
//                                 onCheckedChange={item.action}
//                                 className="data-[state=checked]:bg-primary"
//                                 aria-label={`Toggle ${item.label}`}
//                               />
//                             ) : (
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-primary hover:bg-blue-50 rounded-lg"
//                                 onClick={item.action}
//                                 aria-label={`Manage ${item.label}`}
//                               >
//                                 Manage
//                               </Button>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Security Tips */}
//               <Card className="border border-blue-100 bg-blue-50 rounded-xl">
//                 <CardContent className="p-5">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                       <Shield className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-blue-800 mb-3">Security Tips</h4>
//                       <ul className="space-y-2 text-sm text-blue-700">
//                         <li className="flex items-start gap-2">
//                           <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
//                           <span>Never share your passwords or OTP with anyone</span>
//                         </li>
//                         <li className="flex items-start gap-2">
//                           <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
//                           <span>Enable two-factor authentication for added security</span>
//                         </li>
//                         <li className="flex items-start gap-2">
//                           <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
//                           <span>Regularly review your account activity</span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="documents" className="space-y-6 mt-0">
//               {/* Documents Overview */}
//               <Card className="border-0 shadow-sm bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10 rounded-2xl">
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
//                       <FileText className="h-8 w-8 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Your Documents</h3>
//                       <p className="text-sm text-gray-600">Access and manage your financial documents</p>
//                       <Badge className="bg-blue-100 text-blue-700 mt-2">
//                         <ShieldCheck className="h-3 w-3 mr-1" />
//                         All documents verified
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Document List */}
//               <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
//                 <CardHeader className="p-4 bg-gray-50">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                       <FileText className="h-5 w-5 text-gray-600" />
//                     </div>
//                     <h3 className="font-semibold text-gray-900">Account Documents</h3>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="p-4">
//                   <div className="space-y-4">
//                     {[
//                       { name: 'Account Statement', date: 'Last 3 months', action: downloadProfile },
//                       { name: 'PAN Card Copy', date: 'Verified', action: downloadProfile },
//                       { name: 'Aadhar Card Copy', date: 'Verified', action: downloadProfile },
//                       { name: 'Address Proof', date: 'Verified', action: downloadProfile },
//                       { name: 'KYC Document', date: 'Completed', action: downloadProfile },
//                     ].map((doc, index) => (
//                       <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{doc.name}</p>
//                           <p className="text-xs text-gray-500">{doc.date}</p>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-primary hover:bg-blue-50 rounded-lg"
//                           onClick={doc.action}
//                           aria-label={`Download ${doc.name}`}
//                         >
//                           <Download className="h-4 w-4 mr-1" />
//                           Download
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Upload Section */}
//               <Card className="border border-blue-100 bg-blue-50 rounded-xl">
//                 <CardContent className="p-5">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                       <Upload className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-blue-800 mb-2">Need to upload a document?</h4>
//                       <p className="text-sm text-blue-700 mb-3">
//                         Upload supporting documents for verification or additional services
//                       </p>
//                       <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-lg">
//                         <Upload className="h-4 w-4 mr-1" />
//                         Upload Document
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>

//           {/* Support Section */}
//           <Card className="border border-blue-100 bg-blue-50 rounded-xl">
//             <CardContent className="p-5">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <HelpCircle className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-blue-800 mb-3">Need Help?</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-blue-700">
//                       <Phone className="h-4 w-4 mr-3" />
//                       <span className="text-sm">Customer Care: 1800-123-4567</span>
//                     </div>
//                     <div className="flex items-center text-blue-700">
//                       <Mail className="h-4 w-4 mr-3" />
//                       <span className="text-sm">Email: support@psbank.in</span>
//                     </div>
//                     <div className="flex items-center text-blue-700">
//                       <Clock className="h-4 w-4 mr-3" />
//                       <span className="text-sm">Available 24/7</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Logout Button */}
//           <Button
//             variant="outline"
//             className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border-red-200"
//             onClick={handleLogout}
//             aria-label="Log out"
//           >
//             <LogOut className="h-5 w-5 mr-2 text-red-600" />
//             Logout
//           </Button>
//         </div>

//         {/* Fixed Save Button */}
//         {isEditing && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
//             <div className="max-w-md mx-auto w-full">
//               <Button
//                 onClick={handleSave}
//                 disabled={!isFormValid}
//                 className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white disabled:opacity-50"
//                 aria-label="Save profile changes"
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 Save
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//       <BottomNavigation />
//     </BankingLayout>
//   );
// };

// export default Profile;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   ArrowLeft, Edit, Phone, Mail, MapPin, CreditCard, Shield, Key, Settings,
//   Camera, Save, User, LogOut, HelpCircle, Globe, Bell, Star, Gift, History,
//   Building, QrCode, Copy, Trophy, Users, ChevronRight, ChevronDown
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { BottomNavigation } from '@/components/BottomNavigation';

// const Profile = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const [profileData, setProfileData] = useState({
//     name: 'Deepak Yadav',
//     email: 'deepak.yadav@email.com',
//     phone: '+91 9967429975',
//     address: '123 Main Street, Mumbai, 400001',
//     panCard: 'ABCDE1234F',
//     aadhar: '****-****-1234',
//     customerID: 'PSB0012345',
//     branch: 'Main Branch, Mumbai',
//     upiId: 'ydavdeepakkumar56@oksbi'
//   });

//   const toggleSection = (section: string) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   const quickActions = [
//     { icon: QrCode, label: 'Scan & Pay', color: 'bg-blue-500', action: () => navigate('/qr-payment') },
//     { icon: Phone, label: 'Recharge', color: 'bg-blue-500', action: () => navigate('/recharge') },
//     { icon: Building, label: 'Bank Services', color: 'bg-purple-500', action: () => navigate('/account-summary') },
//     { icon: CreditCard, label: 'Cards', color: 'bg-orange-500', action: () => navigate('/cards') },
//   ];

//   const accountSections = [
//     {
//       title: 'Personal Information',
//       icon: User,
//       items: [
//         { label: 'Full Name', value: profileData.name, key: 'name' },
//         { label: 'Email', value: profileData.email, key: 'email' },
//         { label: 'Phone', value: profileData.phone, key: 'phone' },
//         { label: 'Address', value: profileData.address, key: 'address' }
//       ]
//     },
//     {
//       title: 'Account Details',
//       icon: CreditCard,
//       items: [
//         { label: 'Customer ID', value: profileData.customerID },
//         { label: 'Branch', value: profileData.branch },
//         { label: 'PAN Card', value: profileData.panCard },
//         { label: 'Aadhar Number', value: profileData.aadhar }
//       ]
//     },
//     {
//       title: 'Security',
//       icon: Shield,
//       items: [
//         { label: 'Change Password', action: () => navigate('/change-password') },
//         { label: 'UPI PIN', action: () => navigate('/upi-pin') },
//         { label: 'Biometric Login', action: () => navigate('/biometric-settings') }
//       ]
//     },
//     {
//       title: 'Preferences',
//       icon: Settings,
//       items: [
//         { label: 'Language', value: 'English', action: () => navigate('/language') },
//         { label: 'Notification Settings', action: () => navigate('/notifications') },
//         { label: 'Theme', value: 'System Default', action: () => navigate('/theme') }
//       ]
//     }
//   ];

//   const handleSave = () => {
//     setIsEditing(false);
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been successfully updated",
//     });
//   };

//   const copyUPIId = () => {
//     navigator.clipboard.writeText(profileData.upiId);
//     toast({
//       title: "UPI ID Copied",
//       description: "UPI ID has been copied to clipboard",
//     });
//   };

//   const handleLogout = () => {
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out",
//     });
//     navigate('/login');
//   };

//   return (
//     <BankingLayout showHeader={false}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <Button 
//               variant="ghost" 
//               size="sm" 
//               onClick={() => navigate('/dashboard')}
//               className="rounded-full p-2 hover:bg-gray-100"
//             >
//               <ArrowLeft className="h-5 w-5 text-gray-600" />
//             <h1 className="text-lg font-semibold text-gray-900 ml-2">Profile</h1>
//             </Button>
//             <div className="flex items-center gap-2">
//               <Button 
//                 variant="ghost" 
//                 size="sm"
//                 className="rounded-full p-2 hover:bg-gray-100"
//                 onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//               >
//                 {isEditing ? (
//                   <Save className="h-5 w-5 text-primary" />
//                 ) : (
//                   <Edit className="h-5 w-5 text-gray-600" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="px-6 space-y-6 pb-24">
//           {/* User Profile Header */}
//           <div className="relative mt-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl -rotate-1 scale-95"></div>
//             <Card className="relative bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="relative">
//                       <Avatar className="w-16 h-16 border-2 border-white shadow-md">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
//                           {profileData.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>
//                       {isEditing && (
//                         <Button 
//                           size="icon" 
//                           className="absolute -bottom-1 -right-1 rounded-full p-1 h-7 w-7 bg-white shadow-md hover:bg-gray-100"
//                         >
//                           <Camera className="h-3 w-3 text-gray-700" />
//                         </Button>
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs">
//                           Verified
//                         </Badge>
//                         <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs">
//                           Premium
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                   <Button 
//                     variant="outline" 
//                     size="sm" 
//                     className="rounded-full p-2 border-gray-200 hover:border-gray-300"
//                     onClick={() => navigate('/qr-code')}
//                   >
//                     <QrCode className="h-5 w-5 text-gray-600" />
//                   </Button>
//                 </div>

//                 <div className="mt-6 bg-gray-50 rounded-xl p-3">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500">UPI ID</p>
//                       <p className="text-sm font-medium text-gray-900">{profileData.upiId}</p>
//                     </div>
//                     <Button 
//                       variant="ghost" 
//                       size="sm" 
//                       onClick={copyUPIId} 
//                       className="text-primary hover:bg-blue-50"
//                     >
//                       <Copy className="h-4 w-4 mr-1" />
//                       Copy
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Rewards Section */}
//           <div className="grid grid-cols-2 gap-4">
//             <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 rounded-xl">
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
//                     <Trophy className="h-5 w-5 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-lg font-bold text-amber-800">₹82</p>
//                     <p className="text-xs text-amber-700">Rewards earned</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 rounded-xl">
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
//                     <Users className="h-5 w-5 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-lg font-bold text-blue-800">₹201</p>
//                     <p className="text-xs text-blue-700">Refer a friend</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions */}
//           <div>
//             <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h3>
//             <div className="grid grid-cols-4 gap-3">
//               {quickActions.map((action, index) => {
//                 const IconComponent = action.icon;
//                 return (
//                   <Button
//                     key={index}
//                     variant="ghost"
//                     className="flex-col h-20 p-2 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group"
//                     onClick={action.action}
//                   >
//                     <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-1 shadow-md group-hover:scale-105 transition-transform`}>
//                       <IconComponent className="h-5 w-5 text-white" />
//                     </div>
//                     <span className="text-xs font-medium text-gray-700">{action.label}</span>
//                   </Button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Profile Sections */}
//           <div className="space-y-4">
//             {accountSections.map((section, sectionIndex) => (
//               <Card key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden">
//                 <CardHeader 
//                   className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                   onClick={() => toggleSection(section.title)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                         <section.icon className="h-5 w-5 text-gray-600" />
//                       </div>
//                       <h3 className="font-semibold text-gray-900">{section.title}</h3>
//                     </div>
//                     <ChevronDown 
//                       className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === section.title ? 'rotate-180' : ''}`}
//                     />
//                   </div>
//                 </CardHeader>
                
//                 {(expandedSection === section.title || isEditing) && (
//                   <CardContent className="p-4 pt-0 border-t border-gray-100">
//                     <div className="space-y-4">
//                       {section.items.map((item, itemIndex) => (
//                         <div key={itemIndex} className="flex items-start justify-between">
//                           <div>
//                             <p className="text-sm text-gray-500">{item.label}</p>
//                             {isEditing && item.key ? (
//                               <Input
//                                 value={item.value}
//                                 onChange={(e) => setProfileData({
//                                   ...profileData,
//                                   [item.key!]: e.target.value
//                                 })}
//                                 className="mt-1 rounded-xl bg-gray-50 border-gray-200"
//                               />
//                             ) : (
//                               <p className="text-sm font-medium text-gray-900 mt-1">
//                                 {item.value}
//                               </p>
//                             )}
//                           </div>
//                           {item.action && (
//                             <Button 
//                               variant="ghost" 
//                               size="sm" 
//                               className="text-primary hover:bg-blue-50"
//                               onClick={item.action}
//                             >
//                               Change
//                             </Button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>

//           {/* Support Section */}
//           <Card className="border border-blue-100 bg-blue-50 rounded-xl">
//             <CardContent className="p-5">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <HelpCircle className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-blue-700">
//                       <Phone className="h-4 w-4 mr-3" />
//                       <span className="text-sm">Customer Care: 1800-123-4567</span>
//                     </div>
//                     <div className="flex items-center text-blue-700">
//                       <Mail className="h-4 w-4 mr-3" />
//                       <span className="text-sm">Email: support@psbank.in</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Logout Button */}
//           <Button 
//             variant="ghost" 
//             className="w-full h-12 text-red-600 hover:bg-red-50 rounded-xl"
//             onClick={handleLogout}
//           >
//             <LogOut className="h-5 w-5 mr-2 text-red-600" />
//             Logout
//           </Button>
//         </div>
//       </div>
//       <BottomNavigation />
//     </BankingLayout>
//   );
// };

// export default Profile;


