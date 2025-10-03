
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Shield,
  Heart,
  Car,
  Home,
  Plane,
  Users,
  Calculator,
  FileText,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  TrendingUp,
  Download
} from 'lucide-react';

const InsuranceFlow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'explore' | 'my-policies'>('explore');

  const insuranceTypes = [
    {
      id: 'life',
      title: 'Life Insurance',
      subtitle: 'Secure your family\'s future',
      description: 'Term & endowment plans with tax benefits',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      features: ['Tax benefits under 80C', 'High coverage', 'Online purchase'],
      premiumFrom: '₹500/month',
      coverageUpTo: '₹2 Crore'
    },
    {
      id: 'health',
      title: 'Health Insurance',
      subtitle: 'Comprehensive medical coverage',
      description: 'Cashless treatment at 10,000+ hospitals',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Cashless claims', 'Pre & post hospitalization', 'Family floater'],
      premiumFrom: '₹8,000/year',
      coverageUpTo: '₹25 Lakh'
    },
    {
      id: 'motor',
      title: 'Motor Insurance',
      subtitle: 'Complete vehicle protection',
      description: 'Comprehensive car & bike insurance',
      icon: <Car className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['Zero depreciation', 'Roadside assistance', 'Quick claim settlement'],
      premiumFrom: '₹2,500/year',
      coverageUpTo: 'IDV based'
    },
    {
      id: 'home',
      title: 'Home Insurance',
      subtitle: 'Protect your valuable assets',
      description: 'Coverage for structure, contents & personal liability',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: ['Fire & theft protection', 'Natural calamity cover', 'Personal liability'],
      premiumFrom: '₹3,000/year',
      coverageUpTo: '₹1 Crore'
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      subtitle: 'Worry-free journeys',
      description: 'Medical emergency & trip protection',
      icon: <Plane className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: ['Medical emergency', 'Trip cancellation', 'Baggage protection'],
      premiumFrom: '₹100/trip',
      coverageUpTo: '₹50 Lakh'
    }
  ];

  const myPolicies = [
    {
      id: 1,
      type: 'Health Insurance',
      policyNumber: 'HI123456789',
      insuredAmount: 500000,
      premium: 12000,
      nextDue: '2024-03-15',
      status: 'Active',
      family: 4
    },
    {
      id: 2,
      type: 'Term Life Insurance',
      policyNumber: 'LI987654321',
      insuredAmount: 2000000,
      premium: 8000,
      nextDue: '2024-02-20',
      status: 'Active',
      family: 1
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInsuranceApplication = (insuranceType: string) => {
    navigate('/insurance-application', { state: { insuranceType } });
  };

  const totalCoverage = myPolicies.reduce((sum, policy) => sum + policy.insuredAmount, 0);
  const totalPremium = myPolicies.reduce((sum, policy) => sum + policy.premium, 0);

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
          <h1 className="text-lg font-semibold">Insurance</h1>
          <Button variant="ghost" size="sm" className="rounded-full p-2" onClick={() => navigate('/insurance-calculator')}>
            <Calculator className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/claim-status')}>
            <FileText className="h-5 w-5" />
            <span className="text-sm">Claim Status</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/renew-policy')}>
            <Clock className="h-5 w-5" />
            <span className="text-sm">Renew Policy</span>
          </Button>
        </div>

        {/* Insurance Summary */}
        {myPolicies.length > 0 && (
          <BankingCard title="Insurance Summary" className="rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-blue-50">
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(totalCoverage)}
                </p>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary/5">
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(totalPremium)}
                </p>
                <p className="text-sm text-muted-foreground">Annual Premium</p>
              </div>
            </div>
          </BankingCard>
        )}

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'explore'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">Explore Insurance</span>
          </button>
          <button
            onClick={() => setActiveTab('my-policies')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'my-policies'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">My Policies</span>
          </button>
        </div>

        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Featured Offer */}
            <BankingCard className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">Special Offer</h3>
                  <p className="text-sm text-muted-foreground">Get 25% off on first year premium</p>
                </div>
                <Badge className="bg-primary text-primary-foreground">Limited Time</Badge>
              </div>
            </BankingCard>

            {/* Insurance Types */}
            <BankingCard title="Choose Insurance Type" className="rounded-2xl">
              <div className="space-y-4">
                {insuranceTypes.map((insurance) => (
                  <button
                    key={insurance.id}
                    onClick={() => handleInsuranceApplication(insurance.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-md text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl text-white ${insurance.color}`}>
                        {insurance.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{insurance.title}</h3>
                        <p className="text-sm text-muted-foreground">{insurance.subtitle}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-blue-600">From {insurance.premiumFrom}</span>
                          <span className="text-xs text-blue-600">Up to {insurance.coverageUpTo}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {insurance.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ArrowLeft className="h-5 w-5 rotate-180 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </BankingCard>

            {/* Insurance Calculator */}
            <BankingCard title="Premium Calculator" className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Calculate Premium</h3>
                  <p className="text-sm text-blue-600">Get instant premium quotes</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/insurance-calculator')}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </BankingCard>

            {/* Why Choose PSB Insurance */}
            <BankingCard title="Why Choose PSB Insurance?" className="rounded-2xl">
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle />, title: 'Quick Claim Settlement', subtitle: '99.2% claim settlement ratio' },
                  { icon: <Shield />, title: 'Comprehensive Coverage', subtitle: 'Wide range of insurance products' },
                  { icon: <Users />, title: 'Expert Support', subtitle: '24/7 customer service' },
                  { icon: <TrendingUp />, title: 'Competitive Premiums', subtitle: 'Best rates in the market' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BankingCard>
          </div>
        )}

        {activeTab === 'my-policies' && (
          <div className="space-y-4">
            {myPolicies.length > 0 ? (
              myPolicies.map((policy) => (
                <BankingCard key={policy.id} className="rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{policy.type}</h3>
                        <p className="text-sm text-muted-foreground">Policy: {policy.policyNumber}</p>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {policy.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage Amount</p>
                        <p className="font-semibold">{formatCurrency(policy.insuredAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Premium</p>
                        <p className="font-semibold">{formatCurrency(policy.premium)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Premium Due</p>
                          <p className="text-xs text-blue-600">{policy.nextDue}</p>
                        </div>
                      </div>
                      <Button size="sm" className="rounded-lg bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/pay-premium')}>
                        Pay Now
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/policy-details')}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => navigate('/download-policy')}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </BankingCard>
              ))
            ) : (
              <BankingCard className="rounded-2xl">
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Active Policies</h3>
                  <p className="text-sm text-muted-foreground mb-4">You don't have any insurance policies yet</p>
                  <Button onClick={() => setActiveTab('explore')}>
                    Explore Insurance Options
                  </Button>
                </div>
              </BankingCard>
            )}

            {/* Quick Actions for Policy Holders */}
            {myPolicies.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/file-claim')}>
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">File Claim</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => navigate('/policy-support')}>
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">Support</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </BankingLayout>
  );
};

export default InsuranceFlow;
