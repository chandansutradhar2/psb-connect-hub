import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BankingLayout } from "@/components/BankingLayout";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  DollarSign,
  PiggyBank,
  Target,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Eye,
  EyeOff,
  ArrowLeft,
  Home,
  CreditCard,
  Shield,
  Info,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FinanceManagement = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "spending" | "investments"
  >("overview");

  const toggleBalance = () => setShowBalance(!showBalance);

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon 🚀",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

  const spendingData = [
    {
      category: "Food & Dining",
      amount: 8500,
      percentage: 35,
      color: "bg-blue-500",
    },
    {
      category: "Transportation",
      amount: 4200,
      percentage: 18,
      color: "bg-blue-500",
    },
    {
      category: "Shopping",
      amount: 6800,
      percentage: 28,
      color: "bg-orange-500",
    },
    {
      category: "Utilities",
      amount: 3200,
      percentage: 13,
      color: "bg-purple-500",
    },
    {
      category: "Entertainment",
      amount: 1500,
      percentage: 6,
      color: "bg-red-500",
    },
  ];

  const investmentData = [
    {
      type: "Mutual Funds",
      amount: 75000,
      return: 12.5,
      color: "from-purple-50 to-purple-100",
      textColor: "text-purple-700",
    },
    {
      type: "Fixed Deposits",
      amount: 50000,
      return: 7.2,
      color: "from-orange-50 to-orange-100",
      textColor: "text-orange-700",
    },
    {
      type: "Stocks",
      amount: 45000,
      return: 18.3,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
    },
    {
      type: "Gold",
      amount: 25000,
      return: 9.1,
      color: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700",
    },
  ];

  const quickActions = [
    {
      title: "Start SIP",
      description: "Systematic Investment",
      icon: <PiggyBank className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
      onClick: () => handleComingSoon("Start SIP"),
    },
    {
      title: "Set Goals",
      description: "Financial Planning",
      icon: <Target className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
      onClick: () => handleComingSoon("Set Goals"),
    },
    {
      title: "Budget",
      description: "Monthly Planning",
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100",
      onClick: () => handleComingSoon("Budget Planner"),
    },
    {
      title: "Analytics",
      description: "Spending Insights",
      icon: <PieChart className="h-6 w-6 text-orange-600" />,
      color: "bg-orange-100",
      onClick: () => handleComingSoon("Spending Analytics"),
    },
  ];

  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
  const totalInvestments = investmentData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full h-9 w-9"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Money Management
                </h1>
                <p className="text-sm text-gray-600">
                  Track and optimize your finances
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleComingSoon("Dashboard")}
              className="rounded-full h-9 w-9"
            >
              <Home className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Balance Overview */}
          <Card className="bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm">Total Balance</p>
                  <h2 className="text-3xl font-bold">
                    {showBalance ? "₹1,25,430.50" : "••••••••"}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleBalance}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ArrowUpRight className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-white/80">Income</span>
                  </div>
                  <p className="text-xl font-semibold">₹45,200</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ArrowDownLeft className="h-4 w-4 text-red-300" />
                    <span className="text-sm text-white/80">Expenses</span>
                  </div>
                  <p className="text-xl font-semibold">₹32,800</p>
                </div>
              </div>

              {/* Net Savings */}
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Net Savings</span>
                  <span className="font-semibold text-blue-300">₹12,400</span>
                </div>
                <Progress value={68} className="h-1 bg-white/20 mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="bg-gray-100 rounded-xl p-1">
            <div className="flex">
              {[
                {
                  key: "overview",
                  label: "Overview",
                  icon: <BarChart3 className="h-4 w-4" />,
                },
                {
                  key: "spending",
                  label: "Spending",
                  icon: <CreditCard className="h-4 w-4" />,
                },
                {
                  key: "investments",
                  label: "Investments",
                  icon: <TrendingUp className="h-4 w-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleComingSoon(tab.label)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-gray-900 shadow-sm font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="shadow-sm border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.onClick}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Note */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Your financial data is encrypted and secure. We use
                bank-level security measures to protect your information.
              </p>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </BankingLayout>
  );
};

export default FinanceManagement;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   DollarSign, 
//   PiggyBank,
//   Target,
//   AlertCircle,
//   Plus,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Calendar,
//   Settings,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   Home,
//   BarChart3,
//   PieChart,
//   CreditCard,
//   Receipt,
//   Shield,
//   Info
// } from 'lucide-react';

// const FinanceManagement = () => {
//   const navigate = useNavigate();
//   const [showBalance, setShowBalance] = useState(true);
//   const [activeTab, setActiveTab] = useState<'overview' | 'spending' | 'investments'>('overview');

//   const toggleBalance = () => setShowBalance(!showBalance);

//   const spendingData = [
//     { category: 'Food & Dining', amount: 8500, percentage: 35, color: 'bg-blue-500', trend: 'up' },
//     { category: 'Transportation', amount: 4200, percentage: 18, color: 'bg-blue-500', trend: 'down' },
//     { category: 'Shopping', amount: 6800, percentage: 28, color: 'bg-orange-500', trend: 'up' },
//     { category: 'Utilities', amount: 3200, percentage: 13, color: 'bg-purple-500', trend: 'stable' },
//     { category: 'Entertainment', amount: 1500, percentage: 6, color: 'bg-red-500', trend: 'up' },
//   ];

//   const investmentData = [
//     { type: 'Mutual Funds', amount: 75000, return: 12.5, color: 'from-purple-50 to-purple-100', textColor: 'text-purple-700' },
//     { type: 'Fixed Deposits', amount: 50000, return: 7.2, color: 'from-orange-50 to-orange-100', textColor: 'text-orange-700' },
//     { type: 'Stocks', amount: 45000, return: 18.3, color: 'from-blue-50 to-blue-100', textColor: 'text-blue-700' },
//     { type: 'Gold', amount: 25000, return: 9.1, color: 'from-yellow-50 to-yellow-100', textColor: 'text-yellow-700' },
//   ];

//   const quickActions = [
//     { 
//       title: 'Start SIP', 
//       description: 'Systematic Investment', 
//       icon: <PiggyBank className="h-6 w-6 text-blue-600" />, 
//       color: 'bg-blue-100',
//       onClick: () => navigate('/sip-investment')
//     },
//     { 
//       title: 'Set Goals', 
//       description: 'Financial Planning', 
//       icon: <Target className="h-6 w-6 text-blue-600" />, 
//       color: 'bg-blue-100',
//       onClick: () => navigate('/financial-goals')
//     },
//     { 
//       title: 'Budget', 
//       description: 'Monthly Planning', 
//       icon: <BarChart3 className="h-6 w-6 text-purple-600" />, 
//       color: 'bg-purple-100',
//       onClick: () => navigate('/budget-planner')
//     },
//     { 
//       title: 'Analytics', 
//       description: 'Spending Insights', 
//       icon: <PieChart className="h-6 w-6 text-orange-600" />, 
//       color: 'bg-orange-100',
//       onClick: () => navigate('/spending-analytics')
//     },
//   ];

//   const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
//   const totalInvestments = investmentData.reduce((sum, item) => sum + item.amount, 0);

//   return (
//     <BankingLayout>
//       <div className="min-h-screen bg-gray-50 pb-24">
//         {/* Header */}
//         <div className="bg-white px-6 py-4 border-b border-gray-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => navigate(-1)}
//                 className="rounded-full h-9 w-9"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-600" />
//               </Button>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">Money Management</h1>
//                 <p className="text-sm text-gray-600">Track and optimize your finances</p>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/dashboard')}
//               className="rounded-full h-9 w-9"
//             >
//               <Home className="h-5 w-5 text-gray-600" />
//             </Button>
//           </div>
//         </div>

//         <div className="p-4 space-y-6">
//           {/* Balance Overview */}
//           <Card className="bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-white/80 text-sm">Total Balance</p>
//                   <h2 className="text-3xl font-bold">
//                     {showBalance ? '₹1,25,430.50' : '••••••••'}
//                   </h2>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={toggleBalance}
//                   className="text-white hover:bg-white/20 rounded-full"
//                 >
//                   {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </Button>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div className="bg-white/10 rounded-xl p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <ArrowUpRight className="h-4 w-4 text-blue-300" />
//                     <span className="text-sm text-white/80">Income</span>
//                   </div>
//                   <p className="text-xl font-semibold">₹45,200</p>
//                 </div>
//                 <div className="bg-white/10 rounded-xl p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <ArrowDownLeft className="h-4 w-4 text-red-300" />
//                     <span className="text-sm text-white/80">Expenses</span>
//                   </div>
//                   <p className="text-xl font-semibold">₹32,800</p>
//                 </div>
//               </div>

//               {/* Net Savings */}
//               <div className="mt-4 p-3 bg-white/5 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-white/80">Net Savings</span>
//                   <span className="font-semibold text-blue-300">₹12,400</span>
//                 </div>
//                 <Progress value={68} className="h-1 bg-white/20 mt-2" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Navigation Tabs */}
//           <div className="bg-gray-100 rounded-xl p-1">
//             <div className="flex">
//               {[
//                 { key: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
//                 { key: 'spending', label: 'Spending', icon: <CreditCard className="h-4 w-4" /> },
//                 { key: 'investments', label: 'Investments', icon: <TrendingUp className="h-4 w-4" /> },
//               ].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key as any)}
//                   className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
//                     activeTab === tab.key
//                       ? 'bg-white text-gray-900 shadow-sm font-medium'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab.icon}
//                   <span className="text-sm">{tab.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-2 gap-3">
//             {quickActions.map((action, index) => (
//               <Card key={index} className="shadow-sm border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={action.onClick}>
//                 <CardContent className="p-4">
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}>
//                       {action.icon}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sm text-gray-900">{action.title}</h3>
//                       <p className="text-xs text-gray-500">{action.description}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Content based on active tab */}
//           {activeTab === 'overview' && (
//             <>
//               {/* Spending Overview */}
//               <Card className="shadow-sm border-gray-200">
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-lg flex items-center justify-between">
//                     <span>Monthly Spending</span>
//                     <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
//                       <Calendar className="h-3 w-3 mr-1" />
//                       Aug 2025
//                     </Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {spendingData.slice(0, 3).map((item, index) => (
//                       <div key={index} className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
//                           <span className="text-sm font-medium text-gray-700">{item.category}</span>
//                         </div>
//                         <div className="text-right">
//                           <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
//                           <p className="text-xs text-gray-500">{item.percentage}% of total</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <Button variant="ghost" className="w-full mt-4 text-primary text-sm" onClick={() => setActiveTab('spending')}>
//                     View detailed analysis
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* Investment Overview */}
//               <Card className="shadow-sm border-gray-200">
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-lg">Investment Portfolio</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-3">
//                     {investmentData.slice(0, 2).map((investment, index) => (
//                       <div key={index} className={`bg-gradient-to-br ${investment.color} p-3 rounded-xl`}>
//                         <h4 className="font-semibold text-sm mb-1">{investment.type}</h4>
//                         <p className={`text-lg font-bold ${investment.textColor}`}>₹{investment.amount.toLocaleString()}</p>
//                         <div className="flex items-center mt-1">
//                           <TrendingUp className="h-3 w-3 text-blue-600 mr-1" />
//                           <span className="text-xs text-blue-600">+{investment.return}%</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <Button variant="ghost" className="w-full mt-4 text-primary text-sm" onClick={() => setActiveTab('investments')}>
//                     View all investments
//                   </Button>
//                 </CardContent>
//               </Card>
//             </>
//           )}

//           {activeTab === 'spending' && (
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg">Spending Analysis</CardTitle>
//                 <CardDescription>Detailed breakdown of your expenses</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {spendingData.map((item, index) => (
//                     <div key={index}>
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-3">
//                           <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
//                           <span className="text-sm font-medium text-gray-700">{item.category}</span>
//                         </div>
//                         <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
//                       </div>
//                       <div className="flex items-center justify-between text-xs text-gray-500">
//                         <span>{item.percentage}% of total spending</span>
//                         <span>{Math.round((item.amount / totalSpending) * 100)}%</span>
//                       </div>
//                       <Progress value={item.percentage} className={`h-1 ${item.color} mt-1`} />
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 'investments' && (
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg">Investment Portfolio</CardTitle>
//                 <CardDescription>Your investment performance</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-3 mb-4">
//                   {investmentData.map((investment, index) => (
//                     <div key={index} className={`bg-gradient-to-br ${investment.color} p-4 rounded-xl`}>
//                       <h4 className="font-semibold text-sm mb-2 text-gray-800">{investment.type}</h4>
//                       <p className={`text-xl font-bold ${investment.textColor}`}>₹{investment.amount.toLocaleString()}</p>
//                       <div className="flex items-center mt-2">
//                         <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
//                         <span className="text-sm text-blue-600">+{investment.return}%</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                   <div className="flex items-start gap-3">
//                     <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <p className="text-xs text-blue-700">
//                       Total portfolio value: ₹{totalInvestments.toLocaleString()} • YTD return: +12.3%
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Security Note */}
//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="flex items-start gap-3">
//               <Shield className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
//               <p className="text-sm text-gray-600">
//                 Your financial data is encrypted and secure. We use bank-level security measures to protect your information.
//               </p>
//             </div>
//           </div>
//         </div>
//         <BottomNavigation />
//       </div>
//     </BankingLayout>
//   );
// };

// export default FinanceManagement;







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   DollarSign, 
//   PiggyBank,
//   Target,
//   AlertCircle,
//   Plus,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Calendar,
//   Settings,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   Home
// } from 'lucide-react';

// const FinanceManagement = () => {
//   const navigate = useNavigate();
//   const [showBalance, setShowBalance] = useState(true);

//   const toggleBalance = () => setShowBalance(!showBalance);

//   return (
//     <BankingLayout title="Money Management">
//       <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pb-24">
//         <div className="space-y-6 px-4 pt-2 max-w-3xl mx-auto">
//           {/* Header */}
//           <header className="flex items-center justify-between sticky top-0 z-50 bg-white py-4 border-b border-gray-200 shadow-sm">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => navigate(-1)}
//                 className="rounded-full p-2 hover:bg-gray-100"
//                 aria-label="Go back"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-700" />
//               </Button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Money Management</h1>
//                 <p className="text-gray-600">Track and manage your finances</p>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/dashboard')}
//               className="rounded-full p-2 hover:bg-gray-100"
//               aria-label="Go to dashboard"
//             >
//               <Home className="h-5 w-5 text-gray-700" />
//             </Button>
//           </header>
        

//           {/* Balance Overview */}
//           <Card className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-primary-foreground/80 text-sm">Total Balance</p>
//                   <h2 className="text-3xl font-bold">
//                     {showBalance ? '₹1,25,430.50' : '••••••••'}
//                   </h2>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={toggleBalance}
//                   className="text-white hover:bg-white/20"
//                   aria-label={showBalance ? 'Hide balance' : 'Show balance'}
//                 >
//                   {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div className="bg-white/10 rounded-xl p-4">
//                   <div className="flex items-center space-x-2">
//                     <ArrowUpRight className="h-4 w-4 text-blue-300" />
//                     <span className="text-sm text-primary-foreground/80">Income</span>
//                   </div>
//                   <p className="text-xl font-semibold">₹45,200</p>
//                 </div>
//                 <div className="bg-white/10 rounded-xl p-4">
//                   <div className="flex items-center space-x-2">
//                     <ArrowDownLeft className="h-4 w-4 text-red-300" />
//                     <span className="text-sm text-primary-foreground/80">Expenses</span>
//                   </div>
//                   <p className="text-xl font-semibold">₹32,800</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-2 gap-4">
//             <Card className="shadow-lg">
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <PiggyBank className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">Start SIP</h3>
//                     <p className="text-sm text-gray-600">Systematic Investment</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="shadow-lg">
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <Target className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">Set Goals</h3>
//                     <p className="text-sm text-gray-600">Financial Planning</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Spending Analysis */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 <span>This Month's Spending</span>
//                 <Badge variant="secondary" className="rounded-full px-3 py-1">August 2025</Badge>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm">Food & Dining</span>
//                   </div>
//                   <span className="font-semibold">₹8,500</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm">Transportation</span>
//                   </div>
//                   <span className="font-semibold">₹4,200</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                     <span className="text-sm">Shopping</span>
//                   </div>
//                   <span className="font-semibold">₹6,800</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Investment Portfolio */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold">Investment Portfolio</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
//                   <h4 className="font-semibold text-purple-800">Mutual Funds</h4>
//                   <p className="text-2xl font-bold text-purple-700">₹75,000</p>
//                   <div className="flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
//                     <span className="text-sm text-blue-600">+12.5%</span>
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
//                   <h4 className="font-semibold text-orange-800">Fixed Deposits</h4>
//                   <p className="text-2xl font-bold text-orange-700">₹50,000</p>
//                   <div className="flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
//                     <span className="text-sm text-blue-600">+7.2%</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <BottomNavigation />
//       </div>
//     </BankingLayout>
//   );
// };

// export default FinanceManagement;