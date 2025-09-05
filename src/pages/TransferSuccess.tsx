import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Download, 
  Share, 
  Copy, 
  ArrowLeft,
  User,
  CreditCard,
  Calendar,
  Hash
} from 'lucide-react';

const TransferSuccess = () => {
  const navigate = useNavigate();

  const transferDetails = {
    status: 'Success',
    amount: 5000,
    charges: 5,
    totalAmount: 5005,
    fromAccount: 'Savings Account ****7890',
    toAccount: 'John Doe',
    toBankAccount: '****1234 • HDFC Bank',
    transactionId: 'TXN123456789',
    referenceNo: 'PSB240115001234',
    date: new Date().toLocaleDateString('en-IN'),
    time: new Date().toLocaleTimeString('en-IN'),
    transferType: 'IMPS'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Success Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-700">Transfer Successful!</h1>
          <p className="text-muted-foreground mt-2">Your money has been transferred successfully</p>
        </div>

        {/* Transaction Details */}
        <BankingCard>
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(transferDetails.amount)}
            </p>
            <Badge className="bg-green-100 text-green-700">
              {transferDetails.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">From</span>
              </div>
              <span className="text-sm font-medium">{transferDetails.fromAccount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">To</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{transferDetails.toAccount}</p>
                <p className="text-xs text-muted-foreground">{transferDetails.toBankAccount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Date & Time</span>
              </div>
              <span className="text-sm">{transferDetails.date} • {transferDetails.time}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Transaction ID</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{transferDetails.transactionId}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(transferDetails.transactionId)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Reference Number</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{transferDetails.referenceNo}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(transferDetails.referenceNo)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Amount Breakdown */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Amount Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Transfer Amount</span>
              <span>{formatCurrency(transferDetails.amount)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Transfer Charges</span>
              <span>{formatCurrency(transferDetails.charges)}</span>
            </div>
            
            <hr className="border-border" />
            
            <div className="flex justify-between font-semibold">
              <span>Total Debited</span>
              <span>{formatCurrency(transferDetails.totalAmount)}</span>
            </div>
          </div>
        </BankingCard>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-14">
            <Download className="h-5 w-5 mr-2" />
            Download Receipt
          </Button>
          
          <Button variant="outline" className="h-14">
            <Share className="h-5 w-5 mr-2" />
            Share Receipt
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/dashboard')}>
            Back to Home
          </Button>
          <Button className="flex-1" onClick={() => navigate('/transfer')}>
            Transfer Again
          </Button>
        </div>

        {/* Important Note */}
        <BankingCard className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
          <p className="text-sm text-blue-700">
            Save this receipt for your records. The transaction reference number can be used 
            to track this transaction or raise any queries.
          </p>
        </BankingCard>
      </div>
    </BankingLayout>
  );
};

export default TransferSuccess;