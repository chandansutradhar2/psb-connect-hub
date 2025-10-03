
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Shield,
  User,
  FileText,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const InsuranceReviewPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, insuranceType, kycData, coverageData } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = () => {
    if (termsAccepted && declarationAccepted) {
      navigate('/insurance-policy-success', { 
        state: { 
          plan, 
          insuranceType, 
          kycData, 
          coverageData, 
          paymentMethod,
          policyNumber: `PSB${insuranceType.toUpperCase()}${Date.now()}`
        } 
      });
    }
  };

  const canProceed = termsAccepted && declarationAccepted;

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Review & Payment</h1>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="flex items-center space-x-2 px-4">
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Step 4 of 4</p>

        {/* Policy Summary */}
        <BankingCard title="Policy Summary" icon={<Shield className="h-5 w-5" />} className="rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{plan?.name}</h3>
                <p className="text-sm text-muted-foreground">{plan?.insurer}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-psb-primary">{formatCurrency(coverageData?.sumAssured || 500000)}</p>
                <p className="text-xs text-muted-foreground">Sum Assured</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Policy Term</p>
                <p className="font-medium">{coverageData?.term} Year{coverageData?.term !== '1' ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Premium Frequency</p>
                <p className="font-medium capitalize">{coverageData?.premiumFrequency}</p>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Insured Person Details */}
        <BankingCard title="Insured Person" icon={<User className="h-5 w-5" />} className="rounded-2xl">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{kycData?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Birth:</span>
              <span className="font-medium">{kycData?.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile:</span>
              <span className="font-medium">{kycData?.mobile}</span>
            </div>
            {kycData?.nomineeName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nominee:</span>
                <span className="font-medium">{kycData.nomineeName} ({kycData.nomineeRelation})</span>
              </div>
            )}
          </div>
        </BankingCard>

        {/* Premium Breakdown */}
        <BankingCard title="Premium Breakdown" icon={<FileText className="h-5 w-5" />} className="rounded-2xl">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Premium</span>
              <span>{formatCurrency(coverageData?.calculatedPremium * 0.85 || 10200)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Tax (18%)</span>
              <span>{formatCurrency(coverageData?.calculatedPremium * 0.15 || 1800)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Premium</span>
              <span className="text-psb-primary">{formatCurrency(coverageData?.calculatedPremium || 12000)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {coverageData?.premiumFrequency === 'monthly' ? 'Monthly' : 
               coverageData?.premiumFrequency === 'quarterly' ? 'Quarterly' : 'Annual'} Premium
            </p>
          </div>
        </BankingCard>

        {/* Payment Methods */}
        <BankingCard title="Select Payment Method" className="rounded-2xl">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="upi" className="font-medium">UPI Payment</Label>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Instant</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Building className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="netbanking" className="font-medium">Net Banking</Label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <Label htmlFor="card" className="font-medium">Debit/Credit Card</Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </BankingCard>

        {/* Terms & Conditions */}
        <BankingCard className="rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked: boolean | 'indeterminate') => setTermsAccepted(checked === true)}
              />
              <div>
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I have read and agree to the <span className="text-psb-primary underline">Terms & Conditions</span> and <span className="text-psb-primary underline">Privacy Policy</span>
                </Label>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="declaration"
                checked={declarationAccepted}
                onCheckedChange={(checked: boolean | 'indeterminate') => setDeclarationAccepted(checked === true)}
              />
              <div>
                <Label htmlFor="declaration" className="text-sm leading-relaxed">
                  I declare that all information provided is true and accurate. I understand that any false information may void the policy.
                </Label>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* IRDAI Disclaimer */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Important Information</h4>
              <p className="text-sm text-amber-700 mt-1">
                Insurance is the subject matter of solicitation. {plan?.insurer} is registered with IRDAI. 
                Please read the policy terms and conditions carefully before purchasing.
              </p>
            </div>
          </div>
        </BankingCard>

        {/* Pay Button */}
        <div className="sticky bottom-4">
          <Button 
            onClick={handlePayment}
            disabled={!canProceed}
            className="w-full rounded-2xl h-14 text-lg bg-psb-primary hover:bg-psb-primary/90 disabled:opacity-50"
          >
            {canProceed ? `Pay ${formatCurrency(coverageData?.calculatedPremium || 12000)}` : 'Accept Terms to Continue'}
            {canProceed && <CheckCircle className="h-5 w-5 ml-2" />}
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsuranceReviewPayment;
