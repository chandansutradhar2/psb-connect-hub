import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Filter,
  ArrowUpDown,
  CheckCircle,
  Star,
  Shield,
  BarChart2,
  Eye,
  ChevronRight,
  Phone,
  ShieldCheck,
  HeartPulse,
  Car,
  Home,
  Plane,
  User
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const InsurancePlans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const insuranceType = location.state?.insuranceType || 'health';
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'premium' | 'coverage'>('premium');

  const getInsuranceIcon = () => {
    switch(insuranceType) {
      case 'health': return <HeartPulse className="h-5 w-5" />;
      case 'life': return <ShieldCheck className="h-5 w-5" />;
      case 'motor': return <Car className="h-5 w-5" />;
      case 'home': return <Home className="h-5 w-5" />;
      case 'travel': return <Plane className="h-5 w-5" />;
      case 'personal-accident': return <User className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const plans = [
    {
      id: 'health-1',
      name: 'Health Secure Plus',
      insurer: 'ICICI Lombard',
      insurerRating: 4.5,
      coverage: 500000,
      premium: 12000,
      premiumMonthly: 1000,
      claimRatio: 98.2,
      keyBenefits: ['Cashless treatment', 'Pre & post hospitalization', 'Maternity cover'],
      features: ['10,000+ network hospitals', 'No room rent capping'],
      popular: true,
      recommended: true
    },
    {
      id: 'health-2',
      name: 'Complete Health Care',
      insurer: 'HDFC ERGO',
      insurerRating: 4.3,
      coverage: 1000000,
      premium: 18000,
      premiumMonthly: 1500,
      claimRatio: 96.8,
      keyBenefits: ['Family floater', 'Health check-ups', 'Alternative treatments'],
      features: ['15,000+ network hospitals', 'Unlimited restoration'],
      popular: false,
      recommended: false
    },
    {
      id: 'health-3',
      name: 'Basic Health Shield',
      insurer: 'ICICI Lombard',
      insurerRating: 4.2,
      coverage: 300000,
      premium: 8000,
      premiumMonthly: 667,
      claimRatio: 97.5,
      keyBenefits: ['Individual cover', 'Emergency ambulance', 'Pre-hospitalization'],
      features: ['5,000+ network hospitals', 'Co-payment applicable'],
      popular: false,
      recommended: false
    }
  ];

  const sortedPlans = [...plans].sort((a, b) => {
    return sortBy === 'premium' ? a.premium - b.premium : b.coverage - a.coverage;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId) 
        : prev.length < 3 ? [...prev, planId] : prev
    );
  };

  const handleViewDetails = (plan: any) => {
    navigate('/insurance-plan-details', { state: { plan, insuranceType } });
  };

  const handleComparePlans = () => {
    const selectedPlanData = plans.filter(plan => selectedPlans.includes(plan.id));
    navigate('/compare-insurance-plans', { state: { plans: selectedPlanData, insuranceType } });
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-28">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4 p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900 capitalize">{insuranceType} Insurance</h1>
              <p className="text-sm text-gray-500">{plans.length} plans available</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Sort & Compare */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSortBy(sortBy === 'premium' ? 'coverage' : 'premium')}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by {sortBy === 'premium' ? 'Premium' : 'Coverage'}
            </Button>
            
            {selectedPlans.length > 0 && (
              <Button
                onClick={handleComparePlans}
                disabled={selectedPlans.length < 2}
                className="flex-1"
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Compare ({selectedPlans.length})
              </Button>
            )}
          </div>

          {/* Plans List */}
          <div className="space-y-4">
            {sortedPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white border rounded-xl p-5 shadow-sm relative ${
                  selectedPlans.includes(plan.id) ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                }`}
              >
                {/* Badges */}
                <div className="absolute -top-3 left-4 right-4 flex gap-2">
                  {plan.popular && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      Most Popular
                    </Badge>
                  )}
                  {plan.recommended && (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Recommended
                    </Badge>
                  )}
                </div>

                {/* Plan Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getInsuranceIcon()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{plan.insurer}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500">{plan.insurerRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatCurrency(plan.coverage)}</p>
                    <p className="text-xs text-gray-500">Coverage</p>
                  </div>
                </div>

                {/* Premium & Claim Info */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-blue-600">{formatCurrency(plan.premium)}</p>
                    <p className="text-xs text-gray-500">Annual</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-green-600">{formatCurrency(plan.premiumMonthly)}</p>
                    <p className="text-xs text-gray-500">Monthly</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-purple-600">{plan.claimRatio}%</p>
                    <p className="text-xs text-gray-500">Claim Ratio</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Key Benefits</h4>
                  <div className="space-y-2">
                    {plan.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant={selectedPlans.includes(plan.id) ? "default" : "outline"}
                    onClick={() => togglePlanSelection(plan.id)}
                    className="flex-1"
                    disabled={!selectedPlans.includes(plan.id) && selectedPlans.length >= 3}
                  >
                    {selectedPlans.includes(plan.id) ? 'Selected' : 'Select'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(plan)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className=" p-4">
          {selectedPlans.length > 0 ? (
            <Button 
              onClick={handleComparePlans}
              disabled={selectedPlans.length < 2}
              className="w-full h-12"
              size="lg"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Compare {selectedPlans.length} Plans
            </Button>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-800">Need help choosing?</h4>
                  <p className="text-sm text-blue-700">Our insurance experts can guide you</p>
                </div>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Talk to Expert
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsurancePlans;



