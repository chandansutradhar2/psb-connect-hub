import { ArrowLeft, Shield, Heart, Car, Home, Briefcase, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankingLayout } from "@/components/BankingLayout";

const InsuranceServices = () => {
  const insuranceTypes = [
    {
      title: "Life Insurance",
      description: "Secure your family's future",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-red-50 text-red-600",
      premium: "₹500/month"
    },
    {
      title: "Health Insurance",
      description: "Complete healthcare coverage",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600",
      premium: "₹800/month"
    },
    {
      title: "Car Insurance",
      description: "Comprehensive vehicle protection",
      icon: <Car className="h-6 w-6" />,
      color: "bg-green-50 text-green-600",
      premium: "₹12,000/year"
    },
    {
      title: "Home Insurance",
      description: "Protect your home and belongings",
      icon: <Home className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600",
      premium: "₹8,000/year"
    },
    {
      title: "Business Insurance",
      description: "Coverage for your business",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-orange-50 text-orange-600",
      premium: "₹15,000/year"
    }
  ];

  const myPolicies = [
    {
      type: "Health Insurance",
      policyNo: "POL123456789",
      premium: "₹9,600",
      status: "Active",
      expiryDate: "31 Dec 2024"
    },
    {
      type: "Car Insurance",
      policyNo: "POL987654321",
      premium: "₹12,000",
      status: "Expires Soon",
      expiryDate: "15 Nov 2024"
    }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Insurance Services</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">My Policies</h2>
            <div className="space-y-3">
              {myPolicies.map((policy, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{policy.type}</h3>
                        <p className="text-sm text-muted-foreground">{policy.policyNo}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        policy.status === "Active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Premium</p>
                        <p className="font-semibold">{policy.premium}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-semibold">{policy.expiryDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Claim Insurance
            </Button>
            <Button variant="outline" className="flex-1">
              <Shield className="h-4 w-4 mr-2" />
              Renew Policy
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Available Insurance</h2>
            <div className="space-y-4">
              {insuranceTypes.map((insurance, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${insurance.color}`}>
                          {insurance.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{insurance.title}</h3>
                          <p className="text-sm text-muted-foreground">{insurance.description}</p>
                          <p className="text-sm font-medium text-primary">Starting {insurance.premium}</p>
                        </div>
                      </div>
                      <Button size="sm">Get Quote</Button>
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

export default InsuranceServices;