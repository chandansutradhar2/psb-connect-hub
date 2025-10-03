
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from "@/components/ui/use-toast"; // your toast


import { 
  ArrowLeft, 
  Home, 
  Car, 
  GraduationCap, 
  Building,
  Calculator,
  FileText,
  CreditCard,
  Calendar,
  IndianRupee,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const Loans = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apply' | 'existing'>('existing');
    const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

  const loanTypes = [
    { 
      key: 'home', 
      title: 'Home Loan', 
      subtitle: 'Up to ₹5 Cr at 8.5% p.a.', 
      icon: <Home className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    { 
      key: 'personal', 
      title: 'Personal Loan', 
      subtitle: 'Up to ₹50L at 11% p.a.', 
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    { 
      key: 'car', 
      title: 'Car Loan', 
      subtitle: 'Up to ₹1 Cr at 9% p.a.', 
      icon: <Car className="h-5 w-5" />,
      color: 'bg-orange-500'
    },
    { 
      key: 'education', 
      title: 'Education Loan', 
      subtitle: 'Up to ₹1.5 Cr at 7.5% p.a.', 
      icon: <GraduationCap className="h-5 w-5" />,
      color: 'bg-purple-500'
    },
    { 
      key: 'business', 
      title: 'Business Loan', 
      subtitle: 'Up to ₹10 Cr at 10% p.a.', 
      icon: <Building className="h-5 w-5" />,
      color: 'bg-red-500'
    },
  ];

  const existingLoans = [
    {
      id: 1,
      type: 'Home Loan',
      accountNumber: 'HL123456789',
      principalAmount: 5000000,
      outstandingAmount: 3500000,
      emiAmount: 45000,
      nextEmiDate: '01 Feb 2024',
      status: 'Active',
      tenure: 240,
      completedMonths: 48
    },
    {
      id: 2,
      type: 'Personal Loan',
      accountNumber: 'PL987654321',
      principalAmount: 500000,
      outstandingAmount: 250000,
      emiAmount: 12500,
      nextEmiDate: '20 Jan 2024',
      status: 'Active',
      tenure: 48,
      completedMonths: 24
    }
  ];

  const calculateProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const handleApplyLoan = (loanType: string) => {
    navigate('/loan-application', { state: { loanType } });
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
              onClick={() => navigate("/dashboard")}
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Loans</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => navigate('/emi-calculator')}
            >
              <Calculator className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Quick Access Banner */}
         <BankingCard className="bg-gradient-to-r from-indigo-100 via-blue-50 to-white border border-indigo-200 shadow-sm rounded-2xl p-2 pt-0">
  <div className="flex items-center justify-between">
    {/* Left side content */}
    <div className="flex items-center gap-3">
      {/* <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
        <span className="text-sm font-bold">C</span>
      </div> */}
      <div>
        <h3 className="font-semibold text-indigo-800 text-sm">Check Your CIBIL Score</h3>
        <p className="text-xs text-indigo-600">Quick credit check before loan application</p>
      </div>
    </div>

    {/* Action button */}
    <Button
      size="sm"
      className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs h-8 px-3 shadow-sm"
      onClick={() => navigate('/loan-cibil-consent')}
    >
      Check Now
    </Button>
  </div>

  {/* Extra section (score hint) */}
  <div className="mt-3 flex items-center justify-between bg-indigo-50 rounded-xl px-3 py-2">
    <p className="text-[11px] text-indigo-700">
      Know your eligibility instantly with your credit score
    </p>
    <span className="text-xs font-semibold text-indigo-800">Free</span>
  </div>
</BankingCard>



          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('existing')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'existing'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              My Loans
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'apply'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Apply
            </button>
          </div>

          {activeTab === 'existing' && (
            <div className="space-y-4">
              {/* Loan Summary */}
              <BankingCard className="rounded-xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <p className="text-lg font-bold text-blue-600">
                      ₹{(existingLoans.reduce((sum, loan) => sum + loan.outstandingAmount, 0) / 100000).toFixed(1)}L
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Total Outstanding</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <p className="text-lg font-bold text-blue-600">
                      ₹{(existingLoans.reduce((sum, loan) => sum + loan.emiAmount, 0)).toLocaleString()}                      
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Monthly EMI</p>
                  </div>
                </div>
              </BankingCard>

              {/* Existing Loans */}
              {existingLoans.map((loan) => (
                <BankingCard key={loan.id} className="rounded-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{loan.type}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">A/c: {loan.accountNumber}</p>
                      </div>
                      <Badge variant="secondary" className="rounded-full text-xs py-0.5">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {loan.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Outstanding</p>
                        <p className="font-semibold text-sm">₹{(loan.outstandingAmount / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly EMI</p>
                        <p className="font-semibold text-sm">₹{(loan.emiAmount / 1000).toFixed(1)}k</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500">Loan Progress</p>
                        <p className="text-[10px] text-gray-500">
                          {loan.completedMonths}/{loan.tenure} months
                        </p>
                      </div>
                      <Progress 
                        value={calculateProgress(loan.completedMonths, loan.tenure)} 
                        className="h-1.5 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-orange-600" />
                        <div>
                          <p className="text-xs font-medium text-orange-800">Next EMI Due</p>
                          <p className="text-[10px] text-orange-600">{loan.nextEmiDate}</p>
                        </div>
                      </div>
                      <Button 
                        size="xs" 
                        className="rounded-md bg-orange-600 hover:bg-orange-700 text-xs h-7 px-2"
                      >
                        Pay EMI
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                         onClick={() => handleComingSoon("Statement")}

                        size="sm" 
                        className="flex-1 rounded-lg text-xs h-8"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Statement
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 rounded-lg text-xs h-8"
                        onClick={() => navigate('/emi-calculator')}
                      >
                        <Calculator className="h-3 w-3 mr-1" />
                        Calculate
                      </Button>
                    </div>
                  </div>
                </BankingCard>
              ))}
            </div>
          )}

          {activeTab === 'apply' && (
            <div className="space-y-4">
              {/* Loan Calculator Quick Access */}
              <BankingCard className="rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800 text-sm">EMI Calculator</h3>
                    <p className="text-xs text-blue-600">Plan your loan repayments</p>
                  </div>
                  <Button 
                    size="sm"
                    className="rounded-lg bg-blue-600 hover:bg-blue-700 text-xs h-8"
                    onClick={() => navigate('/emi-calculator')}
                  >
                    <Calculator className="h-3 w-3 mr-1" />
                    Calculate
                  </Button>
                </div>
              </BankingCard>

              {/* Loan Types */}
              <BankingCard className="rounded-xl">
                <h3 className="font-semibold text-sm mb-3">Choose Loan Type</h3>
                <div className="space-y-2">
                  {loanTypes.map((loan) => (
                    <button
                      key={loan.key}
                      onClick={() => handleApplyLoan(loan.key)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary/30 active:bg-gray-50 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg text-white ${loan.color}`}>
                          {loan.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{loan.title}</h3>
                          <p className="text-xs text-gray-500">{loan.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </BankingCard>

              {/* Loan Features */}
              <BankingCard className="rounded-xl">
                <h3 className="font-semibold text-sm mb-3">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <TrendingUp className="h-4 w-4" />, title: 'Low Rates', subtitle: 'From 7.5% p.a.' },
                    { icon: <Clock className="h-4 w-4" />, title: 'Quick Process', subtitle: '24-48 hours' },
                    { icon: <FileText className="h-4 w-4" />, title: 'Minimal Docs', subtitle: 'Easy process' },
                    { icon: <CheckCircle className="h-4 w-4" />, title: 'Flexible', subtitle: 'Up to 30 years' },
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="p-2 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center text-center"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary mb-1">
                        {feature.icon}
                      </div>
                      <p className="font-semibold text-xs">{feature.title}</p>
                      <p className="text-[10px] text-gray-500">{feature.subtitle}</p>
                    </div>
                  ))}
                </div>
              </BankingCard>
            </div>
          )}
        </div>
      </div>
    </BankingLayout>
  );
};

export default Loans;