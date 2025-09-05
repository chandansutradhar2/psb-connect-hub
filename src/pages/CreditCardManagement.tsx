import { ArrowLeft, CreditCard, Lock, Unlock, Settings, FileText, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BankingLayout } from "@/components/BankingLayout";

const CreditCardManagement = () => {
  const cards = [
    {
      name: "PSB Platinum Card",
      number: "**** **** **** 1234",
      type: "Platinum",
      status: "Active",
      limit: "₹5,00,000",
      available: "₹4,25,000"
    },
    {
      name: "PSB Gold Card",
      number: "**** **** **** 5678",
      type: "Gold",
      status: "Blocked",
      limit: "₹2,00,000",
      available: "₹1,80,000"
    }
  ];

  const services = [
    { title: "Block/Unblock Card", icon: <Lock className="h-5 w-5" />, color: "bg-red-50 text-red-600" },
    { title: "Set PIN", icon: <Settings className="h-5 w-5" />, color: "bg-blue-50 text-blue-600" },
    { title: "View Statement", icon: <FileText className="h-5 w-5" />, color: "bg-green-50 text-green-600" },
    { title: "Rewards & Offers", icon: <Gift className="h-5 w-5" />, color: "bg-purple-50 text-purple-600" },
    { title: "Set Limits", icon: <Settings className="h-5 w-5" />, color: "bg-orange-50 text-orange-600" },
    { title: "Request New Card", icon: <CreditCard className="h-5 w-5" />, color: "bg-indigo-50 text-indigo-600" }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Credit Card Management</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">My Cards</h2>
            <div className="space-y-4">
              {cards.map((card, index) => (
                <Card key={index} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{card.name}</h3>
                        <p className="text-sm opacity-90">{card.number}</p>
                      </div>
                      <Badge variant={card.status === "Active" ? "default" : "destructive"}>
                        {card.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm opacity-75">Available Limit</p>
                        <p className="text-xl font-bold">{card.available}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-75">Total Limit</p>
                        <p className="font-semibold">{card.limit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Card Services</h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mx-auto mb-3`}>
                      {service.icon}
                    </div>
                    <p className="text-sm font-medium">{service.title}</p>
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

export default CreditCardManagement;