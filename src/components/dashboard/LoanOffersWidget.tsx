import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Banknote, Home, Car, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoanOffersWidget = () => {
  const navigate = useNavigate();

  const loanOffers = [
    {
      type: 'Personal Loan',
      amount: '₹5,00,000',
      rate: '10.5% p.a.',
      icon: <Banknote className="h-4 w-4" />,
      color: 'from-blue-500 to-blue-600',
      preApproved: true,
      popular: true
    },
    {
      type: 'Home Loan',
      amount: '₹50,00,000',
      rate: '8.75% p.a.',
      icon: <Home className="h-4 w-4" />,
      color: 'from-blue-500 to-blue-600',
      preApproved: false,
      popular: false
    },
    {
      type: 'Car Loan',
      amount: '₹15,00,000',
      rate: '9.25% p.a.',
      icon: <Car className="h-4 w-4" />,
      color: 'from-purple-500 to-purple-600',
      preApproved: true,
      popular: false
    },
    {
      type: 'Education Loan',
      amount: '₹20,00,000',
      rate: '9.5% p.a.',
      icon: <GraduationCap className="h-4 w-4" />,
      color: 'from-orange-500 to-orange-600',
      preApproved: false,
      popular: false
    }
  ];

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            Loan Offers
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/loans')}
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {loanOffers.map((loan, index) => (
            <div
              key={index}
              onClick={() => navigate('/loans')}
              className="relative cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${loan.color} text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]`}>
                {loan.popular && (
                  <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 border-0 text-xs px-1.5 py-0.5">
                    Popular
                  </Badge>
                )}
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    {loan.icon}
                  </div>
                  {loan.preApproved && (
                    <Badge className="bg-white/20 text-white border-0 text-xs px-1.5 py-0.5">
                      Pre-approved
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-sm leading-tight">{loan.type}</h4>
                  <p className="text-xs text-white/90">Up to {loan.amount}</p>
                  <p className="text-xs text-white/80">From {loan.rate}</p>
                </div>

                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="w-full mt-2 h-6 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-medium text-amber-800">Special Offer</p>
          </div>
          <p className="text-xs text-amber-700 mt-1">
            Get instant loan approval with Bank Name. No paperwork required for pre-approved loans.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};