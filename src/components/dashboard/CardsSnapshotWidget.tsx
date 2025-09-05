import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Eye, EyeOff, Lock, Unlock, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const CardsSnapshotWidget = () => {
  const navigate = useNavigate();
  const [showCardNumber, setShowCardNumber] = useState(false);

  const cardsData = [
    {
      id: 1,
      type: 'Credit Card',
      name: 'PSB Platinum Card',
      number: '4532 1234 5678 9012',
      maskedNumber: '4532 •••• •••• 9012',
      availableLimit: 87500,
      totalLimit: 100000,
      dueAmount: 12500,
      dueDate: '5 days',
      status: 'active',
      color: 'from-purple-600 to-purple-700',
      urgent: true
    },
    {
      id: 2,
      type: 'Debit Card',
      name: 'PSB Savings Card',
      number: '5678 9012 3456 7890',
      maskedNumber: '5678 •••• •••• 7890',
      availableLimit: 125430,
      totalLimit: 125430,
      dueAmount: 0,
      dueDate: null,
      status: 'active',
      color: 'from-green-600 to-green-700',
      urgent: false
    }
  ];

  const cardControls = [
    { label: 'Block Card', icon: <Lock className="h-3 w-3" />, action: 'block', variant: 'destructive' },
    { label: 'Activate Card', icon: <Unlock className="h-3 w-3" />, action: 'activate', variant: 'default' },
    { label: 'View PIN', icon: <Eye className="h-3 w-3" />, action: 'pin', variant: 'outline' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getUtilizationPercentage = (used: number, total: number) => {
    return total > 0 ? ((total - used) / total) * 100 : 0;
  };

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
            My Cards
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/cards-management')}
          >
            Manage
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cardsData.map((card) => (
          <div key={card.id} className="space-y-3">
            {/* Card Visual */}
            <div 
              className={`bg-gradient-to-br ${card.color} text-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200`}
              onClick={() => navigate('/cards-management')}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-white/80 font-medium">{card.type}</p>
                  <p className="text-sm font-bold">{card.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCardNumber(!showCardNumber);
                    }}
                    className="text-white hover:bg-white/20 rounded-full h-7 w-7"
                  >
                    {showCardNumber ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Badge className={`bg-white/20 text-white border-0 text-xs ${card.status === 'active' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                    {card.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-lg font-mono tracking-wider">
                  {showCardNumber ? card.number : card.maskedNumber}
                </p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/80">Available</p>
                    <p className="text-lg font-bold">{formatCurrency(card.availableLimit)}</p>
                  </div>
                  {card.type === 'Credit Card' && (
                    <div className="text-right">
                      <p className="text-xs text-white/80">Limit</p>
                      <p className="text-sm font-semibold">{formatCurrency(card.totalLimit)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Details & Alerts */}
            <div className="space-y-2">
              {card.type === 'Credit Card' && (
                <>
                  {/* Credit Utilization */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground">Credit Utilization</span>
                    <span className="text-xs font-bold">{Math.round(100 - getUtilizationPercentage(card.availableLimit, card.totalLimit))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${100 - getUtilizationPercentage(card.availableLimit, card.totalLimit)}%` }}
                    ></div>
                  </div>

                  {/* Due Amount Alert */}
                  {card.dueAmount > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="text-sm font-medium text-red-800">
                            Payment Due: {formatCurrency(card.dueAmount)}
                          </p>
                          <p className="text-xs text-red-600">Due in {card.dueDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive" className="h-7 text-xs">
                        Pay Now
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Quick Card Controls */}
              <div className="grid grid-cols-3 gap-2">
                {cardControls.map((control, index) => (
                  <Button
                    key={index}
                    variant={control.variant as any}
                    size="sm"
                    className="h-7 text-xs flex items-center justify-center space-x-1"
                    onClick={() => navigate('/cards-management')}
                  >
                    {control.icon}
                    <span className="hidden sm:inline">{control.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="pt-3 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full h-10 text-sm"
            onClick={() => navigate('/cards-management')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Apply for New Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};