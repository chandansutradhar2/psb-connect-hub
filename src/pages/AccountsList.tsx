
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { AccountBalance } from '@/components/AccountBalance';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Plus,
  Eye,
  Download,
  ArrowRight,
  CreditCard,
  PiggyBank,
  Building,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const AccountsList = () => {
  const navigate = useNavigate();

  const accounts = [
    {
      accountNumber: "1234567890",
      balance: 45250.26,
      accountType: "Savings Account",
      branch: "Andheri West",
      isLoading: false,
      isPrimary: true
    },
    {
      accountNumber: "1234567891", 
      balance: 125000.00,
      accountType: "Current Account",
      branch: "Andheri West",
      isLoading: false,
      isPrimary: false
    },
    {
      accountNumber: "1234567892",
      balance: 250000.00,
      accountType: "Salary Account", 
      branch: "Andheri West",
      isLoading: false,
      isPrimary: false
    }
  ];

  const fixedDeposits = [
    {
      fdNumber: "FD001234",
      principalAmount: 100000,
      maturityAmount: 112000,
      interestRate: 6.5,
      maturityDate: "2024-12-15",
      tenure: "2 years"
    },
    {
      fdNumber: "FD001235", 
      principalAmount: 200000,
      maturityAmount: 230000,
      interestRate: 7.0,
      maturityDate: "2025-03-20",
      tenure: "18 months"
    }
  ];

  const accountActions = [
    {
      icon: <Eye className="h-5 w-5" />,
      title: "View Details",
      action: (accountNumber: string) => navigate('/account-details', { state: { accountNumber } })
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Download Statement",
      action: (accountNumber: string) => navigate('/download-statement', { state: { accountNumber } })
    },
    {
      icon: <ArrowRight className="h-5 w-5" />,
      title: "Transfer Funds",
      action: () => navigate('/transfer')
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    });
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
          <h1 className="text-lg font-semibold">My Accounts</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/open-account')}
            className="rounded-full p-2"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bank Accounts</h3>
          {accounts.map((account, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {account.isPrimary && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Primary
                    </Badge>
                  )}
                </div>
              </div>
              
              <AccountBalance
                accountNumber={account.accountNumber}
                balance={account.balance}
                accountType={account.accountType}
                isLoading={account.isLoading}
              />

              <div className="grid grid-cols-3 gap-2">
                {accountActions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant="outline"
                    size="sm"
                    className="h-12 flex-col gap-1"
                    onClick={() => action.action(account.accountNumber)}
                  >
                    {action.icon}
                    <span className="text-xs">{action.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Deposits */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                Fixed Deposits
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/open-fd')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New FD
              </Button>
            </div>

            <div className="space-y-4">
              {fixedDeposits.map((fd, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-all"
                  onClick={() => navigate('/fd-details', { state: { fdNumber: fd.fdNumber } })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">FD #{fd.fdNumber}</p>
                      <p className="text-sm text-muted-foreground">{fd.tenure} tenure</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {fd.interestRate}% p.a.
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Principal</p>
                      <p className="font-semibold">{formatCurrency(fd.principalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Maturity Amount</p>
                      <p className="font-semibold text-blue-600">{formatCurrency(fd.maturityAmount)}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Matures on</p>
                      <p className="text-sm font-medium">{formatDate(fd.maturityDate)}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Services */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Services</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/cheque-services')}
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Cheque Services</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/statements-center')}
              >
                <Download className="h-5 w-5" />
                <span className="text-sm">Statements</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/open-fd')}
              >
                <PiggyBank className="h-5 w-5" />
                <span className="text-sm">Open FD</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/open-account')}
              >
                <Building className="h-5 w-5" />
                <span className="text-sm">New Account</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default AccountsList;
