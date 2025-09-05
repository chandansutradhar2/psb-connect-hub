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
  BarChart3,
  Calendar,
  Target,
  AlertTriangle,
  Home,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

const SpendingAnalytics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const monthlySpending = [
    { month: 'Jul', amount: 45000 },
    { month: 'Aug', amount: 52000 },
    { month: 'Sep', amount: 48000 },
    { month: 'Oct', amount: 56000 },
    { month: 'Nov', amount: 51000 },
    { month: 'Dec', amount: 49000 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 15000, color: '#8B5CF6', percentage: 30 },
    { name: 'Shopping', value: 12000, color: '#06B6D4', percentage: 24 },
    { name: 'Transportation', value: 8000, color: '#10B981', percentage: 16 },
    { name: 'Bills & Utilities', value: 7000, color: '#F59E0B', percentage: 14 },
    { name: 'Entertainment', value: 5000, color: '#EF4444', percentage: 10 },
    { name: 'Others', value: 3000, color: '#6B7280', percentage: 6 },
  ];

  const budgetData = [
    { category: 'Food & Dining', budget: 18000, spent: 15000, color: '#8B5CF6' },
    { category: 'Shopping', budget: 10000, spent: 12000, color: '#06B6D4' },
    { category: 'Transportation', budget: 8000, spent: 8000, color: '#10B981' },
    { category: 'Bills & Utilities', budget: 7500, spent: 7000, color: '#F59E0B' },
    { category: 'Entertainment', budget: 6000, spent: 5000, color: '#EF4444' },
  ];

  const topMerchants = [
    { name: 'Swiggy', amount: 4500, transactions: 15, category: 'Food' },
    { name: 'Amazon', amount: 3200, transactions: 8, category: 'Shopping' },
    { name: 'Uber', amount: 2800, transactions: 12, category: 'Transportation' },
    { name: 'Netflix', amount: 799, transactions: 1, category: 'Entertainment' },
    { name: 'Big Bazaar', amount: 2100, transactions: 3, category: 'Shopping' },
  ];

  const insights = [
    {
      type: 'warning',
      title: 'Budget Alert',
      description: 'You\'ve exceeded your shopping budget by ₹2,000 this month.',
      action: 'Adjust Budget'
    },
    {
      type: 'positive',
      title: 'Great Savings',
      description: 'You saved ₹3,000 on entertainment expenses compared to last month.',
      action: 'View Details'
    },
    {
      type: 'info',
      title: 'Spending Pattern',
      description: 'Your food expenses are 20% higher on weekends.',
      action: 'Learn More'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="rounded-full p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Spending Analytics</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2"
            >
              <Home className="text-lg text-gray-600" />
            </Button>
          </div>
        </header>

        <div className="px-4 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-4">
            <BankingCard className="rounded-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-2xl font-bold text-blue-600">₹49,000</p>
                  <TrendingDown className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xs text-green-600">↓ 12% vs last month</p>
              </div>
            </BankingCard>
            
            <BankingCard className="rounded-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-2xl font-bold text-purple-600">₹1,635</p>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-xs text-blue-600">↑ 5% vs last month</p>
              </div>
            </BankingCard>
          </div>

          {/* Insights */}
          <BankingCard title="Smart Insights" className="rounded-2xl">
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border ${
                    insight.type === 'warning' ? 'bg-red-50 border-red-200' :
                    insight.type === 'positive' ? 'bg-green-50 border-green-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        insight.type === 'warning' ? 'text-red-800' :
                        insight.type === 'positive' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        insight.type === 'warning' ? 'text-red-700' :
                        insight.type === 'positive' ? 'text-green-700' :
                        'text-blue-700'
                      }`}>
                        {insight.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={
                        insight.type === 'warning' ? 'text-red-600 hover:text-red-700' :
                        insight.type === 'positive' ? 'text-green-600 hover:text-green-700' :
                        'text-blue-600 hover:text-blue-700'
                      }
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </BankingCard>

          {/* Analytics Tabs */}
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-2xl">
              <TabsTrigger value="trends" className="rounded-xl">Trends</TabsTrigger>
              <TabsTrigger value="categories" className="rounded-xl">Categories</TabsTrigger>
              <TabsTrigger value="budget" className="rounded-xl">Budget</TabsTrigger>
              <TabsTrigger value="merchants" className="rounded-xl">Merchants</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-4">
              <BankingCard title="Spending Trends" icon={<TrendingUp className="h-5 w-5" />} className="rounded-2xl">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </BankingCard>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <BankingCard title="Category Breakdown" icon={<PieChart className="h-5 w-5" />} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(category.value)}</p>
                          <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BankingCard>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4">
              <BankingCard title="Budget vs Actual" icon={<Target className="h-5 w-5" />} className="rounded-2xl">
                <div className="space-y-4">
                  {budgetData.map((item, index) => {
                    const percentage = (item.spent / item.budget) * 100;
                    const isOverBudget = item.spent > item.budget;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="text-right">
                            <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                              {formatCurrency(item.spent)}
                            </span>
                            <span className="text-muted-foreground text-sm"> / {formatCurrency(item.budget)}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress 
                            value={Math.min(percentage, 100)} 
                            className="h-2"
                            style={{
                              backgroundColor: isOverBudget ? '#FEE2E2' : '#F3F4F6'
                            }}
                          />
                          <div className="flex justify-between text-xs">
                            <span className={isOverBudget ? 'text-red-600' : 'text-muted-foreground'}>
                              {percentage.toFixed(1)}% used
                            </span>
                            {isOverBudget && (
                              <span className="text-red-600 font-medium">
                                Over by {formatCurrency(item.spent - item.budget)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BankingCard>
            </TabsContent>

            <TabsContent value="merchants" className="space-y-4">
              <BankingCard title="Top Merchants" icon={<BarChart3 className="h-5 w-5" />} className="rounded-2xl">
                <div className="space-y-3">
                  {topMerchants.map((merchant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {merchant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{merchant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {merchant.transactions} transactions • {merchant.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(merchant.amount)}</p>
                        <div className="flex items-center space-x-1">
                          <ArrowUpRight className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-red-500">+5%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </BankingCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BankingLayout>
  );
};

export default SpendingAnalytics;
