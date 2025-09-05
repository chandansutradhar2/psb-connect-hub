import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, User, Shield, Bell, Globe, Moon, LogOut } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <BankingLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Settings
          </h1>
        </div>

        {/* Account Settings */}
        <BankingCard>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">
            Account Settings
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start text-sm sm:text-base py-2 sm:py-3"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 mr-3" />
              Profile Management
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-sm sm:text-base py-2 sm:py-3"
              onClick={() => navigate('/security-settings')}
            >
              <Shield className="h-4 w-4 mr-3" />
              Security Settings
            </Button>
          </div>
        </BankingCard>

        {/* App Preferences */}
        <BankingCard>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">
            App Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <span className="text-sm sm:text-base">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4" />
                <span className="text-sm sm:text-base">Dark Mode</span>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span className="text-sm sm:text-base">Language</span>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                English
              </span>
            </div>
          </div>
        </BankingCard>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full py-2 sm:py-3 text-sm sm:text-base"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </BankingLayout>
  );
};

export default Settings;
