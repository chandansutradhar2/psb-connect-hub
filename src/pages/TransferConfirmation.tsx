import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  CreditCard,
  ArrowRight
} from 'lucide-react';

const TransferConfirmation = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const transferDetails = {
    fromAccount: 'Savings Account ****7890',
    fromBalance: 75420.50,
    toAccount: 'John Doe',
    toBankAccount: '****1234 • HDFC Bank',
    amount: 5000,
    transferType: 'IMPS',
    charges: 5,
    totalAmount: 5005,
    reference: 'Transfer to John',
    transactionId: 'TXN123456789'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleConfirm = () => {
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      navigate('/transfer-success');
    }, 2000);
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Confirm Transfer</h1>
        </div>

        {/* Transfer Summary */}
        <BankingCard>
          <h3 className="font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Transfer Summary
          </h3>
          
          <div className="space-y-4">
            {/* From Account */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">From</p>
                  <p className="text-sm text-muted-foreground">{transferDetails.fromAccount}</p>
                  <p className="text-xs text-muted-foreground">
                    Available: {formatCurrency(transferDetails.fromBalance)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* To Account */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-secondary/10">
                  <User className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">To</p>
                  <p className="text-sm font-semibold">{transferDetails.toAccount}</p>
                  <p className="text-xs text-muted-foreground">{transferDetails.toBankAccount}</p>
                </div>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Amount Details */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Amount Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Transfer Amount</span>
              <span className="font-semibold">{formatCurrency(transferDetails.amount)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Transfer Charges</span>
              <span>{formatCurrency(transferDetails.charges)}</span>
            </div>
            
            <hr className="border-border" />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">{formatCurrency(transferDetails.totalAmount)}</span>
            </div>
          </div>
        </BankingCard>

        {/* Transfer Type */}
        <BankingCard>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Transfer Type</h4>
              <p className="text-sm text-muted-foreground">Immediate transfer</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700">
                <Clock className="h-3 w-3 mr-1" />
                {transferDetails.transferType}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Instant</p>
            </div>
          </div>
        </BankingCard>

        {/* Reference */}
        <BankingCard>
          <div>
            <h4 className="font-semibold mb-2">Reference</h4>
            <p className="text-sm">{transferDetails.reference}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Transaction ID: {transferDetails.transactionId}
            </p>
          </div>
        </BankingCard>

        {/* OTP Verification */}
        <BankingCard>
          <h3 className="font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Verify Transaction
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter OTP sent to your registered mobile</Label>
              <Input 
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              Resend OTP
            </Button>
          </div>
        </BankingCard>

        {/* Security Notice */}
        <BankingCard className="bg-orange-50 border-orange-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-800">Security Notice</h4>
              <p className="text-sm text-orange-700 mt-1">
                Never share your OTP with anyone. Bank will never ask for OTP over phone or email.
              </p>
            </div>
          </div>
        </BankingCard>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleConfirm}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? 'Processing...' : 'Confirm Transfer'}
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default TransferConfirmation;