import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Filter,
  Settings,
  MailOpen,
  Trash2,
  CreditCard,
  Shield,
  PieChart,
  Calendar,
  Sparkles,
  Check,
  X,
  ChevronDown,
  Search,
  MoreVertical
} from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showMarkAllOptions, setShowMarkAllOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'transaction',
      title: 'Transaction Successful',
      message: 'Your transfer of ₹5,000 to John Doe was successful. Transaction ID: TXN48729347',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: '2',
      type: 'security',
      title: 'New Login Detected',
      message: 'New login from your iPhone 13 on Thursday, 10:23 AM in New Delhi',
      time: '1 day ago',
      read: true,
      icon: Shield,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: '3',
      type: 'offer',
      title: 'Special Offer Available',
      message: 'Get 5% cashback on all UPI transactions this month. Limited time offer!',
      time: '2 days ago',
      read: false,
      icon: Sparkles,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Bill Payment Reminder',
      message: 'Your electricity bill of ₹1,247 is due in 3 days. Set up autopay to avoid late fees.',
      time: '3 days ago',
      read: true,
      icon: CreditCard,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: '5',
      type: 'investment',
      title: 'Investment Opportunity',
      message: 'New mutual fund options now available with 12% expected returns. Limited slots open.',
      time: '4 days ago',
      read: false,
      icon: PieChart,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    },
    {
      id: '6',
      type: 'transaction',
      title: 'Salary Credited',
      message: 'Your salary of ₹85,000 has been credited to your account.',
      time: '5 days ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ]);

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(item => item !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setSelectedNotifications([]);
    setShowMarkAllOptions(false);
  };

  const markSelectedAsRead = () => {
    const updatedNotifications = notifications.map(notification => 
      selectedNotifications.includes(notification.id) 
        ? { ...notification, read: true } 
        : notification
    );
    setNotifications(updatedNotifications);
    setSelectedNotifications([]);
  };

  const deleteSelected = () => {
    const updatedNotifications = notifications.filter(
      notification => !selectedNotifications.includes(notification.id)
    );
    setNotifications(updatedNotifications);
    setSelectedNotifications([]);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setSelectedNotifications([]);
    setShowMarkAllOptions(false);
  };

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleNotificationClick = (id, e) => {
    // Only toggle selection if clicking on the main card, not on buttons or actions
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
      toggleSelectNotification(id);
    }
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#134e5e] to-[#71b280]">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-[#134e5e] to-[#2a7d70] shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Notifications</h1>
                <p className="text-xs text-white/80">{unreadCount} unread messages</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <Settings className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full mb-3">
            <TabsList className="w-full grid grid-cols-5 rounded-xl bg-white/10 backdrop-blur-sm p-1 h-12">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#134e5e] text-white py-2 text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="transaction" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#134e5e] text-white py-2 text-xs">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#134e5e] text-white py-2 text-xs">
                Security
              </TabsTrigger>
              <TabsTrigger value="offer" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#134e5e] text-white py-2 text-xs">
                Offers
              </TabsTrigger>
              <TabsTrigger value="payment" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#134e5e] text-white py-2 text-xs">
                Payments
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Actions Bar */}
        <div className="px-4 pb-3 bg-gradient-to-b from-[#2a7d70] to-[#2a7d70]">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="relative">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => setShowMarkAllOptions(!showMarkAllOptions)}
                  className="rounded-full bg-white/90 hover:bg-white backdrop-blur-sm pr-2"
                >
                  <MailOpen className="h-4 w-4 mr-1" />
                  Mark Read
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
                
                {showMarkAllOptions && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200">
                    <button
                      onClick={markAllAsRead}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Mark all as read
                    </button>
                    <button
                      onClick={markSelectedAsRead}
                      disabled={selectedNotifications.length === 0}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                        selectedNotifications.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Check className="h-4 w-4 mr-2 text-blue-500" />
                      Mark selected as read
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={clearAllNotifications}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-500"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
              
              {selectedNotifications.length > 0 && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={deleteSelected}
                  className="rounded-full backdrop-blur-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete ({selectedNotifications.length})
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              {filteredNotifications.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={selectAllNotifications}
                  className="rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm"
                >
                  {selectedNotifications.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="rounded-t-3xl bg-gray-50 pt-6 px-4 min-h-screen mt-2">
        <div className="space-y-3 pb-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div 
                  key={notification.id} 
                  className={`relative rounded-xl p-4 transition-all cursor-pointer border ${
                    !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
                  } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={(e) => handleNotificationClick(notification.id, e)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-full ${notification.bgColor} flex-shrink-0`}>
                        <IconComponent className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center mt-2">
                              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="bg-blue-500 rounded-full w-2 h-2 ml-2 mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Individual notification actions */}
                    <div className="flex flex-col items-center justify-between ml-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-gray-600"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-red-500 mt-2"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {selectedNotifications.includes(notification.id) && (
                    <div className="absolute -left-2 -top-2">
                      <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-500">No notifications found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchQuery ? 'Try adjusting your search terms' : 
                 filter === 'all' ? "You're all caught up!" : 
                 `No ${filter} notifications`}
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-3"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;