
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { QuickAction } from '@/components/QuickAction';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft,
  Send,
  Zap,
  Smartphone,
  CreditCard,
  Scan,
  Building,
  User,
  Home,
  Car,
  Droplets,
  Wifi,
  Tv,
  Receipt,
  FileText,
  Shield,
  TrendingUp,
  PiggyBank,
  Wallet,
  Settings,
  HeadphonesIcon,
  MapPin
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const paymentActions = [
    { icon: <Send className="h-6 w-6" />, title: "Send Money", onClick: () => navigate('/transfer') },
    { icon: <Scan className="h-6 w-6" />, title: "QR Scan", onClick: () => navigate('/qr-payment') },
    { icon: <User className="h-6 w-6" />, title: "Pay Contact", onClick: () => navigate('/pay-contact') },
    { icon: <Building className="h-6 w-6" />, title: "Bank Transfer", onClick: () => navigate('/bank-transfer') }
  ];

  const billActions = [
    { icon: <Zap className="h-6 w-6" />, title: "Electricity", onClick: () => navigate('/bills') },
    { icon: <Droplets className="h-6 w-6" />, title: "Water", onClick: () => navigate('/bills') },
    { icon: <Wifi className="h-6 w-6" />, title: "Internet", onClick: () => navigate('/bills') },
    { icon: <Tv className="h-6 w-6" />, title: "DTH", onClick: () => navigate('/bills') }
  ];

  const rechargeActions = [
    { icon: <Smartphone className="h-6 w-6" />, title: "Mobile", onClick: () => navigate('/recharge') },
    { icon: <Wifi className="h-6 w-6" />, title: "Data Card", onClick: () => navigate('/recharge') },
    { icon: <Tv className="h-6 w-6" />, title: "DTH Recharge", onClick: () => navigate('/recharge') }
  ];

  const loanActions = [
    { icon: <CreditCard className="h-6 w-6" />, title: "Loan EMI", onClick: () => navigate('/loan-payment') },
    { icon: <Car className="h-6 w-6" />, title: "Car Loan", onClick: () => navigate('/loans-flow') },
    { icon: <Home className="h-6 w-6" />, title: "Home Loan", onClick: () => navigate('/loans-flow') },
    { icon: <User className="h-6 w-6" />, title: "Personal Loan", onClick: () => navigate('/loans-flow') }
  ];

  const investmentActions = [
    { icon: <TrendingUp className="h-6 w-6" />, title: "Mutual Funds", onClick: () => navigate('/mutual-funds-flow') },
    { icon: <PiggyBank className="h-6 w-6" />, title: "Fixed Deposit", onClick: () => navigate('/open-fd') },
    { icon: <Shield className="h-6 w-6" />, title: "Insurance", onClick: () => navigate('/insurance-flow') }
  ];

  const serviceActions = [
    { icon: <Receipt className="h-6 w-6" />, title: "Statements", onClick: () => navigate('/statements-center') },
    { icon: <FileText className="h-6 w-6" />, title: "Cheque Book", onClick: () => navigate('/cheque-services') },
    { icon: <MapPin className="h-6 w-6" />, title: "Branch Locator", onClick: () => navigate('/branch-locator') },
    { icon: <HeadphonesIcon className="h-6 w-6" />, title: "Support", onClick: () => navigate('/support') }
  ];

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Quick Actions</h1>
          <div></div>
        </div>

        {/* Payments */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payments</h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="outline"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bill Payments */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Bill Payments</h3>
            <div className="grid grid-cols-2 gap-4">
              {billActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="secondary"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recharge */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recharge</h3>
            <div className="grid grid-cols-2 gap-4">
              {rechargeActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="outline"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loans */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loans</h3>
            <div className="grid grid-cols-2 gap-4">
              {loanActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="primary"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investments */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Investments</h3>
            <div className="grid grid-cols-2 gap-4">
              {investmentActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="secondary"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="grid grid-cols-2 gap-4">
              {serviceActions.map((action, index) => (
                <QuickAction
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                  variant="outline"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default QuickActions;
