import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  IndianRupee, 
  Calendar, 
  Download,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  Settings,
  Phone,
  TrendingUp,
  Calculator
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { applicationId, loanDetails } = location.state || {};
  
  // Mock loan data
  const loanData = {
    accountNumber: 'PSB' + applicationId?.slice(-8) || '12345678',
    principalAmount: 500000,
    outstandingAmount: 425000,
    paidAmount: 75000,
    emiAmount: 23003,
    nextEmiDate: '2024-09-15',
    tenure: 24,
    completedEMIs: 3,
    remainingEMIs: 21,
    interestRate: 10.5,
    status: 'Active'
  };

  const [activeTab, setActiveTab] = useState('overview');

  const completionPercentage = (loanData.paidAmount / loanData.principalAmount) * 100;

  const emiSchedule = Array.from({ length: 6 }, (_, i) => ({
    emiNumber: i + 1,
    dueDate: new Date(2024, 7 + i, 15).toLocaleDateString(),
    amount: loanData.emiAmount,
    principal: 18000 + (i * 100),
    interest: 5003 - (i * 100),
    status: i < 3 ? 'Paid' : 'Pending'
  }));

  const handlePayEMI = () => {
    toast({
      title: "EMI Payment",
      description: "Redirecting to payment gateway...",
    });
    // In real app, navigate to payment page
  };

  const handlePartPayment = () => {
    toast({
      title: "Part Payment",
      description: "Part payment feature would open here",
    });
  };

  const handleDownloadStatement = () => {
    toast({
      title: "Download Started",
      description: "Your loan statement is being downloaded",
    });
  };

  const handleRaiseRequest = () => {
    toast({
      title: "Service Request",
      description: "Service request form would open here",
    });
  };

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
          <h1 className="text-lg font-semibold">Loan Management</h1>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Loan Overview */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Personal Loan</h2>
                <p className="text-sm text-muted-foreground">Account: {loanData.accountNumber}</p>
                <Badge className="mt-2" variant="secondary">
                  {loanData.status}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Outstanding Amount</p>
                <p className="text-2xl font-bold text-primary">₹{loanData.outstandingAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Loan Progress</span>
                <span>{completionPercentage.toFixed(1)}% Completed</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹{loanData.paidAmount.toLocaleString()} Paid</span>
                <span>₹{loanData.outstandingAmount.toLocaleString()} Remaining</span>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handlePayEMI} className="h-14 flex flex-col">
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Pay EMI</span>
          </Button>
          <Button variant="outline" onClick={handlePartPayment} className="h-14 flex flex-col">
            <IndianRupee className="h-5 w-5 mb-1" />
            <span className="text-xs">Part Payment</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">EMI Schedule</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Next EMI */}
            <BankingCard title="Next EMI Due" className="rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-orange-800">Due Date</p>
                      <p className="text-sm text-orange-600">{loanData.nextEmiDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-orange-800">₹{loanData.emiAmount.toLocaleString()}</p>
                    <p className="text-xs text-orange-600">Auto-debit enabled</p>
                  </div>
                </div>

                <Button onClick={handlePayEMI} className="w-full">
                  Pay Now
                </Button>
              </div>
            </BankingCard>

            {/* Loan Details */}
            <BankingCard title="Loan Details" className="rounded-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Principal Amount</p>
                  <p className="font-semibold">₹{loanData.principalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-semibold">{loanData.interestRate}% p.a.</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="font-semibold">{loanData.tenure} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">EMI Amount</p>
                  <p className="font-semibold">₹{loanData.emiAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed EMIs</p>
                  <p className="font-semibold">{loanData.completedEMIs}/{loanData.tenure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining EMIs</p>
                  <p className="font-semibold">{loanData.remainingEMIs}</p>
                </div>
              </div>
            </BankingCard>

            {/* Interest Savings */}
            <BankingCard className="rounded-2xl bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Save on Interest</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Make a part payment to reduce your interest burden and close your loan early.
                  </p>
                  <Button size="sm" variant="outline" onClick={handlePartPayment}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Savings
                  </Button>
                </div>
              </div>
            </BankingCard>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <BankingCard title="EMI Schedule" className="rounded-2xl">
              <div className="space-y-3">
                {emiSchedule.map((emi) => (
                  <div key={emi.emiNumber} className="p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">EMI #{emi.emiNumber}</span>
                        <Badge variant={emi.status === 'Paid' ? 'default' : 'secondary'}>
                          {emi.status}
                        </Badge>
                      </div>
                      <span className="font-semibold">₹{emi.amount.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p>{emi.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Principal</p>
                        <p>₹{emi.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest</p>
                        <p>₹{emi.interest.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View Complete Schedule
                </Button>
              </div>
            </BankingCard>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            {/* Documents */}
            <BankingCard title="Documents & Statements" className="rounded-2xl">
              <div className="space-y-3">
                <Button variant="outline" onClick={handleDownloadStatement} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Loan Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Sanction Letter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Repayment Schedule
                </Button>
              </div>
            </BankingCard>

            {/* Service Requests */}
            <BankingCard title="Service Requests" className="rounded-2xl">
              <div className="space-y-3">
                <Button variant="outline" onClick={handleRaiseRequest} className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Change EMI Date
                </Button>
                <Button variant="outline" onClick={handleRaiseRequest} className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Update Address
                </Button>
                <Button variant="outline" onClick={handleRaiseRequest} className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Loan Closure Request
                </Button>
              </div>
            </BankingCard>

            {/* Contact Support */}
            <BankingCard title="Need Help?" className="rounded-2xl">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Contact our loan specialists for any assistance
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Raise Complaint
                  </Button>
                </div>
              </div>
            </BankingCard>
          </TabsContent>
        </Tabs>
      </div>
    </BankingLayout>
  );
};

export default LoanManagement;