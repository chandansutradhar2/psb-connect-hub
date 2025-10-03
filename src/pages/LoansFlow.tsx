
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Plus,
  Eye,
  Phone,
  Users
} from 'lucide-react';

const LoansFlow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'closed' | 'apply'>('active');

  const existingLoans = [
    {
      id: 1,
      type: 'Home Loan',
      accountNumber: 'HL123456789',
      principalAmount: 5000000,
      outstandingAmount: 3500000,
      emiAmount: 45000,
      nextEmiDate: '2024-02-01',
      status: 'Active',
      tenure: 240,
      completedMonths: 48,
      interestRate: 8.5
    },
    {
      id: 2,
      type: 'Personal Loan',
      accountNumber: 'PL987654321',
      principalAmount: 500000,
      outstandingAmount: 250000,
      emiAmount: 12500,
      nextEmiDate: '2024-01-20',
      status: 'Active',
      tenure: 48,
      completedMonths: 24,
      interestRate: 11.0
    }
  ];

  const loanTypes = [
    { 
      key: 'personal', 
      title: 'Personal Loan', 
      subtitle: 'Up to ₹50L at 10.5% p.a.', 
      icon: <IndianRupee className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Instant approval', 'No collateral', 'Flexible tenure']
    },
    { 
      key: 'home', 
      title: 'Home Loan', 
      subtitle: 'Up to ₹10Cr at 8.5% p.a.', 
      icon: <Home className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Tax benefits', 'Attractive rates', 'Balance transfer']
    },
    { 
      key: 'car', 
      title: 'Car Loan', 
      subtitle: 'Up to ₹1.5Cr at 9% p.a.', 
      icon: <Car className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: ['100% financing', 'Quick processing', 'Insurance help']
    },
    { 
      key: 'education', 
      title: 'Education Loan', 
      subtitle: 'Up to ₹1.5Cr at 8% p.a.', 
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: ['Moratorium period', 'Tax benefits', 'Covers all expenses']
    },
    { 
      key: 'business', 
      title: 'Business Loan', 
      subtitle: 'Up to ₹5Cr at 11% p.a.', 
      icon: <Building className="h-6 w-6" />,
      color: 'bg-red-500',
      features: ['Working capital', 'Equipment financing', 'Quick approval']
    }
  ];

  const calculateProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLoanApplication = (loanType: string) => {
    navigate('/loan-type-selection', { state: { loanType } });
  };

  const totalOutstanding = existingLoans.reduce((sum, loan) => sum + loan.outstandingAmount, 0);
  const totalEMI = existingLoans.reduce((sum, loan) => sum + loan.emiAmount, 0);

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Loans</h1>
          <Button variant="ghost" size="sm" className="rounded-full p-2" onClick={() => navigate('/loan-calculator')}>
            <Calculator className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/loan-calculator')}>
            <Calculator className="h-5 w-5" />
            <span className="text-sm">EMI Calculator</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/cibil-check')}>
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Check CIBIL</span>
          </Button>
        </div>

        {/* Loan Summary */}
        {existingLoans.length > 0 && (
          <BankingCard title="Loan Summary" className="rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-red-50">
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalOutstanding)}
                </p>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary/5">
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(totalEMI)}
                </p>
                <p className="text-sm text-muted-foreground">Monthly EMI</p>
              </div>
            </div>
          </BankingCard>
        )}

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'active'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">Active Loans</span>
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'apply'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">Apply for Loan</span>
          </button>
        </div>

        {activeTab === 'active' && (
          <div className="space-y-4">
            {existingLoans.length > 0 ? (
              existingLoans.map((loan) => (
                <BankingCard key={loan.id} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{loan.type}</h3>
                        <p className="text-sm text-muted-foreground">A/c: {loan.accountNumber}</p>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {loan.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Outstanding Amount</p>
                        <p className="font-semibold">{formatCurrency(loan.outstandingAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly EMI</p>
                        <p className="font-semibold">{formatCurrency(loan.emiAmount)}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">Loan Progress</p>
                        <p className="text-xs text-muted-foreground">
                          {loan.completedMonths}/{loan.tenure} months
                        </p>
                      </div>
                      <Progress 
                        value={calculateProgress(loan.completedMonths, loan.tenure)} 
                        className="h-2 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium text-orange-800">Next EMI Due</p>
                          <p className="text-xs text-orange-600">{loan.nextEmiDate}</p>
                        </div>
                      </div>
                      <Button size="sm" className="rounded-lg bg-orange-600 hover:bg-orange-700" onClick={() => navigate('/pay-emi')}>
                        Pay EMI
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/loan-statement')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Statement
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/manage-loan')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </BankingCard>
              ))
            ) : (
              <BankingCard className="rounded-2xl">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Active Loans</h3>
                  <p className="text-sm text-muted-foreground mb-4">You don't have any active loans at the moment</p>
                  <Button onClick={() => setActiveTab('apply')}>
                    Explore Loan Options
                  </Button>
                </div>
              </BankingCard>
            )}
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="space-y-6">
            {/* Loan Calculator Quick Access */}
            <BankingCard title="EMI Calculator" className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">Calculate your EMI</h3>
                  <p className="text-sm text-muted-foreground">Plan your loan with our calculator</p>
                </div>
                <Button 
                  className="rounded-xl"
                  onClick={() => navigate('/loan-calculator')}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </BankingCard>

            {/* Loan Types */}
            <BankingCard title="Choose Loan Type" className="rounded-2xl">
              <div className="space-y-4">
                {loanTypes.map((loan) => (
                  <button
                    key={loan.key}
                    onClick={() => handleLoanApplication(loan.key)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-md text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl text-white ${loan.color}`}>
                        {loan.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{loan.title}</h3>
                        <p className="text-sm text-muted-foreground">{loan.subtitle}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {loan.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ArrowLeft className="h-5 w-5 rotate-180 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </BankingCard>

            {/* CIBIL Check Promotion */}
            <BankingCard title="Check Your CIBIL Score" className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Free CIBIL Score Check</h3>
                  <p className="text-sm text-blue-600">Know your eligibility before applying</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/cibil-check')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Check Now
                </Button>
              </div>
            </BankingCard>

            {/* Contact Support */}
            <BankingCard title="Need Help?" className="rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Talk to Our Loan Expert</h3>
                  <p className="text-sm text-muted-foreground">Get personalized loan advice</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/contact-support')}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </BankingCard>
          </div>
        )}
      </div>
    </BankingLayout>
  );
};

export default LoansFlow;
