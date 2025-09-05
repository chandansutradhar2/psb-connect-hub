import { ArrowLeft, Calculator, FileText, Download, Upload, Calendar, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BankingLayout } from "@/components/BankingLayout";

const TaxTools = () => {
  const taxSummary = {
    year: "2024-25",
    totalIncome: 1200000,
    taxPaid: 45000,
    taxDue: 125000,
    refundExpected: 0,
    filingStatus: "Not Filed"
  };

  const taxSavingInvestments = [
    {
      scheme: "ELSS Mutual Funds",
      invested: 50000,
      limit: 150000,
      remaining: 100000,
      section: "80C"
    },
    {
      scheme: "PPF",
      invested: 75000,
      limit: 150000,
      remaining: 75000,
      section: "80C"
    },
    {
      scheme: "Health Insurance",
      invested: 25000,
      limit: 50000,
      remaining: 25000,
      section: "80D"
    },
    {
      scheme: "NSC",
      invested: 25000,
      limit: 150000,
      remaining: 125000,
      section: "80C"
    }
  ];

  const taxDocuments = [
    {
      name: "Form 16",
      type: "Salary Certificate",
      status: "Available",
      downloadUrl: "#"
    },
    {
      name: "Bank Interest Certificate",
      type: "Interest Income",
      status: "Available",
      downloadUrl: "#"
    },
    {
      name: "Mutual Fund Statement",
      type: "Capital Gains",
      status: "Pending",
      downloadUrl: "#"
    },
    {
      name: "Home Loan Certificate",
      type: "Interest Deduction",
      status: "Available",
      downloadUrl: "#"
    }
  ];

  const quickTools = [
    { title: "Tax Calculator", icon: <Calculator className="h-5 w-5" />, description: "Calculate your tax liability" },
    { title: "TDS Certificate", icon: <FileText className="h-5 w-5" />, description: "Download TDS certificates" },
    { title: "Investment Planner", icon: <Receipt className="h-5 w-5" />, description: "Plan tax saving investments" },
    { title: "Return Filing", icon: <Upload className="h-5 w-5" />, description: "File your income tax return" }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Tax Tools</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tax Summary {taxSummary.year}</h2>
                <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-sm">
                  {taxSummary.filingStatus}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75">Total Income</p>
                  <p className="text-xl font-bold">₹{taxSummary.totalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Tax Due</p>
                  <p className="text-xl font-bold">₹{taxSummary.taxDue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Tax Paid</p>
                  <p className="text-lg font-semibold">₹{taxSummary.taxPaid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Balance</p>
                  <p className="text-lg font-semibold">₹{(taxSummary.taxDue - taxSummary.taxPaid).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {quickTools.map((tool, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Tax Saving Investments (80C, 80D)</h2>
            <div className="space-y-3">
              {taxSavingInvestments.map((investment, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold">{investment.scheme}</h3>
                        <p className="text-sm text-muted-foreground">Section {investment.section}</p>
                      </div>
                      <span className="text-sm font-medium">
                        ₹{investment.invested.toLocaleString()} / ₹{investment.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(investment.invested / investment.limit) * 100} 
                      className="h-2 mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round((investment.invested / investment.limit) * 100)}% utilized</span>
                      <span>₹{investment.remaining.toLocaleString()} remaining</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Tax Documents</h2>
            <div className="space-y-3">
              {taxDocuments.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          doc.status === "Available" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }`}>
                          {doc.status}
                        </span>
                        {doc.status === "Available" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Important Tax Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span>Last date for tax-saving investments</span>
                <span className="font-semibold text-red-600">31 Mar 2025</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span>ITR filing due date</span>
                <span className="font-semibold">31 Jul 2025</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Advance tax payment (Q4)</span>
                <span className="font-semibold">15 Mar 2025</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BankingLayout>
  );
};

export default TaxTools;