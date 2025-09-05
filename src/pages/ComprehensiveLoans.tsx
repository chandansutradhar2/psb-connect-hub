import { useState } from "react";
import { ArrowLeft, Calculator, FileText, CreditCard, Clock, IndianRupee, Home, Car, GraduationCap, Briefcase, TrendingUp, Phone, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BankingLayout } from "@/components/BankingLayout";
import { useToast } from "@/hooks/use-toast";

const ComprehensiveLoans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState("personal");

  const loanTypes = [
    {
      id: "personal",
      title: "Personal Loan",
      description: "Quick approval for personal expenses",
      rate: "10.5% p.a.",
      maxAmount: "₹30,00,000",
      tenure: "1-7 years",
      icon: <IndianRupee className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600",
      features: ["Instant approval", "No collateral", "Flexible tenure", "Minimal documentation"]
    },
    {
      id: "home",
      title: "Home Loan",
      description: "Finance your dream home",
      rate: "8.5% p.a.",
      maxAmount: "₹10,00,00,000",
      tenure: "5-30 years",
      icon: <Home className="h-6 w-6" />,
      color: "bg-green-50 text-green-600",
      features: ["Tax benefits", "Attractive rates", "Balance transfer", "Top-up facility"]
    },
    {
      id: "car",
      title: "Car Loan",
      description: "Drive your dream car home",
      rate: "9.0% p.a.",
      maxAmount: "₹1,50,00,000",
      tenure: "1-7 years",
      icon: <Car className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600",
      features: ["100% financing", "Quick processing", "Flexible EMI", "Insurance assistance"]
    },
    {
      id: "education",
      title: "Education Loan",
      description: "Invest in your future",
      rate: "8.0% p.a.",
      maxAmount: "₹1,50,00,000",
      tenure: "5-15 years",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-orange-50 text-orange-600",
      features: ["Moratorium period", "Tax benefits", "Covers all expenses", "Co-applicant benefits"]
    },
    {
      id: "business",
      title: "Business Loan",
      description: "Grow your business",
      rate: "11.0% p.a.",
      maxAmount: "₹5,00,00,000",
      tenure: "1-10 years",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-teal-50 text-teal-600",
      features: ["Working capital", "Equipment financing", "Quick approval", "Collateral free options"]
    }
  ];

  const existingLoans = [
    {
      id: 1,
      type: "Home Loan",
      amount: "₹45,00,000",
      outstanding: "₹32,50,000",
      emi: "₹38,500",
      nextDue: "15 Jan 2025",
      status: "Active",
      accountNumber: "HL123456789"
    },
    {
      id: 2,
      type: "Car Loan",
      amount: "₹8,50,000",
      outstanding: "₹3,20,000",
      emi: "₹15,200",
      nextDue: "18 Jan 2025",
      status: "Active",
      accountNumber: "CL987654321"
    }
  ];

  const quickActions = [
    { title: "EMI Calculator", icon: <Calculator className="h-5 w-5" />, action: () => setActiveTab("calculator") },
    { title: "Loan Status", icon: <Clock className="h-5 w-5" />, action: () => setActiveTab("my-loans") },
    { title: "Make Payment", icon: <CreditCard className="h-5 w-5" />, action: () => handleEMIPayment() },
    { title: "Documents", icon: <FileText className="h-5 w-5" />, action: () => navigate('/documents') }
  ];

  const [activeTab, setActiveTab] = useState("available");

  const calculateEMI = () => {
    if (!loanAmount || !loanTenure) {
      toast({
        title: "Please fill all fields",
        description: "Enter loan amount and tenure to calculate EMI.",
        variant: "destructive"
      });
      return;
    }

    const selectedLoan = loanTypes.find(loan => loan.id === selectedLoanType);
    const rate = parseFloat(selectedLoan?.rate || "10") / 100 / 12;
    const principal = parseFloat(loanAmount);
    const months = parseInt(loanTenure) * 12;

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    
    toast({
      title: "EMI Calculated",
      description: `Your monthly EMI will be ₹${Math.round(emi).toLocaleString()}`,
    });
  };

  const handleLoanApplication = (loanId: string) => {
    toast({
      title: "Application Started",
      description: "Your loan application has been initiated. Our team will contact you within 24 hours.",
    });
    navigate('/loan-application', { state: { loanType: loanId } });
  };

  const handleEMIPayment = () => {
    toast({
      title: "Redirecting to Payment",
      description: "You will be redirected to the payment gateway.",
    });
    navigate('/payments');
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Loan Services</h1>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-20 flex-col gap-2" onClick={action.action}>
                {action.icon}
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available">Available Loans</TabsTrigger>
              <TabsTrigger value="my-loans">My Loans</TabsTrigger>
              <TabsTrigger value="calculator">EMI Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose Your Loan</h2>
                <div className="space-y-4">
                  {loanTypes.map((loan) => (
                    <Card key={loan.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${loan.color}`}>
                              {loan.icon}
                            </div>
                            <div>
                              <CardTitle className="text-base">{loan.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{loan.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-primary">{loan.rate}</p>
                            <p className="text-xs text-muted-foreground">Interest Rate</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Max Amount</p>
                            <p className="font-medium">{loan.maxAmount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tenure</p>
                            <p className="font-medium">{loan.tenure}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {loan.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleLoanApplication(loan.id)}>
                            Apply Now
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my-loans" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-4">My Active Loans</h2>
                {existingLoans.length > 0 ? (
                  <div className="space-y-4">
                    {existingLoans.map((loan) => (
                      <Card key={loan.id} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-base">{loan.type}</CardTitle>
                              <p className="text-sm text-muted-foreground">A/c: {loan.accountNumber}</p>
                            </div>
                            <Badge variant="default" className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {loan.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Outstanding</p>
                              <p className="text-lg font-bold text-destructive">{loan.outstanding}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Monthly EMI</p>
                              <p className="text-lg font-bold">{loan.emi}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Original Amount</p>
                              <p className="font-medium">{loan.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Next Due Date</p>
                              <p className="font-medium">{loan.nextDue}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={handleEMIPayment}>
                              Pay EMI
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/loan-statement')}>
                              View Statement
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No Active Loans</h3>
                      <p className="text-sm text-muted-foreground mb-4">You don't have any active loans at the moment</p>
                      <Button onClick={() => setActiveTab("available")}>
                        Explore Loan Options
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Loan Summary */}
              {existingLoans.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-destructive">
                          ₹{existingLoans.reduce((sum, loan) => sum + parseFloat(loan.outstanding.replace(/[₹,]/g, '')), 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Outstanding</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-primary">
                          ₹{existingLoans.reduce((sum, loan) => sum + parseFloat(loan.emi.replace(/[₹,]/g, '')), 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Monthly EMI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    EMI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loan-type">Loan Type</Label>
                      <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((loan) => (
                            <SelectItem key={loan.id} value={loan.id}>
                              {loan.title} - {loan.rate}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="amount">Loan Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        placeholder="Enter tenure in years"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateEMI} className="w-full">
                      Calculate EMI
                    </Button>
                  </div>

                  {loanAmount && loanTenure && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Loan Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Principal Amount:</span>
                          <span>₹{parseInt(loanAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span>{loanTypes.find(l => l.id === selectedLoanType)?.rate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tenure:</span>
                          <span>{loanTenure} years ({parseInt(loanTenure) * 12} months)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Eligibility Checker */}
              <Card>
                <CardHeader>
                  <CardTitle>Check Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Get an instant eligibility check for your loan application.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Check CIBIL Score
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Calculator className="h-4 w-4 mr-2" />
                        Income Calculator
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Document Checklist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BankingLayout>
  );
};

export default ComprehensiveLoans;