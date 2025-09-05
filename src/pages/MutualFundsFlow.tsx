
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Calculator,
  Search,
  Filter,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const MutualFundsFlow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'explore' | 'sip'>('portfolio');

  const portfolioValue = 125000;
  const totalInvested = 100000;
  const returns = portfolioValue - totalInvested;
  const returnsPercentage = (returns / totalInvested) * 100;

  const myInvestments = [
    {
      name: 'HDFC Top 100 Fund',
      type: 'Equity Mutual Fund',
      invested: 25000,
      current: 28500,
      returns: 3500,
      returnsPercent: 14,
      sipAmount: 5000,
      nextSip: '2024-02-01',
      nav: 850.45,
      units: 33.45
    },
    {
      name: 'SBI Bluechip Fund',
      type: 'Large Cap Fund',
      invested: 30000,
      current: 32100,
      returns: 2100,
      returnsPercent: 7,
      sipAmount: 3000,
      nextSip: '2024-01-25',
      nav: 68.32,
      units: 469.68
    },
    {
      name: 'ICICI Prudential Balanced',
      type: 'Hybrid Fund',
      invested: 20000,
      current: 21800,
      returns: 1800,
      returnsPercent: 9,
      sipAmount: 2000,
      nextSip: '2024-01-30',
      nav: 45.67,
      units: 477.33
    },
    {
      name: 'Axis Long Term Equity',
      type: 'ELSS Fund',
      invested: 25000,
      current: 24600,
      returns: -400,
      returnsPercent: -1.6,
      sipAmount: 4000,
      nextSip: '2024-02-05',
      nav: 72.18,
      units: 340.89
    }
  ];

  const topFunds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap Equity',
      nav: 850.45,
      returns: { '1y': 14.5, '3y': 12.8, '5y': 15.2 },
      rating: 5,
      riskLevel: 'High',
      minSip: 500,
      expense: 1.8,
      aum: 12500
    },
    {
      id: 2,
      name: 'SBI Bluechip Fund',
      category: 'Large Cap Equity',
      nav: 68.32,
      returns: { '1y': 13.2, '3y': 11.5, '5y': 14.8 },
      rating: 4,
      riskLevel: 'High',
      minSip: 500,
      expense: 1.9,
      aum: 15600
    },
    {
      id: 3,
      name: 'ICICI Prudential Balanced Advantage',
      category: 'Hybrid Fund',
      nav: 45.67,
      returns: { '1y': 11.8, '3y': 9.5, '5y': 12.1 },
      rating: 4,
      riskLevel: 'Moderate',
      minSip: 1000,
      expense: 2.1,
      aum: 8900
    }
  ];

  const fundCategories = [
    { id: 'equity', name: 'Equity Funds', risk: 'High', returns: '12-15%', color: 'bg-red-50 text-red-600' },
    { id: 'debt', name: 'Debt Funds', risk: 'Low', returns: '6-8%', color: 'bg-green-50 text-green-600' },
    { id: 'hybrid', name: 'Hybrid Funds', risk: 'Moderate', returns: '8-12%', color: 'bg-blue-50 text-blue-600' },
    { id: 'elss', name: 'Tax Saver ELSS', risk: 'High', returns: '10-14%', color: 'bg-purple-50 text-purple-600' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const activeSIPs = myInvestments.filter(inv => inv.sipAmount > 0);
  const totalSIPAmount = activeSIPs.reduce((sum, inv) => sum + inv.sipAmount, 0);

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/investments')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Mutual Funds</h1>
          <Button variant="ghost" size="sm" className="rounded-full p-2" onClick={() => navigate('/sip-calculator')}>
            <Calculator className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/sip-calculator')}>
            <Calculator className="h-5 w-5" />
            <span className="text-sm">SIP Calculator</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/fund-search')}>
            <Search className="h-5 w-5" />
            <span className="text-sm">Search Funds</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/goal-planner')}>
            <Target className="h-5 w-5" />
            <span className="text-sm">Goal Planner</span>
          </Button>
        </div>

        {/* Portfolio Summary */}
        {myInvestments.length > 0 && (
          <BankingCard className="rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-secondary text-white">
            <div className="space-y-4">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Portfolio Value</p>
                <p className="text-3xl font-bold">₹{portfolioValue.toLocaleString()}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-primary-foreground/80 text-xs">Total Invested</p>
                  <p className="font-semibold">₹{totalInvested.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/80 text-xs">Total Returns</p>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">₹{returns.toLocaleString()}</span>
                    <div className={`flex items-center text-xs ${returns >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                      {returns >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(returnsPercentage).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BankingCard>
        )}

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'portfolio'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">My Portfolio</span>
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'explore'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">Explore</span>
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'sip'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">My SIPs</span>
          </button>
        </div>

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {myInvestments.length > 0 ? (
              <>
                {/* Investment Holdings */}
                <BankingCard title="Your Investments" className="rounded-2xl">
                  <div className="space-y-4">
                    {myInvestments.map((investment, index) => (
                      <div key={index} className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-sm">{investment.name}</h3>
                            <p className="text-xs text-muted-foreground">{investment.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">₹{investment.current.toLocaleString()}</p>
                            <div className={`flex items-center text-xs ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {investment.returns >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {investment.returnsPercent > 0 ? '+' : ''}{investment.returnsPercent}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-medium">₹{investment.invested.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">NAV</p>
                            <p className="font-medium">₹{investment.nav}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Units</p>
                            <p className="font-medium">{investment.units}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/fund-details')}>
                            <Eye className="h-3 w-3 mr-2" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/redeem-fund')}>
                            <Download className="h-3 w-3 mr-2" />
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </BankingCard>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-16 flex-col gap-2" onClick={() => navigate('/invest-more')}>
                    <Plus className="h-5 w-5" />
                    <span className="text-sm">Invest More</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/portfolio-analysis')}>
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-sm">Analysis</span>
                  </Button>
                </div>
              </>
            ) : (
              <BankingCard className="rounded-2xl">
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Start Your Investment Journey</h3>
                  <p className="text-sm text-muted-foreground mb-4">Begin investing with SIPs starting from ₹500</p>
                  <Button onClick={() => setActiveTab('explore')}>
                    Explore Funds
                  </Button>
                </div>
              </BankingCard>
            )}
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Fund Categories */}
            <BankingCard title="Fund Categories" className="rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                {fundCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`p-4 rounded-xl border transition-all hover:shadow-sm ${category.color}`}
                    onClick={() => navigate('/fund-category', { state: { category: category.id } })}
                  >
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-xs">Risk: {category.risk}</p>
                    <p className="text-xs">Returns: {category.returns}</p>
                  </button>
                ))}
              </div>
            </BankingCard>

            {/* Top Performing Funds */}
            <BankingCard title="Top Performing Funds" className="rounded-2xl">
              <div className="space-y-4">
                {topFunds.map((fund) => (
                  <div key={fund.id} className="p-4 border rounded-xl hover:bg-muted/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{fund.name}</h4>
                        <p className="text-xs text-muted-foreground">{fund.category}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < fund.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{fund.rating}/5</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{fund.nav}</p>
                        <p className="text-xs text-muted-foreground">NAV</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div>
                        <p className="text-muted-foreground">1Y Return</p>
                        <p className="font-medium text-green-600">+{fund.returns['1y']}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">3Y Return</p>
                        <p className="font-medium text-green-600">+{fund.returns['3y']}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">5Y Return</p>
                        <p className="font-medium text-green-600">+{fund.returns['5y']}%</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Min SIP: ₹{fund.minSip}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${
                          fund.riskLevel === 'High' ? 'border-red-200 text-red-600' : 
                          fund.riskLevel === 'Moderate' ? 'border-orange-200 text-orange-600' : 
                          'border-green-200 text-green-600'
                        }`}>
                          {fund.riskLevel} Risk
                        </Badge>
                      </div>
                      <Button size="sm" onClick={() => navigate('/fund-details', { state: { fund } })}>
                        Invest Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>

            {/* SIP Promotion */}
            <BankingCard title="Start SIP Today" className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">Systematic Investment Plan</h3>
                  <p className="text-sm text-green-600">Build wealth with disciplined investing</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/start-sip')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start SIP
                </Button>
              </div>
            </BankingCard>
          </div>
        )}

        {activeTab === 'sip' && (
          <div className="space-y-6">
            {activeSIPs.length > 0 ? (
              <>
                {/* SIP Summary */}
                <BankingCard title="SIP Summary" className="rounded-2xl">
                  <div className="text-center p-4 rounded-xl bg-primary/5">
                    <p className="text-2xl font-bold text-primary">
                      ₹{totalSIPAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Monthly SIP Amount</p>
                  </div>
                </BankingCard>

                {/* Active SIPs */}
                <BankingCard title="Active SIPs" className="rounded-2xl">
                  <div className="space-y-4">
                    {activeSIPs.map((sip, index) => (
                      <div key={index} className="p-4 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-sm">{sip.name}</h3>
                            <p className="text-xs text-muted-foreground">Monthly SIP: ₹{sip.sipAmount.toLocaleString()}</p>
                          </div>
                          <Badge variant="secondary" className="rounded-full">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div>
                            <p className="text-muted-foreground">Next SIP</p>
                            <p className="font-medium">{sip.nextSip}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Invested</p>
                            <p className="font-medium">₹{sip.invested.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/modify-sip')}>
                            Modify
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/pause-sip')}>
                            Pause
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl text-red-600 border-red-200" onClick={() => navigate('/stop-sip')}>
                            Stop
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </BankingCard>
              </>
            ) : (
              <BankingCard className="rounded-2xl">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Active SIPs</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start a SIP to build wealth systematically</p>
                  <Button onClick={() => navigate('/start-sip')}>
                    Start Your First SIP
                  </Button>
                </div>
              </BankingCard>
            )}

            {/* Start New SIP */}
            <Button className="w-full h-16" onClick={() => navigate('/start-sip')}>
              <Plus className="h-5 w-5 mr-2" />
              Start New SIP
            </Button>
          </div>
        )}
      </div>
    </BankingLayout>
  );
};

export default MutualFundsFlow;
