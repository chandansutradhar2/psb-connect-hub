import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/BottomNavigation';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  DollarSign,
  Calendar,
  BarChart3,
  Plus,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Home,
  CreditCard,
  Building,
  Coins,
  Calculator,
  BarChart2
} from 'lucide-react';
import { InvestmentCalculator } from './InvestmentCalculator';

const Investment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'mutual-funds' | 'sip' | 'goals' | 'calculator'>('overview');
  const [showCalculator, setShowCalculator] = useState(false);

  // Sample data
  const totalInvestment = 485000;
  const currentValue = 542300;
  const holdingsCount = 4;
  const oneDayReturns = 3200;
  const oneDayPercent = useMemo(() => (oneDayReturns / totalInvestment) * 100, [oneDayReturns, totalInvestment]);
  const totalReturns = useMemo(() => currentValue - totalInvestment, [currentValue, totalInvestment]);
  const returnsPercent = useMemo(() => (totalReturns / totalInvestment) * 100, [totalReturns, totalInvestment]);

  const mutualFunds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap',
      invested: 125000,
      current: 142500,
      nav: 285.67,
      units: 498.75,
      returns: 14.0,
      risk: 'Moderate'
    },
    {
      id: 2,
      name: 'SBI Small Cap Fund',
      category: 'Small Cap',
      invested: 85000,
      current: 98500,
      nav: 72.45,
      units: 1173.15,
      returns: 15.9,
      risk: 'High'
    },
    {
      id: 3,
      name: 'ICICI Prudential Balanced',
      category: 'Hybrid',
      invested: 95000,
      current: 102300,
      nav: 45.67,
      units: 2080.56,
      returns: 7.7,
      risk: 'Moderate'
    },
    {
      id: 4,
      name: 'Axis Long Term Equity',
      category: 'ELSS',
      invested: 75000,
      current: 78200,
      nav: 52.13,
      units: 1439.58,
      returns: 4.3,
      risk: 'Moderate'
    }
  ];

  const sipPlans = [
    {
      id: 1,
      fund: 'HDFC Top 100 Fund',
      amount: 5000,
      frequency: 'Monthly',
      nextDate: '2024-02-01',
      duration: '3 years',
      status: 'Active'
    },
    {
      id: 2,
      fund: 'SBI Small Cap Fund',
      amount: 3000,
      frequency: 'Monthly',
      nextDate: '2024-01-28',
      duration: '5 years',
      status: 'Active'
    },
    {
      id: 3,
      fund: 'ICICI Prudential Balanced',
      amount: 2500,
      frequency: 'Monthly',
      nextDate: '2024-02-05',
      duration: '2 years',
      status: 'Paused'
    }
  ];

  const goals = [
    {
      id: 1,
      name: 'House Down Payment',
      target: 2500000,
      achieved: 485000,
      timeline: '4 years',
      monthlyRequired: 45000,
      priority: 'High'
    },
    {
      id: 2,
      name: 'Child Education',
      target: 1500000,
      achieved: 285000,
      timeline: '8 years',
      monthlyRequired: 15000,
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Retirement Corpus',
      target: 8000000,
      achieved: 542000,
      timeline: '20 years',
      monthlyRequired: 25000,
      priority: 'High'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 md:px-6 lg:px-8 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">Mutual Fund</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <Home className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex bg-gray-100 rounded-full p-1 max-w-3xl mx-auto overflow-x-auto scrollbar-hide">
          {[
            { key: "overview", label: "Overview" },
            { key: "mutual-funds", label: "Mutual Funds" },
            { key: "sip", label: "SIP" },
            { key: "goals", label: "Goals" },
            { key: "calculator", label: "Calculator" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-shrink-0 px-3 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#1178AC]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <BankingCard className="rounded-xl px-4 py-4 bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-white/70 text-xs md:text-sm font-medium">
                  Holdings ({holdingsCount})
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-white/80 hover:bg-white/20 transition"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-white/80 hover:bg-white/20 transition"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl md:text-3xl font-bold">
                  ₹{currentValue.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-white/20 my-3"></div>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">1D returns</span>
                  <span className={`font-semibold ${oneDayReturns >= 0 ? "text-blue-100" : "text-red-300"}`}>
                    {oneDayReturns >= 0 ? "+" : ""}₹{oneDayReturns.toFixed(2)} ({oneDayPercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Total returns</span>
                  <span className={`font-semibold ${totalReturns >= 0 ? "text-blue-100" : "text-red-300"}`}>
                    {totalReturns >= 0 ? "+" : ""}₹{totalReturns.toLocaleString()} ({returnsPercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Invested</span>
                  <span className="font-medium">₹{totalInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">XIRR</span>
                  <span className={`font-semibold ${returnsPercent >= 0 ? "text-blue-100" : "text-red-300"}`}>
                    {returnsPercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </BankingCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => setActiveTab("sip")}
                className="psb-gold-gradient text-black font-medium rounded-xl px-4 py-3 h-auto flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm">Start SIP</span>
                <Plus className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setActiveTab("calculator")}
                variant="outline"
                className="rounded-xl px-4 py-3 h-auto flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm">Calculator</span>
                <Calculator className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Asset Allocation */}
            <BankingCard title="Asset Allocation" icon={<PieChart className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Equity Funds</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Hybrid Funds</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">ELSS Funds</span>
                    <span className="text-sm font-semibold">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </BankingCard>
          </div>
        )}

        {activeTab === 'mutual-funds' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold">Mutual Fund Holdings</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Add Fund
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mutualFunds.map((fund) => (
                <BankingCard key={fund.id} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{fund.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{fund.category}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {fund.risk} Risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{fund.current.toLocaleString()}</p>
                        <div className={`flex items-center text-xs md:text-sm ${fund.returns >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          {fund.returns >= 0 ? (
                            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          )}
                          {fund.returns >= 0 ? '+' : ''}{fund.returns}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs md:text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested</p>
                        <p className="font-medium">₹{fund.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">NAV</p>
                        <p className="font-medium">₹{fund.nav}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Units</p>
                        <p className="font-medium">{fund.units.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sip' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold">Active SIPs</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Start SIP
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sipPlans.map((sip) => (
                <BankingCard key={sip.id} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{sip.fund}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{sip.frequency} SIP</p>
                      </div>
                      <Badge
                        variant={sip.status === 'Active' ? 'default' : 'secondary'}
                        className="text-xs md:text-sm"
                      >
                        {sip.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs md:text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">₹{sip.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Date</p>
                        <p className="font-medium">{sip.nextDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{sip.duration}</p>
                      </div>
                    </div>
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold">Investment Goals</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <BankingCard key={goal.id} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{goal.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">Target in {goal.timeline}</p>
                      </div>
                      <Badge
                        variant={goal.priority === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs md:text-sm"
                      >
                        {goal.priority} Priority
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span>Progress</span>
                        <span>{((goal.achieved / goal.target) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(goal.achieved / goal.target) * 100} className="h-2" />
                      <p className="text-xs md:text-sm text-muted-foreground">
                        ₹{(goal.achieved / 100000).toFixed(1)}L of ₹{(goal.target / 100000).toFixed(1)}L achieved
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-3">
                      <p className="text-xs md:text-sm text-muted-foreground">Required Monthly Investment</p>
                      <p className="font-semibold text-primary">₹{goal.monthlyRequired.toLocaleString()}</p>
                    </div>
                  </div>
                </BankingCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Placeholder for InvestmentCalculator */}
            <InvestmentCalculator />
            {/* Note: Ensure InvestmentCalculator uses responsive classes like `w-full`, `max-w-lg mx-auto` for forms, and responsive typography (e.g., `text-sm md:text-base`). If it includes charts, use Chart.js with `responsive: true`. */}
          </div>
        )}
      </div>

      {/* Bottom Navigation (Hidden on larger screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Investment;