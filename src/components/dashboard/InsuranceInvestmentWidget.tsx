import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InsuranceInvestmentWidget = () => {
  const navigate = useNavigate();

  const insuranceData = [
    {
      type: 'Health Insurance',
      provider: 'PSB Health Plus',
      premium: '₹15,000',
      coverage: '₹5,00,000',
      expiryDays: 15,
      status: 'expiring',
      icon: <Shield className="h-4 w-4" />
    },
    {
      type: 'Term Life Insurance',
      provider: 'PSB Life Secure',
      premium: '₹12,000',
      coverage: '₹1,00,00,000',
      expiryDays: 45,
      status: 'active',
      icon: <Shield className="h-4 w-4" />
    }
  ];

  const investmentData = [
    {
      type: 'SIP Portfolio',
      amount: '₹5,000',
      frequency: 'Monthly',
      nextDue: '7th Sept',
      returns: '+12.5%',
      value: '₹2,45,000',
      daysLeft: 3,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      type: 'Fixed Deposit',
      amount: '₹1,00,000',
      maturity: '15th Oct',
      rate: '7.25%',
      returns: '+₹7,250',
      daysLeft: 25,
      icon: <Calendar className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string, days: number) => {
    if (status === 'expiring' || days <= 7) return 'text-destructive bg-destructive/10 border-destructive/20';
    if (days <= 15) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-success bg-success/10 border-success/20';
  };

  return (
    <div className="space-y-4">
      {/* Insurance Summary */}
      <Card className="card-professional">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center">
              <Shield className="h-4 w-4 text-blue-600 mr-2" />
              Insurance Summary
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
              onClick={() => navigate('/insurance-dashboard')}
            >
              Manage
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {insuranceData.map((insurance, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  {insurance.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{insurance.type}</p>
                  <p className="text-xs text-muted-foreground">{insurance.provider}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(insurance.status, insurance.expiryDays)}`}>
                      {insurance.expiryDays <= 15 ? `Expires in ${insurance.expiryDays} days` : 'Active'}
                    </Badge>
                    {insurance.expiryDays <= 15 && (
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{insurance.coverage}</p>
                <p className="text-xs text-muted-foreground">Coverage</p>
                {insurance.expiryDays <= 15 && (
                  <Button size="sm" variant="destructive" className="mt-1 h-6 text-xs">
                    Renew Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Investment Summary */}
      <Card className="card-professional">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              Investment Summary
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
              onClick={() => navigate('/investment-dashboard')}
            >
              Portfolio
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {investmentData.map((investment, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    {investment.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{investment.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {investment.frequency ? `${investment.amount} ${investment.frequency}` : `${investment.amount} invested`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-success">{investment.returns}</p>
                  <p className="text-xs text-muted-foreground">Returns</p>
                </div>
              </div>
              
              {investment.daysLeft <= 7 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-800">
                        {investment.nextDue ? `Next SIP due: ${investment.nextDue}` : `Matures: ${investment.maturity}`}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      {investment.nextDue ? 'Pay Now' : 'Renew'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};