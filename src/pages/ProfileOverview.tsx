
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Shield,
  User,
  Calendar,
  Building,
  CreditCard,
  FileText,
  Settings,
  ChevronRight,
  Star,
  Headphones
} from 'lucide-react';

const ProfileOverview = () => {
  const navigate = useNavigate();
  const [kycStatus] = useState<'verified' | 'pending' | 'required'>('verified');

  const userInfo = {
    name: 'Rajesh Kumar',
    phone: '+91 99974 29796',
    email: 'rajesh.kumar@email.com',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    customerId: 'PSB123456789',
    accountSince: 'January 2020',
    branch: 'Andheri West Branch',
    rm: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@psb.co.in'
    }
  };

  const profileActions = [
    {
      icon: <Edit className="h-5 w-5" />,
      title: 'Edit Profile',
      description: 'Update personal information',
      action: () => navigate('/edit-profile')
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Update KYC',
      description: 'Keep your documents updated',
      action: () => navigate('/update-kyc'),
      badge: kycStatus === 'pending' ? 'Pending' : kycStatus === 'required' ? 'Required' : undefined
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Linked Accounts',
      description: 'Manage bank accounts',
      action: () => navigate('/accounts-list')
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Documents',
      description: 'View uploaded documents',
      action: () => navigate('/digital-locker')
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Preferences',
      description: 'App settings & notifications',
      action: () => navigate('/settings')
    }
  ];

  const getKycBadgeColor = () => {
    switch (kycStatus) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'required': return 'bg-red-100 text-red-800';
    }
  };

  const getKycText = () => {
    switch (kycStatus) {
      case 'verified': return 'KYC Verified';
      case 'pending': return 'KYC Pending';
      case 'required': return 'KYC Required';
    }
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/edit-profile')}
            className="rounded-full p-2"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{userInfo.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">Customer ID: {userInfo.customerId}</p>
                <Badge className={`text-xs ${getKycBadgeColor()}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getKycText()}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userInfo.email}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Since {userInfo.accountSince}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userInfo.branch}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{userInfo.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relationship Manager */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Your Relationship Manager
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userInfo.rm.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userInfo.rm.name}</p>
                  <p className="text-sm text-muted-foreground">{userInfo.rm.phone}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.location.href = `tel:${userInfo.rm.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Actions */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Manage Profile</h3>
            <div className="space-y-3">
              {profileActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {action.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/chat-support')}>
                <Headphones className="h-5 w-5" />
                <span className="text-sm">Chat Support</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/help-center')}>
                <FileText className="h-5 w-5" />
                <span className="text-sm">Help Center</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default ProfileOverview;
