import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  QrCode, 
  Send, 
  Download, 
  CreditCard, 
  Settings,
  Smartphone,
  Users,
  Plus,
  Copy,
  Eye,
  MoreHorizontal
} from 'lucide-react';

const UPIHome = () => {
  const navigate = useNavigate();
  const [upiPin, setUpiPin] = useState('');

  const upiIds = [
    { id: '1', upi: 'rajesh@psbank', bank: 'Bank Name', status: 'Primary', isDefault: true },
    { id: '2', upi: 'rajesh.kumar@psbank', bank: 'Bank Name', status: 'Active', isDefault: false },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'sent',
      amount: 500,
      to: 'john@paytm',
      name: 'John Doe',
      date: '2024-01-15',
      status: 'Success'
    },
    {
      id: '2',
      type: 'received',
      amount: 1000,
      from: 'sarah@phonepe',
      name: 'Sarah Wilson',
      date: '2024-01-15',
      status: 'Success'
    },
    {
      id: '3',
      type: 'sent',
      amount: 250,
      to: 'mike@googlepay',
      name: 'Mike Johnson',
      date: '2024-01-14',
      status: 'Success'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">UPI</h1>
          </div>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => navigate('/qr-payment')}
          >
            <QrCode className="h-6 w-6 mb-2" />
            <span className="text-xs">Scan QR</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <Send className="h-6 w-6 mb-2" />
            <span className="text-xs">Pay</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <Download className="h-6 w-6 mb-2" />
            <span className="text-xs">Request</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <CreditCard className="h-6 w-6 mb-2" />
            <span className="text-xs">My QR</span>
          </Button>
        </div>

        {/* UPI IDs */}
        <BankingCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">My UPI IDs</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
          
          <div className="space-y-3">
            {upiIds.map((upi) => (
              <div key={upi.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Smartphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{upi.upi}</p>
                      {upi.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{upi.bank}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(upi.upi)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </BankingCard>

        {/* Send Money */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Send Money</h3>
          
          <div className="space-y-4">
            <Input 
              placeholder="Enter UPI ID or mobile number"
              className="h-12"
            />
            
            <div className="grid grid-cols-3 gap-2">
              {['₹100', '₹500', '₹1000'].map((amount) => (
                <Button key={amount} variant="outline" size="sm">
                  {amount}
                </Button>
              ))}
            </div>
            
            <Button className="w-full h-12">
              <Send className="h-4 w-4 mr-2" />
              Send Money
            </Button>
          </div>
        </BankingCard>

        {/* Recent Transactions */}
        <BankingCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent UPI Transactions</h3>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'sent' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {transaction.type === 'sent' ? (
                      <Send className="h-4 w-4" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.type === 'sent' ? `To: ${transaction.to}` : `From: ${transaction.from}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </BankingCard>

        {/* Popular Apps */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Popular UPI Apps</h3>
          
          <div className="grid grid-cols-4 gap-4">
            {['PhonePe', 'Paytm', 'Google Pay', 'Amazon Pay'].map((app) => (
              <Button key={app} variant="outline" className="h-16 flex-col">
                <div className="w-8 h-8 bg-muted rounded-lg mb-1"></div>
                <span className="text-xs">{app}</span>
              </Button>
            ))}
          </div>
        </BankingCard>

        {/* UPI PIN Setup */}
        <BankingCard className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">UPI PIN</h4>
          <p className="text-sm text-blue-700 mb-3">
            Set up your UPI PIN to start making transactions securely.
          </p>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Set UPI PIN
          </Button>
        </BankingCard>
      </div>
    </BankingLayout>
  );
};

export default UPIHome;