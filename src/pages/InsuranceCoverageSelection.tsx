
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ArrowLeft, 
  Shield,
  Calculator,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const InsuranceCoverageSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, insuranceType, kycData } = location.state || {};
  
  const [coverage, setCoverage] = useState([500000]);
  const [premiumFrequency, setPremiumFrequency] = useState('yearly');
  const [term, setTerm] = useState('1');

  // Calculate premium based on coverage and frequency
  const calculatePremium = () => {
    const basePremium = (coverage[0] / 500000) * 12000; // Base calculation
    const frequencyMultiplier = premiumFrequency === 'monthly' ? 1/12 : premiumFrequency === 'quarterly' ? 1/4 : 1;
    return Math.round(basePremium * frequencyMultiplier);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleContinue = () => {
    const coverageData = {
      sumAssured: coverage[0],
      premiumFrequency,
      term,
      calculatedPremium: calculatePremium()
    };
    
    navigate('/insurance-document-upload', { 
      state: { plan, insuranceType, kycData, coverageData } 
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
            onClick={() => navigate(-1)}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Coverage & Premium</h1>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="flex items-center space-x-2 px-4">
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-muted rounded-full" />
          <div className="flex-1 h-2 bg-muted rounded-full" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Step 2 of 4</p>

        {/* Plan Summary */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-psb-primary/10 to-psb-secondary/10 border-psb-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-psb-primary">{plan?.name}</h3>
              <p className="text-sm text-muted-foreground">{plan?.insurer}</p>
            </div>
            <Shield className="h-8 w-8 text-psb-primary" />
          </div>
        </BankingCard>

        {/* Coverage Amount */}
        <BankingCard title="Select Coverage Amount" icon={<Shield className="h-5 w-5" />} className="rounded-2xl">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-psb-primary">{formatCurrency(coverage[0])}</h3>
              <p className="text-sm text-muted-foreground">Sum Assured</p>
            </div>
            
            <div className="px-4">
              <Slider
                value={coverage}
                onValueChange={setCoverage}
                max={2000000}
                min={100000}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₹1 Lakh</span>
                <span>₹20 Lakh</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[300000, 500000, 1000000].map((amount) => (
                <Button
                  key={amount}
                  variant={coverage[0] === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCoverage([amount])}
                  className="rounded-xl"
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>
        </BankingCard>

        {/* Premium Frequency */}
        <BankingCard title="Premium Payment Frequency" icon={<Calculator className="h-5 w-5" />} className="rounded-2xl">
          <RadioGroup value={premiumFrequency} onValueChange={setPremiumFrequency}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="font-medium">Monthly</Label>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(calculatePremium())}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly" className="font-medium">Quarterly</Label>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(calculatePremium())}</p>
                  <p className="text-xs text-muted-foreground">per quarter</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-green-50">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly" className="font-medium">Yearly</Label>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">{formatCurrency(calculatePremium())}</p>
                  <p className="text-xs text-green-600">per year • Save 10%</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </BankingCard>

        {/* Policy Term */}
        <BankingCard title="Policy Term" icon={<TrendingUp className="h-5 w-5" />} className="rounded-2xl">
          <RadioGroup value={term} onValueChange={setTerm}>
            <div className="grid grid-cols-3 gap-3">
              {['1', '5', '10'].map((years) => (
                <div key={years} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value={years} id={`term-${years}`} />
                  <Label htmlFor={`term-${years}`} className="text-center">
                    <span className="font-bold">{years} Year{years !== '1' ? 's' : ''}</span>
                    {years === '5' && <span className="block text-xs text-green-600">Popular</span>}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </BankingCard>

        {/* Premium Summary */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-green-800">Your Premium</h3>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(calculatePremium())}
            </p>
            <p className="text-sm text-green-600">
              {premiumFrequency === 'monthly' ? 'per month' : 
               premiumFrequency === 'quarterly' ? 'per quarter' : 'per year'}
            </p>
            <p className="text-xs text-muted-foreground">
              Coverage: {formatCurrency(coverage[0])} • Term: {term} year{term !== '1' ? 's' : ''}
            </p>
          </div>
        </BankingCard>

        {/* Continue Button */}
        <div className="sticky bottom-4">
          <Button 
            onClick={handleContinue}
            className="w-full rounded-2xl h-14 text-lg bg-psb-primary hover:bg-psb-primary/90"
          >
            Continue to Documents
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsuranceCoverageSelection;
