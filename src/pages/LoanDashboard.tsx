
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Home, 
  Car, 
  GraduationCap, 
  Building,
  User,
  Coins,
  CreditCard,
  Star,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const LoanDashboard = () => {
  const navigate = useNavigate();

  const loanTypes = [
    {
      key: 'personal',
      title: 'Personal Loan',
      subtitle: 'Up to ₹50L at 10.5% p.a.',
      icon: <User className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Instant approval', 'No collateral', 'Flexible tenure']
    },
    {
      key: 'home',
      title: 'Home Loan',
      subtitle: 'Up to ₹10Cr at 8.5% p.a.',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Tax benefits', 'Attractive rates', 'Balance transfer']
    },
    {
      key: 'car',
      title: 'Car Loan',
      subtitle: 'Up to ₹1.5Cr at 9% p.a.',
      icon: <Car className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: ['100% financing', 'Quick processing', 'Insurance help']
    },
    {
      key: 'education',
      title: 'Education Loan',
      subtitle: 'Up to ₹1.5Cr at 8% p.a.',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: ['Moratorium period', 'Tax benefits', 'Covers all expenses']
    },
    {
      key: 'gold',
      title: 'Gold Loan',
      subtitle: 'Up to ₹2Cr at 7.5% p.a.',
      icon: <Coins className="h-6 w-6" />,
      color: 'bg-yellow-500',
      features: ['Against gold ornaments', 'Quick disbursal', 'Minimal documentation']
    },
    {
      key: 'lap',
      title: 'Loan Against Property',
      subtitle: 'Up to ₹5Cr at 9.5% p.a.',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-indigo-500',
      features: ['Against property', 'Higher loan amount', 'Flexible tenure']
    },
    {
      key: 'credit-card-emi',
      title: 'Credit Card EMI Loan',
      subtitle: 'Convert purchases to EMI',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-pink-500',
      features: ['Easy conversion', 'No paperwork', 'Instant approval']
    }
  ];

  const preApprovedOffers = [
    {
      id: 1,
      type: 'Personal Loan',
      amount: '₹5,00,000',
      rate: '10.5%',
      validTill: '31 Dec 2024'
    },
    {
      id: 2,
      type: 'Home Loan',
      amount: '₹75,00,000',
      rate: '8.5%',
      validTill: '15 Jan 2025'
    }
  ];

  const handleLoanApplication = (loanType: string) => {
    navigate('/loan-cibil-consent', { state: { loanType } });
  };

  const handlePreApprovedLoan = (offer: any) => {
    navigate('/loan-application-form', { state: { loanType: offer.type, isPreApproved: true, offer } });
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        {/* <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" /><h1 className="text-lg font-semibold">Loans</h1>
          </Button>
          <div></div>
        </div> */}
        
          <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        
        {/* Back button + Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Loans</h1>
        </div>

        {/* Home icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard')}
          className="rounded-full p-2"
        >
          <Home className="text-lg text-gray-600" />
        </Button>
      </div>
    </header>

        {/* Pre-approved Offers */}
        {preApprovedOffers.length > 0 && (
          <div  className="px-4 ">
            <span className="text-lg font-semibold ">Pre-approved Offers</span>
            <div className="space-y-4 mt-4">
              {preApprovedOffers.map((offer) => (
                // <div key={offer.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-primary/20">
                //   <div className="flex items-center space-x-3">
                //     <div className="p-2 rounded-lg bg-primary/10">
                //       <Star className="h-5 w-5 text-primary" />
                //     </div>
                //     <div>
                //       <h3 className="font-semibold">{offer.type}</h3>
                //       <p className="text-sm text-muted-foreground">
                //         Up to {offer.amount} at {offer.rate} p.a.
                //       </p>
                //       <p className="text-xs text-blue-600">Valid till {offer.validTill}</p>
                //     </div>
                //   </div>
                //   <div className="flex space-x-2">
                //     <Button size="sm" variant="outline" onClick={() => navigate('/loan-details', { state: offer })}>
                //       View Details
                //     </Button>
                //     <Button size="sm" onClick={() => handlePreApprovedLoan(offer)}>
                //       Apply Now
                //     </Button>
                //   </div>
                // </div>
                <div
  key={offer.id}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-white border border-primary/20 gap-3"
>
  {/* Left side: Icon + Text */}
  <div className="flex items-center space-x-3">
    <div className="p-2 rounded-lg bg-primary/10">
      <Star className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold">{offer.type}</h3>
      <p className="text-sm text-muted-foreground">
        Up to {offer.amount} at {offer.rate} p.a.
      </p>
      <p className="text-xs text-blue-600">Valid till {offer.validTill}</p>
    </div>
  </div>

  {/* Right side: Buttons */}
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
    <Button
      size="sm"
      variant="outline"
      className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100"
      onClick={() => navigate('/loan-details', { state: offer })}
    >
      View Details
    </Button>
    <Button
      size="sm"
      className="w-full sm:w-auto"
      onClick={() => handlePreApprovedLoan(offer)}
    >
      Apply Now
    </Button>
  </div>
</div>

              ))}
            </div>
          </div>
        )}

        {/* Loan Categories */}
        <div title="Choose Loan Type" className="rounded-2xl">
          <div className="space-y-4 px-4">
            {loanTypes.map((loan) => (
              <button
                key={loan.key}
                onClick={() => handleLoanApplication(loan.key)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-md text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl text-white ${loan.color}`}>
                    {loan.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{loan.title}</h3>
                    <p className="text-sm text-muted-foreground">{loan.subtitle}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {loan.features.map((feature, index) => (
                        <Badge key={index} variant="default" className="text-[10px] font-light">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Why Choose Our Loans */}
        <div className='px-6 pb-16' >
          <h2 className="text-md font-semibold mb-4">Why Choose Our Loans?</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <TrendingUp />, title: 'Competitive Rates', subtitle: 'Starting from 7.5% p.a.' },
              { icon: <Star />, title: 'Quick Processing', subtitle: 'Get approval in 24-48 hours' },
              { icon: <Building />, title: 'Minimal Documentation', subtitle: 'Hassle-free process' },
              { icon: <User />, title: 'Flexible Tenure', subtitle: 'Up to 30 years repayment' },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanDashboard;
