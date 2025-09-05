
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { AccountBalance } from '@/components/AccountBalance';
import { TransactionItem } from '@/components/TransactionItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Download,
  Send,
  Eye,
  EyeOff,
  Copy,
  Share,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw
} from 'lucide-react';

const AccountDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  
  const accountNumber = location.state?.accountNumber || "1234567890";
  
  const accountInfo = {
    accountNumber: accountNumber,
    balance: 45250.26,
    accountType: "Savings Account",
    branch: "Andheri West Branch",
    ifscCode: "PSIB0000001",
    branchCode: "001",
    customerName: "Rajesh Kumar",
    accountStatus: "Active",
    overdraftLimit: 0,
    availableBalance: 45250.26
  };

  const recentTransactions = [
    {
      id: '1',
      type: 'debit' as const,
      amount: 2500,
      description: 'UPI Payment to John Doe',
      date: '2024-01-15T10:30:00Z',
      status: 'completed' as const,
      reference: 'UPI123456789'
    },
    {
      id: '2',
      type: 'credit' as const,
      amount: 75000,
      description: 'Salary Credit',
      date: '2024-01-13T09:00:00Z',
      status: 'completed' as const,
      reference: 'SAL202401'
    },
    {
      id: '3',
      type: 'debit' as const,
      amount: 199,
      description: 'Netflix Subscription',
      date: '2024-01-12T16:45:00Z',
      status: 'completed' as const,
      reference: 'AUTO123'
    },
    {
      id: '4',
      type: 'debit' as const,
      amount: 1250,
      description: 'Electricity Bill Payment',
      date: '2024-01-11T14:20:00Z',
      status: 'completed' as const,
      reference: 'BILL456'
    },
    {
      id: '5',
      type: 'credit' as const,
      amount: 5000,
      description: 'Fund Transfer from Mom',
      date: '2024-01-10T11:15:00Z',
      status: 'completed' as const,
      reference: 'TXN789'
    }
  ];

  const quickActions = [
    {
      icon: <Send className="h-5 w-5" />,
      title: "Transfer",
      action: () => navigate('/transfer', { state: { fromAccount: accountNumber } })
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Statement",
      action: () => navigate('/download-statement', { state: { accountNumber } })
    },
    {
      icon: <Copy className="h-5 w-5" />,
      title: "Copy Details",
      action: () => {
        navigator.clipboard.writeText(`Account: ${accountNumber}\nIFSC: ${accountInfo.ifscCode}`);
      }
    },
    {
      icon: <Share className="h-5 w-5" />,
      title: "Share",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Account Details',
            text: `Account Number: ${accountNumber}\nIFSC Code: ${accountInfo.ifscCode}`
          });
        }
      }
    }
  ];

  const maskAccountNumber = (accountNum: string) => {
    if (!showAccountNumber) {
      return `***${accountNum.slice(-4)}`;
    }
    return accountNum;
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/accounts-list')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Account Details</h1>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Account Balance */}
        <AccountBalance
          accountNumber={accountInfo.accountNumber}
          balance={accountInfo.balance}
          accountType={accountInfo.accountType}
          isLoading={false}
        />

        {/* Account Information */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Account Information</h3>
              <Badge className={accountInfo.accountStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {accountInfo.accountStatus}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{maskAccountNumber(accountInfo.accountNumber)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="p-1 h-auto"
                    >
                      {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                  <p className="font-medium">{accountInfo.ifscCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium">{accountInfo.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{accountInfo.customerName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="font-medium text-green-600">₹{accountInfo.availableBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch Code</p>
                  <p className="font-medium">{accountInfo.branchCode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 flex-col gap-2"
                  onClick={action.action}
                >
                  {action.icon}
                  <span className="text-xs">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/transaction-history', { state: { accountNumber } })}
                >
                  View All
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => navigate('/transaction-details', { state: { transactionId: transaction.id } })}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default AccountDetails;
