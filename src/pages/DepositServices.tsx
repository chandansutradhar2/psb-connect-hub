import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  Calculator,
  Plus,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

const DepositServices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');

  const fixedDeposits = [
    {
      id: '1',
      accountNumber: 'FD001234567',
      amount: 500000,
      interestRate: 7.5,
      maturityDate: '2024-12-31',
      maturityAmount: 537500,
      status: 'Active',
      type: 'Fixed Deposit'
    },
    {
      id: '2',
      accountNumber: 'FD002345678',
      amount: 200000,
      interestRate: 7.25,
      maturityDate: '2024-06-15',
      maturityAmount: 214500,
      status: 'Active',
      type: 'Fixed Deposit'
    }
  ];

  const recurringDeposits = [
    {
      id: '1',
      accountNumber: 'RD001234567',
      monthlyAmount: 5000,
      totalDeposited: 60000,
      interestRate: 7.0,
      maturityDate: '2025-01-15',
      maturityAmount: 127500,
      status: 'Active',
      type: 'Recurring Deposit'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Deposit Services</h1>
          </div>
          
          <Button onClick={() => navigate('/fd-creation')}>
            <Plus className="h-4 w-4 mr-2" />
            New Deposit
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/fd-creation')}>
            <PiggyBank className="h-6 w-6 mb-2" />
            <span className="text-xs">Open FD</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <TrendingUp className="h-6 w-6 mb-2" />
            <span className="text-xs">Open RD</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <Calculator className="h-6 w-6 mb-2" />
            <span className="text-xs">Calculator</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-xs">Rates</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Deposits</TabsTrigger>
            <TabsTrigger value="calculator">FD Calculator</TabsTrigger>
            <TabsTrigger value="rates">Interest Rates</TabsTrigger>
          </TabsList>

          {/* Current Deposits Tab */}
          <TabsContent value="current" className="space-y-4">
            {/* Fixed Deposits */}
            <BankingCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <PiggyBank className="h-5 w-5 mr-2" />
                  Fixed Deposits
                </h3>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {fixedDeposits.map((fd) => (
                  <div key={fd.id} className="p-4 bg-muted/30 rounded-2xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{formatCurrency(fd.amount)}</p>
                        <p className="text-sm text-muted-foreground">FD Account: {fd.accountNumber}</p>
                      </div>
                      <Badge variant="default">{fd.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium text-blue-600">{fd.interestRate}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity Date</p>
                        <p className="font-medium">{formatDate(fd.maturityDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity Amount</p>
                        <p className="font-medium text-primary">{formatCurrency(fd.maturityAmount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-medium">Active</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>

            {/* Recurring Deposits */}
            <BankingCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recurring Deposits
                </h3>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {recurringDeposits.map((rd) => (
                  <div key={rd.id} className="p-4 bg-muted/30 rounded-2xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{formatCurrency(rd.monthlyAmount)}/month</p>
                        <p className="text-sm text-muted-foreground">RD Account: {rd.accountNumber}</p>
                      </div>
                      <Badge variant="default">{rd.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Deposited</p>
                        <p className="font-medium">{formatCurrency(rd.totalDeposited)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium text-blue-600">{rd.interestRate}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity Date</p>
                        <p className="font-medium">{formatDate(rd.maturityDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity Amount</p>
                        <p className="font-medium text-primary">{formatCurrency(rd.maturityAmount)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>
          </TabsContent>

          {/* FD Calculator Tab */}
          <TabsContent value="calculator">
            <BankingCard>
              <h3 className="font-semibold mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Fixed Deposit Calculator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="principal">Principal Amount (₹)</Label>
                  <Input 
                    id="principal"
                    type="number"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tenure">Tenure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="2y">2 Years</SelectItem>
                      <SelectItem value="3y">3 Years</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rate">Interest Rate (%)</Label>
                  <Input 
                    id="rate"
                    type="number"
                    placeholder="7.5"
                    defaultValue="7.5"
                  />
                </div>
                
                <Button className="w-full">
                  Calculate Maturity Amount
                </Button>
                
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <h4 className="font-semibold mb-2">Calculation Result</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-medium">₹1,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Earned:</span>
                      <span className="font-medium text-blue-600">₹37,500</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Maturity Amount:</span>
                      <span className="text-primary">₹1,37,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </BankingCard>
          </TabsContent>

          {/* Interest Rates Tab */}
          <TabsContent value="rates">
            <BankingCard>
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Current Interest Rates
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Fixed Deposit Rates</h4>
                  <div className="space-y-2">
                    {[
                      { tenure: '7 days to 45 days', rate: '5.50' },
                      { tenure: '46 days to 179 days', rate: '6.00' },
                      { tenure: '180 days to 364 days', rate: '6.75' },
                      { tenure: '1 year to 2 years', rate: '7.25' },
                      { tenure: '2 years to 3 years', rate: '7.50' },
                      { tenure: '3 years to 5 years', rate: '7.75' },
                      { tenure: '5 years and above', rate: '8.00' }
                    ].map((rate, index) => (
                      <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">{rate.tenure}</span>
                        <span className="font-semibold text-primary">{rate.rate}% p.a.</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Recurring Deposit Rates</h4>
                  <div className="space-y-2">
                    {[
                      { tenure: '1 year', rate: '6.75' },
                      { tenure: '2 years', rate: '7.00' },
                      { tenure: '3 years', rate: '7.25' },
                      { tenure: '5 years', rate: '7.50' }
                    ].map((rate, index) => (
                      <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">{rate.tenure}</span>
                        <span className="font-semibold text-primary">{rate.rate}% p.a.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Senior citizens get additional 0.50% interest rate on all deposits.
                  Rates are subject to change as per bank's discretion.
                </p>
              </div>
            </BankingCard>
          </TabsContent>
        </Tabs>
      </div>
    </BankingLayout>
  );
};

export default DepositServices;
