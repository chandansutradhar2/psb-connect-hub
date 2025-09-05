import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, TrendingUp, Landmark, PiggyBank, FileText, Shield, Users, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DiscoverServicesWidget = () => {
  const navigate = useNavigate();

  const discoverServices = [
    {
      category: 'Investments',
      items: [
        {
          title: 'Tax Saver FD',
          description: 'Lock-in period of 5 years, Tax benefits under 80C',
          rate: '7.25% p.a.',
          icon: <PiggyBank className="h-4 w-4" />,
          color: 'from-green-500 to-green-600',
          badge: 'Tax Saver',
          path: '/deposit-management'
        },
        {
          title: 'Mutual Funds SIP',
          description: 'Start investing with as low as ₹500',
          rate: 'Returns up to 15%',
          icon: <TrendingUp className="h-4 w-4" />,
          color: 'from-blue-500 to-blue-600',
          badge: 'Popular',
          path: '/investments'
        }
      ]
    },
    {
      category: 'Government Schemes',
      items: [
        {
          title: 'Pradhan Mantri Jeevan Jyoti',
          description: 'Life insurance cover of ₹2 lakh',
          rate: '₹436/year',
          icon: <Shield className="h-4 w-4" />,
          color: 'from-orange-500 to-orange-600',
          badge: 'Govt Scheme',
          path: '/insurance-services'
        },
        {
          title: 'Atal Pension Yojana',
          description: 'Guaranteed pension between ₹1,000 to ₹5,000',
          rate: 'Min ₹42/month',
          icon: <Users className="h-4 w-4" />,
          color: 'from-purple-500 to-purple-600',
          badge: 'Pension',
          path: '/insurance-services'
        },
        {
          title: 'Public Provident Fund',
          description: '15-year lock-in with tax benefits',
          rate: '7.1% p.a.',
          icon: <Landmark className="h-4 w-4" />,
          color: 'from-indigo-500 to-indigo-600',
          badge: 'Tax Free',
          path: '/investments'
        }
      ]
    },
    {
      category: 'Tax Tools',
      items: [
        {
          title: 'Tax Calculator',
          description: 'Calculate your income tax instantly',
          rate: 'Free Tool',
          icon: <FileText className="h-4 w-4" />,
          color: 'from-red-500 to-red-600',
          badge: 'Free',
          path: '/tax-tools'
        }
      ]
    }
  ];

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Popular':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Tax Saver':
      case 'Tax Free':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Govt Scheme':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pension':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Free':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <Compass className="h-4 w-4 text-primary mr-2" />
            Discover Services
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/investments')}
          >
            Explore
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {discoverServices.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {category.category}
            </h4>
            
            <div className="space-y-2">
              {category.items.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  onClick={() => navigate(service.path)}
                  className="cursor-pointer group"
                >
                  <div className={`bg-gradient-to-r ${service.color} text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-white/20 rounded-lg">
                          {service.icon}
                        </div>
                        <Badge className={`text-xs bg-white/20 text-white border-0`}>
                          {service.badge}
                        </Badge>
                      </div>
                      {service.badge === 'Popular' && (
                        <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm leading-tight">{service.title}</h4>
                      <p className="text-xs text-white/90 leading-relaxed">{service.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-medium text-white/80">{service.rate}</span>
                        <ChevronRight className="h-3 w-3 text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Featured Offer */}
        <div className="border-t border-border pt-4">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 rounded-xl shadow-md">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-yellow-300 fill-current" />
              <Badge className="bg-white/20 text-white border-0 text-xs">
                Limited Time
              </Badge>
            </div>
            <h4 className="font-bold text-sm mb-1">Financial Planning Session</h4>
            <p className="text-xs text-white/90 mb-3">
              Get personalized financial advice from our certified planners. Book your free 30-minute session.
            </p>
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-full h-8 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => navigate('/support')}
            >
              Book Free Session
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};