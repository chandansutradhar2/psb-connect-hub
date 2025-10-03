
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  Download,
  FileText,
  Calendar,
  Phone,
  Home,
  Share,
  Clock
} from 'lucide-react';

const InsurancePolicySuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, insuranceType, kycData, coverageData, policyNumber } = location.state || {};
  
  const [isInstant] = useState(insuranceType === 'motor' || insuranceType === 'travel');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const policyStartDate = new Date().toLocaleDateString('en-IN');
  const policyEndDate = new Date(Date.now() + (coverageData?.term || 1) * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4 py-8">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              {isInstant ? 'Policy Activated!' : 'Application Submitted!'}
            </h1>
            <p className="text-muted-foreground">
              {isInstant 
                ? 'Your insurance policy is now active and ready for use'
                : 'Your application is under review and will be processed soon'
              }
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-800">{plan?.name}</h3>
                <p className="text-sm text-blue-600">{plan?.insurer}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {isInstant ? 'Active' : 'Under Review'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Policy Number</p>
                <p className="font-bold text-blue-700">{policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coverage</p>
                <p className="font-bold text-blue-700">{formatCurrency(coverageData?.sumAssured || 500000)}</p>
              </div>
            </div>

            {isInstant && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{policyStartDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{policyEndDate}</p>
                </div>
              </div>
            )}
          </div>
        </BankingCard>

        {/* Next Steps */}
        {isInstant ? (
          <BankingCard title="Your Policy is Ready" className="rounded-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col gap-2 rounded-2xl">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Download Policy</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 rounded-2xl">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">View Details</span>
                </Button>
              </div>
              
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Policy Active</h4>
                    <p className="text-sm text-blue-700">
                      Your coverage is effective immediately. Keep your policy document safe for future reference.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BankingCard>
        ) : (
          <BankingCard title="Next Steps" className="rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Under Review</h4>
                  <p className="text-sm text-amber-700">
                    Our underwriting team will review your application. You may be contacted for medical tests if required.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Application Process:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Application Submitted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 border-2 border-amber-500 rounded-full" />
                    <span className="text-sm">Document Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    <span className="text-sm text-muted-foreground">Medical Underwriting (if required)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    <span className="text-sm text-muted-foreground">Policy Issuance</span>
                  </div>
                </div>
              </div>
            </div>
          </BankingCard>
        )}

        {/* Important Information */}
        <BankingCard title="Important Information" className="rounded-2xl">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-psb-primary mt-2" />
              <span className="text-sm">Keep your policy number safe for future reference</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-psb-primary mt-2" />
              <span className="text-sm">Premium payments can be made through your PSB account</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-psb-primary mt-2" />
              <span className="text-sm">Claims can be initiated through the mobile app</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-psb-primary mt-2" />
              <span className="text-sm">Contact customer support for any queries</span>
            </div>
          </div>
        </BankingCard>

        {/* Support */}
        <BankingCard title="Need Help?" className="rounded-2xl">
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 rounded-xl">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl">
              <Share className="h-4 w-4 mr-2" />
              Share Policy
            </Button>
          </div>
        </BankingCard>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/insurance-dashboard')}
            className="h-14 rounded-2xl"
          >
            View All Policies
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="h-14 rounded-2xl bg-psb-primary hover:bg-psb-primary/90"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsurancePolicySuccess;
