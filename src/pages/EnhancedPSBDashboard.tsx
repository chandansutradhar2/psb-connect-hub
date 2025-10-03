import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { CibilScoreWidget } from '@/components/dashboard/CibilScoreWidget';
import { LoanOffersWidget } from '@/components/dashboard/LoanOffersWidget';
import { InsuranceInvestmentWidget } from '@/components/dashboard/InsuranceInvestmentWidget';
import { RewardsLoyaltyWidget } from '@/components/dashboard/RewardsLoyaltyWidget';
import { NotificationAlertsWidget } from '@/components/dashboard/NotificationAlertsWidget';
import { CardsSnapshotWidget } from '@/components/dashboard/CardsSnapshotWidget';
import { SecurityControlsWidget } from '@/components/dashboard/SecurityControlsWidget';
import { DiscoverServicesWidget } from '@/components/dashboard/DiscoverServicesWidget';
import { ChatbotWidget } from '@/components/dashboard/ChatbotWidget';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Bell, Search, Eye, EyeOff, Send, Smartphone, Zap, QrCode, User, Phone, Lightbulb,
  Home, Gift, CreditCard, PiggyBank, TrendingUp, Shield, Building,
  PieChart, Calendar, AlertCircle, ChevronRight, ArrowUpRight, ArrowDownLeft,
  Receipt, Headphones, MapPin, HelpCircle, Clock, Wallet, BarChart2,
  MessageCircle,
  Repeat,
  PlaneIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  PaperAirplaneIcon,
  QrCodeIcon,
  ReceiptPercentIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  MegaphoneIcon,
  BoltIcon,
  CurrencyRupeeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { RecentContacts } from './RecentContacts';

const EnhancedPSBDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(false);
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const userName = "Rahul Sharma";

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  
  const accounts = [
  { 
    type: 'Savings Account', 
    balance: 125430.50, 
    number: '****2675', 
    color: 'from-[#1178AC] to-[#1397DA]', // Teal → Emerald
    icon: <PiggyBank className="h-5 w-5 text-white" />,
    growth: 2.5
  },
  { 
    type: 'Current Account', 
    balance: 45280.00, 
    number: '****1234', 
    color: 'from-[#1178AC] to-[#1397DA]', // Teal → Emerald
    icon: <Building className="h-5 w-5 text-white" />,
    growth: 1.2
  },
  { 
    type: 'Credit Card', 
    balance: 75000.00, 
    number: '****5678', 
    color: 'from-[#1178AC] to-[#1397DA]', // Teal → Emerald
    icon: <CreditCard className="h-5 w-5 text-white" />,
    utilization: 45
  },
  { 
    type: 'Fixed Deposit', 
    balance: 200000.00, 
    number: '****9012', 
    color: 'from-[#1178AC] to-[#1397DA]', // Teal → Emerald
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    maturity: '15 Oct 2024'
  }
];


  // Recent transactions
  const recentTransactions = [
    { 
      id: 1, 
      type: 'debit', 
      amount: 2500, 
      description: 'UPI Payment to Swiggy', 
      time: '2 hours ago',
      icon: <ArrowUpRight className="h-4 w-4" />,
      category: 'Food & Dining',
      status: 'completed'
    },
    { 
      id: 2, 
      type: 'credit', 
      amount: 15000, 
      description: 'Salary Credit', 
      time: '1 day ago',
      icon: <ArrowDownLeft className="h-4 w-4" />,
      category: 'Income',
      status: 'completed'
    },
    { 
      id: 3, 
      type: 'debit', 
      amount: 850, 
      description: 'ATM Withdrawal', 
      time: '2 days ago',
      icon: <ArrowUpRight className="h-4 w-4" />,
      category: 'Cash',
      status: 'completed'
    }
  ];

  // Upcoming bills
  const upcomingBills = [
    { 
      name: 'Electricity Bill', 
      amount: 2850, 
      dueDate: 'Due in 3 days', 
      icon: <Lightbulb className="h-5 w-5" />, 
      urgent: true,
      provider: 'BSES Delhi',
      billDate: '15 Aug 2023'
    },
    { 
      name: 'Credit Card Bill', 
      amount: 12500, 
      dueDate: 'Due in 5 days', 
      icon: <CreditCard className="h-5 w-5" />, 
      urgent: false,
      provider: 'PSB Platinum',
      billDate: '10 Aug 2023'
    },
    { 
      name: 'Home Loan EMI', 
      amount: 45000, 
      dueDate: 'Due in 10 days', 
      icon: <Home className="h-5 w-5" />, 
      urgent: false,
      provider: 'PSB Home Loan',
      billDate: '1 Aug 2023'
    }
  ];

const quickActions = [
  { icon: PaperAirplaneIcon, label: "Transfer", path: "/transfer", color: "from-blue-500 to-emerald-600" },
  { icon: Repeat, label: "Autopay", path: "/mandates", color: "from-blue-500 to-emerald-600" },
  { icon: ReceiptPercentIcon, label: "Pay Bills", path: "/bills", color: "from-blue-500 to-emerald-600" },
  { icon: DevicePhoneMobileIcon, label: "Recharge", path: "/recharge", color: "from-blue-500 to-emerald-600" },
];

 const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

const moreServices = [
  { icon: ChartBarIcon, label: "Mutual Fund", path: "/investments", color: "from-blue-500 to-emerald-600" },
  { icon: BanknotesIcon, label: "Deposits", path: "/deposit-management", color: "from-blue-500 to-emerald-600" },
  { icon: ShieldCheckIcon, label: "Insurance", path: "/insurance-dashboard", color: "from-blue-500 to-emerald-600" },
  { icon: CurrencyRupeeIcon, label: "Loan", path: "/loans", color: "from-blue-500 to-emerald-600" },
  { icon: ShoppingCartIcon, label: "Shopping", path: "/shopping", color: "from-blue-500 to-emerald-600" },
  { icon: PlaneIcon, label: "Flights", path: "/flights", color: "from-blue-500 to-emerald-600" },
];
  // Spending categories for insights
  const spendingData = [
    { category: 'Food & Dining', amount: 8500, percentage: 35, color: 'bg-red-500', icon: <Receipt className="h-4 w-4" /> },
    { category: 'Shopping', amount: 6200, percentage: 25, color: 'bg-blue-500', icon: <CreditCard className="h-4 w-4" /> },
    { category: 'Transport', amount: 4800, percentage: 20, color: 'bg-blue-500', icon: <Smartphone className="h-4 w-4" /> },
    { category: 'Utilities', amount: 4900, percentage: 20, color: 'bg-yellow-500', icon: <Lightbulb className="h-4 w-4" /> }
  ];

  // Toggle balance visibility
  const toggleBalance = () => {
    setShowBalance(!showBalance);
    toast({
      title: showBalance ? "Balance Hidden" : "Balance Visible",
      description: showBalance ? "Your account balances are now hidden" : "Your account balances are now visible",
      duration: 2000
    });
  };

  // Format currency with INR symbol
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Handle scroll event to update current index
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setCurrentAccountIndex(newIndex);
    }
  };

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  // Loading skeleton for accounts
  const AccountSkeleton = () => (
    <Card className="bg-gradient-to-r from-gray-200 to-gray-300 border-0 shadow-none rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-20 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <BankingLayout showHeader={false}>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pb-40">
        {/* Header Section */}
        <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-md">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white font-bold">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-600 font-medium">{getGreeting()}</p>
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">{userName}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-9 w-9"
                  onClick={() => navigate('/search')}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-9 w-9 relative"
                  onClick={() => navigate('/notifications')}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 space-y-6 pt-4">
          {/* Account Carousel */}
          <div className="relative">
            {isLoading ? (
              <AccountSkeleton />
            ) : (
              <>
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                  onScroll={handleScroll}
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {accounts.map((account, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-full snap-start px-"
                    >
                      <Card className={`bg-gradient-to-r ${account.color} text-white border-2 shadow-none rounded-2xl`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-white/20 rounded-lg">
                                {account.icon}
                              </div>
                              <div>
                                <p className="text-white/90 text-sm font-medium">{account.type}</p>
                                <p className="text-xs text-white/70">A/c {account.number}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleBalance}
                              className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                              aria-label={showBalance ? "Hide balance" : "Show balance"}
                            >
                              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">
                              {showBalance ? formatCurrency(account.balance) : '••••••••'}
                            </h2>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-white/20 text-white border-0 font-medium text-xs">
                                  Available Balance
                                </Badge>
                                {account.growth && (
                                  <Badge className="bg-white/20 text-white border-0 font-medium text-xs flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" /> +{account.growth}%
                                  </Badge>
                                )}
                                {account.utilization && (
                                  <Badge className="bg-white/20 text-white border-0 font-medium text-xs">
                                    {account.utilization}% Utilized
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-white hover:bg-white/20 rounded-lg text-xs h-7"
                                onClick={() => navigate('/mini-statement')}
                              >
                                View Statement
                              </Button>
                            </div>
                          </div>
                     
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
                
                {/* Carousel indicators */}
                <div className="flex justify-center space-x-2 mt-3">
                  {accounts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToCard(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentAccountIndex ? 'bg-primary w-4' : 'bg-gray-300 w-2'
                      }`}
                      aria-label={`Go to account ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>



  <div className="w-full">
   <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
        <BoltIcon className="h-4 w-4 text-primary mr-2" />
        Quick Actions
      </h3>

      {/* Actions Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => navigate(action.path)}
            aria-label={action.label}
            className="flex flex-col items-center p-2 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-200 group hover:bg-gray-50"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-xl ${action.color} mb-2 group-hover:scale-110 transition-transform border -1 bg-blue-50 duration-200 shadow-sm`}
            >
              <action.icon  className="h-8 w-8 text-[#1178AC]" />
            </div>
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
    {/* More Services */}
  <Card className="rounded-xl shadow-sm border-0 bg-white">
    <CardHeader className="pb-3 px-4 pt-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-bold flex items-center">
          <Zap className="h-4 w-4 text-primary mr-2" />
          More Services
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary font-medium hover:bg-primary/10 rounded-lg h-8 px-2"
     onClick={() => handleComingSoon("Service")}        >
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Button>


      </div>
    </CardHeader>
    <CardContent className="px-4 py-2">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4">
        {moreServices.map((service, idx) => (
          <button
            key={idx}
            onClick={() => navigate(service.path)}
            aria-label={service.label}
            className="flex flex-col items-center p-2 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-200 group hover:bg-gray-50"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-xl ${service.color} mb-2 group-hover:scale-110 transition-transform border -1 bg-blue-50 duration-200 shadow-sm`}
            >
              <service.icon className="h-8 w-8 text-[#1178AC]" />
            </div>
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </CardContent>
  </Card>


</div>
{/* <RecentContacts  /> */}
<RecentContacts
  recentContacts={[
    {
      name: 'Anita Desai',
      avatar: '/avatars/avatar1.jpg',
      id: '1',
      lastTransaction: '₹500',
      lastInteraction: '2 days ago',
      identifier: 'anita.desai@psb',
      type: 'upi',
    },
    {
      name: 'Vikram Singh',
      avatar: '/avatars/avatar2.jpg',
      id: '2',
      lastTransaction: '₹1000',
      lastInteraction: '1 week ago',
      identifier: '9876543210',
      type: 'mobile',
    },
    {
      name: 'Sunita Kapoor',
      avatar: '/avatars/avatar3.jpg',
      id: '3',
      lastTransaction: '₹2000',
      lastInteraction: '3 days ago',
      identifier: '12345678901234',
      type: 'account',
      bankName: 'Bank Name',
    },
  ]}
/>


          {/* Recent Transactions Preview */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center">
                  <Receipt className="h-4 w-4 text-primary mr-2" />
                  Recent Activity
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary font-medium hover:bg-primary/10 rounded-lg h-8 px-2" 
                  onClick={() => navigate('/mini-statement')}
                >
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    // onClick={() => navigate(`/transaction/${transaction.id}`)}
                                onClick={() => handleComingSoon("Share")}

                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{transaction.time}</p>
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-blue-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'} 
                        className="text-xs h-5 mt-1"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bills */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center">
                  <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                  Upcoming Bills
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-500 font-medium hover:bg-orange-500/10 rounded-lg h-8 px-2" 
                  onClick={() => navigate('/bills')}
                >
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="space-y-3">
                {upcomingBills.map((bill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    onClick={() => navigate('/bill-pay', { state: { bill } })}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${bill.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {bill.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{bill.name}</p>
                        <div className="flex items-center space-x-2">
                          <p className={`text-xs ${bill.urgent ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {bill.dueDate}
                            {bill.urgent && <AlertCircle className="h-3 w-3 inline ml-1" />}
                          </p>
                          <p className="text-xs text-gray-500">{bill.provider}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">{formatCurrency(bill.amount)}</p>
                      <Button 
                        size="sm" 
                        variant={bill.urgent ? "default" : "outline"} 
                        className="mt-1 rounded-lg h-7 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/bill-pay', { state: { bill } });
                        }}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* Offers & Promotions */}
          <Card className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold mb-1">🎉 Special Offers</h3>
                  <p className="text-xs text-white/90 mb-3">Get 5% cashback on shopping with PSB Credit Card</p>
                  {/* <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-lg font-medium h-8 px-3 text-xs"
                    onClick={() => navigate('/offers')}
                  >
                    Explore Offers
                  </Button> */}
                  <Button 
  variant="secondary" 
  size="sm" 
  className="rounded-lg font-medium h-8 px-3 text-xs"
  onClick={() => {
    toast({
      title: "Coming Soon",
      description: "This feature is coming soon!",
      duration: 3000,
    });
  }}
>
  Explore Offers
</Button>
                </div>
                <Gift className="h-12 w-12 text-white/80" />
              </div>
            </CardContent>
          </Card>
          <div
  className="fixed bottom-24 right-4 z-50"
  aria-label="Open chatbot"
>
  <button
    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#1178AC] to-[#1397DA] text-white shadow-lg hover:scale-105 transition-all duration-300"
    onClick={() => navigate('/chat-support')}
  >
    <MessageCircle className="h-6 w-6" />
  </button>
</div>

          {/* Quick Help */}
          <Card className="rounded-xl shadow-sm border-0 bg-white">
            <CardHeader className="pb-2 px-4 pt-2">
              <CardTitle className="text-base font-bold flex items-center">
                <HelpCircle className="h-4 w-4 text-blue-500 mr-2" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex-col h-16 rounded-xl hover:shadow-sm transition-all duration-200"
                  onClick={() => navigate('/support')}
                >
                  <Phone className="h-4 w-4 mb-1.5 text-blue-500" />
                  <span className="text-xs font-medium">Call Support</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-16 rounded-xl hover:shadow-sm transition-all duration-200"
                  onClick={() => navigate('/branch-locator')}
                >
                  <MapPin className="h-4 w-4 mb-1.5 text-blue-500" />
                  <span className="text-xs font-medium">Find Branch</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-16 rounded-xl hover:shadow-sm transition-all duration-200"
                  // onClick={() => navigate('/faq')}
                >
                  <HelpCircle className="h-4 w-4 mb-1.5 text-purple-500" />
                  <span className="text-xs font-medium">FAQs</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-16 rounded-xl hover:shadow-sm transition-all duration-200"
                  // onClick={() => navigate('/feedback')}
                >
                  <Headphones className="h-4 w-4 mb-1.5 text-orange-500" />
                  <span className="text-xs font-medium">Feedback</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </BankingLayout>
  );
};

export default EnhancedPSBDashboard;


