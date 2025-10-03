
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  Calculator,
  User,
  Home,
  Car,
  GraduationCap,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoanApplicationFlowProps {
  loanType: string;
  cibilScore?: number;
}

export const LoanApplicationFlow = ({ loanType, cibilScore }: LoanApplicationFlowProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    tenure: '',
    income: '',
    employment: '',
    documents: []
  });

  const steps = [
    { id: 1, title: 'Loan Details', icon: <Calculator className="h-4 w-4" /> },
    { id: 2, title: 'Personal Info', icon: <User className="h-4 w-4" /> },
    { id: 3, title: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 4, title: 'Review', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const getLoanIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-6 w-6" />;
      case 'car': return <Car className="h-6 w-6" />;
      case 'education': return <GraduationCap className="h-6 w-6" />;
      case 'business': return <Building className="h-6 w-6" />;
      default: return <Calculator className="h-6 w-6" />;
    }
  };

  const calculateEMI = (amount: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit application
      toast({
        title: "Application Submitted",
        description: "Your loan application has been submitted successfully!",
      });
      navigate('/loan-success');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isEligible = cibilScore ? cibilScore >= 650 : true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/loans-flow')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold capitalize">{loanType} Loan Application</h1>
        <div></div>
      </div>

      {/* Progress Steps */}
      <BankingCard className="rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep >= step.id 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-2 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </BankingCard>

      {/* CIBIL Score Alert */}
      {cibilScore && (
        <BankingCard className={`rounded-2xl ${isEligible ? 'border-blue-200 bg-blue-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center space-x-3">
            {isEligible ? (
              <CheckCircle className="h-6 w-6 text-blue-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
            <div>
              <p className={`font-semibold ${isEligible ? 'text-blue-800' : 'text-red-800'}`}>
                CIBIL Score: {cibilScore}
              </p>
              <p className={`text-sm ${isEligible ? 'text-blue-600' : 'text-red-600'}`}>
                {isEligible ? 'You are eligible for this loan' : 'Your score needs improvement'}
              </p>
            </div>
          </div>
        </BankingCard>
      )}

      {/* Step Content */}
      <div className="px-6">
         <BankingCard className="rounded-2xl ">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                {getLoanIcon(loanType)}
              </div>
              <div>
                <h3 className="font-semibold capitalize">{loanType} Loan</h3>
                <p className="text-sm text-muted-foreground">Enter your loan requirements</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Loan Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="tenure">Tenure (months)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter tenure"
                  value={formData.tenure}
                  onChange={(e) => setFormData({...formData, tenure: e.target.value})}
                />
              </div>

              {formData.amount && formData.tenure && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Estimated EMI</span>
                    <span className="font-semibold text-primary">
                      ₹{calculateEMI(Number(formData.amount), 10.5, Number(formData.tenure)).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Personal Information</h3>
            
            <div>
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter monthly income"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="employment">Employment Type</Label>
              <select 
                className="w-full p-3 border border-border rounded-xl"
                value={formData.employment}
                onChange={(e) => setFormData({...formData, employment: e.target.value})}
              >
                <option value="">Select employment type</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Document Upload</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                'PAN Card', 'Aadhaar Card', 'Income Proof', 'Bank Statement'
              ].map((doc, index) => (
                <div key={index} className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium">{doc}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="font-semibold">Review Application</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Loan Type</p>
                  <p className="font-semibold capitalize">{loanType} Loan</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold">₹{Number(formData.amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="font-semibold">{formData.tenure} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">EMI</p>
                  <p className="font-semibold text-primary">
                    ₹{calculateEMI(Number(formData.amount), 10.5, Number(formData.tenure)).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Ready to Submit</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Your application will be processed within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === 4 ? 'Submit Application' : 'Next'}
            {currentStep !== 4 && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </BankingCard>
      </div>
     
    </div>
  );
};
