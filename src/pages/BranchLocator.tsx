import { ArrowLeft, MapPin, Navigation, Clock, Phone, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BankingLayout } from "@/components/BankingLayout";

const BranchLocator = () => {
  const nearbyBranches = [
    {
      name: "PSB Andheri Branch",
      address: "Shop No. 1-4, Andheri West, Mumbai - 400058",
      distance: "0.5 km",
      isOpen: true,
      timing: "9:30 AM - 4:30 PM",
      phone: "+91 22 2674 5621",
      services: ["ATM", "Cash Deposit", "Locker"]
    },
    {
      name: "PSB Bandra Branch",
      address: "Hill Road, Bandra West, Mumbai - 400050",
      distance: "2.1 km",
      isOpen: true,
      timing: "9:30 AM - 4:30 PM",
      phone: "+91 22 2640 3245",
      services: ["ATM", "Personal Banking", "Business Banking"]
    },
    {
      name: "PSB Juhu Branch",
      address: "S.V Road, Juhu, Mumbai - 400049",
      distance: "3.8 km",
      isOpen: false,
      timing: "9:30 AM - 4:30 PM",
      phone: "+91 22 2660 7891",
      services: ["ATM", "Forex", "Locker"]
    },
    {
      name: "PSB Khar Branch",
      address: "Linking Road, Khar West, Mumbai - 400052",
      distance: "4.2 km",
      isOpen: true,
      timing: "9:30 AM - 4:30 PM",
      phone: "+91 22 2649 5634",
      services: ["ATM", "Personal Banking", "Credit Cards"]
    }
  ];

  const atmLocations = [
    {
      location: "PSB ATM - Infinity Mall",
      address: "Infinity Mall, Malad West, Mumbai",
      distance: "1.2 km",
      isWorking: true,
      services: ["Cash Withdrawal", "Balance Inquiry", "PIN Change"]
    },
    {
      location: "PSB ATM - Metro Station",
      address: "Andheri Metro Station, Mumbai",
      distance: "0.8 km",
      isWorking: true,
      services: ["Cash Withdrawal", "Balance Inquiry", "Mini Statement"]
    },
    {
      location: "PSB ATM - Hospital",
      address: "Cooper Hospital, Juhu, Mumbai",
      distance: "2.5 km",
      isWorking: false,
      services: ["Under Maintenance"]
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
            <h1 className="text-xl font-semibold">Branch & ATM Locator</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search location, branch name or pincode"
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Nearby Branches</h2>
            <div className="space-y-4">
              {nearbyBranches.map((branch, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{branch.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{branch.address}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{branch.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{branch.timing}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={branch.isOpen ? "default" : "destructive"}>
                          {branch.isOpen ? "Open" : "Closed"}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{branch.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {branch.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Nearby ATMs</h2>
            <div className="space-y-4">
              {atmLocations.map((atm, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{atm.location}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{atm.address}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{atm.distance}</span>
                        </div>
                      </div>
                      <Badge variant={atm.isWorking ? "default" : "destructive"}>
                        {atm.isWorking ? "Working" : "Out of Order"}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {atm.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
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

export default BranchLocator;