
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Copy,
  QrCode,
  CreditCard,
  Settings,
  HelpCircle,
  Globe,
  Bell,
  Shield,
  Users,
  Gift,
  Trophy,
  Plus,
  ChevronRight,
  User,
  Banknote,
  History,
  Building,
  Zap,
  MoreHorizontal,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UPIProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rewardsEarned] = useState(6);
  const [referralAmount] = useState(201);

  const upiId = "ydavdeepakkumar56@oksbi";
  const userName = "Deepak Yadav";
  const phoneNumber = "9967429975";

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
  };

  // Payment Methods Setup
  const paymentMethods = [
    { 
      icon: Building, 
      label: 'Bank account', 
      subtitle: '2 accounts', 
      status: 'active',
      isSetup: true
    },
    { 
      icon: CreditCard, 
      label: 'RuPay credit card', 
      subtitle: 'Pay with UPI', 
      status: 'inactive',
      isSetup: false
    },
    { 
      icon: Zap, 
      label: 'UPI Lite', 
      subtitle: 'Pay PIN-free', 
      status: 'inactive',
      isSetup: false
    },
  ];

  // Main Services
  const mainServices = [
    { 
      icon: CreditCard, 
      label: 'Pay with credit or debit cards', 
      subtitle: 'Pay bills with your card',
      hasAdd: true,
      action: 'Add'
    },
    { 
      icon: QrCode, 
      label: 'Your QR code', 
      subtitle: 'Use to receive money from any UPI app'
    },
    { 
      icon: History, 
      label: 'Autopay', 
      subtitle: 'No pending requests'
    },
    { 
      icon: Shield, 
      label: 'UPI Circle', 
      subtitle: 'Help people you trust make UPI payments',
      isNew: true
    },
  ];

  // Account Management
  const accountServices = [
    { icon: Settings, label: 'Settings' },
    { icon: User, label: 'Manage Google account' },
    { icon: HelpCircle, label: 'Get help' },
    { icon: Globe, label: 'Language', subtitle: 'English' },
  ];

  return (
    <BankingLayout showHeader={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        {/* Header */}
        <div className="bg-transparent px-4 py-4 relative">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="rounded-full p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="px-4 space-y-6 pb-24 -mt-2">
          {/* User Profile Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{userName}</h1>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-sm text-gray-600">UPI ID:</span>
              <span className="text-sm font-medium text-gray-900">{upiId}</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">{phoneNumber}</span>
                <Badge className="bg-blue-100 text-blue-700 rounded-xl flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  UPI number
                </Badge>
              </div>
            </div>

            {/* QR Code Circle */}
            <div className="relative mx-auto mb-6">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto border-4 border-blue-100">
                <QrCode className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-3xl">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-purple-700">{rewardsEarned}</p>
                <p className="text-sm text-purple-600">rewards</p>
                <Button size="sm" className="mt-2 bg-purple-500 hover:bg-purple-600 rounded-xl">
                  View now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 rounded-3xl">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-cyan-700">Get ₹{referralAmount}</p>
                <p className="text-sm text-cyan-600">Refer a friend</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Setup */}
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Set up payment methods</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">1/3</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center border-2 ${
                          method.isSetup 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-white border-dashed border-gray-300'
                        }`}>
                          {method.isSetup ? (
                            <IconComponent className="h-6 w-6" />
                          ) : (
                            <Plus className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{method.label}</h4>
                          <p className="text-sm text-gray-600">{method.subtitle}</p>
                        </div>
                      </div>
                      {!method.isSetup && (
                        <Button size="sm" className="rounded-2xl">
                          Add
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Services */}
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {mainServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-3xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{service.label}</h4>
                            {service.isNew && (
                              <Badge className="bg-blue-100 text-blue-600 text-xs rounded-xl">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{service.subtitle}</p>
                        </div>
                      </div>
                      {service.hasAdd && (
                        <Button size="sm" variant="outline" className="rounded-2xl text-primary border-primary">
                          {service.action}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {accountServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <button 
                      key={index} 
                      className="w-full flex items-center justify-between p-1 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-3xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.label}</h4>
                          {service.subtitle && (
                            <p className="text-sm text-gray-600">{service.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation Placeholder */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex justify-around max-w-sm mx-auto">
            <button className="flex flex-col items-center gap-1 text-primary">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-xs">₹</span>
              </div>
              <span className="text-xs">Money</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <User className="h-6 w-6" />
              <span className="text-xs">You</span>
            </button>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default UPIProfile;
