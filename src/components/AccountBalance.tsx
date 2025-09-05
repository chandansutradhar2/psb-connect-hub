import { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BankingCard } from './BankingCard';

interface AccountBalanceProps {
  accountNumber: string;
  balance: number;
  accountType: string;
  isLoading?: boolean;
}

export const AccountBalance = ({ 
  accountNumber, 
  balance, 
  accountType,
  isLoading = false 
}: AccountBalanceProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const maskAccountNumber = (accountNum: string) => {
    if (accountNum.length <= 4) return accountNum;
    return `***${accountNum.slice(-4)}`;
  };

  return (
    <BankingCard variant="gradient" className="relative overflow-hidden rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-primary-foreground/80 text-sm">Available Balance</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="amount-display text-white">
              {showBalance ? formatBalance(balance) : '••••••••'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-primary-foreground/80 text-sm">{accountType}</p>
          <p className="text-primary-foreground font-medium">
            {maskAccountNumber(accountNumber)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-primary-foreground/80 text-xs">Punjab & Sind Bank</p>
          <p className="text-primary-foreground/80 text-xs">IFSC: PSIB0000001</p>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
    </BankingCard>
  );
};