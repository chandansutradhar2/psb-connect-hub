
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QrCode, Eye, EyeOff, History, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountOverviewProps {
  userInfo: {
    name: string;
    accountNumber: string;
    balance: number;
    upiId: string;
  };
}

export const AccountOverview = ({ userInfo }: AccountOverviewProps) => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className={cn(
      "banking-gradient text-white shadow-xl mt-6 rounded-3xl overflow-hidden",
      "border-0 backdrop-blur-sm animate-fade-in"
    )}>
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Available Balance
              </p>
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white text-xs font-semibold border-0 px-2 py-0.5"
              >
                LIVE
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <h2 className={cn(
                "text-3xl font-bold tracking-tight transition-all duration-300",
                showBalance ? "text-white" : "text-white/60"
              )}>
                {showBalance ? formatCurrency(userInfo.balance) : '••••••••'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/10 rounded-2xl w-10 h-10 transition-all duration-200 focus-ring"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
            
            <p className="text-sm text-white/70 font-medium">
              Account •••• {userInfo.accountNumber.slice(-4)}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/upi-profile')}
            className="text-white hover:bg-white/10 rounded-2xl w-12 h-12 transition-all duration-200 focus-ring"
          >
            <QrCode className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{userInfo.upiId}</span>
              <Badge 
                variant="secondary" 
                className="bg-white/15 text-white text-xs font-semibold border border-white/20 px-2 py-1"
              >
                UPI ID
              </Badge>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "text-white hover:bg-white/10 rounded-xl px-4 py-2",
              "transition-all duration-200 focus-ring font-semibold"
            )}
            onClick={() => navigate('/transaction-history')}
          >
            <History className="h-4 w-4 mr-2" />
            History
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
