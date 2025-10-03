import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RewardsLoyaltyWidget = () => {
  const navigate = useNavigate();

  const rewardsData = {
    totalPoints: 2450,
    pointsThisMonth: 350,
    nextTierPoints: 3000,
    currentTier: 'Gold',
    nextTier: 'Platinum',
    redeemableValue: '₹2,450',
    expiringPoints: 450,
    expiryDate: '30th Sept'
  };

  const recentRewards = [
    {
      type: 'UPI Transaction',
      points: '+25',
      description: 'Swiggy payment',
      date: 'Today',
      icon: <Star className="h-3 w-3" />
    },
    {
      type: 'Bill Payment',
      points: '+50',
      description: 'Electricity bill',
      date: 'Yesterday',
      icon: <Star className="h-3 w-3" />
    },
    {
      type: 'Card Purchase',
      points: '+100',
      description: 'Amazon purchase',
      date: '2 days ago',
      icon: <Star className="h-3 w-3" />
    }
  ];

  const quickRedemptions = [
    { type: 'Cashback', value: '₹500', points: 500, popular: true },
    { type: 'Gift Voucher', value: '₹1,000', points: 1000, popular: false },
    { type: 'Travel Points', value: '₹2,000', points: 2000, popular: false }
  ];

  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextTierPoints) * 100;

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Gift className="h-4 w-4 text-amber-500 mr-2" />
            Rewards & Points
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/offers-rewards')}
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Points Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amber-600">{rewardsData.totalPoints}</span>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                {rewardsData.currentTier}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Total Points</p>
            <p className="text-xs font-medium text-muted-foreground">
              Worth {rewardsData.redeemableValue}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">+{rewardsData.pointsThisMonth}</span>
            </div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-xs text-blue-600 font-medium">Keep earning!</p>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Progress to {rewardsData.nextTier}</p>
            <p className="text-xs text-muted-foreground">
              {rewardsData.nextTierPoints - rewardsData.totalPoints} points to go
            </p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Expiring Points Alert */}
        {rewardsData.expiringPoints > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="h-4 w-4 text-red-600" />
              <p className="text-sm font-medium text-red-800">Points Expiring Soon</p>
            </div>
            <p className="text-xs text-red-700 mb-2">
              {rewardsData.expiringPoints} points expire on {rewardsData.expiryDate}
            </p>
            <Button size="sm" variant="destructive" className="h-6 text-xs">
              Redeem Now
            </Button>
          </div>
        )}

        {/* Quick Redemptions */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Quick Redeem</h4>
          <div className="grid grid-cols-3 gap-2">
            {quickRedemptions.map((redemption, index) => (
              <button
                key={index}
                onClick={() => navigate('/offers-rewards')}
                className="relative p-2 border border-border rounded-lg hover:shadow-sm transition-all duration-200 text-center"
              >
                {redemption.popular && (
                  <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground border-0 text-xs px-1 py-0">
                    ★
                  </Badge>
                )}
                <p className="text-xs font-medium">{redemption.type}</p>
                <p className="text-xs text-primary font-bold">{redemption.value}</p>
                <p className="text-xs text-muted-foreground">{redemption.points} pts</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Rewards */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recent Earnings</h4>
          <div className="space-y-2">
            {recentRewards.slice(0, 2).map((reward, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-amber-100 text-amber-600 rounded">
                    {reward.icon}
                  </div>
                  <div>
                    <p className="font-medium">{reward.type}</p>
                    <p className="text-muted-foreground">{reward.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">{reward.points}</p>
                  <p className="text-muted-foreground">{reward.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};