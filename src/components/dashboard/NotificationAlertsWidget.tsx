import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle, CreditCard, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationAlertsWidget = () => {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      type: 'urgent',
      category: 'Payment',
      title: 'Credit Card Bill Due',
      message: 'Your PSB Credit Card bill of ₹12,500 is due in 2 days',
      time: '2 hours ago',
      icon: <CreditCard className="h-4 w-4" />,
      action: 'Pay Now',
      actionPath: '/cards'
    },
    {
      id: 2,
      type: 'warning',
      category: 'Investment',
      title: 'FD Maturity Alert',
      message: 'Your Fixed Deposit of ₹2,00,000 matures on 15th Sept',
      time: '1 day ago',
      icon: <TrendingUp className="h-4 w-4" />,
      action: 'Renew',
      actionPath: '/deposit-management'
    },
    {
      id: 3,
      type: 'info',
      category: 'Account',
      title: 'Monthly Statement Ready',
      message: 'Your August account statement is now available',
      time: '2 days ago',
      icon: <Info className="h-4 w-4" />,
      action: 'Download',
      actionPath: '/statements-center'
    },
    {
      id: 4,
      type: 'success',
      category: 'Transaction',
      title: 'Salary Credited',
      message: '₹85,000 salary has been credited to your account',
      time: '3 days ago',
      icon: <CheckCircle className="h-4 w-4" />,
      action: 'View',
      actionPath: '/mini-statement'
    }
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600 bg-red-100',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-50 border-amber-200',
          iconColor: 'text-amber-600 bg-amber-100',
          textColor: 'text-amber-800',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600 bg-blue-100',
          textColor: 'text-blue-800',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'success':
        return {
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600 bg-blue-100',
          textColor: 'text-blue-800',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      default:
        return {
          bgColor: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600 bg-gray-100',
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const unreadCount = alerts.filter(alert => alert.type === 'urgent' || alert.type === 'warning').length;

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Bell className="h-4 w-4 text-primary mr-2" />
            Alerts & Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-100 text-red-800 border-red-200 text-xs">
                {unreadCount} urgent
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/notification-center')}
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.slice(0, 3).map((alert) => {
          const styles = getAlertStyles(alert.type);
          
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-3 hover:shadow-sm transition-all duration-200 ${styles.bgColor}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${styles.iconColor}`}>
                  {alert.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold text-sm ${styles.textColor}`}>
                      {alert.title}
                    </h4>
                    <Badge className={`text-xs ${styles.badgeColor}`}>
                      {alert.category}
                    </Badge>
                  </div>
                  <p className={`text-xs ${styles.textColor} opacity-80`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-muted-foreground">
                      {alert.time}
                    </span>
                    <Button
                      size="sm"
                      variant={alert.type === 'urgent' ? 'destructive' : 'outline'}
                      className="h-6 text-xs px-2"
                      onClick={() => navigate(alert.actionPath)}
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Quick Actions for Alerts */}
        <div className="pt-2 border-t border-border">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => navigate('/bills')}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Pay Bills
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => navigate('/mini-statement')}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Check Balance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};