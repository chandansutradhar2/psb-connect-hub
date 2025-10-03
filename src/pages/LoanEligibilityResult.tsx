import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  TrendingUp,
  CheckCircle,
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  Shield,
  BadgeCheck
} from 'lucide-react';

const LoanEligibilityResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loanType = location.state?.loanType || 'personal';
  
  // Mock credit score and eligibility data
  const [creditScore] = useState(780);
  const [eligibility] = useState({
    maxAmount: 1500000,
    minInterestRate: 10.5,
    maxTenure: 60
  });
  
  const [loanAmount, setLoanAmount] = useState([500000]);
  const [tenure, setTenure] = useState([24]);

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const getScoreStatus = (score: number) => {
    if (score >= 750) return { status: 'Excellent', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    if (score >= 700) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    if (score >= 650) return { status: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const scoreStatus = getScoreStatus(creditScore);
  const emi = calculateEMI(loanAmount[0], eligibility.minInterestRate, tenure[0]);
  const totalInterest = (emi * tenure[0]) - loanAmount[0];
  const totalAmount = loanAmount[0] + totalInterest;

  const handleContinue = () => {
    navigate('/loan-application-form', { 
      state: { 
        loanType,
        creditScore,
        eligibility,
        selectedAmount: loanAmount[0],
        selectedTenure: tenure[0]
      } 
    });
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-md mx-auto flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Loan Eligibility</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 space-y-6 pt-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">1</div>
              <span className="text-xs text-gray-500 mt-1">Verification</span>
            </div>
            <div className="w-16 h-0.5 bg-blue-600"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">2</div>
              <span className="text-xs text-gray-500 mt-1">Eligibility</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm">3</div>
              <span className="text-xs text-gray-500 mt-1">Application</span>
            </div>
          </div>

          {/* Credit Score Display */}
          <div className={`rounded-xl p-6 ${scoreStatus.bgColor} border ${scoreStatus.borderColor}`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className={`h-5 w-5 ${scoreStatus.color}`} />
                <h2 className={`text-lg font-semibold ${scoreStatus.color}`}>Your Credit Score</h2>
              </div>
              <div className={`text-4xl font-bold ${scoreStatus.color} mb-2`}>
                {creditScore}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreStatus.bgColor} ${scoreStatus.color} border ${scoreStatus.borderColor}`}>
                <BadgeCheck className="h-4 w-4 mr-1" />
                {scoreStatus.status}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Eligibility Summary */}
          <div className="rounded-xl p-4 bg-white border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Congratulations! You're Eligible</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                <IndianRupee className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Max Amount</p>
                <p className="font-bold text-blue-600">₹{(eligibility.maxAmount / 100000).toFixed(1)}L</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                <Percent className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                <p className="font-bold text-blue-600">{eligibility.minInterestRate}%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-100">
                <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Max Tenure</p>
                <p className="font-bold text-purple-600">{eligibility.maxTenure} mo</p>
              </div>
            </div>
          </div>

          {/* EMI Calculator */}
          <div className="rounded-xl p-4 bg-white border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Calculate Your EMI</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-sm font-medium text-gray-700">Loan Amount</Label>
                  <span className="text-sm font-semibold text-gray-900">₹{loanAmount[0].toLocaleString()}</span>
                </div>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={eligibility.maxAmount}
                  min={50000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹{(eligibility.maxAmount / 100000).toFixed(1)}L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-sm font-medium text-gray-700">Tenure</Label>
                  <span className="text-sm font-semibold text-gray-900">{tenure[0]} months</span>
                </div>
                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  max={eligibility.maxTenure}
                  min={12}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>12 mo</span>
                  <span>{eligibility.maxTenure} mo</span>
                </div>
              </div>

              {/* EMI Summary */}
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                    <p className="text-lg font-bold text-blue-600">₹{emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-orange-600">₹{totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{loanAmount[0].toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Your information is secure. We use bank-level encryption to protect your data.
            </p>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto ">
            <Button 
              onClick={handleContinue}
              className="w-full h-12  bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white font-medium"
            >
              Continue to Application
            </Button>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanEligibilityResult;