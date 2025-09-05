import { useState } from 'react';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CibilScoreCardProps {
  onScoreUpdate?: (score: number) => void;
}

export const CibilScoreCard = ({ onScoreUpdate }: CibilScoreCardProps) => {
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkCibilScore = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with real API call
      const mockScore = Math.floor(Math.random() * (850 - 300) + 300);
      setScore(mockScore);
      setShowScore(true);
      setLastChecked(new Date().toLocaleDateString());
      onScoreUpdate?.(mockScore);
      
      toast({
        title: "CIBIL Score Updated",
        description: `Your current score is ${mockScore}`,
      });

      // Navigate to loan application if score is eligible
      if (mockScore >= 650) {
        navigate('/loan-application', { state: { cibilScore: mockScore } });
      } else {
        toast({
          title: "Improve Your Score",
          description: "Your score is too low for loan eligibility. Try paying bills on time.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setError("Failed to fetch CIBIL score. Please try again.");
      toast({
        title: "Error",
        description: "Unable to fetch CIBIL score. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreStatus = (score: number) => {
    if (score >= 750) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (score >= 700) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (score >= 650) return { status: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <BankingCard title="CIBIL Score Check" className="rounded-2xl">
      {error ? (
        <div className="text-center py-6">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <Button onClick={checkCibilScore} disabled={isLoading}>
            Retry
          </Button>
        </div>
      ) : !score ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Check Your Credit Score</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get your free CIBIL score to check loan eligibility
          </p>
          <Button 
            onClick={checkCibilScore} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Checking Score...
              </>
            ) : (
              'Check CIBIL Score'
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your CIBIL Score</p>
              {lastChecked && (
                <p className="text-xs text-muted-foreground">Last updated: {lastChecked}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowScore(!showScore)}
              aria-label={showScore ? "Hide CIBIL score" : "Show CIBIL score"}
            >
              {showScore ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {showScore ? (
            <>
              <div className="text-center py-4">
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <Badge 
                  variant="secondary" 
                  className={`mt-2 ${getScoreStatus(score).bgColor} ${getScoreStatus(score).color}`}
                >
                  {getScoreStatus(score).status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score Range</span>
                  <span>300 - 850</span>
                </div>
                <Progress value={(score / 850) * 100} className="h-2" />
              </div>

              {score < 650 && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">
                    Tips to Improve Your Score:
                  </p>
                  <ul className="text-xs text-yellow-800 mt-2">
                    <li>• Pay all bills and EMIs on time</li>
                    <li>• Reduce credit card utilization</li>
                    <li>• Avoid multiple loan applications</li>
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkCibilScore} 
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/credit-report')}
                >
                  View Report
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click the eye icon to view your score</p>
            </div>
          )}
        </div>
      )}
    </BankingCard>
  );
};