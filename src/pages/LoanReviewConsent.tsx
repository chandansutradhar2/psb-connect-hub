import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  IndianRupee,
  Calendar,
  Percent,
  Shield,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanReviewConsent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { loanType, formData, documents } = location.state || {};
  
  // Mock loan details
  const loanDetails = {
    amount: 500000,
    tenure: 24,
    interestRate: 10.5,
    processingFee: 2500,
    emi: 23003,
    totalInterest: 52072,
    totalAmount: 552072
  };

  const [consents, setConsents] = useState({
    terms: false,
    fairPractice: false,
    rbiGuidelines: false,
    finalConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const allConsentsGiven = Object.values(consents).every(consent => consent);

  const handleConsentChange = (key: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!allConsentsGiven) {
      toast({
        title: "Missing Consent",
        description: "Please provide all required consents to proceed",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate loan application submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/loan-approval-result', { 
        state: { 
          loanType, 
          loanDetails,
          applicationId: 'PSB' + Date.now(),
          submittedAt: new Date().toISOString()
        } 
      });
    }, 3000);
  };

  const termsContent = `
Bank Name - LOAN TERMS & CONDITIONS

1. LOAN AGREEMENT
This loan agreement is between Bank Name ("Bank") and the borrower for the loan amount specified.

2. INTEREST RATE
The interest rate is fixed at ${loanDetails.interestRate}% per annum for the entire tenure.

3. REPAYMENT
Monthly EMI of ₹${loanDetails.emi.toLocaleString()} to be paid for ${loanDetails.tenure} months.

4. PROCESSING FEE
One-time processing fee of ₹${loanDetails.processingFee.toLocaleString()} (non-refundable).

5. PREPAYMENT
Partial/full prepayment allowed after 6 EMI payments with applicable charges.

6. DEFAULT
In case of default, penal charges will apply as per bank's policy.

7. INSURANCE
Loan insurance may be offered separately (optional).

8. LEGAL BINDING
This agreement is legally binding and governed by Indian laws.
  `.trim();

  const fairPracticeContent = `
FAIR PRACTICE CODE - LENDING GUIDELINES

1. TRANSPARENT PRICING
All charges and fees disclosed upfront with no hidden costs.

2. NON-DISCRIMINATION
Equal treatment to all customers without bias.

3. PRIVACY PROTECTION
Customer data protected as per privacy policy.

4. GRIEVANCE REDRESSAL
Dedicated channels for complaint resolution.

5. RESPONSIBLE LENDING
Loans offered based on repayment capacity assessment.
  `.trim();

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
          <h1 className="text-lg font-semibold">Review & Consent</h1>
          <div></div>
        </div>

        {/* Loan Summary */}
        <BankingCard title="Loan Summary" className="rounded-2xl">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <IndianRupee className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="font-semibold">₹{loanDetails.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="font-semibold">{loanDetails.tenure} months</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Percent className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-semibold">{loanDetails.interestRate}% p.a.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Processing Fee</p>
                  <p className="font-semibold">₹{loanDetails.processingFee.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* EMI Breakdown */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-lg font-bold text-primary">₹{loanDetails.emi.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-lg font-bold text-orange-600">₹{loanDetails.totalInterest.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold text-muted-foreground">₹{loanDetails.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Documents Uploaded */}
        <BankingCard title="Documents Uploaded" className="rounded-2xl">
          <div className="space-y-3">
            {documents?.map((doc: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">Uploaded</Badge>
              </div>
            ))}
          </div>
        </BankingCard>

        {/* Terms & Conditions */}
        <BankingCard title="Terms & Conditions" className="rounded-2xl">
          <div className="space-y-4">
            <div className="border border-border rounded-lg">
              <ScrollArea className="h-32 p-3">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                  {termsContent}
                </pre>
              </ScrollArea>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={consents.terms}
                onCheckedChange={(checked) => handleConsentChange('terms', checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                I have read and agree to the <span className="text-primary font-semibold">Terms & Conditions</span>
              </label>
            </div>
          </div>
        </BankingCard>

        {/* Fair Practice Code */}
        <BankingCard title="Fair Practice Code" className="rounded-2xl">
          <div className="space-y-4">
            <div className="border border-border rounded-lg">
              <ScrollArea className="h-24 p-3">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                  {fairPracticeContent}
                </pre>
              </ScrollArea>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="fairPractice"
                checked={consents.fairPractice}
                onCheckedChange={(checked) => handleConsentChange('fairPractice', checked as boolean)}
              />
              <label htmlFor="fairPractice" className="text-sm cursor-pointer">
                I acknowledge the <span className="text-primary font-semibold">Fair Practice Code</span>
              </label>
            </div>
          </div>
        </BankingCard>

        {/* RBI Guidelines */}
        <BankingCard className="rounded-2xl bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-800 mb-2">RBI Guidelines</h4>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• Loans are offered as per RBI's digital lending guidelines</p>
                <p>• Interest rates are calculated on reducing balance method</p>
                <p>• No pre-payment penalty for retail loans above ₹2 lakhs</p>
                <p>• Grievances can be escalated to Banking Ombudsman</p>
              </div>
              <div className="flex items-start space-x-3 mt-3">
                <Checkbox
                  id="rbiGuidelines"
                  checked={consents.rbiGuidelines}
                  onCheckedChange={(checked) => handleConsentChange('rbiGuidelines', checked as boolean)}
                />
                <label htmlFor="rbiGuidelines" className="text-sm cursor-pointer">
                  I understand the RBI guidelines for digital lending
                </label>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Final Consent */}
        <BankingCard className="rounded-2xl border-primary/20 bg-primary/5">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-primary mb-2">Final Authorization</h4>
              <p className="text-sm text-muted-foreground mb-3">
                By checking this box, you authorize Bank Name to process your loan application 
                and disburse the approved amount to your account.
              </p>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="finalConsent"
                  checked={consents.finalConsent}
                  onCheckedChange={(checked) => handleConsentChange('finalConsent', checked as boolean)}
                />
                <label htmlFor="finalConsent" className="text-sm cursor-pointer font-semibold">
                  I authorize the loan processing and disbursement
                </label>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button 
            onClick={handleSubmit}
            disabled={!allConsentsGiven || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Loan Application'}
          </Button>
          
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Application Copy
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanReviewConsent;