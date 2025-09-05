import { useState } from "react";
import { ArrowLeft, Bell, CreditCard, Banknote, Shield, Gift, TrendingUp, Check, X, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BankingLayout } from "@/components/BankingLayout";
import { useToast } from "@/hooks/use-toast";

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'transaction',
      title: 'Payment Received',
      message: 'You received ₹2,500 from Rajesh Kumar via UPI',
      timestamp: '2 minutes ago',
      read: false,
      icon: <Banknote className="h-5 w-5" />,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 2,
      type: 'security',
      title: 'Security Alert',
      message: 'New device login detected from Delhi. If this wasn\'t you, please secure your account.',
      timestamp: '1 hour ago',
      read: false,
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-red-50 text-red-600'
    },
    {
      id: 3,
      type: 'card',
      title: 'Card Transaction',
      message: 'Your PSB Credit Card was used for ₹1,234 at Amazon India',
      timestamp: '3 hours ago',
      read: true,
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 5% cashback on all UPI transactions this month. Limited time offer!',
      timestamp: '1 day ago',
      read: true,
      icon: <Gift className="h-5 w-5" />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 5,
      type: 'investment',
      title: 'Investment Update',
      message: 'Your mutual fund investment gained ₹456 today. Portfolio value: ₹45,670',
      timestamp: '2 days ago',
      read: true,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-orange-50 text-orange-600'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    transactions: true,
    security: true,
    promotions: true,
    investments: true,
    smsAlerts: true,
    emailAlerts: true,
    pushNotifications: true
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared.",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{notifications.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{unreadCount}</div>
                <div className="text-sm text-muted-foreground">Unread</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{notifications.length - unreadCount}</div>
                <div className="text-sm text-muted-foreground">Read</div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all ${
                    !notification.read ? 'border-primary/20 bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${notification.color} flex items-center justify-center flex-shrink-0`}>
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transaction Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified for all transactions</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.transactions}
                      onCheckedChange={() => toggleSetting('transactions')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Important security notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.security}
                      onCheckedChange={() => toggleSetting('security')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions & Offers</p>
                      <p className="text-sm text-muted-foreground">Special deals and cashback offers</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.promotions}
                      onCheckedChange={() => toggleSetting('promotions')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Investment Updates</p>
                      <p className="text-sm text-muted-foreground">Market updates and portfolio changes</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.investments}
                      onCheckedChange={() => toggleSetting('investments')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Delivery Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>SMS Alerts</span>
                    <Switch 
                      checked={notificationSettings.smsAlerts}
                      onCheckedChange={() => toggleSetting('smsAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Alerts</span>
                    <Switch 
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={() => toggleSetting('emailAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <Switch 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => toggleSetting('pushNotifications')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BankingLayout>
  );
};

export default NotificationCenter;