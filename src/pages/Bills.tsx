import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Zap,
  Droplets,
  Fuel,
  Building,
  Car,
  GraduationCap,
  Shield,
  Home,
  Wifi,
  Calendar,
  CreditCard,
  History,
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const Bills = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const billCategories = [
    { key: 'electricity', label: 'Electricity', icon: <Zap className="h-5 w-5" />, color: 'bg-yellow-500' },
    { key: 'water', label: 'Water', icon: <Droplets className="h-5 w-5" />, color: 'bg-blue-500' },
    { key: 'gas', label: 'Gas', icon: <Fuel className="h-5 w-5" />, color: 'bg-orange-500' },
    { key: 'municipal', label: 'Municipal', icon: <Building className="h-5 w-5" />, color: 'bg-gray-500' },
    { key: 'insurance', label: 'Insurance', icon: <Shield className="h-5 w-5" />, color: 'bg-blue-500' },
    { key: 'loan', label: 'Loan EMI', icon: <Home className="h-5 w-5" />, color: 'bg-purple-500' },
    { key: 'broadband', label: 'Broadband', icon: <Wifi className="h-5 w-5" />, color: 'bg-indigo-500' },
    { key: 'education', label: 'Education', icon: <GraduationCap className="h-5 w-5" />, color: 'bg-pink-500' },
  ];

  const upcomingBills = [
    { id: 1, type: 'Electricity', provider: 'PSPCL', amount: 2500, dueDate: '15 Jan', status: 'due', icon: <Zap className="h-5 w-5 text-yellow-600" /> },
    { id: 2, type: 'Water', provider: 'Municipal Corp', amount: 800, dueDate: '18 Jan', status: 'pending', icon: <Droplets className="h-5 w-5 text-blue-600" /> },
    { id: 3, type: 'Gas', provider: 'Indane Gas', amount: 1200, dueDate: '20 Jan', status: 'upcoming', icon: <Fuel className="h-5 w-5 text-orange-600" /> },
  ];

  const recentPayments = [
    { id: 1, bill: 'Electricity Bill', provider: 'PSPCL', amount: 2300, date: 'Jan 10', status: 'Paid', icon: <Zap className="h-5 w-5 text-blue-600" /> },
    { id: 2, bill: 'Water Bill', provider: 'Municipal', amount: 750, date: 'Jan 8', status: 'Paid', icon: <Droplets className="h-5 w-5 text-blue-600" /> },
  ];

  const filteredBills = upcomingBills.filter(bill =>
    bill.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/bill-payment', { state: { category } });
  };

  const handlePayNow = (billId: number) => {
    navigate('/bill-payment', { state: { bill: upcomingBills.find(bill => bill.id === billId) } });
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Header */}
        <header className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="rounded-full p-2 hover:bg-gray-100 min-w-[44px] min-h-[44px]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Bill Payments</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2 hover:bg-gray-100 min-w-[44px] min-h-[44px]"
            >
              <Home className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
          {/* Quick Pay Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Quick Pay</h2>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search biller or enter account number"
                  className="rounded-xl h-12 pl-9 border-gray-300 focus:border-primary text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="w-full rounded-xl h-11 bg-primary hover:bg-primary/90 text-sm sm:text-base min-h-[44px]">
                <CreditCard className="h-4 w-4 mr-2" />
                Find Bill
              </Button>
            </div>
          </div>

          {/* Bill Categories */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Bill Categories</h2>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm p-0 h-6">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {billCategories.map((category) => (
                <button
                  key={category.key}
                  // onClick={() => handleCategorySelect(category.key)}
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:border-primary/30 transition-all hover:shadow-sm"
                >
                  <div className={`p-2 rounded-full text-white ${category.color} mb-2`}>
                    {category.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bills Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-white h-12 px-4 overflow-x-auto">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4 sm:px-6 mr-4 sm:mr-6 text-sm sm:text-base whitespace-nowrap"
                >
                  Upcoming Bills
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap"
                >
                  Recent Payments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="m-0 p-4 sm:p-6">
                {filteredBills.length > 0 ? (
                  <div className="space-y-3">
                    {filteredBills.map((bill) => (
                      <div
                        key={bill.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {bill.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-sm sm:text-base text-gray-800">{bill.type}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{bill.provider}</p>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs sm:text-sm text-gray-500">Due: {bill.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm sm:text-base text-gray-800">₹{bill.amount.toLocaleString()}</p>
                          <Badge
                            variant={bill.status === 'due' ? 'destructive' : bill.status === 'pending' ? 'default' : 'secondary'}
                            className="text-xs sm:text-sm mt-1 capitalize"
                          >
                            {bill.status}
                          </Badge>
                          <Button
                            size="sm"
                            className="mt-2 rounded-full text-xs sm:text-sm h-7 sm:h-8 min-w-[80px] sm:min-w-[100px]"
                            onClick={() => handlePayNow(bill.id)}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm sm:text-base">No upcoming bills found</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="m-0 p-4 sm:p-6">
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {payment.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base text-gray-800">{payment.bill}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{payment.provider} • {payment.date}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-sm sm:text-base text-gray-800">₹{payment.amount.toLocaleString()}</p>
                        <div className="flex items-center justify-start sm:justify-end mt-1">
                          <CheckCircle className="h-3 w-3 text-blue-500 mr-1" />
                          <Badge variant="outline" className="text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-200">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Auto Pay Setup */}
          <BankingCard
            title="Auto Pay"
            className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Set up Auto Pay</h3>
                  <p className="text-sm text-blue-600 mt-1">Never miss a bill payment. Schedule automatic payments.</p>
                </div>
              </div>
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base h-10 sm:h-11 min-w-[100px]">
                <Plus className="h-4 w-4 mr-1" />
                Enable
              </Button>
            </div>
          </BankingCard>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Bills;