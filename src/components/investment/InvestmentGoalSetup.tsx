
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  GraduationCap, 
  Home, 
  Car, 
  Plane, 
  Shield,
  Calculator,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  color: string;
  timeHorizon: string;
  riskLevel: string;
}

const InvestmentGoalSetup = ({ onGoalSelected }: { onGoalSelected: (goal: any) => void }) => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number>(500000);
  const [timeHorizon, setTimeHorizon] = useState<number[]>([5]);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);

  const investmentGoals: Goal[] = [
    {
      id: 'retirement',
      title: 'Retirement Planning',
      icon: <Shield className="h-6 w-6" />,
      description: 'Build a corpus for comfortable retirement',
      color: 'bg-purple-500',
      timeHorizon: '15-30 years',
      riskLevel: 'Moderate to High'
    },
    {
      id: 'child_education',
      title: 'Child Education',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Save for your child\'s higher education',
      color: 'bg-blue-500',
      timeHorizon: '10-18 years',
      riskLevel: 'Moderate'
    },
    {
      id: 'house_purchase',
      title: 'Home Purchase',
      icon: <Home className="h-6 w-6" />,
      description: 'Save for your dream home down payment',
      color: 'bg-blue-500',
      timeHorizon: '3-10 years',
      riskLevel: 'Moderate'
    },
    {
      id: 'car_purchase',
      title: 'Vehicle Purchase',
      icon: <Car className="h-6 w-6" />,
      description: 'Plan for your next vehicle purchase',
      color: 'bg-red-500',
      timeHorizon: '1-5 years',
      riskLevel: 'Low to Moderate'
    },
    {
      id: 'vacation',
      title: 'Dream Vacation',
      icon: <Plane className="h-6 w-6" />,
      description: 'Save for that special trip you\'ve been planning',
      color: 'bg-orange-500',
      timeHorizon: '1-3 years',
      riskLevel: 'Low'
    },
    {
      id: 'wealth_creation',
      title: 'Wealth Creation',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'General wealth building with no specific goal',
      color: 'bg-indigo-500',
      timeHorizon: '5+ years',
      riskLevel: 'High'
    }
  ];

  const calculateSipAmount = () => {
    const months = timeHorizon[0] * 12;
    const annualReturn = 0.12; // Assuming 12% annual return
    const monthlyReturn = annualReturn / 12;
    
    // SIP calculation formula
    const sipAmount = (goalAmount * monthlyReturn) / 
      (Math.pow(1 + monthlyReturn, months) - 1);
    
    return Math.round(sipAmount);
  };

  const handleProceed = () => {
    const selectedGoalData = investmentGoals.find(g => g.id === selectedGoal);
    const sipAmount = calculateSipAmount();
    
    const goalData = {
      goal: selectedGoalData,
      amount: goalAmount,
      timeHorizon: timeHorizon[0],
      suggestedSip: sipAmount,
      currentAge,
      monthlyIncome
    };
    
    onGoalSelected(goalData);
  };

  return (
    <div className="space-y-6">
      <BankingCard title="Set Your Investment Goal" icon={<Target className="h-5 w-5" />} className="rounded-2xl">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose what you're investing for to get personalized recommendations
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {investmentGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedGoal === goal.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg text-white ${goal.color}`}>
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                    <div className="flex space-x-4 text-xs">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {goal.timeHorizon}
                      </span>
                      <span>Risk: {goal.riskLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BankingCard>

      {selectedGoal && (
        <BankingCard title="Goal Details" className="rounded-2xl">
          <div className="space-y-6">
            <div>
              <Label>Target Amount (₹)</Label>
              <Input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="text-lg font-semibold"
              />
            </div>

            <div>
              <Label>Time Horizon: {timeHorizon[0]} years</Label>
              <div className="mt-4 mb-6">
                <Slider
                  value={timeHorizon}
                  onValueChange={setTimeHorizon}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Current Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="income">Monthly Income (₹)</Label>
                <Input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
            </div>

            {/* SIP Calculation */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Suggested Investment</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly SIP Required:</span>
                    <span className="font-semibold text-blue-600">₹{calculateSipAmount().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Investment:</span>
                    <span>₹{(calculateSipAmount() * timeHorizon[0] * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expected Returns:</span>
                    <span className="text-blue-600">₹{(goalAmount - (calculateSipAmount() * timeHorizon[0] * 12)).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    *Assuming 12% annual returns
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleProceed} className="w-full" size="lg">
              Proceed with Goal Setup
            </Button>
          </div>
        </BankingCard>
      )}
    </div>
  );
};

export default InvestmentGoalSetup;
