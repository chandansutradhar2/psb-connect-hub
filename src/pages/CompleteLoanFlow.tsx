
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/BottomNavigation';
import { 
  ArrowLeft, 
  Home,
  CreditCard,
  Building,
  Car,
  GraduationCap,
  Briefcase,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Percent,
  TrendingUp
} from 'lucide-react';

const CompleteLoanFlow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apply' | 'active' | 'calculator' | 'eligibility'>('apply');

  const loanTypes = [
    {
      name: 'Home Loan',
      icon: <Home className="h-6 w-6" />,
      rate: '8.25% - 9.50%',
      maxAmount: '₹5 Crore',
      tenure: 'Up to 30 years',
      processing: '0.50%',
      features: ['No prepayment charges after 6 months', 'Tax benefits up to ₹2L', 'Doorstep service'],
      eligibility: 'Salaried/Self-employed, Age 21-65'
    },
    {
      name: 'Personal Loan',
      icon: <CreditCard className="h-6 w-6" />,
      rate: '10.75% - 18.00%',
      maxAmount: '₹40 Lakh',
      tenure: 'Up to 5 years',
      processing: '2.00%',
      features: ['Instant approval', 'No collateral required', 'Flexible EMI options'],
      eligibility: 'Minimum salary ₹25,000'
    },
    {
      name: 'Car Loan',
      icon: <Car className="h-6 w-6" />,
      rate: '7.25% - 9.75%',
      maxAmount: '₹1 Crore',
      tenure: 'Up to 7 years',
      processing: '1.00%',
      features: ['Up to 90% financing', 'Quick approval', 'Insurance tie-ups'],
      eligibility: 'Age 21-65, Regular income'
    },
    {
      name: 'Education Loan',
      icon: <GraduationCap className="h-6 w-6" />,
      rate: '9.15% - 11.50%',
      maxAmount: '₹1.5 Crore',
      tenure: 'Up to 15 years',
      processing: '1.00%',
      features: ['Moratorium period', 'Tax benefits', 'Covers all education expenses'],
      eligibility: 'Admission to recognized course'
    },
    {
      name: 'Business Loan',
      icon: <Briefcase className="h-6 w-6" />,
      rate: '11.25% - 16.00%',
      maxAmount: '₹50 Lakh',
      tenure: 'Up to 5 years',
      processing: '2.50%',
      features: ['Working capital support', 'Flexible repayment', 'Collateral free up to ₹10L'],
      eligibility: 'Business vintage 2+ years'
    }
  ];

  const activeLoans = [
    {
      id: 'HL001',
      type: 'Home Loan',
      principal: 2500000,
      outstanding: 1850000,
      emi: 18500,
      rate: 8.75,
      tenure: '20 years',
      nextEmi: '2024-02-01',
      status: 'Regular'
    },
    {
      id: 'PL001',
      type: 'Personal Loan',
      principal: 500000,
      outstanding: 285000,
      emi: 12400,
      rate: 12.50,
      tenure: '3 years',
      nextEmi: '2024-01-28',
      status: 'Regular'
    }
  ];

  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.outstanding, 0);
  const totalEmi = activeLoans.reduce((sum, loan) => sum + loan.emi, 0);

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
              <h1 className="text-lg font-semibold text-gray-800">Loan Center</h1>
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
              { key: 'apply', label: 'Apply' },
              { key: 'active', label: 'My Loans' },
              { key: 'calculator', label: 'Calculator' },
              { key: 'eligibility', label: 'Eligibility' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-3 rounded-full transition-all duration-300 font-medium text-sm ${
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

        {activeTab === 'apply' && (
          <div className="space-y-6 px-4">
            <BankingCard className="rounded-xl p-6 psb-gradient text-white shadow-xl">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">Need Financial Support?</h2>
                <p className="text-white/80">Choose from our wide range of loan products</p>
                <Button 
                  className="psb-gold-gradient text-black font-semibold rounded-xl mt-4"
                  onClick={() => setActiveTab('eligibility')}
                >
                  Check Eligibility
                </Button>
              </div>
            </BankingCard>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Loan Products</h3>
              {loanTypes.map((loan, index) => (
                <BankingCard key={index} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        {loan.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{loan.name}</h3>
                        <p className="text-sm text-muted-foreground">{loan.eligibility}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-semibold text-primary">{loan.rate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Amount</p>
                        <p className="font-semibold">{loan.maxAmount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tenure</p>
                        <p className="font-semibold">{loan.tenure}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Processing Fee</p>
                        <p className="font-semibold">{loan.processing}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Key Features:</p>
                      <ul className="text-xs space-y-1">
                        {loan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full rounded-xl"
                      onClick={() => navigate('/loan-application')}
                    >
                      Apply Now
                    </Button>
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-6 px-4">
            <BankingCard className="rounded-xl p-6 psb-gradient text-white shadow-xl">
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Outstanding</p>
                  <p className="text-3xl font-bold">₹{totalOutstanding.toLocaleString()}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Total EMI</p>
                    <p className="font-semibold text-sm">₹{totalEmi.toLocaleString()}/month</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Active Loans</p>
                    <p className="font-semibold text-sm">{activeLoans.length} Accounts</p>
                  </div>
                </div>
              </div>
            </BankingCard>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Loans</h3>
              {activeLoans.map((loan, index) => (
                <BankingCard key={index} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{loan.type}</h3>
                        <p className="text-xs text-muted-foreground">#{loan.id}</p>
                        <Badge 
                          variant={loan.status === 'Regular' ? 'default' : 'destructive'}
                          className="text-xs mt-1"
                        >
                          {loan.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{loan.outstanding.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Outstanding</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">EMI Amount</p>
                        <p className="font-medium">₹{loan.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next EMI</p>
                        <p className="font-medium">{loan.nextEmi}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Loan Progress</span>
                        <span>{(((loan.principal - loan.outstanding) / loan.principal) * 100).toFixed(1)}% paid</span>
                      </div>
                      <Progress value={((loan.principal - loan.outstanding) / loan.principal) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Pay EMI
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Statement
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Prepay
                      </Button>
                    </div>
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-6 px-4">
            <BankingCard title="EMI Calculator" icon={<Calculator className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Loan Amount</label>
                  <input 
                    type="number" 
                    placeholder="500000"
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      placeholder="8.25"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tenure (Years)</label>
                    <input 
                      type="number" 
                      placeholder="20"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <Button className="w-full rounded-xl">
                  Calculate EMI
                </Button>
                
                <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-2xl font-bold text-primary">₹4,185</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">Total Interest</p>
                      <p className="font-semibold">₹5,04,400</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-semibold">₹10,04,400</p>
                    </div>
                  </div>
                </div>
              </div>
            </BankingCard>

            <BankingCard title="Loan Comparison" className="rounded-2xl">
              <div className="space-y-3">
                {[
                  { type: 'Home Loan', rate: '8.25%', processing: '0.50%', maxAmount: '₹5 Cr' },
                  { type: 'Personal Loan', rate: '10.75%', processing: '2.00%', maxAmount: '₹40 L' },
                  { type: 'Car Loan', rate: '7.25%', processing: '1.00%', maxAmount: '₹1 Cr' },
                  { type: 'Business Loan', rate: '11.25%', processing: '2.50%', maxAmount: '₹50 L' }
                ].map((loan, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-muted/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{loan.type}</p>
                      <p className="text-xs text-muted-foreground">Max: {loan.maxAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{loan.rate}</p>
                      <p className="text-xs text-muted-foreground">Processing: {loan.processing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="space-y-6 px-4">
            <BankingCard title="Quick Eligibility Check" icon={<CheckCircle className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Monthly Income</label>
                    <input 
                      type="number" 
                      placeholder="50000"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <input 
                      type="number" 
                      placeholder="30"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Employment Type</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Salaried</option>
                    <option>Self Employed</option>
                    <option>Business Owner</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Existing EMIs</label>
                  <input 
                    type="number" 
                    placeholder="5000"
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <Button className="w-full rounded-xl">
                  Check Eligibility
                </Button>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="font-semibold text-blue-800">Great! You're eligible</p>
                  </div>
                  <p className="text-sm text-blue-700">Based on your profile, you can get:</p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Home Loan: Up to ₹25 Lakhs</li>
                    <li>• Personal Loan: Up to ₹8 Lakhs</li>
                    <li>• Car Loan: Up to ₹15 Lakhs</li>
                  </ul>
                </div>
              </div>
            </BankingCard>

            <BankingCard title="Required Documents" className="rounded-2xl">
              <div className="space-y-3">
                {[
                  'Identity Proof (Aadhaar/PAN/Passport)',
                  'Address Proof (Utility Bill/Rental Agreement)',
                  'Income Proof (Salary Slips/ITR)',
                  'Bank Statements (Last 6 months)',
                  'Employment Proof (Offer Letter/ID Card)',
                  'Property Documents (For Home Loan)'
                ].map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{doc}</span>
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

export default CompleteLoanFlow;
