import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calculator, IndianRupee, Calendar, Percent } from 'lucide-react';

// Define interfaces for type safety
interface EmiResult {
  monthlyEmi: string;
  totalInterest: string;
  totalAmount: string;
}

const EmiCalculator = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [emiResult, setEmiResult] = useState<EmiResult | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly rate
    const time = parseFloat(tenure) * 12; // Total months

    if (!principal || !rate || !time) {
      return;
    }

    // EMI Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      monthlyEmi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const handleCalculate = () => {
    calculateEMI();
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTenure('');
    setEmiResult(null);
  };

  return (
    <BankingLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/loans')}
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">EMI Calculator</h1>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Input Form */}
          <BankingCard className="rounded-xl">
            <h3 className="font-semibold text-sm mb-3">Calculate Your EMI</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Loan Amount (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    className="pl-10 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Interest Rate (% p.a.)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(e.target.value)}
                    placeholder="Enter interest rate"
                    className="pl-10 rounded-lg text-sm"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Tenure (Years)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTenure(e.target.value)}
                    placeholder="Enter tenure in years"
                    className="pl-10 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 text-xs h-8"
                  disabled={!loanAmount || !interestRate || !tenure}
                >
                  <Calculator className="h-3 w-3 mr-1" />
                  Calculate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 rounded-lg text-xs h-8"
                >
                  Reset
                </Button>
              </div>
            </div>
          </BankingCard>

          {/* Results */}
          {emiResult && (
            <BankingCard className="rounded-xl bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <h3 className="font-semibold text-sm mb-3">EMI Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-white border border-green-200">
                  <p className="text-lg font-bold text-green-600">₹{parseFloat(emiResult.monthlyEmi).toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">Monthly EMI</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white border border-green-200">
                  <p className="text-lg font-bold text-green-600">₹{parseFloat(emiResult.totalInterest).toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Interest</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white border border-green-200">
                  <p className="text-lg font-bold text-green-600">₹{parseFloat(emiResult.totalAmount).toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Amount</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white border border-green-200">
                  <p className="text-lg font-bold text-green-600">{tenure} Years</p>
                  <p className="text-xs text-gray-600 mt-1">Tenure</p>
                </div>
              </div>
            </BankingCard>
          )}
        </div>
      </div>
    </BankingLayout>
  );
};

export default EmiCalculator;