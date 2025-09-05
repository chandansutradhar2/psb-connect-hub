import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNavigation } from '@/components/BottomNavigation';
import { 
  ArrowLeft, 
  Shield,
  Heart,
  Car,
  Home,
  Plane,
  User,
  Plus,
  FileText,
  Calendar,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

const InsuranceDashboard = () => {
  const navigate = useNavigate();

  const activePolicies = [
    {
      id: 1,
      type: 'Health Insurance',
      policyNumber: 'HI123456789',
      coverage: '₹5,00,000',
      premium: '₹12,000/year',
      expiryDate: '15 Dec 2024',
      status: 'Active',
      insurer: 'ICICI Lombard'
    },
    {
      id: 2,
      type: 'Term Life Insurance',
      policyNumber: 'LI987654321',
      coverage: '₹25,00,000',
      premium: '₹8,000/year',
      expiryDate: '20 Mar 2025',
      status: 'Active',
      insurer: 'HDFC Life'
    }
  ];

  const insuranceTypes = [
    {
      id: 'life',
      title: 'Life Insurance',
      subtitle: 'Term & Endowment Plans',
      description: 'Secure your family\'s financial future',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-red-500',
      features: ['Tax benefits under 80C', 'High coverage up to ₹2 Cr', 'Online purchase']
    },
    {
      id: 'health',
      title: 'Health Insurance',
      subtitle: 'Medical Coverage',
      description: 'Cashless treatment at 10,000+ hospitals',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-green-500',
      features: ['Cashless claims', 'Family floater', 'Pre-existing conditions covered']
    },
    {
      id: 'motor',
      title: 'Motor Insurance',
      subtitle: 'Car & Bike Insurance',
      description: 'Comprehensive vehicle protection',
      icon: <Car className="h-5 w-5" />,
      color: 'bg-blue-500',
      features: ['Zero depreciation', 'Roadside assistance', 'Quick claim settlement']
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      subtitle: 'Trip Protection',
      description: 'Coverage for domestic & international travel',
      icon: <Plane className="h-5 w-5" />,
      color: 'bg-purple-500',
      features: ['Medical emergency', 'Trip cancellation', 'Baggage protection']
    },
    {
      id: 'home',
      title: 'Home Insurance',
      subtitle: 'Property Protection',
      description: 'Protect your home & belongings',
      icon: <Home className="h-5 w-5" />,
      color: 'bg-orange-500',
      features: ['Fire & theft', 'Natural disasters', 'Personal liability']
    },
    {
      id: 'personal-accident',
      title: 'Personal Accident',
      subtitle: 'Accident Cover',
      description: 'Protection against accidental injuries',
      icon: <User className="h-5 w-5" />,
      color: 'bg-indigo-500',
      features: ['24x7 coverage', 'Instant claims', 'Affordable premiums']
    }
  ];

  return (
    <div className="pb-24"> {/* Increased padding for better mobile bottom nav spacing */}
      <div className="space-y-5">
        {/* Header */}
        <header className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200" // Added active state
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Insurance</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200" // Added active state
            >
              <Home className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </header>

        {/* Insurance Partner Card */}
        <div className='px-4'>
          <BankingCard className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              {/* <Shield className="h-4 w-4 text-blue-600 mr-4-" /> */}
              <div>
                <h3 className="font-semibold text-blue-800 text-sm">Powered by ICICI Lombard & HDFC Life</h3>
                <p className="text-xs text-blue-600">IRDAI Reg. No. 115 & 101 | Insurance is the subject matter of solicitation</p>
              </div>
            </div>
          </BankingCard>
        </div>

        {/* Quick Actions */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 hover:border-psb-primary hover:bg-psb-primary/5 active:bg-psb-primary/10 shadow-sm active:scale-95 transition-all duration-200"
              onClick={() => navigate('/select-insurance-type')}
            >
              <Plus className="h-6 w-6 text-psb-primary" />
              <span className="text-xs font-semibold text-gray-800">Buy New Policy</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 active:bg-orange-100 shadow-sm active:scale-95 transition-all duration-200"
              onClick={() => navigate('/initiate-claim')}
            >
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span className="text-xs font-semibold text-gray-800">Make a Claim</span>
            </Button>
          </div>
        </div>

        {/* Active Policies */}
        {activePolicies.length > 0 && (
          <div className='px-4'>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg font-semibold text-gray-800">Active Policies</h1>
              <button 
                onClick={() => navigate('/all-policies')}
                className="text-xs text-primary font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {activePolicies.map((policy) => (
                <div key={policy.id} className="p-3 rounded-lg border border-border active:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{policy.type}</h3>
                      <p className="text-xs text-muted-foreground">{policy.insurer}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full text-xs py-0.5">
                      {policy.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Coverage</p>
                      <p className="font-semibold text-sm">{policy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Premium</p>
                      <p className="font-semibold text-sm">{policy.premium}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-orange-600" />
                      <div>
                        <p className="text-xs font-medium text-orange-800">Expires on {policy.expiryDate}</p>
                        <p className="text-[10px] text-orange-600">Policy: {policy.policyNumber}</p>
                      </div>
                    </div>
                    <Button 
                      size="xs" 
                      className="rounded-md bg-orange-600 hover:bg-orange-700 text-xs h-7 px-2"
                      onClick={() => navigate('/renew-policy', { state: { policyId: policy.id } })}
                    >
                      Renew
                    </Button>
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 rounded-lg text-xs h-8"
                      onClick={() => navigate('/policy-details', { state: { policyId: policy.id } })}
                    >
                      Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 rounded-lg text-xs h-8"
                      onClick={() => navigate('/initiate-claim', { state: { policyId: policy.id } })}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore New Plans */}
        <div className="px-4">
          <h1 className="text-lg font-semibold text-gray-800 mb-3">Explore New Plans</h1>
          <div className="grid grid-cols-1 gap-3">
            {insuranceTypes.map((insurance) => (
              <button
                key={insurance.id}
                onClick={() => navigate('/select-insurance-type', { state: { selectedType: insurance.id } })}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 active:bg-gray-50 transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg text-white ${insurance.color}`}>
                    {insurance.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{insurance.title}</h3>
                    <p className="text-xs text-muted-foreground">{insurance.subtitle}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {insurance.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Why Choose PSB Insurance */}
        <div className="px-4 pb-4">
          <h1 className="text-lg font-semibold text-gray-800 mb-3">Why Choose Us?</h1>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield className="h-4 w-4" />, title: 'Trusted Partners', subtitle: 'IRDAI registered' },
              { icon: <FileText className="h-4 w-4" />, title: '99.2% Claims', subtitle: 'Quick processing' },
              { icon: <Heart className="h-4 w-4" />, title: 'Wide Coverage', subtitle: 'Multiple products' },
              { icon: <User className="h-4 w-4" />, title: '24/7 Support', subtitle: 'Always available' },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-2 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center text-center"
              >
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary mb-1">
                  {feature.icon}
                </div>
                <p className="font-semibold text-xs">{feature.title}</p>
                <p className="text-[10px] text-muted-foreground">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
};

export default InsuranceDashboard;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { BottomNavigation } from '@/components/BottomNavigation';
// import { 
//   ArrowLeft, 
//   Shield,
//   Heart,
//   Car,
//   Home,
//   Plane,
//   User,
//   Plus,
//   FileText,
//   Calendar,
//   ArrowRight,
//   AlertTriangle
// } from 'lucide-react';

// const InsuranceDashboard = () => {
//   const navigate = useNavigate();

//   const activePolicies = [
//     {
//       id: 1,
//       type: 'Health Insurance',
//       policyNumber: 'HI123456789',
//       coverage: '₹5,00,000',
//       premium: '₹12,000/year',
//       expiryDate: '2024-12-15',
//       status: 'Active',
//       insurer: 'ICICI Lombard'
//     },
//     {
//       id: 2,
//       type: 'Term Life Insurance',
//       policyNumber: 'LI987654321',
//       coverage: '₹25,00,000',
//       premium: '₹8,000/year',
//       expiryDate: '2025-03-20',
//       status: 'Active',
//       insurer: 'HDFC Life'
//     }
//   ];

//   const insuranceTypes = [
//     {
//       id: 'life',
//       title: 'Life Insurance',
//       subtitle: 'Term & Endowment Plans',
//       description: 'Secure your family\'s financial future',
//       icon: <Heart className="h-6 w-6" />,
//       color: 'bg-red-500',
//       features: ['Tax benefits under 80C', 'High coverage up to ₹2 Cr', 'Online purchase']
//     },
//     {
//       id: 'health',
//       title: 'Health Insurance',
//       subtitle: 'Medical Coverage',
//       description: 'Cashless treatment at 10,000+ hospitals',
//       icon: <Shield className="h-6 w-6" />,
//       color: 'bg-green-500',
//       features: ['Cashless claims', 'Family floater', 'Pre-existing conditions covered']
//     },
//     {
//       id: 'motor',
//       title: 'Motor Insurance',
//       subtitle: 'Car & Bike Insurance',
//       description: 'Comprehensive vehicle protection',
//       icon: <Car className="h-6 w-6" />,
//       color: 'bg-blue-500',
//       features: ['Zero depreciation', 'Roadside assistance', 'Quick claim settlement']
//     },
//     {
//       id: 'travel',
//       title: 'Travel Insurance',
//       subtitle: 'Trip Protection',
//       description: 'Coverage for domestic & international travel',
//       icon: <Plane className="h-6 w-6" />,
//       color: 'bg-purple-500',
//       features: ['Medical emergency', 'Trip cancellation', 'Baggage protection']
//     },
//     {
//       id: 'home',
//       title: 'Home Insurance',
//       subtitle: 'Property Protection',
//       description: 'Protect your home & belongings',
//       icon: <Home className="h-6 w-6" />,
//       color: 'bg-orange-500',
//       features: ['Fire & theft', 'Natural disasters', 'Personal liability']
//     },
//     {
//       id: 'personal-accident',
//       title: 'Personal Accident',
//       subtitle: 'Accident Cover',
//       description: 'Protection against accidental injuries',
//       icon: <User className="h-6 w-6" />,
//       color: 'bg-indigo-500',
//       features: ['24x7 coverage', 'Instant claims', 'Affordable premiums']
//     }
//   ];

//   return (
//     <div className="pb-20">
//       <div className="space-y-6">
//         <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => navigate(-1)}
//                 className="rounded-full p-2 hover:bg-gray-100"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-700" />
//               </Button>
//               <h1 className="text-lg font-semibold text-gray-800">Insurance</h1>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/dashboard')}
//               className="rounded-full p-2 hover:bg-gray-100"
//             >
//               <Home className="h-5 w-5 text-gray-700" />
//             </Button>
//           </div>
//         </header>

//         <div className='px-4'>
//           <BankingCard className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold text-blue-800">Powered by ICICI Lombard & HDFC Life</h3>
//                 <p className="text-sm text-blue-600">IRDAI Reg. No. 115 & 101 | Insurance is the subject matter of solicitation</p>
//               </div>
//               <Shield className="h-8 w-8 text-blue-600" />
//             </div>
//           </BankingCard>
//         </div>

//         <div className="px-4">

//           <div className="grid grid-cols-2 gap-4">
//   <Button
//     variant="outline"
//     className="h-24 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 hover:border-psb-primary hover:bg-psb-primary/5 shadow-sm hover:shadow-md transition-all duration-300"
//     onClick={() => navigate('/select-insurance-type')}
//   >
//     <Plus className="h-7 w-7 text-psb-primary" />
//     <span className="text-sm font-semibold text-gray-800">Buy New Policy</span>
//   </Button>

//   <Button
//     variant="outline"
//     className="h-24 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 shadow-sm hover:shadow-md transition-all duration-300"
//     onClick={() => navigate('/initiate-claim')}
//   >
//     <AlertTriangle className="h-7 w-7 text-orange-500" />
//     <span className="text-sm font-semibold text-gray-800">Make a Claim</span>
//   </Button>
// </div>

//         </div>

//         {/* Active Policies */}
//         {activePolicies.length > 0 && (
//           <div className='px-4'>
//             <h1 className="text-lg font-semibold text-gray-800 mb-4">Active Policies</h1>
//             <div className="space-y-4">
//               {activePolicies.map((policy) => (
//                 <div key={policy.id} className="p-4 rounded-xl border border-border">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h3 className="font-semibold">{policy.type}</h3>
//                       <p className="text-sm text-muted-foreground">{policy.insurer}</p>
//                     </div>
//                     <Badge variant="secondary" className="rounded-full">
//                       {policy.status}
//                     </Badge>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-3">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Coverage</p>
//                       <p className="font-semibold">{policy.coverage}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Premium</p>
//                       <p className="font-semibold">{policy.premium}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200">
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="h-4 w-4 text-orange-600" />
//                       <div>
//                         <p className="text-sm font-medium text-orange-800">Expires on {policy.expiryDate}</p>
//                         <p className="text-xs text-orange-600">Policy: {policy.policyNumber}</p>
//                       </div>
//                     </div>
//                     <Button 
//                       size="sm" 
//                       className="rounded-lg bg-orange-600 hover:bg-orange-700"
//                       onClick={() => navigate('/renew-policy', { state: { policyId: policy.id } })}
//                     >
//                       Renew
//                     </Button>
//                   </div>

//                   <div className="flex space-x-2 mt-3">
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       className="flex-1 rounded-xl"
//                       onClick={() => navigate('/policy-details', { state: { policyId: policy.id } })}
//                     >
//                       View Details
//                     </Button>
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       className="flex-1 rounded-xl"
//                       onClick={() => navigate('/initiate-claim', { state: { policyId: policy.id } })}
//                     >
//                       Claim
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Explore New Plans */}
//         <div className="px-4">
//           <h1 className="text-lg font-semibold text-gray-800 mb-4">Explore New Plans</h1>
//           <div className="space-y-4">
//             {insuranceTypes.map((insurance) => (
//               <button
//                 key={insurance.id}
//                 onClick={() => navigate('/select-insurance-type', { state: { selectedType: insurance.id } })}
//                 className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-md text-left"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className={`p-3 rounded-xl text-white ${insurance.color}`}>
//                     {insurance.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold">{insurance.title}</h3>
//                     <p className="text-sm text-muted-foreground">{insurance.subtitle}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{insurance.description}</p>
//                     <div className="flex flex-wrap gap-1 mt-2">
//                       {insurance.features.slice(0, 2).map((feature, index) => (
//                         <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <ArrowRight className="h-5 w-5 text-muted-foreground" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Why Choose PSB Insurance */}
//         <div className="px-4">
//           <h1 className="text-lg font-semibold text-gray-800 mb-4">Why Choose PSB Insurance?</h1>
//           <div className="space-y-4 rounded-2xl p-4 bg-gray-50 border border-gray-200">
//             {[
//               { icon: <Shield />, title: 'Trusted Partners', subtitle: 'IRDAI registered insurers' },
//               { icon: <FileText />, title: '99.2% Claim Settlement', subtitle: 'Quick & hassle-free claims' },
//               { icon: <Heart />, title: 'Comprehensive Coverage', subtitle: 'Wide range of insurance products' },
//               { icon: <User />, title: '24/7 Support', subtitle: 'Dedicated customer service' },
//             ].map((feature, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <div className="p-2 rounded-xl bg-primary/10 text-primary">
//                   {feature.icon}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">{feature.title}</p>
//                   <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InsuranceDashboard;


