
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Search,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar,
  CreditCard,
  Smartphone,
  Zap,
  Send
} from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'transactions' | 'services'>('all');

  const recentSearches = [
    'Netflix payment',
    'UPI to John',
    'Electricity bill',
    'Mutual funds'
  ];

  const transactions = [
    {
      id: '1',
      description: 'Netflix Subscription',
      amount: -199,
      date: '2024-01-15',
      type: 'debit',
      category: 'Entertainment'
    },
    {
      id: '2', 
      description: 'UPI Payment to John Doe',
      amount: -2500,
      date: '2024-01-14',
      type: 'debit',
      category: 'Transfer'
    },
    {
      id: '3',
      description: 'Salary Credit',
      amount: 75000,
      date: '2024-01-13',
      type: 'credit',
      category: 'Salary'
    },
    {
      id: '4',
      description: 'Electricity Bill Payment',
      amount: -1250,
      date: '2024-01-12',
      type: 'debit',
      category: 'Bills'
    }
  ];

  const services = [
    {
      name: 'Transfer Money',
      description: 'Send money to bank accounts',
      icon: <Send className="h-5 w-5" />,
      action: () => navigate('/transfer')
    },
    {
      name: 'Pay Bills',
      description: 'Electricity, water, gas bills',
      icon: <Zap className="h-5 w-5" />,
      action: () => navigate('/bills')
    },
    {
      name: 'Mobile Recharge',
      description: 'Prepaid & postpaid recharge',
      icon: <Smartphone className="h-5 w-5" />,
      action: () => navigate('/recharge')
    },
    {
      name: 'Loan Services',
      description: 'Apply for loans, pay EMI',
      icon: <CreditCard className="h-5 w-5" />,
      action: () => navigate('/loans-flow')
    }
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(Math.abs(amount));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
      <div className="space-y-6 py-4 px-3 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-green-800"
              autoFocus
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-muted rounded-2xl p-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('transactions')}
            className={`flex-1 py-3 px-4 rounded-full transition-all text-sm font-medium ${
              activeFilter === 'transactions'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveFilter('services')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all text-sm font-medium ${
              activeFilter === 'services'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Services
          </button>
        </div>

        {/* Recent Searches (when no search query) */}
        {!searchQuery && (
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Recent Searches</h3>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <p className="text-sm">{search}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-6">
            {/* Services Results */}
            {(activeFilter === 'all' || activeFilter === 'services') && filteredServices.length > 0 && (
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Services</h3>
                  <div className="space-y-3">
                    {filteredServices.map((service, index) => (
                      <button
                        key={index}
                        onClick={service.action}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all"
                      >
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          {service.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transactions Results */}
            {(activeFilter === 'all' || activeFilter === 'transactions') && filteredTransactions.length > 0 && (
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Transactions</h3>
                  <div className="space-y-3">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'credit' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                              <Badge variant="secondary" className="text-xs">
                                {transaction.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-foreground'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Results */}
            {filteredTransactions.length === 0 && filteredServices.length === 0 && (
              <Card className="rounded-2xl">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
 
  );
};

export default SearchPage;
