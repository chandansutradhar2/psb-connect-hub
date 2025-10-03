import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  Users,
  Phone,
  Download,
  HeartPulse,
  Car,
  Home,
  Plane,
  User,
  ChevronRight,
  MessageSquare,
  Star
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const InsurancePlanDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, insuranceType } = location.state || {};
  
  // Fallback if no plan data
  if (!plan) {
    return (
      <BankingLayout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="max-w-md text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">Plan Details Not Found</h2>
            <p className="text-gray-600">
              We couldn't find the plan details you're looking for. Please select a plan from our available options.
            </p>
            <Button 
              onClick={() => navigate('/insurance-plans')}
              className="mt-4"
            >
              Browse Insurance Plans
            </Button>
          </div>
        </div>
      </BankingLayout>
    );
  }

  // Get appropriate icon based on insurance type
  const getInsuranceIcon = () => {
    switch(insuranceType) {
      case 'health': return <HeartPulse className="h-6 w-6" />;
      case 'life': return <Shield className="h-6 w-6" />;
      case 'motor': return <Car className="h-6 w-6" />;
      case 'home': return <Home className="h-6 w-6" />;
      case 'travel': return <Plane className="h-6 w-6" />;
      case 'personal-accident': return <User className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBuyNow = () => {
    navigate('/insurance-kyc', { state: { plan, insuranceType } });
  };

  const handleDownloadBrochure = () => {
    // In a real app, this would download the PDF brochure
    console.log('Downloading brochure for', plan.name);
  };

  const handleContactExpert = () => {
    // In a real app, this would initiate a call or chat
    console.log('Contacting insurance expert');
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
            <h1 className="text-xl font-semibold text-gray-900">Plan Details</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full ml-auto"
              onClick={handleDownloadBrochure}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Plan Header */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-primary h-2"></div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {getInsuranceIcon()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{plan.insurer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{plan.insurerRating}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-medium text-blue-600">
                          {plan.claimRatio}% Claim Settlement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(plan.coverage)}</p>
                  <p className="text-xs text-gray-500">Coverage Amount</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Details */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Premium Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-blue-600">{formatCurrency(plan.premium)}</p>
                <p className="text-xs text-gray-500">Annual Premium</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-blue-600">{formatCurrency(plan.premiumMonthly)}</p>
                <p className="text-xs text-gray-500">Monthly Premium</p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Key Benefits</h3>
            <div className="space-y-3">
              {plan.keyBenefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Plan Features</h3>
            <div className="space-y-3">
              {plan.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl shadow-sm p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">Important Exclusions</h3>
                <p className="text-sm text-orange-700">{plan.exclusions}</p>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Documents Required</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Aadhaar Card', 'PAN Card', 'Address Proof', 'Income Proof'].map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* IRDAI Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">Regulated by IRDAI</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Insurance is the subject matter of solicitation. IRDAI Registration No. 115.
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* Support */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Need Assistance?</h3>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleContactExpert}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Expert
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed Buy Now Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button 
            onClick={handleBuyNow}
            className="w-full h-12"
            size="lg"
          >
            Buy Now - {formatCurrency(plan.premium)}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsurancePlanDetails;


// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   ArrowLeft, 
//   Shield,
//   CheckCircle,
//   AlertTriangle,
//   FileText,
//   TrendingUp,
//   Users,
//   Phone,
//   Download
// } from 'lucide-react';

// const InsurancePlanDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { plan, insuranceType } = location.state || {};
  
//   if (!plan) {
//     return (
//       <BankingLayout>
//         <div className="text-center py-8">
//           <p>Plan details not found</p>
//           <Button onClick={() => navigate('/insurance-plans')}>Go Back</Button>
//         </div>
//       </BankingLayout>
//     );
//   }

//   const handleBuyNow = () => {
//     navigate('/insurance-kyc', { state: { plan, insuranceType } });
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => navigate('/insurance-plans', { state: { insuranceType } })}
//             className="rounded-full p-2"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-lg font-semibold">Plan Details</h1>
//           <Button variant="ghost" size="sm" className="rounded-full p-2">
//             <Download className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Plan Header */}
//         <BankingCard className="rounded-2xl bg-gradient-to-r from-psb-primary/10 to-psb-secondary/10 border-psb-primary/20">
//           <div className="space-y-4">
//             <div className="flex items-start justify-between">
//               <div className="flex items-start space-x-4">
//                 <div className="p-3 rounded-xl bg-psb-primary/20">
//                   <Shield className="h-8 w-8 text-psb-primary" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-psb-primary">{plan.name}</h2>
//                   <p className="text-sm text-muted-foreground">{plan.insurer}</p>
//                   <div className="flex items-center space-x-2 mt-1">
//                     <TrendingUp className="h-4 w-4 text-blue-600" />
//                     <span className="text-sm font-medium text-blue-600">Claim Ratio: {plan.claimRatio}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-2xl font-bold text-psb-primary">{plan.coverage}</p>
//                 <p className="text-sm text-muted-foreground">Sum Assured</p>
//               </div>
//             </div>
//           </div>
//         </BankingCard>

//         {/* Premium Details */}
//         <BankingCard title="Premium & Coverage" className="rounded-2xl">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center p-4 rounded-xl bg-blue-50">
//               <p className="text-xl font-bold text-blue-600">{plan.premium}</p>
//               <p className="text-sm text-muted-foreground">Annual Premium</p>
//             </div>
//             <div className="text-center p-4 rounded-xl bg-blue-50">
//               <p className="text-xl font-bold text-blue-600">{plan.premiumMonthly}</p>
//               <p className="text-sm text-muted-foreground">Monthly Premium</p>
//             </div>
//           </div>
//         </BankingCard>

//         {/* Key Benefits */}
//         <BankingCard title="Key Benefits" className="rounded-2xl">
//           <div className="space-y-3">
//             {plan.keyBenefits.map((benefit: string, index: number) => (
//               <div key={index} className="flex items-start space-x-3">
//                 <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
//                 <span className="text-sm">{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </BankingCard>

//         {/* Features */}
//         <BankingCard title="Plan Features" className="rounded-2xl">
//           <div className="space-y-3">
//             {plan.features.map((feature: string, index: number) => (
//               <div key={index} className="flex items-start space-x-3">
//                 <div className="w-2 h-2 rounded-full bg-psb-primary mt-2" />
//                 <span className="text-sm text-muted-foreground">{feature}</span>
//               </div>
//             ))}
//           </div>
//         </BankingCard>

//         {/* Exclusions */}
//         <BankingCard title="Important Exclusions" className="rounded-2xl border-orange-200 bg-orange-50/50">
//           <div className="flex items-start space-x-3">
//             <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
//             <div>
//               <p className="text-sm text-orange-800 font-medium mb-1">Please Note:</p>
//               <p className="text-sm text-orange-700">{plan.exclusions}</p>
//             </div>
//           </div>
//         </BankingCard>

//         {/* Documents Required */}
//         <BankingCard title="Documents Required" className="rounded-2xl">
//           <div className="grid grid-cols-2 gap-3">
//             {['Aadhaar Card', 'PAN Card', 'Address Proof', 'Income Proof'].map((doc, index) => (
//               <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
//                 <FileText className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{doc}</span>
//               </div>
//             ))}
//           </div>
//         </BankingCard>

//         {/* IRDAI Info */}
//         <BankingCard className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-blue-800">Powered by {plan.insurer}</h3>
//               <p className="text-sm text-blue-600">IRDAI Reg. No. 115 | Insurance is the subject matter of solicitation</p>
//             </div>
//             <Shield className="h-8 w-8 text-blue-600" />
//           </div>
//         </BankingCard>

//         {/* Support */}
//         <BankingCard title="Need Help?" className="rounded-2xl">
//           <div className="flex space-x-3">
//             <Button variant="outline" className="flex-1 rounded-xl">
//               <Phone className="h-4 w-4 mr-2" />
//               Call Expert
//             </Button>
//             <Button variant="outline" className="flex-1 rounded-xl">
//               <Users className="h-4 w-4 mr-2" />
//               Live Chat
//             </Button>
//           </div>
//         </BankingCard>

//         {/* Buy Now Button */}
//         <div className="sticky bottom-4">
//           <Button 
//             onClick={handleBuyNow}
//             className="w-full rounded-2xl h-14 text-lg bg-psb-primary hover:bg-psb-primary/90"
//           >
//             Buy Now - {plan.premium}
//           </Button>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default InsurancePlanDetails;
