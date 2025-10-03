// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   ArrowLeft, 
//   Shield,
//   Heart,
//   Car,
//   Home,
//   Plane,
//   User,
//   ArrowRight,
//   Info,
//   Check
// } from 'lucide-react';

// const SelectInsuranceType = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedType, setSelectedType] = useState<string | null>(
//     location.state?.selectedType || null
//   );

//   const insuranceTypes = [
//     {
//       id: 'life',
//       title: 'Life Insurance',
//       subtitle: 'Term & Endowment Plans',
//       description: 'Secure your family\'s financial future with comprehensive coverage',
//       icon: <Heart className="h-6 w-6" />,
//       color: 'bg-red-100 text-red-600',
//       features: [
//         'Tax benefits under Section 80C',
//         'Coverage up to ₹2 Crore',
//         'Term & endowment options'
//       ],
//       startingPremium: '₹500/month',
//       maxCoverage: '₹2 Crore'
//     },
//     {
//       id: 'health',
//       title: 'Health Insurance',
//       subtitle: 'Medical Coverage Plans',
//       description: 'Comprehensive health coverage with cashless treatment',
//       icon: <Shield className="h-6 w-6" />,
//       color: 'bg-blue-100 text-blue-600',
//       features: [
//         '10,000+ network hospitals',
//         'Family floater options',
//         'Pre-existing conditions covered'
//       ],
//       startingPremium: '₹8,000/year',
//       maxCoverage: '₹25 Lakh'
//     },
//     {
//       id: 'motor',
//       title: 'Motor Insurance',
//       subtitle: 'Car & Two-Wheeler',
//       description: 'Complete protection for your vehicles',
//       icon: <Car className="h-6 w-6" />,
//       color: 'bg-blue-100 text-blue-600',
//       features: [
//         'Zero depreciation cover',
//         '24x7 roadside assistance',
//         'Quick claim settlement'
//       ],
//       startingPremium: '₹2,500/year',
//       maxCoverage: 'Based on IDV'
//     },
//     {
//       id: 'travel',
//       title: 'Travel Insurance',
//       subtitle: 'Domestic & International',
//       description: 'Protection for your trips',
//       icon: <Plane className="h-6 w-6" />,
//       color: 'bg-purple-100 text-purple-600',
//       features: [
//         'Medical emergency coverage',
//         'Trip cancellation',
//         'Baggage loss protection'
//       ],
//       startingPremium: '₹100/trip',
//       maxCoverage: '₹50 Lakh'
//     },
//     {
//       id: 'home',
//       title: 'Home Insurance',
//       subtitle: 'Property Protection',
//       description: 'Safeguard your home and belongings',
//       icon: <Home className="h-6 w-6" />,
//       color: 'bg-orange-100 text-orange-600',
//       features: [
//         'Fire & theft protection',
//         'Natural disaster coverage',
//         'Personal liability cover'
//       ],
//       startingPremium: '₹3,000/year',
//       maxCoverage: '₹1 Crore'
//     },
//     {
//       id: 'personal-accident',
//       title: 'Personal Accident',
//       subtitle: 'Accident Coverage',
//       description: 'Protection against accidental injuries',
//       icon: <User className="h-6 w-6" />,
//       color: 'bg-indigo-100 text-indigo-600',
//       features: [
//         '24x7 accident coverage',
//         'Disability benefits',
//         'Medical expense cover'
//       ],
//       startingPremium: '₹200/year',
//       maxCoverage: '₹10 Lakh'
//     }
//   ];

//   const handleContinue = () => {
//     if (selectedType) {
//       navigate('/insurance-plans', { state: { insuranceType: selectedType } });
//     }
//   };

//   return (
//     <BankingLayout>
//       <div className="min-h-screen bg-gray-50 pb-24">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
//           <div className="flex items-center gap-4 p-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/insurance-dashboard')}
//               className="rounded-full"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-semibold text-gray-900">Select Insurance</h1>
//           </div>
//         </div>

//         <div className="p-4 space-y-6">
//           {/* IRDAI Disclaimer */}
//           <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//             <div className="flex items-start gap-3">
//               <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h3 className="font-medium text-amber-800 text-sm">Important Information</h3>
//                 <p className="text-xs text-amber-700 mt-1">
//                   Insurance is the subject matter of solicitation. Please read the policy terms and conditions carefully before purchasing.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Insurance Types */}
//           <div className="space-y-4">
//             {insuranceTypes.map((insurance) => (
//               <div 
//                 key={insurance.id}
//                 className={`bg-white border rounded-xl p-5 shadow-sm cursor-pointer transition-all ${
//                   selectedType === insurance.id 
//                     ? 'border-primary ring-2 ring-primary/20' 
//                     : 'border-gray-200 hover:border-primary/50'
//                 }`}
//                 onClick={() => setSelectedType(insurance.id)}
//               >
//                 <div className="space-y-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-4">
//                       <div className={`p-3 rounded-xl ${insurance.color}`}>
//                         {insurance.icon}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">{insurance.title}</h3>
//                         <p className="text-sm text-gray-500 mt-1">{insurance.subtitle}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium text-blue-600">{insurance.startingPremium}</p>
//                       <p className="text-xs text-gray-500">Starting from</p>
//                     </div>
//                   </div>

//                   <p className="text-sm text-gray-700">{insurance.description}</p>

//                   <div className="space-y-2">
//                     {insurance.features.map((feature, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-gray-600">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between pt-2">
//                     <div className="text-sm">
//                       <span className="text-gray-500">Max Coverage: </span>
//                       <span className="font-medium">{insurance.maxCoverage}</span>
//                     </div>
//                     {selectedType === insurance.id && (
//                       <Badge className="bg-primary text-primary-foreground">
//                         Selected
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Continue Button */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
//           <Button 
//             onClick={handleContinue}
//             disabled={!selectedType}
//             className="w-full h-12 rounded-xl text-base"
//             size="lg"
//           >
//             Continue
//             <ArrowRight className="h-5 w-5 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default SelectInsuranceType;




import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Shield,
  Heart,
  Car,
  Home,
  Plane,
  User,
  ArrowRight,
  Info,
  Check
} from 'lucide-react';

const SelectInsuranceType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string | null>(
    location.state?.selectedType || null
  );

  const insuranceTypes = [
    {
      id: 'life',
      title: 'Life Insurance',
      subtitle: 'Term & Endowment',
      description: 'Secure your family\'s financial future',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-red-100 text-red-600',
      features: [
        'Tax benefits under 80C',
        'Coverage up to ₹2 Cr',
        'Term & endowment options'
      ],
      startingPremium: '₹500/month',
      maxCoverage: '₹2 Cr'
    },
    {
      id: 'health',
      title: 'Health Insurance',
      subtitle: 'Medical Coverage',
      description: 'Cashless treatment at 10,000+ hospitals',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600',
      features: [
        'Network hospitals',
        'Family floater',
        'Pre-existing conditions'
      ],
      startingPremium: '₹8,000/year',
      maxCoverage: '₹25 L'
    },
    {
      id: 'motor',
      title: 'Motor Insurance',
      subtitle: 'Car & Bike',
      description: 'Complete vehicle protection',
      icon: <Car className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600',
      features: [
        'Zero depreciation',
        'Roadside assistance',
        'Quick claims'
      ],
      startingPremium: '₹2,500/year',
      maxCoverage: 'Based on IDV'
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      subtitle: 'Domestic & International',
      description: 'Protection for your trips',
      icon: <Plane className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600',
      features: [
        'Medical emergency',
        'Trip cancellation',
        'Baggage protection'
      ],
      startingPremium: '₹100/trip',
      maxCoverage: '₹50 L'
    },
    {
      id: 'home',
      title: 'Home Insurance',
      subtitle: 'Property Protection',
      description: 'Safeguard your home',
      icon: <Home className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-600',
      features: [
        'Fire & theft',
        'Natural disasters',
        'Liability cover'
      ],
      startingPremium: '₹3,000/year',
      maxCoverage: '₹1 Cr'
    },
    {
      id: 'personal-accident',
      title: 'Personal Accident',
      subtitle: 'Accident Cover',
      description: 'Protection against injuries',
      icon: <User className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-600',
      features: [
        '24x7 coverage',
        'Disability benefits',
        'Medical expenses'
      ],
      startingPremium: '₹200/year',
      maxCoverage: '₹10 L'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      navigate('/insurance-plans', { state: { insuranceType: selectedType } });
    }
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/insurance-dashboard')}
              className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Select Insurance</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* IRDAI Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800 text-xs">Important Information</h3>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Insurance is the subject matter of solicitation. Read policy terms carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Insurance Types */}
          <div className="space-y-3">
            {insuranceTypes.map((insurance) => (
              <div 
                key={insurance.id}
                className={`bg-white border rounded-lg p-3 cursor-pointer active:scale-[99%] transition-all ${
                  selectedType === insurance.id 
                    ? 'border-primary ring-1 ring-primary/20 shadow-sm' 
                    : 'border-gray-200 hover:border-primary/30'
                }`}
                onClick={() => setSelectedType(insurance.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${insurance.color}`}>
                        {insurance.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{insurance.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{insurance.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-blue-600">{insurance.startingPremium}</p>
                      <p className="text-[10px] text-gray-500">Starting from</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700">{insurance.description}</p>

                  <div className="space-y-1.5">
                    {insurance.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs">
                      <span className="text-gray-500">Max: </span>
                      <span className="font-medium">{insurance.maxCoverage}</span>
                    </div>
                    {selectedType === insurance.id && (
                      <Badge className="bg-primary text-primary-foreground text-xs py-0.5 px-1.5">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-md">
          <Button 
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full h-12 rounded-lg text-sm font-medium"
            size="lg"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default SelectInsuranceType;