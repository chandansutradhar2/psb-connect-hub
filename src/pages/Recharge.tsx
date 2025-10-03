// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   ArrowLeft, 
//   Smartphone, 
//   Tv, 
//   Wifi, 
//   Phone,
//   History,
//   Star,
//   Zap,
//   Gift
// } from 'lucide-react';

// const Recharge = () => {
//   const navigate = useNavigate();
//   const [selectedService, setSelectedService] = useState<'mobile' | 'dth' | 'broadband' | 'landline'>('mobile');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [amount, setAmount] = useState('');

//   const services = [
//     { key: 'mobile', label: 'Mobile', icon: <Smartphone className="h-5 w-5" /> },
//     { key: 'dth', label: 'DTH TV', icon: <Tv className="h-5 w-5" /> },
//     { key: 'broadband', label: 'Broadband', icon: <Wifi className="h-5 w-5" /> },
//     { key: 'landline', label: 'Landline', icon: <Phone className="h-5 w-5" /> },
//   ];

//   const quickAmounts = [99, 199, 299, 499, 999, 1999];

//   const recentRecharges = [
//     { number: '9876543210', operator: 'Airtel', amount: 299, date: 'Today' },
//     { number: '9876543211', operator: 'Jio', amount: 599, date: 'Yesterday' },
//     { number: '9876543212', operator: 'Vi', amount: 199, date: '2 days ago' },
//   ];

//   const offers = [
//     { title: '5% Cashback', subtitle: 'On recharges above ₹200', color: 'bg-gradient-to-r from-bilbao-500 to-bilbao-600' },
//     { title: 'Double Data', subtitle: 'Special offer this month', color: 'bg-gradient-to-r from-gold-400 to-gold-500' },
//   ];

//   const handleRecharge = () => {
//     if (mobileNumber && amount) {
//       // Navigate to payment confirmation
//       navigate('/payment-confirmation', { 
//         state: { 
//           type: 'recharge', 
//           details: { number: mobileNumber, amount, service: selectedService }
//         }
//       });
//     }
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => navigate('/dashboard')}
//             className="rounded-full p-2"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-lg font-semibold">Recharge & Bills</h1>
//           <Button variant="ghost" size="sm" className="rounded-full p-2">
//             <History className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Service Selection */}
//         <BankingCard className="rounded-2xl">
//           <div className="grid grid-cols-4 gap-3">
//             {services.map((service) => (
//               <button
//                 key={service.key}
//                 onClick={() => setSelectedService(service.key as any)}
//                 className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
//                   selectedService === service.key
//                     ? 'bg-primary text-primary-foreground'
//                     : 'bg-muted/50 hover:bg-muted'
//                 }`}
//               >
//                 {service.icon}
//                 <span className="text-xs font-medium mt-2">{service.label}</span>
//               </button>
//             ))}
//           </div>
//         </BankingCard>

//         {/* Recharge Form */}
//         <BankingCard title={`${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} Recharge`} className="rounded-2xl">
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-muted-foreground">
//                 {selectedService === 'mobile' ? 'Mobile Number' : 
//                  selectedService === 'dth' ? 'Customer ID' :
//                  selectedService === 'broadband' ? 'Customer ID' : 'Phone Number'}
//               </label>
//               <Input
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 placeholder={selectedService === 'mobile' ? 'Enter mobile number' : 'Enter customer ID'}
//                 className="rounded-xl h-12 mt-1"
//               />
//             </div>

//             {/* Quick Amount Selection */}
//             <div>
//               <label className="text-sm font-medium text-muted-foreground">Select Amount</label>
//               <div className="grid grid-cols-3 gap-3 mt-2">
//                 {quickAmounts.map((quickAmount) => (
//                   <button
//                     key={quickAmount}
//                     onClick={() => setAmount(quickAmount.toString())}
//                     className={`p-3 rounded-xl border transition-all ${
//                       amount === quickAmount.toString()
//                         ? 'border-primary bg-primary/10 text-primary'
//                         : 'border-border hover:border-primary/30'
//                     }`}
//                   >
//                     <div className="text-center">
//                       <p className="font-semibold">₹{quickAmount}</p>
//                       {quickAmount >= 299 && (
//                         <Badge variant="secondary" className="text-xs mt-1">
//                           <Star className="h-3 w-3 mr-1" />
//                           Popular
//                         </Badge>
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Custom Amount */}
//             <div>
//               <label className="text-sm font-medium text-muted-foreground">Or Enter Amount</label>
//               <Input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount"
//                 className="rounded-xl h-12 mt-1"
//               />
//             </div>

//             <Button 
//               className="w-full rounded-xl h-12"
//               onClick={handleRecharge}
//               disabled={!mobileNumber || !amount}
//             >
//               <Zap className="h-4 w-4 mr-2" />
//               Proceed to Pay
//             </Button>
//           </div>
//         </BankingCard>

//         {/* Offers */}
//         <BankingCard title="Special Offers" icon={<Gift className="h-5 w-5" />} className="rounded-2xl">
//           <div className="space-y-3">
//             {offers.map((offer, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-2xl text-white relative overflow-hidden ${offer.color}`}
//               >
//                 <div className="relative z-10">
//                   <h3 className="font-semibold mb-1">{offer.title}</h3>
//                   <p className="text-sm opacity-90">{offer.subtitle}</p>
//                 </div>
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
//               </div>
//             ))}
//           </div>
//         </BankingCard>

//         {/* Recent Recharges */}
//         <BankingCard title="Recent Recharges" className="rounded-2xl">
//           <div className="space-y-3">
//             {recentRecharges.map((recharge, index) => (
//               <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <Smartphone className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm">{recharge.number}</p>
//                     <p className="text-xs text-muted-foreground">{recharge.operator} • {recharge.date}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-sm">₹{recharge.amount}</p>
//                   <Badge variant="secondary" className="text-xs">Success</Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </BankingCard>
//       </div>
//     </BankingLayout>
//   );
// };

// export default Recharge;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Smartphone,
  Tv,
  Wifi,
  Phone,
  History,
  Star,
  Zap,
  Gift,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  

  const services = [
    { key: 'mobile', label: 'Mobile', icon: <Smartphone className="h-5 w-5" /> },
    { key: 'dth', label: 'DTH TV', icon: <Tv className="h-5 w-5" /> },
    { key: 'broadband', label: 'Broadband', icon: <Wifi className="h-5 w-5" /> },
    { key: 'landline', label: 'Landline', icon: <Phone className="h-5 w-5" /> },
  ];

    const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

  const quickAmounts = [99, 199, 299, 499, 999, 1999];

  const recentRecharges = [
    { number: '9876543210', operator: 'Airtel', amount: 299, date: 'Today' },
    { number: '9876543211', operator: 'Jio', amount: 599, date: 'Yesterday' },
    { number: '9876543212', operator: 'Vi', amount: 199, date: '2 days ago' },
  ];

  const offers = [
    { title: '5% Cashback', subtitle: 'On recharges above ₹200', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { title: 'Double Data', subtitle: 'Special offer this month', color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
  ];

  const handleRecharge = () => {
    if (mobileNumber && amount) {
      navigate('/payment-confirmation', {
        state: {
          type: 'recharge',
          details: { number: mobileNumber, amount, service: selectedService },
        },
      });
    }
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50  ">
        {/* Header with Full-Width Alignment */}
        <header className="flex items-center justify-between bg-white p-2 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="rounded-full p-2 min-w-[44px] min-h-[44px] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors ml-4"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Recharge & Bills</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/recharge-history')}
            className="rounded-full p-2 min-w-[44px] min-h-[44px] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors mr-4"
            aria-label="View recharge history"
          >
            {/* <History className="h-5 w-5 text-gray-600" /> */}
          </Button>
        </header>

        {/* Service Selection */}
        <div className='px-4 mt-4'>
           <BankingCard className="rounded-2xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-2 gap-3 p-3 sm:p-4">
            {services.map((service) => (
              <button
                key={service.key}
                onClick={() => setSelectedService(service.key)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                  selectedService === service.key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 hover:bg-gray-300 border border-gray-300'
                } min-h-[80px]`}
              >
                {service.icon}
                <span className="text-xs sm:text-sm font-medium mt-2 text-center">{service.label}</span>
              </button>
            ))}
          </div>
        </BankingCard>
       
        {/* Recharge Form */}
        <BankingCard
          title={`${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} Recharge`}
          className="rounded-2xl mt-4 shadow-sm border border-gray-200"
        >
          <div className="space-y-4 p-4 sm:p-6">
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-600 mb-2 block">
                {selectedService === 'mobile' ? 'Mobile Number' :
                 selectedService === 'dth' ? 'Customer ID' :
                 selectedService === 'broadband' ? 'Customer ID' : 'Phone Number'}
              </label>
              <Input
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder={selectedService === 'mobile' ? 'Enter mobile number' : 'Enter customer ID'}
                className="rounded-xl h-12 text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-600 mb-2 block">Select Amount</label>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      amount === quickAmount.toString()
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                    } min-h-[70px]`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-sm sm:text-base">₹{quickAmount}</p>
                      {quickAmount >= 299 && (
                        <Badge variant="secondary" className="text-xs sm:text-sm mt-1 bg-gray-100 text-gray-700">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-600 mb-2 block">Or Enter Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="rounded-xl h-12 text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <Button
              className="w-full rounded-xl h-12 sm:h-14 text-sm sm:text-base min-h-[44px] bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              // onClick={handleRecharge}
              // disabled={!mobileNumber || !amount}
                          onClick={() => handleComingSoon("Recharge")}


            >
              <Zap className="h-4 w-4 mr-2" />
              Proceed to Pay
            </Button>
          </div>
        </BankingCard>


        {/* Offers */}
        <BankingCard title="Special Offers" icon={<Gift className="h-5 w-5 text-gray-600" />} className="rounded-2xl shadow-sm border mt-4 border-gray-200">
          <div className="space-y-3 p-4 sm:p-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`p-4 sm:p-5 rounded-2xl text-white relative overflow-hidden ${offer.color} shadow-sm`}
              >
                <div className="relative z-10">
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{offer.title}</h3>
                  <p className="text-xs sm:text-sm opacity-90">{offer.subtitle}</p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
              </div>
            ))}
          </div>
        </BankingCard>


        {/* Recent Recharges */}


  <div className="p-4 sm:p-6 border-b border-gray-200">
    <h2 className="text-lg sm:text-xl font-semibold text-[#003087]">
      Recent Recharges
    </h2>
  </div>
   <div className=" mt-4">
  {/* Header */}

  {/* List */}
  <div className="space-y-3 p- sm:p-6 max-h-[50vh] overflow-y-auto pb-20">
    {recentRecharges.map((recharge, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
      >
        {/* Left: Icon + Number + Operator */}
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base text-gray-800">
              {recharge.number}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {recharge.operator} • {recharge.date}
            </p>
          </div>
        </div>

        {/* Right: Amount + Status */}
        <div className="text-left sm:text-right">
          <p className="font-semibold text-sm sm:text-base text-gray-800">
            ₹{recharge.amount}
          <Badge
            variant="secondary"
            className="text-xs sm:text-sm ml-4 bg-blue-100 text-blue-700 border-blue-200"
          >
            Success
          </Badge>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
       
      </div>
    </BankingLayout>
  );
};

export default Recharge;