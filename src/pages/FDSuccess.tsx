
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Share, Calendar, PiggyBank } from 'lucide-react';

const FDSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fdData, maturityAmount } = location.state || {};

  const fdNumber = `FD${Date.now().toString().slice(-8)}`;
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + (fdData?.tenure?.[0] || 12));

  return (
    <BankingLayout>
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">FD Created Successfully!</h1>
          <p className="text-muted-foreground">Your Fixed Deposit has been created and activated</p>
        </div>

        {/* FD Details Card */}
        <BankingCard className="text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PiggyBank className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Fixed Deposit</h3>
              <p className="text-sm text-muted-foreground">FD Number: {fdNumber}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Principal Amount:</span>
              <span className="font-semibold">₹{parseFloat(fdData?.amount || '0').toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Interest Rate:</span>
              <span className="font-semibold text-blue-600">7.5% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tenure:</span>
              <span className="font-semibold">{fdData?.tenure?.[0]} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maturity Date:</span>
              <span className="font-semibold">{maturityDate.toLocaleDateString('en-IN')}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Maturity Amount:</span>
              <span className="font-bold text-primary">₹{(maturityAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </BankingCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex-col h-16 gap-1">
            <Download className="h-4 w-4" />
            <span className="text-xs">Download Receipt</span>
          </Button>
          <Button variant="outline" className="flex-col h-16 gap-1">
            <Share className="h-4 w-4" />
            <span className="text-xs">Share Details</span>
          </Button>
          <Button variant="outline" className="flex-col h-16 gap-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Set Reminder</span>
          </Button>
          <Button variant="outline" className="flex-col h-16 gap-1" onClick={() => navigate('/deposit-services')}>
            <PiggyBank className="h-4 w-4" />
            <span className="text-xs">View All FDs</span>
          </Button>
        </div>

        {/* Important Notes */}
        <BankingCard>
          <h4 className="font-semibold mb-3">Important Information</h4>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li>• Interest will be credited as per the selected payout option</li>
            <li>• Premature withdrawal is allowed with penalty charges</li>
            <li>• TDS will be deducted as per Income Tax rules</li>
            <li>• You will receive SMS/Email confirmations shortly</li>
          </ul>
        </BankingCard>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('/fd-creation')} className="w-full">
            Create Another FD
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default FDSuccess;
