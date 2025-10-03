

// import { useState } from "react";
// import { ArrowLeft, PiggyBank, TrendingUp, Calendar, Calculator, Plus, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, PiggyBank, TrendingUp, Calendar, Calculator, Plus, Eye, Clock, CheckCircle, AlertCircle, Banknote, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BankingLayout } from "@/components/BankingLayout";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const DepositManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [depositAmount, setDepositAmount] = useState("");
  const [depositTenure, setDepositTenure] = useState("");
  const [depositType, setDepositType] = useState("fd");
  const [activeTab, setActiveTab] = useState("my-deposits");

  const depositProducts = [
    {
      type: "fd",
      title: "Fixed Deposit",
      description: "Guaranteed returns with flexible tenure options",
      rates: [
        { tenure: "7 days - 45 days", rate: "3.0%" },
        { tenure: "46 days - 179 days", rate: "4.0%" },
        { tenure: "180 days - 364 days", rate: "5.5%" },
        { tenure: "1 year - 2 years", rate: "6.5%" },
        { tenure: "2 years - 5 years", rate: "7.0%" },
        { tenure: "5 years - 10 years", rate: "7.5%" }
      ],
      features: ["Guaranteed returns", "Loan against FD", "Auto-renewal option", "Premature withdrawal"],
      minAmount: "₹1,000",
      icon: <PiggyBank className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      type: "rd",
      title: "Recurring Deposit",
      description: "Build savings habit with monthly deposits",
      rates: [
        { tenure: "6 months", rate: "5.5%" },
        { tenure: "1 year", rate: "6.0%" },
        { tenure: "2 years", rate: "6.5%" },
        { tenure: "3 years", rate: "7.0%" },
        { tenure: "5 years", rate: "7.5%" }
      ],
      features: ["Monthly investment", "Disciplined saving", "Tax benefits", "Flexible tenure"],
      minAmount: "₹100",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const existingDeposits = [
    {
      id: 1,
      type: "Fixed Deposit",
      accountNumber: "FD123456789",
      amount: "₹5,00,000",
      maturityAmount: "₹6,75,000",
      interestRate: "7.0%",
      tenure: "5 years",
      startDate: "15 Jan 2022",
      maturityDate: "15 Jan 2027",
      status: "Active",
      autoRenewal: true
    },
    {
      id: 2,
      type: "Recurring Deposit",
      accountNumber: "RD987654321",
      monthlyAmount: "₹5,000",
      maturityAmount: "₹3,82,500",
      interestRate: "6.5%",
      tenure: "5 years",
      startDate: "10 Mar 2023",
      maturityDate: "10 Mar 2028",
      status: "Active",
      installmentsPaid: 22,
      totalInstallments: 60
    },
    {
      id: 3,
      type: "Fixed Deposit",
      accountNumber: "FD555444333",
      amount: "₹2,00,000",
      maturityAmount: "₹2,26,000",
      interestRate: "6.5%",
      tenure: "2 years",
      startDate: "20 Nov 2023",
      maturityDate: "20 Nov 2025",
      status: "Matured",
      autoRenewal: false
    }
  ];

  const calculateMaturity = () => {
    if (!depositAmount || !depositTenure) {
      toast({
        title: "Incomplete Information",
        description: "Please enter both amount and tenure to calculate maturity.",
        variant: "destructive"
      });
      return;
    }

    const principal = parseFloat(depositAmount);
    const years = parseFloat(depositTenure);
    let rate = 7.0; // Default rate

    if (depositType === "fd") {
      if (years <= 0.125) rate = 3.0;
      else if (years <= 0.5) rate = 4.0;
      else if (years <= 1) rate = 5.5;
      else if (years <= 2) rate = 6.5;
      else if (years <= 5) rate = 7.0;
      else rate = 7.5;
    } else {
      if (years <= 0.5) rate = 5.5;
      else if (years <= 1) rate = 6.0;
      else if (years <= 2) rate = 6.5;
      else if (years <= 3) rate = 7.0;
      else rate = 7.5;
    }

    const maturityAmount = principal * Math.pow(1 + rate / 100, years);
    const interest = maturityAmount - principal;

    toast({
      title: "Maturity Calculation",
      description: (
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Principal:</span>
            <span className="font-medium">₹{principal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Interest ({rate}%):</span>
            <span className="font-medium">₹{Math.round(interest).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-blue-600">
            <span>Maturity Amount:</span>
            <span>₹{Math.round(maturityAmount).toLocaleString()}</span>
          </div>
        </div>
      ),
    });
  };
  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

  const openNewDeposit = (type: string) => {
    navigate('/deposit-application', { state: { depositType: type } });
  };

  const renewDeposit = (depositId: number) => {
    toast({
      title: "Deposit Renewed",
      description: "Your deposit has been successfully renewed.",
    });
  };

  const breakDeposit = (depositId: number) => {
    toast({
      title: "Withdrawal Requested",
      description: "Your premature withdrawal request has been initiated.",
    });
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4 p-4">
             {/* <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
             </Link> */}
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Deposit Accounts</h1>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-24">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Deposits</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{existingDeposits
                        .filter(d => d.status === "Active")
                        .reduce((sum, d) => sum + parseFloat((d.amount || d.monthlyAmount || '0').replace(/[₹,]/g, '')), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Schemes</p>
                    <p className="text-xl font-bold text-gray-900">
                      {existingDeposits.filter(d => d.status === "Active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="my-deposits" className="py- data-[state=active]:bg-primary data-[state=active]:text-white rounded-full">
                My Deposits
              </TabsTrigger>
              <TabsTrigger value="new-deposit" className="py- data-[state=active]:bg-primary data-[state=active]:text-white rounded-full">
                New Deposit
              </TabsTrigger>
              <TabsTrigger value="calculator" className="py- data-[state=active]:bg-primary data-[state=active]:text-white rounded-full">
                Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-deposits" className="space-y-4 mt-6">
              {/* Deposits List */}
              <div className="space-y-4">
                {existingDeposits.map((deposit) => (
                  <Card key={deposit.id} className="border border-gray-200 shadow-sm overflow-hidden">
                    <div className={`h-1 ${deposit.status === "Active" ? "bg-blue-500" : deposit.status === "Matured" ? "bg-blue-500" : "bg-gray-400"}`}></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{deposit.type}</CardTitle>
                          <CardDescription className="text-sm">A/c: {deposit.accountNumber}</CardDescription>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            deposit.status === "Active" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                            deposit.status === "Matured" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                            "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {deposit.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {deposit.type === "Recurring Deposit" ? "Monthly Amount" : "Principal"}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {deposit.amount || deposit.monthlyAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Maturity Amount</p>
                          <p className="text-lg font-bold text-blue-600">{deposit.maturityAmount}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Rate</p>
                          <p className="font-medium">{deposit.interestRate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Start Date</p>
                          <p className="font-medium">{deposit.startDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Maturity</p>
                          <p className="font-medium">{deposit.maturityDate}</p>
                        </div>
                      </div>

                      {deposit.type === "Recurring Deposit" && deposit.installmentsPaid && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">
                              {deposit.installmentsPaid}/{deposit.totalInstallments}
                            </span>
                          </div>
                          <Progress 
                            value={(deposit.installmentsPaid / (deposit.totalInstallments || 1)) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" size="sm"
                        //  onClick={() => navigate(`/deposit-statement/${deposit.id}`)}
                                    onClick={() => handleComingSoon("Statement")}

                         >
                          Statement
                        </Button>
                        {deposit.status === "Active" && (
                          <Button variant="outline" className="flex-1" size="sm" onClick={() => breakDeposit(deposit.id)}>
                            Break
                          </Button>
                        )}
                        {deposit.status === "Matured" && (
                          <Button className="flex-1" size="sm" onClick={() => renewDeposit(deposit.id)}>
                            Renew
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new-deposit" className="space-y-4 mt-6">
              <div className="space-y-4">
                {depositProducts.map((product) => (
                  <Card key={product.type} className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${product.color}`}>
                          {product.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{product.title}</CardTitle>
                          <CardDescription className="text-sm">{product.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Interest Rates</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          {product.rates.map((rate, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">{rate.tenure}</span>
                              <span className="font-medium text-blue-600">{rate.rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-blue-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-xs text-gray-500">Minimum Amount</p>
                          <p className="text-sm font-medium">{product.minAmount}</p>
                        </div>
                        <Button
                   onClick={() => handleComingSoon("Statement")}

                        //  onClick={() => openNewDeposit(product.type)} size="sm"
                         >
                          <Plus className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4 mt-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calculator className="h-5 w-5" />
                    Deposit Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="deposit-type" className="text-sm">Deposit Type</Label>
                      <Select value={depositType} onValueChange={setDepositType}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select deposit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fd">Fixed Deposit</SelectItem>
                          <SelectItem value="rd">Recurring Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="amount" className="text-sm">
                        {depositType === "fd" ? "Investment Amount (₹)" : "Monthly Investment (₹)"}
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tenure" className="text-sm">Investment Period (Years)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        step="0.5"
                        placeholder="Enter years"
                        maxLength={2}
                        value={depositTenure}
                        onChange={(e) => setDepositTenure(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <Button onClick={calculateMaturity} className="w-full h-10">
                      Calculate Maturity
                    </Button>
                  </div>

                  {depositAmount && depositTenure && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-sm mb-3">Projected Returns</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Principal:</span>
                          <span className="font-medium">₹{parseInt(depositAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tenure:</span>
                          <span className="font-medium">{depositTenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Rate:</span>
                          <span className="font-medium text-blue-600">7.0% p.a.</span>
                        </div>
                        <div className="border-t border-gray-200 my-2"></div>
                        {depositType === "rd" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Investment:</span>
                            <span className="font-medium">
                              ₹{(parseInt(depositAmount) * parseFloat(depositTenure) * 12).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-blue-600">
                          <span>Estimated Maturity:</span>
                          <span>
                            ₹{Math.round(parseInt(depositAmount) * Math.pow(1.07, parseFloat(depositTenure))).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BankingLayout>
  );
};

export default DepositManagement;

