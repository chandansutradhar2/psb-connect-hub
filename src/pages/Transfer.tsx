// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   ArrowLeft,
//   Search,
//   Send,
//   User,
//   Building,
//   Smartphone,
//   IndianRupee,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   ChevronRight,
//   QrCode,
//   Contact,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // Define types for better type safety
// type TransferType = 'account' | 'upi' | 'mobile' | 'qr' | null;
// type RecentRecipient = {
//   id: string;
//   name: string;
//   identifier: string;
//   type: TransferType;
//   bankName?: string;
//   lastTransferred: string;
//   avatar?: string;
// };

// const Transfer = () => {
//   const navigate = useNavigate();
//   const [transferType, setTransferType] = useState<TransferType>(null);
//   const [amount, setAmount] = useState('');
//   const [recipient, setRecipient] = useState('');
//   const [ifsc, setIfsc] = useState('');
//   const [remarks, setRemarks] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Mock recent recipients data
//   const recentRecipients: RecentRecipient[] = [
//     {
//       id: '1',
//       name: 'Rajesh Kumar',
//       identifier: 'rajesh.kumar@psb',
//       type: 'upi',
//       lastTransferred: '2 days ago',
//       avatar: 'RK',
//     },
//     {
//       id: '2',
//       name: 'Priya Sharma',
//       identifier: '9876543210',
//       type: 'mobile',
//       lastTransferred: '1 week ago',
//       avatar: 'PS',
//     },
//     {
//       id: '3',
//       name: 'Amit Patel',
//       identifier: '12345678901234',
//       type: 'account',
//       bankName: 'Bank Name',
//       lastTransferred: '3 days ago',
//       avatar: 'AP',
//     },
//     {
//       id: '4',
//       name: 'Sunita Singh',
//       identifier: 'sunita.singh@psb',
//       type: 'upi',
//       lastTransferred: '5 hours ago',
//       avatar: 'SS',
//     },
//   ];

//   const transferOptions = [
//     {
//       type: 'account' as const,
//       icon: <Building className="h-6 w-6" />,
//       title: 'Bank Account',
//       description: 'Transfer to any bank account using account number & IFSC',
//       color: 'text-[#003087] bg-blue-100',
//     },
//     {
//       type: 'upi' as const,
//       icon: <User className="h-6 w-6" />,
//       title: 'UPI ID',
//       description: 'Send money using UPI ID instantly',
//       color: 'text-[#F37021] bg-orange-100',
//     },
//     {
//       type: 'mobile' as const,
//       icon: <Smartphone className="h-6 w-6" />,
//       title: 'Mobile Number',
//       description: 'Transfer using registered mobile number',
//       color: 'text-blue-600 bg-blue-100',
//     },
//     {
//       type: 'qr' as const,
//       icon: <QrCode className="h-6 w-6" />,
//       title: 'Scan QR Code',
//       description: 'Scan and pay using QR code',
//       color: 'text-purple-600 bg-purple-100',
//     },
//   ];

//   // Filter recent recipients based on search query
//   const filteredRecipients = recentRecipients.filter(
//     (recipient) =>
//       recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       recipient.identifier.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const validateForm = () => {
//     if (!recipient) return 'Recipient details are required';
//     if (transferType === 'account' && !ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
//       return 'Valid IFSC code is required';
//     }
//     if (!amount || parseFloat(amount.replace(/,/g, '')) <= 0) {
//       return 'Valid amount is required';
//     }
//     return null;
//   };

//   const handleTransfer = () => {
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError(null);
//     setIsProcessing(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsProcessing(false);
//       navigate('/transfer-success', {
//         state: { amount: amount.replace(/,/g, ''), recipient, transferType },
//       });
//     }, 1500);
//   };

//   const formatAmount = (value: string) => {
//     const numericValue = value.replace(/[^\d.]/g, '');
//     if (numericValue) {
//       const parts = numericValue.split('.');
//       parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//       return parts.join('.');
//     }
//     return numericValue;
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAmount(formatAmount(e.target.value));
//     setError(null);
//   };

//   const getPlaceholderText = () => {
//     switch (transferType) {
//       case 'account':
//         return 'Enter account number';
//       case 'upi':
//         return 'Enter UPI ID (e.g., name@psb)';
//       case 'mobile':
//         return 'Enter mobile number';
//       case 'qr':
//         return 'Scan QR code to get details';
//       default:
//         return '';
//     }
//   };

//   const getLabelText = () => {
//     switch (transferType) {
//       case 'account':
//         return 'Account Number';
//       case 'upi':
//         return 'UPI ID';
//       case 'mobile':
//         return 'Mobile Number';
//       case 'qr':
//         return 'QR Scan Result';
//       default:
//         return 'Recipient';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <BankingLayout title="Send Money" className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
//         {!transferType ? (
//           <div className="space-y-6 sm:space-y-8">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-3 bg-white">
//   {/* Left side: Back button + Title */}
//   <div className="flex items-center gap-3">
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => navigate('/dashboard')}
//       className="rounded-full border-gray-300 hover:border-[#F37021] hover:bg-orange-50 text-[#003087]"
//       aria-label="Go back to dashboard"
//     >
//       <ArrowLeft className="h-5 w-5" />
//     </Button>

//     <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003087]">
//       Send Money
//     </h1>
    
//   </div>

//   {/* (Optional) Right side content later if you want */}
// </div>


//             {/* Transfer Options */}
//             <div className='px-4'>
//             <div className=" rounded-sm overflow-hidden bg-white">
//               <div className="p-4 sm:p-6 border-b border-gray-100">
//                 <h2 className="text-lg sm:text-xl font-semibold text-[#003087]">
//                   Transfer Methods
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
//                 {transferOptions.map((option) => (
//                   <button
//                     key={option.type}
//                     onClick={() => setTransferType(option.type)}
//                     className={cn(
//                       'flex items-center gap-4 p-3 sm:p-4 text-left hover:bg-orange-50/50 transition-colors',
//                       'focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:ring-offset-2 rounded-xl',
//                       'w-full',
//                     )}
//                     aria-label={`Select ${option.title} transfer method`}
//                   >
//                     <div className={cn('p-2 sm:p-3 rounded-full', option.color)}>
//                       {option.icon}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{option.title}</h3>
//                       <p className="text-xs sm:text-sm text-gray-500 mt-1">{option.description}</p>
//                     </div>
//                     <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                   </button>
//                 ))}
//               </div>
//             </div>
//             </div>

//             {/* Recent Recipients */}
//             <BankingCard className="bg-white">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-[#003087]">
//                   Recent Recipients
//                 </h2>
//                 <div className="relative w-full sm:w-64">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     placeholder="Search recipients..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 pr-4 h-10 rounded-full text-sm focus:ring-[#F37021] w-full"
//                     aria-label="Search recent recipients"
//                   />
//                 </div>
//               </div>

//               {filteredRecipients.length > 0 ? (
//                 <div className="space-y-3">
//                   {filteredRecipients.map((recipient) => (
//                     <button
//                       key={recipient.id}
//                       className={cn(
//                         'w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-200',
//                         'hover:border-[#F37021] hover:bg-orange-50 transition-all duration-200',
//                         'focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:ring-offset-2',
//                       )}
//                       onClick={() => {
//                         setRecipient(recipient.identifier);
//                         setTransferType(recipient.type);
//                         if (recipient.type === 'account') setIfsc('PSIB0001234');
//                       }}
//                       aria-label={`Select recipient ${recipient.name}`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#F37021] to-[#003087] rounded-full flex items-center justify-center text-white font-medium text-sm">
//                           {recipient.avatar}
//                         </div>
//                         <div className="text-left">
//                           <p className="font-medium text-gray-900 text-sm sm:text-base">{recipient.name}</p>
//                           <div className="flex items-center gap-2 mt-1 flex-wrap">
//                             <p className="text-xs sm:text-sm text-gray-500">{recipient.identifier}</p>
//                             {recipient.bankName && (
//                               <>
//                                 <span className="text-gray-300">•</span>
//                                 <p className="text-xs sm:text-sm text-gray-500">{recipient.bankName}</p>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xs text-gray-400 flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           {recipient.lastTransferred}
//                         </p>
//                         <Send className="h-4 w-4 text-[#F37021] mt-1 ml-auto" />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-6 sm:py-8">
//                   <Contact className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500 text-sm sm:text-base">No recent recipients found</p>
//                   {searchQuery && (
//                     <p className="text-xs sm:text-sm text-gray-400 mt-1">
//                       No results for "{searchQuery}"
//                     </p>
//                   )}
//                 </div>
//               )}
//             </BankingCard>
//           </div>
//         ) : (
//           <div className="space-y-6 sm:space-y-8">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4">
//               <div className="flex items-center gap-3">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setTransferType(null)}
//                   className="rounded-full border-gray-300 hover:border-[#F37021] hover:bg-orange-50 text-[#003087]"
//                   aria-label="Go back to transfer methods"
//                 >
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003087]">
//                     {transferOptions.find((opt) => opt.type === transferType)?.title}
//                   </h1>
//                   <p className="text-sm text-gray-500">
//                     {transferOptions.find((opt) => opt.type === transferType)?.description}
//                   </p>
//                 </div>
//               </div>
//               {transferType === 'qr' && (
//                 <Button
//                   variant="default"
//                   className="gap-2 bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white hover:from-[#0f3f4b] hover:to-[#5e9a6b] h-10"
//                   aria-label="Scan QR code"
//                 >
//                   <QrCode className="h-4 w-4" />
//                   Scan QR
//                 </Button>
//               )}
//             </div>

//             {/* Transfer Form */}
//             <BankingCard className="bg-white">
//               <div className="space-y-5 p-4 sm:p-6">
//                 {/* Error Message */}
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
//                     <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
//                     <p className="text-sm text-red-600">{error}</p>
//                   </div>
//                 )}

//                 {/* Recipient Field */}
//                 <div>
//                   <Label htmlFor="recipient" className="text-sm font-medium text-[#003087] mb-2 block">
//                     {getLabelText()}
//                   </Label>
//                   <Input
//                     id="recipient"
//                     value={recipient}
//                     onChange={(e) => {
//                       setRecipient(e.target.value);
//                       setError(null);
//                     }}
//                     placeholder={getPlaceholderText()}
//                     className="h-12 text-sm sm:text-base focus:ring-[#F37021] w-full"
//                     disabled={transferType === 'qr'}
//                     aria-required="true"
//                   />
//                 </div>

//                 {/* IFSC Field (only for bank transfer) */}
//                 {transferType === 'account' && (
//                   <div>
//                     <Label htmlFor="ifsc" className="text-sm font-medium text-[#003087] mb-2 block">
//                       IFSC Code
//                     </Label>
//                     <Input
//                       id="ifsc"
//                       value={ifsc}
//                       onChange={(e) => {
//                         setIfsc(e.target.value.toUpperCase());
//                         setError(null);
//                       }}
//                       placeholder="Enter IFSC code (e.g., PSIB0001234)"
//                       className="h-12 text-sm sm:text-base uppercase focus:ring-[#F37021] w-full"
//                       maxLength={11}
//                       aria-required="true"
//                     />
//                   </div>
//                 )}

//                 {/* Amount Field */}
//                 <div>
//                   <Label htmlFor="amount" className="text-sm font-medium text-[#003087] mb-2 block">
//                     Amount
//                   </Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <IndianRupee className="h-5 w-5 text-gray-500" />
//                     </div>
//                     <Input
//                       id="amount"
//                       type="text"
//                       value={amount}
//                       onChange={handleAmountChange}
//                       placeholder="0.00"
//                       className="h-12 text-sm sm:text-base pl-10 pr-4 focus:ring-[#F37021] w-full"
//                       aria-required="true"
//                     />
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {[100, 500, 1000, 2000].map((quickAmount) => (
//                       <Button
//                         key={quickAmount}
//                         type="button"
//                         variant="default"
//                         size="sm"
//                         className="text-xs h-8 rounded-full bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white hover:from-[#0f3f4b] hover:to-[#5e9a6b]"
//                         onClick={() => {
//                           setAmount(formatAmount(quickAmount.toString()));
//                           setError(null);
//                         }}
//                         aria-label={`Set amount to ₹${quickAmount}`}
//                       >
//                         ₹{quickAmount}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Remarks Field */}
//                 <div>
//                   <Label htmlFor="remarks" className="text-sm font-medium text-[#003087] mb-2 block">
//                     Remarks (Optional)
//                   </Label>
//                   <Input
//                     id="remarks"
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     placeholder="What's this transfer for?"
//                     className="h-12 text-sm sm:text-base focus:ring-[#F37021] w-full"
//                     maxLength={30}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     {remarks.length}/30 characters
//                   </p>
//                 </div>

//                 {/* Transfer Button */}
//                 <Button
//                   className="w-full h-12 bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white font-medium text-base rounded-xl hover:from-[#0f3f4b] hover:to-[#5e9a6b] transition-colors"
//                   disabled={!recipient || !amount || isProcessing || !!error}
//                   onClick={handleTransfer}
//                   aria-label={`Send ₹${amount.replace(/,/g, '')} to recipient`}
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="h-5 w-5 mr-2" />
//                       Send ₹{amount.replace(/,/g, '')}
//                     </>
//                   )}
//                 </Button>

//                 {/* Security Note */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
//                   <CheckCircle className="h-5 w-5 text-[#003087] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-medium text-[#003087]">
//                       Secure Transfer
//                     </p>
//                     <p className="text-xs text-blue-600 mt-1">
//                       Your transaction is protected with Bank Name’s advanced security and encryption.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </BankingCard>

//             {/* Additional Information */}
//             {transferType === 'account' && (
//               <BankingCard className="bg-orange-50 border-orange-200">
//                 <div className="flex items-start gap-3 p-4">
//                   <AlertCircle className="h-5 w-5 text-[#F37021] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-medium text-[#F37021]">Important</p>
//                     <p className="text-xs text-orange-600 mt-1">
//                       Verify the account number and IFSC code carefully. Incorrect details may result in irreversible transfers.
//                     </p>
//                   </div>
//                 </div>
//               </BankingCard>
//             )}
//           </div>
//         )}
//       </BankingLayout>
//     </div>
//   );
// };

// export default Transfer;

import { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Search,
  Send,
  User,
  Building,
  Smartphone,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  QrCode,
  Contact,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TransferType = 'account' | 'upi' | 'mobile' | 'qr' | null;
type RecentRecipient = {
  id: string;
  name: string;
  identifier: string;
  type: TransferType;
  bankName?: string;
  lastTransferred: string;
  avatar?: string;
};

const Transfer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access navigation state
  const [transferType, setTransferType] = useState<TransferType>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [remarks, setRemarks] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill form with contact data from navigation state
  useEffect(() => {
    if (location.state) {
      const { identifier, type, bankName } = location.state;
      setRecipient(identifier || '');
      setTransferType(type || null);
      if (type === 'account' && bankName) {
        setIfsc('PSIB0001234'); // Example IFSC, adjust as needed
      }
    }
  }, [location.state]);

  const recentRecipients: RecentRecipient[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      identifier: 'rajesh.kumar@psb',
      type: 'upi',
      lastTransferred: '2 days ago',
      avatar: 'RK',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      identifier: '9876543210',
      type: 'mobile',
      lastTransferred: '1 week ago',
      avatar: 'PS',
    },
    {
      id: '3',
      name: 'Amit Patel',
      identifier: '12345678901234',
      type: 'account',
      bankName: 'Bank Name',
      lastTransferred: '3 days ago',
      avatar: 'AP',
    },
    {
      id: '4',
      name: 'Sunita Singh',
      identifier: 'sunita.singh@psb',
      type: 'upi',
      lastTransferred: '5 hours ago',
      avatar: 'SS',
    },
  ];

  const transferOptions = [
    {
      type: 'account' as const,
      icon: <Building className="h-6 w-6" />,
      title: 'Bank Account',
      description: 'Transfer to any bank account using account number & IFSC',
      color: 'text-[#003087] bg-blue-100',
    },
    {
      type: 'upi' as const,
      icon: <User className="h-6 w-6" />,
      title: 'UPI ID',
      description: 'Send money using UPI ID instantly',
      color: 'text-[#F37021] bg-orange-100',
    },
    {
      type: 'mobile' as const,
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Mobile Number',
      description: 'Transfer using registered mobile number',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      type: 'qr' as const,
      icon: <QrCode className="h-6 w-6" />,
      title: 'Scan QR Code',
      description: 'Scan and pay using QR code',
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const filteredRecipients = recentRecipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.identifier.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const validateForm = () => {
    if (!recipient) return 'Recipient details are required';
    if (transferType === 'account' && !ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      return 'Valid IFSC code is required';
    }
    if (!amount || parseFloat(amount.replace(/,/g, '')) <= 0) {
      return 'Valid amount is required';
    }
    return null;
  };

  const handleTransfer = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/transfer-success', {
        state: { amount: amount.replace(/,/g, ''), recipient, transferType },
      });
    }, 1500);
  };

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    if (numericValue) {
      const parts = numericValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    return numericValue;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(e.target.value));
    setError(null);
  };

  const getPlaceholderText = () => {
    switch (transferType) {
      case 'account':
        return 'Enter account number';
      case 'upi':
        return 'Enter UPI ID (e.g., name@psb)';
      case 'mobile':
        return 'Enter mobile number';
      case 'qr':
        return 'Scan QR code to get details';
      default:
        return '';
    }
  };

  const getLabelText = () => {
    switch (transferType) {
      case 'account':
        return 'Account Number';
      case 'upi':
        return 'UPI ID';
      case 'mobile':
        return 'Mobile Number';
      case 'qr':
        return 'QR Scan Result';
      default:
        return 'Recipient';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BankingLayout title="Send Money" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {!transferType ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-3 bg-white">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-full border-gray-300 hover:border-[#F37021] hover:bg-orange-50 text-[#003087]"
                  aria-label="Go back to dashboard"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003087]">
                  Send Money
                </h1>
              </div>
            </div>

            <div className='px-4'>
              <div className="rounded-sm overflow-hidden bg-white">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#003087]">
                    Transfer Methods
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
                  {transferOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setTransferType(option.type)}
                      className={cn(
                        'flex items-center gap-4 p-3 sm:p-4 text-left hover:bg-orange-50/50 transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:ring-offset-2 rounded-xl',
                        'w-full',
                      )}
                      aria-label={`Select ${option.title} transfer method`}
                    >
                      <div className={cn('p-2 sm:p-3 rounded-full', option.color)}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{option.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{option.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <BankingCard className="bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#003087]">
                  Recent Recipients
                </h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search recipients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-10 rounded-full text-sm focus:ring-[#F37021] w-full"
                    aria-label="Search recent recipients"
                  />
                </div>
              </div>

              {filteredRecipients.length > 0 ? (
                <div className="space-y-3">
                  {filteredRecipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      className={cn(
                        'w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-200',
                        'hover:border-[#F37021] hover:bg-orange-50 transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:ring-offset-2',
                      )}
                      onClick={() => {
                        setRecipient(recipient.identifier);
                        setTransferType(recipient.type);
                        if (recipient.type === 'account') setIfsc('PSIB0001234');
                      }}
                      aria-label={`Select recipient ${recipient.name}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#F37021] to-[#003087] rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {recipient.avatar}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{recipient.name}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <p className="text-xs sm:text-sm text-gray-500">{recipient.identifier}</p>
                            {recipient.bankName && (
                              <>
                                <span className="text-gray-300">•</span>
                                <p className="text-xs sm:text-sm text-gray-500">{recipient.bankName}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipient.lastTransferred}
                        </p>
                        <Send className="h-4 w-4 text-[#F37021] mt-1 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <Contact className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm sm:text-base">No recent recipients found</p>
                  {searchQuery && (
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      No results for "{searchQuery}"
                    </p>
                  )}
                </div>
              )}
            </BankingCard>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-3  ml-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTransferType(null)}
                  className="rounded-full border-gray-300 hover:border-[#F37021] hover:bg-orange-50 text-[#003087] mr-2"
                  aria-label="Go back to transfer methods"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003087]">
                    {transferOptions.find((opt) => opt.type === transferType)?.title}
                  </h1>
                  {/* <p className="text-sm text-gray-500">
                    {transferOptions.find((opt) => opt.type === transferType)?.description}
                  </p> */}
                </div>
              </div>
              {transferType === 'qr' && (
                <Button
                  variant="default"
                  className="gap-2 bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white hover:from-[#0f3f4b] hover:to-[#5e9a6b] h-10"
                  aria-label="Scan QR code"
                >
                  <QrCode className="h-4 w-4" />
                  Scan QR
                </Button>
              )}
            </div>

            <BankingCard className="bg-white">
              <div className="space-y-5 p-4 sm:p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="recipient" className="text-sm font-medium text-[#003087] mb-2 block">
                    {getLabelText()}
                  </Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => {
                      setRecipient(e.target.value);
                      setError(null);
                    }}
                    placeholder={getPlaceholderText()}
                    className="h-12 text-sm sm:text-base focus:ring-[#F37021] w-full"
                    disabled={transferType === 'qr'}
                    aria-required="true"
                  />
                </div>

                {transferType === 'account' && (
                  <div>
                    <Label htmlFor="ifsc" className="text-sm font-medium text-[#003087] mb-2 block">
                      IFSC Code
                    </Label>
                    <Input
                      id="ifsc"
                      value={ifsc}
                      onChange={(e) => {
                        setIfsc(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      placeholder="Enter IFSC code (e.g., PSIB0001234)"
                      className="h-12 text-sm sm:text-base uppercase focus:ring-[#F37021] w-full"
                      maxLength={11}
                      aria-required="true"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-[#003087] mb-2 block">
                    Amount
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      className="h-12 text-sm sm:text-base pl-10 pr-4 focus:ring-[#F37021] w-full"
                      aria-required="true"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[100, 500, 1000, 2000].map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        type="button"
                        variant="default"
                        size="sm"
                        className="text-xs h-8 rounded-full bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white hover:from-[#0f3f4b] hover:to-[#5e9a6b]"
                        onClick={() => {
                          setAmount(formatAmount(quickAmount.toString()));
                          setError(null);
                        }}
                        aria-label={`Set amount to ₹${quickAmount}`}
                      >
                        ₹{quickAmount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="remarks" className="text-sm font-medium text-[#003087] mb-2 block">
                    Remarks (Optional)
                  </Label>
                  <Input
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="What's this transfer for?"
                    className="h-12 text-sm sm:text-base focus:ring-[#F37021] w-full"
                    maxLength={30}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {remarks.length}/30 characters
                  </p>
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-b from-[#1178AC] to-[#1397DA] text-white font-medium text-base rounded-xl hover:from-[#0f3f4b] hover:to-[#5e9a6b] transition-colors"
                  disabled={!recipient || !amount || isProcessing || !!error}
                  onClick={handleTransfer}
                  aria-label={`Send ₹${amount.replace(/,/g, '')} to recipient`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send ₹{amount.replace(/,/g, '')}
                    </>
                  )}
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#003087] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#003087]">
                      Secure Transfer
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Your transaction is protected with Bank Name’s advanced security and encryption.
                    </p>
                  </div>
                </div>
              </div>
            </BankingCard>

            {transferType === 'account' && (
              <BankingCard className="bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3 p-4">
                  <AlertCircle className="h-5 w-5 text-[#F37021] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F37021]">Important</p>
                    <p className="text-xs text-orange-600 mt-1">
                      Verify the account number and IFSC code carefully. Incorrect details may result in irreversible transfers.
                    </p>
                  </div>
                </div>
              </BankingCard>
            )}
          </div>
        )}
      </BankingLayout>
    </div>
  );
};

export default Transfer;