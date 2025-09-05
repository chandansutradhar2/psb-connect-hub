import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, EyeOff, Download, Share, RefreshCw, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

const AccountSummary = () => {
  const navigate = useNavigate();
  const [showBalances, setShowBalances] = useState(true);

  const accounts = [
    {
      id: '1',
      type: 'Savings Account',
      number: '1234567890',
      balance: 75420.50,
      status: 'Active',
      branch: 'Main Branch, New Delhi'
    },
    {
      id: '2',
      type: 'Current Account',
      number: '2345678901',
      balance: 125890.75,
      status: 'Active',
      branch: 'Business Center, Mumbai'
    },
    {
      id: '3',
      type: 'Fixed Deposit',
      number: '3456789012',
      balance: 500000.00,
      status: 'Active',
      branch: 'Main Branch, New Delhi',
      maturityDate: '2024-12-31'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Account Summary</h1>
        </div>

        {/* Total Balance Overview */}
        <BankingCard className="bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-primary-foreground/80 text-sm mb-2">Total Balance</p>
              <h2 className="text-3xl font-bold">
                {showBalances ? formatCurrency(totalBalance) : '••••••••'}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
              className="text-white hover:bg-white/20"
            >
              {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </BankingCard>

        {/* Account List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">My Accounts</h3>
          
          {accounts.map((account) => (
            <BankingCard key={account.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{account.type}</h4>
                    <p className="text-sm text-muted-foreground">***{account.number.slice(-4)}</p>
                    <p className="text-xs text-muted-foreground">{account.branch}</p>
                    {account.maturityDate && (
                      <p className="text-xs text-orange-600">Matures: {account.maturityDate}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {showBalances ? formatCurrency(account.balance) : '••••••'}
                  </p>
                  <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                    {account.status}
                  </Badge>
                </div>
              </div>
            </BankingCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-14"
            onClick={() => navigate('/mini-statement')}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Mini Statement
          </Button>
          <Button 
            variant="outline" 
            className="h-14"
            onClick={() => navigate('/account-statement')}
          >
            <TrendingDown className="h-5 w-5 mr-2" />
            Full Statement
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default AccountSummary;