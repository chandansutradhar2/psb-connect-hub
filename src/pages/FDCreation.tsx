
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calculator, PiggyBank, Calendar, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FDCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    tenure: [12], // months
    interestPayout: 'maturity',
    nominee: '',
    nomineeRelation: '',
    autoRenew: false,
    sourceAccount: '',
    specialRate: false
  });

  const interestRates = {
    6: 6.0,
    12: 6.75,
    18: 7.0,
    24: 7.25,
    36: 7.5,
    60: 7.75
  };

  const calculateMaturityAmount = () => {
    const principal = parseFloat(formData.amount) || 0;
    const rate = getInterestRate() / 100;
    const time = formData.tenure[0] / 12;
    return principal * Math.pow(1 + rate, time);
  };

  const getInterestRate = () => {
    const tenure = formData.tenure[0];
    if (tenure <= 6) return 6.0;
    if (tenure <= 12) return 6.75;
    if (tenure <= 18) return 7.0;
    if (tenure <= 24) return 7.25;
    if (tenure <= 36) return 7.5;
    return 7.75;
  };

  const handleNext = () => {
    if (step === 1 && !formData.amount) {
      toast({
        title: "Amount Required",
        description: "Please enter the investment amount",
        variant: "destructive"
      });
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = () => {
    toast({
      title: "FD Created Successfully",
      description: `Your Fixed Deposit of ₹${formData.amount} for ${formData.tenure[0]} months has been created`,
    });
    navigate('/fd-success', { state: { fdData: formData, maturityAmount: calculateMaturityAmount() } });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BankingCard title="Investment Details" className="space-y-6">
            <div>
              <Label htmlFor="amount">Investment Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (Min: ₹1,000)"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum: ₹1,000 | Maximum: ₹1,00,00,000</p>
            </div>

            <div>
              <Label>Investment Tenure: {formData.tenure[0]} months</Label>
              <div className="mt-4 mb-6">
                <Slider
                  value={formData.tenure}
                  onValueChange={(value) => setFormData({ ...formData, tenure: value })}
                  max={120}
                  min={6}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>6 months</span>
                  <span>10 years</span>
                </div>
              </div>
            </div>

            {formData.amount && (
              <div className="bg-primary/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span className="font-medium">Maturity Calculation</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Principal Amount:</span>
                    <span>₹{parseFloat(formData.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="text-green-600">{getInterestRate()}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure:</span>
                    <span>{formData.tenure[0]} months</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-primary">
                    <span>Maturity Amount:</span>
                    <span>₹{calculateMaturityAmount().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            )}
          </BankingCard>
        );

      case 2:
        return (
          <BankingCard title="Interest Payout Option" className="space-y-6">
            <RadioGroup
              value={formData.interestPayout}
              onValueChange={(value) => setFormData({ ...formData, interestPayout: value })}
            >
              <div className="flex items-center space-x-2 p-4 border rounded-xl">
                <RadioGroupItem value="maturity" id="maturity" />
                <Label htmlFor="maturity" className="flex-1">
                  <div>
                    <p className="font-medium">At Maturity (Recommended)</p>
                    <p className="text-sm text-muted-foreground">Get higher returns with compound interest</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-xl">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1">
                  <div>
                    <p className="font-medium">Monthly Payout</p>
                    <p className="text-sm text-muted-foreground">Receive interest every month in your account</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-xl">
                <RadioGroupItem value="quarterly" id="quarterly" />
                <Label htmlFor="quarterly" className="flex-1">
                  <div>
                    <p className="font-medium">Quarterly Payout</p>
                    <p className="text-sm text-muted-foreground">Receive interest every 3 months</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <div>
              <Label htmlFor="source">Source Account</Label>
              <Select value={formData.sourceAccount} onValueChange={(value) => setFormData({ ...formData, sourceAccount: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings-001">Savings Account - ***001 (₹45,230)</SelectItem>
                  <SelectItem value="current-002">Current Account - ***002 (₹1,25,500)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </BankingCard>
        );

      case 3:
        return (
          <BankingCard title="Nominee Details" className="space-y-6">
            <div>
              <Label htmlFor="nominee">Nominee Name</Label>
              <Input
                id="nominee"
                placeholder="Enter nominee full name"
                value={formData.nominee}
                onChange={(e) => setFormData({ ...formData, nominee: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="relation">Relationship with Nominee</Label>
              <Select value={formData.nomineeRelation} onValueChange={(value) => setFormData({ ...formData, nomineeRelation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="son">Son</SelectItem>
                  <SelectItem value="daughter">Daughter</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="sister">Sister</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoRenew"
                checked={formData.autoRenew}
                onCheckedChange={(checked) => setFormData({ ...formData, autoRenew: checked as boolean })}
              />
              <Label htmlFor="autoRenew" className="text-sm">
                Auto-renew FD at maturity for same tenure
              </Label>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Nominee details are mandatory for all Fixed Deposits as per RBI guidelines.
              </p>
            </div>
          </BankingCard>
        );

      case 4:
        return (
          <BankingCard title="Confirm FD Details" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Investment Amount:</span>
                <span className="font-semibold">₹{parseFloat(formData.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tenure:</span>
                <span className="font-semibold">{formData.tenure[0]} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-semibold text-green-600">{getInterestRate()}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Payout:</span>
                <span className="font-semibold capitalize">{formData.interestPayout}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nominee:</span>
                <span className="font-semibold">{formData.nominee}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Maturity Amount:</span>
                <span className="font-bold text-primary">₹{calculateMaturityAmount().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-sm text-amber-700">
                Please review all details carefully. Once created, certain changes may not be possible.
              </p>
            </div>
          </BankingCard>
        );

      default:
        return null;
    }
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Create Fixed Deposit</h1>
          <div className="w-10" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {i}
              </div>
              {i < 4 && <div className={`w-8 h-1 ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={handleNext} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1">
              Create FD
            </Button>
          )}
        </div>
      </div>
    </BankingLayout>
  );
};

export default FDCreation;
