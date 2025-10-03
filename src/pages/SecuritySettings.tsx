import { ArrowLeft, Shield, Smartphone, Key, Eye, Lock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { BankingLayout } from "@/components/BankingLayout";

const SecuritySettings = () => {
  const securityFeatures = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      icon: <Shield className="h-5 w-5" />,
      enabled: true,
      status: "Active"
    },
    {
      title: "Biometric Login",
      description: "Use fingerprint or face ID",
      icon: <Key className="h-5 w-5" />,
      enabled: true,
      status: "Active"
    },
    {
      title: "Transaction Alerts",
      description: "Instant SMS/Email notifications",
      icon: <Smartphone className="h-5 w-5" />,
      enabled: true,
      status: "Active"
    },
    {
      title: "Auto Lock",
      description: "Lock app after inactivity",
      icon: <Lock className="h-5 w-5" />,
      enabled: false,
      status: "Disabled"
    }
  ];

  const recentActivity = [
    {
      action: "Login",
      device: "iPhone 14 Pro",
      location: "Mumbai, India",
      time: "2 hours ago",
      status: "success"
    },
    {
      action: "Password Change",
      device: "Web Browser",
      location: "Mumbai, India",
      time: "1 day ago",
      status: "success"
    },
    {
      action: "Failed Login Attempt",
      device: "Unknown Device",
      location: "Delhi, India",
      time: "3 days ago",
      status: "failed"
    }
  ];

  const registeredDevices = [
    {
      name: "iPhone 14 Pro",
      type: "Mobile",
      lastUsed: "Current session",
      trusted: true
    },
    {
      name: "MacBook Pro",
      type: "Computer",
      lastUsed: "2 days ago",
      trusted: true
    },
    {
      name: "Samsung Galaxy",
      type: "Mobile",
      lastUsed: "1 week ago",
      trusted: false
    }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/settings">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Security Settings</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Security Features</h2>
            <div className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={feature.enabled ? "default" : "secondary"}>
                          {feature.status}
                        </Badge>
                        <Switch checked={feature.enabled} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Key className="h-5 w-5" />
              <span className="text-sm">Change PIN</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Lock className="h-5 w-5" />
              <span className="text-sm">Change Password</span>
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Registered Devices</h2>
            <div className="space-y-3">
              {registeredDevices.map((device, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">{device.lastUsed}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={device.trusted ? "default" : "destructive"}>
                          {device.trusted ? "Trusted" : "Remove"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.status === "success" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                        }`}>
                          {activity.status === "success" ? <Shield className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{activity.action}</h3>
                          <p className="text-sm text-muted-foreground">{activity.device}</p>
                          <p className="text-sm text-muted-foreground">{activity.location}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
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

export default SecuritySettings;