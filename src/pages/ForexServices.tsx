import { ArrowLeft, TrendingUp, TrendingDown, ArrowRightLeft, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BankingLayout } from "@/components/BankingLayout";

const ForexServices = () => {
  const exchangeRates = [
    {
      currency: "USD",
      name: "US Dollar",
      buyRate: 83.25,
      sellRate: 83.45,
      change: +0.15,
      changePercent: +0.18,
      flag: "🇺🇸"
    },
    {
      currency: "EUR",
      name: "Euro",
      buyRate: 90.15,
      sellRate: 90.35,
      change: -0.25,
      changePercent: -0.28,
      flag: "🇪🇺"
    },
    {
      currency: "GBP",
      name: "British Pound",
      buyRate: 105.50,
      sellRate: 105.75,
      change: +0.30,
      changePercent: +0.28,
      flag: "🇬🇧"
    },
    {
      currency: "JPY",
      name: "Japanese Yen",
      buyRate: 0.56,
      sellRate: 0.58,
      change: -0.01,
      changePercent: -1.75,
      flag: "🇯🇵"
    },
    {
      currency: "AUD",
      name: "Australian Dollar",
      buyRate: 54.80,
      sellRate: 55.00,
      change: +0.20,
      changePercent: +0.36,
      flag: "🇦🇺"
    },
    {
      currency: "CAD",
      name: "Canadian Dollar",
      buyRate: 61.25,
      sellRate: 61.45,
      change: +0.10,
      changePercent: +0.16,
      flag: "🇨🇦"
    }
  ];

  const forexServices = [
    {
      title: "Currency Exchange",
      description: "Buy/Sell foreign currency",
      icon: <ArrowRightLeft className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Forex Card",
      description: "Multi-currency travel card",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Wire Transfer",
      description: "International money transfer",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Rate Alerts",
      description: "Get notified of rate changes",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const myForexCards = [
    {
      cardNumber: "**** **** **** 1234",
      type: "Multi-Currency Card",
      balance: "USD 500, EUR 200",
      status: "Active",
      expiryDate: "12/26"
    },
    {
      cardNumber: "**** **** **** 5678",
      type: "USD Travel Card",
      balance: "USD 1,200",
      status: "Active",
      expiryDate: "08/25"
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
            <h1 className="text-xl font-semibold">Forex Services</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Live Exchange Rates
              </CardTitle>
              <p className="text-sm text-muted-foreground">Updated as of {new Date().toLocaleTimeString()}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rate.flag}</span>
                    <div>
                      <h3 className="font-semibold">{rate.currency}</h3>
                      <p className="text-sm text-muted-foreground">{rate.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{rate.buyRate}</span>
                      <div className={`flex items-center gap-1 ${
                        rate.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {rate.change >= 0 ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <TrendingDown className="h-4 w-4" />
                        }
                        <span className="text-sm">{Math.abs(rate.changePercent)}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sell: ₹{rate.sellRate}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-4">My Forex Cards</h2>
            <div className="space-y-3">
              {myForexCards.map((card, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{card.type}</h3>
                        <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
                        <p className="text-sm font-medium mt-1">{card.balance}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{card.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">Exp: {card.expiryDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Load Money
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Statement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Forex Services</h2>
            <div className="grid grid-cols-2 gap-4">
              {forexServices.map((service, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mx-auto mb-3`}>
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Currency Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">From</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="number" 
                      placeholder="1000" 
                      className="flex-1 p-2 border rounded text-sm"
                    />
                    <select className="p-2 border rounded text-sm">
                      <option>INR</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">To</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="text" 
                      value="12.01" 
                      readOnly 
                      className="flex-1 p-2 border rounded text-sm bg-muted"
                    />
                    <select className="p-2 border rounded text-sm">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>INR</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button className="w-full">
                Get Live Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BankingLayout>
  );
};

export default ForexServices;