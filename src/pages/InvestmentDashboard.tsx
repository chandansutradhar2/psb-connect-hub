
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { 
//   ArrowLeft, 
//   TrendingUp, 
//   TrendingDown,
//   PieChart, 
//   Target,
//   DollarSign,
//   Calendar,
//   BarChart3,
//   Plus,
//   Eye,
//   Download,
//   ArrowUpRight,
//   ArrowDownRight,
//   Wallet,
//   Home,
//   CreditCard,
//   Building,
//   Coins
// } from 'lucide-react';

// const InvestmentDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<'overview' | 'mutual-funds' | 'sip' | 'goals'>('overview');

//   const totalInvestment = 485000;
//   const currentValue = 542300;
//   const totalReturns = currentValue - totalInvestment;
//   const returnsPercent = (totalReturns / totalInvestment) * 100;

//   const mutualFunds = [
//     {
//       name: 'HDFC Top 100 Fund',
//       category: 'Large Cap',
//       invested: 125000,
//       current: 142500,
//       nav: 285.67,
//       units: 498.75,
//       returns: 14.0,
//       risk: 'Moderate'
//     },
//     {
//       name: 'SBI Small Cap Fund',
//       category: 'Small Cap', 
//       invested: 85000,
//       current: 98500,
//       nav: 72.45,
//       units: 1173.15,
//       returns: 15.9,
//       risk: 'High'
//     },
//     {
//       name: 'ICICI Prudential Balanced',
//       category: 'Hybrid',
//       invested: 95000,
//       current: 102300,
//       nav: 45.67,
//       units: 2080.56,
//       returns: 7.7,
//       risk: 'Moderate'
//     },
//     {
//       name: 'Axis Long Term Equity',
//       category: 'ELSS',
//       invested: 75000,
//       current: 78200,
//       nav: 52.13,
//       units: 1439.58,
//       returns: 4.3,
//       risk: 'Moderate'
//     }
//   ];

//   const sipPlans = [
//     {
//       fund: 'HDFC Top 100 Fund',
//       amount: 5000,
//       frequency: 'Monthly',
//       nextDate: '2024-02-01',
//       duration: '3 years',
//       status: 'Active'
//     },
//     {
//       fund: 'SBI Small Cap Fund',
//       amount: 3000,
//       frequency: 'Monthly', 
//       nextDate: '2024-01-28',
//       duration: '5 years',
//       status: 'Active'
//     },
//     {
//       fund: 'ICICI Prudential Balanced',
//       amount: 2500,
//       frequency: 'Monthly',
//       nextDate: '2024-02-05',
//       duration: '2 years',
//       status: 'Paused'
//     }
//   ];

//   const goals = [
//     {
//       name: 'House Down Payment',
//       target: 2500000,
//       achieved: 485000,
//       timeline: '4 years',
//       monthlyRequired: 45000,
//       priority: 'High'
//     },
//     {
//       name: 'Child Education',
//       target: 1500000,
//       achieved: 285000,
//       timeline: '8 years',
//       monthlyRequired: 15000,
//       priority: 'Medium'
//     },
//     {
//       name: 'Retirement Corpus',
//       target: 8000000,
//       achieved: 542000,
//       timeline: '20 years',
//       monthlyRequired: 25000,
//       priority: 'High'
//     }
//   ];

//   return (
//     <div className='pb-36'>
//       <div className="space-y-6">
//         <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => navigate(-1)}
//                 className="rounded-full p-2 hover:bg-gray-100"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-700" />
//               </Button>
//               <h1 className="text-lg font-semibold text-gray-800">Investment Dashboard</h1>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/dashboard')}
//               className="rounded-full p-2 hover:bg-gray-100"
//             >
//               <Home className="h-5 w-5 text-gray-700" />
//             </Button>
//           </div>
//         </header>

//         <div className='px-4'>
//           <div className="flex bg-gray-100 rounded-full p-1">
//             {[
//               { key: 'overview', label: 'Overview' },
//               { key: 'mutual-funds', label: 'Mutual Funds' },
//               { key: 'sip', label: 'SIP' },
//               { key: 'goals', label: 'Goals' }
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key as any)}
//                 className={`flex-1 py-2 px-3 rounded-full transition-all duration-300 font-medium text-sm ${
//                   activeTab === tab.key
//                     ? 'bg-primary text-white shadow-sm'
//                     : 'text-gray-600 hover:text-primary'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {activeTab === 'overview' && (
//           <div className="space-y-6 px-4">
//             {/* Portfolio Summary */}
//             <BankingCard className="rounded-xl p-6 psb-gradient text-white shadow-xl">
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-white/80 text-sm font-medium">Total Portfolio Value</p>
//                   <p className="text-3xl font-bold">₹{currentValue.toLocaleString()}</p>
//                 </div>
                
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-white/10 rounded-2xl p-4">
//                     <p className="text-white/80 text-xs">Invested</p>
//                     <p className="font-semibold text-sm">₹{totalInvestment.toLocaleString()}</p>
//                   </div>
//                   <div className="bg-white/10 rounded-2xl p-4">
//                     <p className="text-white/80 text-xs">Returns</p>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-semibold text-sm">₹{totalReturns.toLocaleString()}</span>
//                     </div>
//                   </div>
//                   <div className="bg-white/10 rounded-2xl p-4">
//                     <p className="text-white/80 text-xs">Return %</p>
//                     <div className="flex items-center space-x-1 text-blue-300">
//                       <ArrowUpRight className="h-3 w-3" />
//                       <span className="font-semibold text-sm">{returnsPercent.toFixed(1)}%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </BankingCard>

//             {/* Quick Actions */}
//             <div className="grid grid-cols-2 gap-4">
//               <Button 
//                 onClick={() => navigate('/investments')}
//                 className="psb-gold-gradient text-black font-semibold rounded-2xl p-6 h-auto flex flex-col space-y-2"
//               >
//                 <Plus className="h-6 w-6" />
//                 <span>Start SIP</span>
//               </Button>
//               <Button 
//                 onClick={() => setActiveTab('goals')}
//                 variant="outline" 
//                 className="rounded-2xl p-6 h-auto flex flex-col space-y-2"
//               >
//                 <Target className="h-6 w-6" />
//                 <span>Set Goals</span>
//               </Button>
//             </div>

//             {/* Asset Allocation */}
//             <BankingCard title="Asset Allocation" icon={<PieChart className="h-5 w-5" />} className="rounded-2xl">
//               <div className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Equity Funds</span>
//                     <span className="text-sm font-semibold">65%</span>
//                   </div>
//                   <Progress value={65} className="h-2" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Hybrid Funds</span>
//                     <span className="text-sm font-semibold">25%</span>
//                   </div>
//                   <Progress value={25} className="h-2" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-sm">ELSS Funds</span>
//                     <span className="text-sm font-semibold">10%</span>
//                   </div>
//                   <Progress value={10} className="h-2" />
//                 </div>
//               </div>
//             </BankingCard>
//           </div>
//         )}

//         {activeTab === 'mutual-funds' && (
//           <div className="space-y-4 px-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Mutual Fund Holdings</h2>
//               <Button size="sm" className="rounded-xl">
//                 <Plus className="h-4 w-4 mr-1" />
//                 Add Fund
//               </Button>
//             </div>
            
//             {mutualFunds.map((fund, index) => (
//               <BankingCard key={index} className="rounded-2xl">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-sm">{fund.name}</h3>
//                       <p className="text-xs text-muted-foreground">{fund.category}</p>
//                       <Badge variant="secondary" className="mt-1 text-xs">
//                         {fund.risk} Risk
//                       </Badge>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">₹{fund.current.toLocaleString()}</p>
//                       <div className="flex items-center text-xs text-blue-600">
//                         <TrendingUp className="h-3 w-3 mr-1" />
//                         +{fund.returns}%
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-3 gap-3 text-xs">
//                     <div>
//                       <p className="text-muted-foreground">Invested</p>
//                       <p className="font-medium">₹{fund.invested.toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">NAV</p>
//                       <p className="font-medium">₹{fund.nav}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Units</p>
//                       <p className="font-medium">{fund.units}</p>
//                     </div>
//                   </div>
//                 </div>
//               </BankingCard>
//             ))}
//           </div>
//         )}

//         {activeTab === 'sip' && (
//           <div className="space-y-4 px-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Active SIPs</h2>
//               <Button size="sm" className="rounded-xl">
//                 <Plus className="h-4 w-4 mr-1" />
//                 Start SIP
//               </Button>
//             </div>
            
//             {sipPlans.map((sip, index) => (
//               <BankingCard key={index} className="rounded-2xl">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-sm">{sip.fund}</h3>
//                       <p className="text-xs text-muted-foreground">{sip.frequency} SIP</p>
//                     </div>
//                     <Badge 
//                       variant={sip.status === 'Active' ? 'default' : 'secondary'}
//                       className="text-xs"
//                     >
//                       {sip.status}
//                     </Badge>
//                   </div>
                  
//                   <div className="grid grid-cols-3 gap-3 text-xs">
//                     <div>
//                       <p className="text-muted-foreground">Amount</p>
//                       <p className="font-medium">₹{sip.amount.toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Next Date</p>
//                       <p className="font-medium">{sip.nextDate}</p>
//                     </div>
//                     <div>
//                       <p className="text-muted-foreground">Duration</p>
//                       <p className="font-medium">{sip.duration}</p>
//                     </div>
//                   </div>
//                 </div>
//               </BankingCard>
//             ))}
//           </div>
//         )}

//         {activeTab === 'goals' && (
//           <div className="space-y-4 px-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Investment Goals</h2>
//               <Button size="sm" className="rounded-xl">
//                 <Plus className="h-4 w-4 mr-1" />
//                 Add Goal
//               </Button>
//             </div>
            
//             {goals.map((goal, index) => (
//               <BankingCard key={index} className="rounded-2xl">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-sm">{goal.name}</h3>
//                       <p className="text-xs text-muted-foreground">Target in {goal.timeline}</p>
//                     </div>
//                     <Badge 
//                       variant={goal.priority === 'High' ? 'destructive' : 'secondary'}
//                       className="text-xs"
//                     >
//                       {goal.priority} Priority
//                     </Badge>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-xs">
//                       <span>Progress</span>
//                       <span>{((goal.achieved / goal.target) * 100).toFixed(1)}%</span>
//                     </div>
//                     <Progress value={(goal.achieved / goal.target) * 100} className="h-2" />
//                     <p className="text-xs text-muted-foreground">
//                       ₹{(goal.achieved / 100000).toFixed(1)}L of ₹{(goal.target / 100000).toFixed(1)}L achieved
//                     </p>
//                   </div>
                  
//                   <div className="bg-muted/30 rounded-xl p-3">
//                     <p className="text-xs text-muted-foreground">Required Monthly Investment</p>
//                     <p className="font-semibold text-primary">₹{goal.monthlyRequired.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </BankingCard>
//             ))}
//           </div>
//         )}
//       </div>
//       <BottomNavigation />
//     </div>
//   );
// };

// export default InvestmentDashboard;



import { useState } from 'react';
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
  Calculator
} from 'lucide-react';
import { InvestmentCalculator } from './InvestmentCalculator';

const InvestmentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'mutual-funds' | 'sip' | 'goals' | 'calculator'>('overview');
  const [showCalculator, setShowCalculator] = useState(false);

  const totalInvestment = 485000;
  const currentValue = 542300;
  const totalReturns = currentValue - totalInvestment;
  const returnsPercent = (totalReturns / totalInvestment) * 100;

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
    <div className='pb-36'>
      <div className="space-y-6">
        <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Investment Dashboard</h1>
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

        <div className='px-4'>
          <div className="flex bg-gray-100 rounded-full p-1 overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'mutual-funds', label: 'Mutual Funds' },
              { key: 'sip', label: 'SIP' },
              { key: 'goals', label: 'Goals' },
              { key: 'calculator', label: 'Calculator' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-shrink-0 py-2 px-3 rounded-full transition-all duration-300 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 px-4">
            {/* Portfolio Summary */}
            <BankingCard className="rounded-xl p-6 psb-gradient text-white shadow-xl">
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Portfolio Value</p>
                  <p className="text-3xl font-bold">₹{currentValue.toLocaleString()}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Invested</p>
                    <p className="font-semibold text-sm">₹{totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Returns</p>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-sm">₹{totalReturns.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/80 text-xs">Return %</p>
                    <div className="flex items-center space-x-1 text-blue-300">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="font-semibold text-sm">{returnsPercent.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </BankingCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setActiveTab('sip')}
                className="psb-gold-gradient text-black font-semibold rounded-2xl p-6 h-auto flex flex-col space-y-2"
              >
                <Plus className="h-6 w-6" />
                <span>Start SIP</span>
              </Button>
              <Button 
                onClick={() => setActiveTab('calculator')}
                variant="outline" 
                className="rounded-2xl p-6 h-auto flex flex-col space-y-2"
              >
                <Calculator className="h-6 w-6" />
                <span>Calculator</span>
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
          <div className="space-y-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Mutual Fund Holdings</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Add Fund
              </Button>
            </div>
            
            {mutualFunds.map((fund) => (
              <BankingCard key={fund.id} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{fund.name}</h3>
                      <p className="text-xs text-muted-foreground">{fund.category}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {fund.risk} Risk
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{fund.current.toLocaleString()}</p>
                      <div className={`flex items-center text-xs ${fund.returns >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {fund.returns >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {fund.returns >= 0 ? '+' : ''}{fund.returns}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
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
        )}

        {activeTab === 'sip' && (
          <div className="space-y-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Active SIPs</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Start SIP
              </Button>
            </div>
            
            {sipPlans.map((sip) => (
              <BankingCard key={sip.id} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{sip.fund}</h3>
                      <p className="text-xs text-muted-foreground">{sip.frequency} SIP</p>
                    </div>
                    <Badge 
                      variant={sip.status === 'Active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {sip.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
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
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4 px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Investment Goals</h2>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </div>
            
            {goals.map((goal) => (
              <BankingCard key={goal.id} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{goal.name}</h3>
                      <p className="text-xs text-muted-foreground">Target in {goal.timeline}</p>
                    </div>
                    <Badge 
                      variant={goal.priority === 'High' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {goal.priority} Priority
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{((goal.achieved / goal.target) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(goal.achieved / goal.target) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      ₹{(goal.achieved / 100000).toFixed(1)}L of ₹{(goal.target / 100000).toFixed(1)}L achieved
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">Required Monthly Investment</p>
                    <p className="font-semibold text-primary">₹{goal.monthlyRequired.toLocaleString()}</p>
                  </div>
                </div>
              </BankingCard>
            ))}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="px-4">
            <InvestmentCalculator />
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default InvestmentDashboard;