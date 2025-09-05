import { ArrowLeft, Calculator, FileText, CreditCard, Clock, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankingLayout } from "@/components/BankingLayout";

const LoanServices = () => {
  const loanTypes = [
    {
      title: "Personal Loan",
      description: "Quick approval for personal expenses",
      rate: "10.5% p.a.",
      icon: <IndianRupee className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Home Loan",
      description: "Finance your dream home",
      rate: "8.5% p.a.",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Car Loan",
      description: "Drive your dream car home",
      rate: "9.0% p.a.",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Education Loan",
      description: "Invest in your future",
      rate: "8.0% p.a.",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const quickActions = [
    { title: "EMI Calculator", icon: <Calculator className="h-5 w-5" /> },
    { title: "Loan Status", icon: <Clock className="h-5 w-5" /> },
    { title: "Make Payment", icon: <CreditCard className="h-5 w-5" /> },
    { title: "Documents", icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Loan Services</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-20 flex-col gap-2">
                {action.icon}
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Available Loans</h2>
            <div className="space-y-4">
              {loanTypes.map((loan, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
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
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Apply Now</Button>
                      <Button size="sm" variant="outline" className="flex-1">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanServices;