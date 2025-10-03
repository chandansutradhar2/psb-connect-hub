
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Landmark, 
  Shield, 
  Calculator,
  Star,
  Clock,
  Target,
  Info
} from 'lucide-react';

interface InvestmentProduct {
  id: string;
  name: string;
  type: 'mutual_fund' | 'fd' | 'rd' | 'bond' | 'nps' | 'sgb';
  category?: string;
  returns: {
    '1y'?: number;
    '3y'?: number;
    '5y'?: number;
    current?: number;
  };
  riskLevel: 'Low' | 'Moderate' | 'High';
  minInvestment: number;
  lockIn?: string;
  taxBenefit?: boolean;
  rating?: number;
  nav?: number;
  maturityPeriod?: string;
  interestRate?: number;
  features: string[];
}

interface InvestmentProductCardProps {
  product: InvestmentProduct;
  onInvest: (product: InvestmentProduct) => void;
}

const InvestmentProductCard = ({ product, onInvest }: InvestmentProductCardProps) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mutual_fund': return <PieChart className="h-4 w-4" />;
      case 'fd': return <Landmark className="h-4 w-4" />;
      case 'rd': return <Calculator className="h-4 w-4" />;
      case 'bond': return <Shield className="h-4 w-4" />;
      case 'nps': return <Target className="h-4 w-4" />;
      case 'sgb': return <TrendingUp className="h-4 w-4" />;
      default: return <PieChart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mutual_fund': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'fd': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'rd': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'bond': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'nps': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'sgb': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-50 text-red-600 border-red-200';
      case 'Moderate': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Low': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const formatReturn = (returnValue: number) => {
    return returnValue > 0 ? `+${returnValue.toFixed(1)}%` : `${returnValue.toFixed(1)}%`;
  };

  const getReturnColor = (returnValue: number) => {
    return returnValue >= 0 ? 'text-blue-600' : 'text-red-600';
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 rounded-xl border border-border">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1 rounded ${getTypeColor(product.type)}`}>
                  {getTypeIcon(product.type)}
                </div>
                <Badge variant="outline" className={getTypeColor(product.type)}>
                  {product.type.replace('_', ' ').toUpperCase()}
                </Badge>
                {product.taxBenefit && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    Tax Benefit
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
              {product.category && (
                <p className="text-xs text-muted-foreground">{product.category}</p>
              )}
            </div>
            
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Returns/Interest Rate */}
          <div className="space-y-2">
            {product.interestRate ? (
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-lg font-bold text-primary">
                  {product.interestRate}% p.a.
                </div>
                <div className="text-xs text-muted-foreground">Interest Rate</div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 text-center">
                {product.returns['1y'] && (
                  <div>
                    <div className={`text-sm font-semibold ${getReturnColor(product.returns['1y'])}`}>
                      {formatReturn(product.returns['1y'])}
                    </div>
                    <div className="text-xs text-muted-foreground">1Y</div>
                  </div>
                )}
                {product.returns['3y'] && (
                  <div>
                    <div className={`text-sm font-semibold ${getReturnColor(product.returns['3y'])}`}>
                      {formatReturn(product.returns['3y'])}
                    </div>
                    <div className="text-xs text-muted-foreground">3Y</div>
                  </div>
                )}
                {product.returns['5y'] && (
                  <div>
                    <div className={`text-sm font-semibold ${getReturnColor(product.returns['5y'])}`}>
                      {formatReturn(product.returns['5y'])}
                    </div>
                    <div className="text-xs text-muted-foreground">5Y</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Min Investment</span>
              <div className="font-medium">₹{product.minInvestment.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Risk Level</span>
              <div>
                <Badge variant="outline" className={`text-xs ${getRiskColor(product.riskLevel)}`}>
                  {product.riskLevel}
                </Badge>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {(product.lockIn || product.maturityPeriod) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{product.lockIn || product.maturityPeriod}</span>
            </div>
          )}

          {/* Features */}
          {showDetails && product.features.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium">Key Features:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 text-xs h-8"
            >
              <Info className="h-3 w-3 mr-1" />
              {showDetails ? 'Less' : 'More'} Info
            </Button>
            <Button
              onClick={() => onInvest(product)}
              size="sm"
              className="flex-1 text-xs h-8"
            >
              Invest Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentProductCard;
