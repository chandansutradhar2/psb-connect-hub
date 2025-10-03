import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Shield, Smartphone, Lock, Eye, Settings, Fingerprint, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SecurityControlsWidget = () => {
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);

  const securitySettings = [
    {
      id: 1,
      title: 'Biometric Login',
      description: 'Use fingerprint or face ID',
      enabled: biometricEnabled,
      toggle: setBiometricEnabled,
      icon: <Fingerprint className="h-4 w-4" />,
      status: 'secure'
    },
    {
      id: 2,
      title: 'SMS Alerts',
      description: 'Transaction notifications',
      enabled: smsAlertsEnabled,
      toggle: setSmsAlertsEnabled,
      icon: <Smartphone className="h-4 w-4" />,
      status: 'active'
    }
  ];

  const quickSecurityActions = [
    {
      title: 'Block Cards',
      description: 'Instantly block all cards',
      icon: <Lock className="h-4 w-4" />,
      action: () => navigate('/cards-management'),
      urgency: 'high',
      color: 'bg-red-100 text-red-600 hover:bg-red-200'
    },
    {
      title: 'Reset UPI PIN',
      description: 'Change UPI PIN securely',
      icon: <Settings className="h-4 w-4" />,
      action: () => navigate('/upi-profile'),
      urgency: 'medium',
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    },
    {
      title: 'View Login History',
      description: 'Check recent logins',
      icon: <Eye className="h-4 w-4" />,
      action: () => navigate('/security-settings'),
      urgency: 'low',
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    }
  ];

  const deviceSecurity = {
    lastLogin: '2 hours ago',
    loginLocation: 'Mumbai, Maharashtra',
    deviceName: 'iPhone 14 Pro',
    trustedDevices: 3,
    suspiciousActivity: false
  };

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Shield className="h-4 w-4 text-blue-600 mr-2" />
            Security & Controls
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/security-settings')}
          >
            Settings
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
              <Shield className="h-3 w-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">Account Secure</p>
              <p className="text-xs text-blue-600">All security features are active</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              Protected
            </Badge>
          </div>
        </div>

        {/* Security Settings Toggles */}
        <div className="space-y-3">
          {securitySettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  {setting.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{setting.title}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${setting.enabled ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  {setting.enabled ? 'ON' : 'OFF'}
                </Badge>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={setting.toggle}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Device Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Smartphone className="h-3 w-3 mr-1" />
            Device Security
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Login:</span>
              <span className="font-medium">{deviceSecurity.lastLogin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{deviceSecurity.loginLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device:</span>
              <span className="font-medium">{deviceSecurity.deviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trusted Devices:</span>
              <span className="font-medium">{deviceSecurity.trustedDevices}</span>
            </div>
          </div>
        </div>

        {/* Quick Security Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            {quickSecurityActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 text-left w-full ${action.color}`}
              >
                <div className="p-1.5 bg-white/80 rounded">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs opacity-80">{action.description}</p>
                </div>
                <ChevronRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-border pt-3">
          <Button 
            variant="outline" 
            className="w-full h-9 text-sm border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => navigate('/support')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Suspicious Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};