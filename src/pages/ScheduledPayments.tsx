
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Plus,
  Calendar as CalendarIcon,
  Repeat,
  Trash2,
  Edit,
  Pause,
  Play,
  Clock,
  AlertCircle,
  Home,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ScheduledPayments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const [newPayment, setNewPayment] = useState({
    title: '',
    amount: '',
    frequency: '',
    toAccount: '',
    startDate: undefined as Date | undefined,
    description: ''
  });

  const scheduledPayments = [
    {
      id: 1,
      title: 'Electricity Bill',
      amount: 2500,
      frequency: 'Monthly',
      nextDate: '2024-01-15',
      toAccount: 'BSES Rajdhani Power Ltd',
      status: 'Active',
      autoDebit: true
    },
    {
      id: 2,
      title: 'Home Loan EMI',
      amount: 35000,
      frequency: 'Monthly',
      nextDate: '2024-01-10',
      toAccount: 'Bank Name Loan Account',
      status: 'Active',
      autoDebit: true
    },
    {
      id: 3,
      title: 'SIP Investment',
      amount: 10000,
      frequency: 'Monthly',
      nextDate: '2024-01-05',
      toAccount: 'HDFC Mutual Fund',
      status: 'Active',
      autoDebit: true
    },
    {
      id: 4,
      title: 'Insurance Premium',
      amount: 8000,
      frequency: 'Quarterly',
      nextDate: '2024-01-20',
      toAccount: 'LIC of India',
      status: 'Paused',
      autoDebit: false
    }
  ];

  const handleCreatePayment = () => {
    if (!newPayment.title || !newPayment.amount || !newPayment.frequency) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Scheduled",
      description: `${newPayment.title} has been scheduled successfully.`,
    });
    
    setShowCreateForm(false);
    setNewPayment({
      title: '',
      amount: '',
      frequency: '',
      toAccount: '',
      startDate: undefined,
      description: ''
    });
  };

  const togglePaymentStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    toast({
      title: `Payment ${newStatus}`,
      description: `The scheduled payment has been ${newStatus.toLowerCase()}.`,
    });
  };

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
              <h1 className="text-lg font-semibold text-gray-800">Scheduled Payments</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowCreateForm(true)}
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Schedule
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="rounded-full p-2"
              >
                <Home className="text-lg text-gray-600" />
              </Button>
            </div>
          </div>
        </header>

        <div className="px-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <BankingCard className="rounded-2xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {scheduledPayments.filter(p => p.status === 'Active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Payments</p>
              </div>
            </BankingCard>
            
            <BankingCard className="rounded-2xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(scheduledPayments.reduce((sum, p) => p.status === 'Active' ? sum + p.amount : sum, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Total</p>
              </div>
            </BankingCard>
          </div>

          {/* Scheduled Payments List */}
          <div className="space-y-4">
            {scheduledPayments.map((payment) => (
              <BankingCard key={payment.id} className="rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${payment.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Repeat className={`h-5 w-5 ${payment.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{payment.title}</h3>
                        <p className="text-sm text-muted-foreground">{payment.toAccount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                      <Badge variant={payment.status === 'Active' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{payment.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Next: {new Date(payment.nextDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePaymentStatus(payment.id, payment.status)}
                      >
                        {payment.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {payment.autoDebit && (
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-800">Auto-debit enabled</span>
                      </div>
                    </div>
                  )}
                </div>
              </BankingCard>
            ))}
          </div>

          {/* Create New Payment Form */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <BankingCard className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Schedule New Payment</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCreateForm(false)}
                    >
                      ×
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Payment Title *</Label>
                      <Input
                        id="title"
                        value={newPayment.title}
                        onChange={(e) => setNewPayment(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Electricity Bill"
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount">Amount *</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="toAccount">To Account *</Label>
                      <Input
                        id="toAccount"
                        value={newPayment.toAccount}
                        onChange={(e) => setNewPayment(prev => ({ ...prev, toAccount: e.target.value }))}
                        placeholder="Account number or name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="frequency">Frequency *</Label>
                      <Select onValueChange={(value) => setNewPayment(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newPayment.description}
                        onChange={(e) => setNewPayment(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Optional description"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleCreatePayment}
                    >
                      Schedule Payment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </BankingCard>
            </div>
          )}
        </div>
      </div>
    </BankingLayout>
  );
};

export default ScheduledPayments;
