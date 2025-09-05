import { useState } from 'react';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  BarChart3,
  CheckCircle 
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    score: number;
  }[];
}

interface RiskProfileAssessmentProps {
  onAssessmentComplete: (profile: RiskProfile) => void;
}

interface RiskProfile {
  type: 'Conservative' | 'Moderate' | 'Aggressive';
  score: number;
  description: string;
  recommendedAllocation: {
    equity: number;
    debt: number;
    gold: number;
  };
}

const RiskProfileAssessment = ({ onAssessmentComplete }: RiskProfileAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  const questions: Question[] = [
    {
      id: 'age',
      question: 'What is your age?',
      options: [
        { label: 'Below 25 years', value: 'young', score: 4 },
        { label: '25-35 years', value: 'mid_young', score: 3 },
        { label: '35-50 years', value: 'middle_age', score: 2 },
        { label: 'Above 50 years', value: 'senior', score: 1 }
      ]
    },
    {
      id: 'investment_horizon',
      question: 'What is your investment time horizon?',
      options: [
        { label: 'More than 10 years', value: 'long_term', score: 4 },
        { label: '5-10 years', value: 'medium_term', score: 3 },
        { label: '3-5 years', value: 'short_medium', score: 2 },
        { label: 'Less than 3 years', value: 'short_term', score: 1 }
      ]
    },
    {
      id: 'income_stability',
      question: 'How stable is your income?',
      options: [
        { label: 'Very stable with regular increments', value: 'very_stable', score: 4 },
        { label: 'Stable with occasional variations', value: 'stable', score: 3 },
        { label: 'Moderately stable', value: 'moderate', score: 2 },
        { label: 'Irregular or uncertain', value: 'unstable', score: 1 }
      ]
    },
    {
      id: 'market_volatility',
      question: 'If your investment lost 20% value in a month, what would you do?',
      options: [
        { label: 'Buy more at lower prices', value: 'buy_more', score: 4 },
        { label: 'Hold and wait for recovery', value: 'hold', score: 3 },
        { label: 'Feel worried but not sell', value: 'worried_hold', score: 2 },
        { label: 'Sell immediately to avoid further loss', value: 'sell', score: 1 }
      ]
    },
    {
      id: 'investment_experience',
      question: 'What is your investment experience?',
      options: [
        { label: 'Extensive experience in multiple asset classes', value: 'expert', score: 4 },
        { label: 'Good knowledge of mutual funds and stocks', value: 'experienced', score: 3 },
        { label: 'Basic knowledge, mostly FDs and savings', value: 'beginner', score: 2 },
        { label: 'First-time investor', value: 'first_time', score: 1 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const profile = calculateRiskProfile(newAnswers);
      setRiskProfile(profile);
      setShowResult(true);
      onAssessmentComplete(profile);
    }
  };

  const calculateRiskProfile = (finalAnswers: Record<string, number>): RiskProfile => {
    const totalScore = Object.values(finalAnswers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 75) {
      return {
        type: 'Aggressive',
        score: totalScore,
        description: 'You have a high risk tolerance and are comfortable with market volatility for potentially higher returns.',
        recommendedAllocation: { equity: 80, debt: 15, gold: 5 }
      };
    } else if (percentage >= 50) {
      return {
        type: 'Moderate',
        score: totalScore,
        description: 'You prefer a balanced approach with moderate risk for steady growth.',
        recommendedAllocation: { equity: 60, debt: 35, gold: 5 }
      };
    } else {
      return {
        type: 'Conservative',
        score: totalScore,
        description: 'You prefer capital preservation with minimal risk and steady returns.',
        recommendedAllocation: { equity: 30, debt: 65, gold: 5 }
      };
    }
  };

  const getRiskColor = (type: string) => {
    switch (type) {
      case 'Aggressive': return 'text-red-600 bg-red-50 border-red-200';
      case 'Moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Conservative': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'Aggressive': return <TrendingUp className="h-5 w-5" />;
      case 'Moderate': return <BarChart3 className="h-5 w-5" />;
      case 'Conservative': return <Shield className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  if (showResult && riskProfile) {
    return (
      <BankingCard title="Your Risk Profile" className="rounded-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getRiskColor(riskProfile.type)}`}>
              {getRiskIcon(riskProfile.type)}
              <span className="font-semibold">{riskProfile.type} Investor</span>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-xl">
            <p className="text-sm text-center">{riskProfile.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Recommended Asset Allocation</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Equity Funds</span>
                <div className="flex items-center gap-2">
                  <Progress value={riskProfile.recommendedAllocation.equity} className="w-20 h-2" />
                  <span className="text-sm font-medium w-8">{riskProfile.recommendedAllocation.equity}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Debt Funds</span>
                <div className="flex items-center gap-2">
                  <Progress value={riskProfile.recommendedAllocation.debt} className="w-20 h-2" />
                  <span className="text-sm font-medium w-8">{riskProfile.recommendedAllocation.debt}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Gold/Other</span>
                <div className="flex items-center gap-2">
                  <Progress value={riskProfile.recommendedAllocation.gold} className="w-20 h-2" />
                  <span className="text-sm font-medium w-8">{riskProfile.recommendedAllocation.gold}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-700">Assessment Complete</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your responses, we'll recommend suitable investment products that match your risk profile.
            </p>
          </div>
        </div>
      </BankingCard>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <BankingCard title="Risk Profile Assessment" className="rounded-2xl">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div>
          <h3 className="font-semibold mb-4">{currentQ.question}</h3>
          <RadioGroup
            onValueChange={(value) => {
              const option = currentQ.options.find(opt => opt.value === value);
              if (option) {
                handleAnswer(currentQ.id, option.score);
              }
            }}
          >
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-xl border hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="text-sm text-muted-foreground text-center">
          This assessment helps us recommend suitable investments based on your risk tolerance.
        </div>
      </div>
    </BankingCard>
  );
};

export default RiskProfileAssessment;
