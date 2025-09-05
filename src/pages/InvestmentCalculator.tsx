import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, Calendar, DollarSign, Target } from 'lucide-react';

export const InvestmentCalculator = () => {
  const [calculatorType, setCalculatorType] = useState<'sip' | 'lumpsum' | 'goal'>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [goalAmount, setGoalAmount] = useState(5000000);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return futureValue;
  };

  const calculateLumpsum = () => {
    const futureValue = investmentAmount * Math.pow(1 + expectedReturn / 100, timePeriod);
    return futureValue;
  };

  const calculateGoal = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    const sipAmount = goalAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    return sipAmount;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Investment Calculator</h2>
        <Select value={calculatorType} onValueChange={(value: 'sip' | 'lumpsum' | 'goal') => setCalculatorType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Calculator Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sip">SIP Calculator</SelectItem>
            <SelectItem value="lumpsum">Lumpsum Calculator</SelectItem>
            <SelectItem value="goal">Goal Planner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {calculatorType === 'sip' && 'SIP Calculator'}
            {calculatorType === 'lumpsum' && 'Lumpsum Calculator'}
            {calculatorType === 'goal' && 'Goal Planner'}
          </CardTitle>
          <CardDescription>
            {calculatorType === 'sip' && 'Calculate the future value of your systematic investments'}
            {calculatorType === 'lumpsum' && 'Calculate the future value of your one-time investment'}
            {calculatorType === 'goal' && 'Calculate how much you need to invest to reach your financial goal'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {calculatorType === 'sip' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sip-amount">Monthly Investment (₹)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[monthlyInvestment]}
                      onValueChange={([value]) => setMonthlyInvestment(value)}
                      max={100000}
                      step={500}
                      className="flex-1"
                    />
                    <Input
                      id="sip-amount"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sip-return">Expected Annual Return (%)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={([value]) => setExpectedReturn(value)}
                      max={30}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      id="sip-return"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sip-period">Time Period (Years)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[timePeriod]}
                      onValueChange={([value]) => setTimePeriod(value)}
                      max={30}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      id="sip-period"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment:</span>
                  <span className="font-semibold">{formatCurrency(monthlyInvestment * timePeriod * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Returns:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(calculateSIP() - monthlyInvestment * timePeriod * 12)}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-medium">Future Value:</span>
                  <span className="font-bold">{formatCurrency(calculateSIP())}</span>
                </div>
              </div>
            </>
          )}

          {calculatorType === 'lumpsum' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lumpsum-amount">Investment Amount (₹)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[investmentAmount]}
                      onValueChange={([value]) => setInvestmentAmount(value)}
                      max={10000000}
                      step={10000}
                      className="flex-1"
                    />
                    <Input
                      id="lumpsum-amount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lumpsum-return">Expected Annual Return (%)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={([value]) => setExpectedReturn(value)}
                      max={30}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      id="lumpsum-return"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lumpsum-period">Time Period (Years)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[timePeriod]}
                      onValueChange={([value]) => setTimePeriod(value)}
                      max={30}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      id="lumpsum-period"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment:</span>
                  <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Returns:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(calculateLumpsum() - investmentAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-medium">Future Value:</span>
                  <span className="font-bold">{formatCurrency(calculateLumpsum())}</span>
                </div>
              </div>
            </>
          )}

          {calculatorType === 'goal' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">Goal Amount (₹)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[goalAmount]}
                      onValueChange={([value]) => setGoalAmount(value)}
                      max={10000000}
                      step={10000}
                      className="flex-1"
                    />
                    <Input
                      id="goal-amount"
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-return">Expected Annual Return (%)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={([value]) => setExpectedReturn(value)}
                      max={30}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      id="goal-return"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-period">Time Period (Years)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[timePeriod]}
                      onValueChange={([value]) => setTimePeriod(value)}
                      max={30}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      id="goal-period"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Investment Needed:</span>
                  <span className="font-semibold">{formatCurrency(calculateGoal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment:</span>
                  <span className="font-semibold">{formatCurrency(calculateGoal() * timePeriod * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wealth Gained:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(goalAmount - calculateGoal() * timePeriod * 12)}
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};