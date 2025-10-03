import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Settings,
  Lock,
  Unlock,
  MoreHorizontal,
  ArrowUpRight,
  Calendar,
  Shield,
  Smartphone,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Card {
  id: number;
  type: string;
  number: string;
  expiry: string;
  bank: string;
  status: 'Active' | 'Blocked';
  balance: string;
  isBlocked: boolean;
  cardColor: string;
}

interface Transaction {
  id: number;
  type: string;
  merchant: string;
  amount: number;
  date: string;
  cardId: number;
}

const Cards: React.FC = () => {
  const navigate = useNavigate();
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState<Record<number, boolean>>({});
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      type: 'Debit Card',
      number: '4532 1234 5678 2675',
      expiry: '12/27',
      bank: 'Bank Name',
      status: 'Active',
      balance: '₹1,25,430.50',
      isBlocked: false,
      cardColor: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      type: 'Credit Card',
      number: '5412 9876 5432 8903',
      expiry: '08/26',
      bank: 'Bank Name',
      status: 'Active',
      balance: '₹2,50,000 Limit',
      isBlocked: false,
      cardColor: 'from-purple-600 to-purple-800',
    },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'Online Purchase', merchant: 'Amazon India', amount: -1299, date: '2025-08-12', cardId: 1 },
    { id: 2, type: 'ATM Withdrawal', merchant: 'PSB ATM - Connaught Place', amount: -5000, date: '2025-08-11', cardId: 1 },
    { id: 3, type: 'Subscription', merchant: 'Netflix', amount: -799, date: '2025-08-10', cardId: 2 },
  ]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    (window as any).Lucide?.createIcons();
  }, []);

  const toggleCardNumbers = () => setShowCardNumbers(!showCardNumbers);

  const toggleCardDetails = (cardId: number) => {
    setShowCardDetails((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleBlockCard = (cardId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, isBlocked: !card.isBlocked, status: card.isBlocked ? 'Active' : 'Blocked' }
          : card
      )
    );
    setIsModalOpen(false);
  };

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter((t) => t.cardId === Number(filter));

  const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    calendar: Calendar,
    'arrow-up-right': ArrowUpRight,
    smartphone: Smartphone,
  };

  return (
    <BankingLayout title="My Cards">
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pb-24">
        <div className="space-y-6 px-4 pt-2 max-w-3xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between sticky top-0 z-50 bg-white py-4 border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
                <p className="text-gray-600">Manage your debit and credit cards</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2 hover:bg-gray-100"
              aria-label="Go to dashboard"
            >
              <Home className="h-5 w-5 text-gray-700" />
            </Button>
          </header>

          {/* Add Card Button */}
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => navigate('/add-card')}
              aria-label="Add new card"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Card
            </Button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden max-w-sm mx-auto shadow-lg">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${card.cardColor} text-white p-6 relative`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-sm font-medium opacity-80">{card.bank}</p>
                        <p className="text-xs opacity-60">{card.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardDetails(card.id)}
                          className="text-white hover:bg-white/20 p-2"
                          aria-label={showCardDetails[card.id] ? 'Hide card details' : 'Show card details'}
                        >
                          {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCard(card);
                            setIsModalOpen(true);
                          }}
                          className="text-white hover:bg-white/20 p-2"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl font-mono tracking-wider">
                        {showCardDetails[card.id] ? card.number : card.number.replace(/\d(?=\d{4})/g, '*')}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-60">VALID THRU</p>
                          <p className="text-sm font-mono">{card.expiry}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-60">BALANCE</p>
                          <p className="text-lg font-semibold">
                            {showCardDetails[card.id] ? card.balance : '****'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-16 left-6 w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded opacity-80"></div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={card.status === 'Active' ? 'default' : 'secondary'}
                        className="rounded-full px-3 py-1"
                      >
                        {card.status}
                      </Badge>
                      {card.isBlocked && (
                        <Badge variant="destructive" className="rounded-full px-3 py-1">
                          Blocked
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-300 hover:bg-gray-50"
                        onClick={() => {
                          setSelectedCard(card);
                          setIsModalOpen(true);
                        }}
                        aria-label={card.isBlocked ? 'Unblock card' : 'Block card'}
                      >
                        {card.isBlocked ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                        {card.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-xl border-gray-300 hover:bg-gray-50" 
                        onClick={() => navigate(`/card-settings/${card.id}`)}
                        aria-label="Card settings"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="max-w-sm mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'shield', text: 'Card Security', color: 'text-blue-600' },
                  { icon: 'calendar', text: 'Statements', color: 'text-blue-600' },
                  { icon: 'arrow-up-right', text: 'Upgrade Card', color: 'text-purple-600' },
                  { icon: 'smartphone', text: 'Digital Wallet', color: 'text-orange-600' },
                ].map((action, index) => {
                  const IconComponent = iconComponents[action.icon];
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-20 flex-col rounded-2xl hover:bg-gray-50"
                      aria-label={action.text}
                    >
                      <IconComponent className={`h-6 w-6 mb-2 ${action.color}`} />
                      <span className="text-sm font-medium">{action.text}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="max-w-sm mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter Transactions</h2>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter transactions by card"
                >
                  <option value="all">All Cards</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.type} - {card.number.slice(-4)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.merchant}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold text-sm ${transaction.amount < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                      {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                {filteredTransactions.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">No transactions found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Modal for Card Actions */}
          {isModalOpen && selectedCard && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Manage {selectedCard.type}</h3>
                <p className="text-sm text-gray-600 mb-4">Card: {selectedCard.number.slice(-4)}</p>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleBlockCard(selectedCard.id)}
                    className={`w-full px-4 py-2 rounded-lg flex items-center justify-center text-sm font-medium ${
                      selectedCard.isBlocked
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    aria-label={selectedCard.isBlocked ? 'Unblock card' : 'Block card'}
                  >
                    {selectedCard.isBlocked ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                    {selectedCard.isBlocked ? 'Unblock Card' : 'Block Card'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium"
                    aria-label="Cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <BottomNavigation />
      </div>
    </BankingLayout>
  );
};

export default Cards;