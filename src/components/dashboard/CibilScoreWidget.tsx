import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CibilScoreWidget = () => {
  const navigate = useNavigate();
  
  // Mock CIBIL data - in real app, this would come from API
  const cibilData = {
    score: 780,
    status: 'Excellent',
    lastUpdated: '15 days ago',
    improvement: '+25 points',
    eligibleForLoans: true
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 750) return 'bg-success';
    if (score >= 650) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="card-professional hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Shield className="h-4 w-4 text-primary mr-2" />
            Credit Score (CIBIL)
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            Free
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${getScoreColor(cibilData.score)}`}>
                {cibilData.score}
              </span>
              <Badge className="bg-success/10 text-success border-success/20 text-xs">
                {cibilData.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Updated {cibilData.lastUpdated}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-success text-sm font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              {cibilData.improvement}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Score Range</span>
            <span className="font-medium">300 - 900</span>
          </div>
          <Progress 
            value={(cibilData.score / 900) * 100} 
            className="h-2"
          />
        </div>

        {cibilData.eligibleForLoans && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm font-medium text-primary mb-1">
              🎉 Pre-approved Loan Available
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Based on your excellent credit score
            </p>
            <Button 
              size="sm" 
              className="w-full h-8 text-xs"
              onClick={() => navigate('/loans')}
            >
              Check Offers
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};