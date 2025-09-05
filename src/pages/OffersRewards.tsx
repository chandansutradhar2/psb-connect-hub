import { ArrowLeft, Gift, Star, Trophy, Percent, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BankingLayout } from "@/components/BankingLayout";

const OffersRewards = () => {
  const rewardPoints = {
    available: 2850,
    expiring: 500,
    expiryDate: "30 Nov 2024"
  };

  const offers = [
    {
      title: "Cashback on UPI Payments",
      description: "Get 1% cashback on all UPI transactions",
      discount: "1% Cashback",
      validTill: "31 Dec 2024",
      type: "Cashback",
      isNew: true
    },
    {
      title: "Bill Payment Rewards",
      description: "Earn 2x points on electricity bill payments",
      discount: "2x Points",
      validTill: "15 Nov 2024",
      type: "Points",
      isNew: false
    },
    {
      title: "Shopping Festival",
      description: "Extra 5% off on e-commerce transactions",
      discount: "5% Off",
      validTill: "20 Nov 2024",
      type: "Discount",
      isNew: true
    },
    {
      title: "Fuel Surcharge Waiver",
      description: "No fuel surcharge on petrol pump transactions",
      discount: "Free",
      validTill: "31 Dec 2024",
      type: "Waiver",
      isNew: false
    }
  ];

  const loyaltyPrograms = [
    {
      title: "PSB Premium",
      level: "Gold",
      progress: 75,
      benefits: "Higher transaction limits, priority support"
    },
    {
      title: "Credit Card Rewards",
      level: "Silver",
      progress: 45,
      benefits: "Bonus points on dining and fuel"
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
            <h1 className="text-xl font-semibold">Offers & Rewards</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6" />
                <h2 className="text-lg font-semibold">Reward Points</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75">Available Points</p>
                  <p className="text-2xl font-bold">{rewardPoints.available.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Expiring Soon</p>
                  <p className="text-xl font-semibold">{rewardPoints.expiring}</p>
                  <p className="text-xs opacity-75">by {rewardPoints.expiryDate}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="mt-4">
                Redeem Points
              </Button>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-4">Loyalty Programs</h2>
            <div className="space-y-3">
              {loyaltyPrograms.map((program, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{program.title}</h3>
                      </div>
                      <Badge variant="secondary">{program.level}</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{program.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Current Offers</h2>
            <div className="space-y-4">
              {offers.map((offer, index) => (
                <Card key={index} className="relative">
                  {offer.isNew && (
                    <Badge className="absolute -top-2 -right-2 z-10">
                      <Star className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{offer.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Valid till {offer.validTill}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {offer.discount}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{offer.type}</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Activate Offer
                    </Button>
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

export default OffersRewards;