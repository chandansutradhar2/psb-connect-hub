
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/BottomNavigation';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Plus,
  Home,
  Building,
  CreditCard,
  Clock,
  Award,
  Calculator,
  FileText
} from 'lucide-react';

const DepositDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'matured' | 'calculator'>('active');

  const activeDeposits = [
    {
      id: 'FD001',
      type: 'Fixed Deposit',
      principal: 500000,
      currentValue: 545000,
      interestRate: 7.25,
      maturityDate: '2024-12-15',
      tenure: '18 months',
      interestEarned: 45000,
      status: 'Active',
      autoRenewal: true
    },
    {
      id: 'RD001', 
      type: 'Recurring Deposit',
      principal: 120000,
      currentValue: 128400,
      interestRate: 6.75,
      maturityDate: '2024-08-20',
      tenure: '2 years',
      monthlyAmount: 5000,
      interestEarned: 8400,
      status: 'Active',
      autoRenewal: false
    },
    {
      id: 'FD002',
      type: 'Tax Saver FD',
      principal: 150000,
      currentValue: 162500,
      interestRate: 7.50,
      maturityDate: '2025-03-31',
      tenure: '5 years',
      interestEarned: 12500,
      status: 'Active',
      taxBenefit: true
    }
  ];

  const maturedDeposits = [
    {
      id: 'FD003',
      type: 'Fixed Deposit',
      principal: 300000,
      maturityAmount: 345600,
      interestRate: 7.00,
      maturedDate: '2024-01-15',
      tenure: '2 years',
      interestEarned: 45600,
      status: 'Matured',
      renewed: false
    },
    {
      id: 'RD002',
      type: 'Recurring Deposit', 
      principal: 60000,
      maturityAmount: 65420,
      interestRate: 6.25,
      maturedDate: '2023-11-30',
      tenure: '1 year',
      monthlyAmount: 5000,
      interestEarned: 5420,
      status: 'Matured',
      renewed: true
    }
  ];

  const totalActiveValue = activeDeposits.reduce((sum, deposit) => sum + deposit.currentValue, 0);
  const totalInterestEarned = activeDeposits.reduce((sum, deposit) => sum + deposit.interestEarned, 0);

  const calculateMaturityAmount = (principal: number, rate: number, years: number) => {
    return principal * Math.pow((1 + rate/100), years);
  };

  return (
    <div className='pb-36'>
      <div className="space-y-6">
        <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Deposit Dashboard</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <Home className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </header>

        <div className='px-4'>
          <div className="flex bg-gray-100 rounded-full p-1">
            {[
              { key: 'active', label: 'Active' },
              { key: 'matured', label: 'Matured' },
              { key: 'calculator', label: 'Calculator' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-full transition-all duration-300 font-medium ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'active' && (
          <div className="space-y-6 px-4">
            {/* Portfolio Summary */}
            <BankingCard className="rounded-xl p-6 psb-gradient text-white shadow-xl">
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Active Deposits</p>
                  <p className="text-3xl font-bold">₹{totalActiveValue.toLocaleString()}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Interest Earned</p>
                    <p className="font-semibold text-sm">₹{totalInterestEarned.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Active Deposits</p>
                    <p className="font-semibold text-sm">{activeDeposits.length} Products</p>
                  </div>
                </div>
              </div>
            </BankingCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => navigate('/fd-creation')}
                className="psb-gold-gradient text-black font-semibold rounded-2xl p-6 h-auto flex flex-col space-y-2"
              >
                <Plus className="h-6 w-6" />
                <span>New FD</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('calculator')}
                variant="outline" 
                className="rounded-2xl p-6 h-auto flex flex-col space-y-2"
              >
                <Calculator className="h-6 w-6" />
                <span>Calculator</span>
              </Button>
            </div>

            {/* Active Deposits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Deposits</h3>
              {activeDeposits.map((deposit, index) => (
                <BankingCard key={index} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{deposit.type}</h3>
                        <p className="text-xs text-muted-foreground">#{deposit.id}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="default" className="text-xs">
                            {deposit.interestRate}% p.a.
                          </Badge>
                          {deposit.autoRenewal && (
                            <Badge variant="secondary" className="text-xs">Auto Renewal</Badge>
                          )}
                          {deposit.taxBenefit && (
                            <Badge variant="outline" className="text-xs">Tax Benefit</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{deposit.currentValue.toLocaleString()}</p>
                        <div className="flex items-center text-xs text-blue-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +₹{deposit.interestEarned.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Principal</p>
                        <p className="font-medium">₹{deposit.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tenure</p>
                        <p className="font-medium">{deposit.tenure}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity</p>
                        <p className="font-medium">{deposit.maturityDate}</p>
                      </div>
                    </div>
                    
                    {deposit.type === 'Recurring Deposit' && (
                      <div className="bg-muted/30 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                        <p className="font-semibold text-primary">₹{deposit.monthlyAmount?.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'matured' && (
          <div className="space-y-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Matured Deposits</h2>
              <Button size="sm" variant="outline" className="rounded-xl">
                <FileText className="h-4 w-4 mr-1" />
                Download Report
              </Button>
            </div>
            
            {maturedDeposits.map((deposit, index) => (
              <BankingCard key={index} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{deposit.type}</h3>
                      <p className="text-xs text-muted-foreground">#{deposit.id}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        Matured on {deposit.maturedDate}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{deposit.maturityAmount.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-blue-600">
                        <Award className="h-3 w-3 mr-1" />
                        +₹{deposit.interestEarned.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Principal</p>
                      <p className="font-medium">₹{deposit.principal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate</p>
                      <p className="font-medium">{deposit.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tenure</p>
                      <p className="font-medium">{deposit.tenure}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {deposit.renewed ? (
                      <Badge variant="default" className="text-xs">Renewed</Badge>
                    ) : (
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Renew Deposit
                      </Button>
                    )}
                  </div>
                </div>
              </BankingCard>
            ))}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-6 px-4">
            <BankingCard title="FD Calculator" icon={<Calculator className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Principal Amount</label>
                    <input 
                      type="number" 
                      placeholder="100000"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      placeholder="7.25"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tenure (Years)</label>
                  <input 
                    type="number" 
                    placeholder="2"
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <Button className="w-full rounded-xl">
                  Calculate Maturity Amount
                </Button>
                
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Estimated Maturity Amount</p>
                  <p className="text-2xl font-bold text-primary">₹1,15,562</p>
                  <p className="text-sm text-blue-600">Interest Earned: ₹15,562</p>
                </div>
              </div>
            </BankingCard>

            <BankingCard title="Current FD Rates" className="rounded-2xl">
              <div className="space-y-3">
                {[
                  { tenure: '7 days - 45 days', rate: '3.50', category: 'Short Term' },
                  { tenure: '46 days - 179 days', rate: '4.25', category: 'Short Term' },
                  { tenure: '180 days - 1 year', rate: '6.50', category: 'Medium Term' },
                  { tenure: '1 year - 2 years', rate: '7.25', category: 'Long Term' },
                  { tenure: '2 years - 5 years', rate: '7.50', category: 'Long Term' },
                  { tenure: '5 years - 10 years', rate: '7.75', category: 'Long Term' }
                ].map((rate, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-muted/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{rate.tenure}</p>
                      <p className="text-xs text-muted-foreground">{rate.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{rate.rate}%</p>
                      <p className="text-xs text-muted-foreground">per annum</p>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default DepositDashboard;
