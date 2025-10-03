import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MandateReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const mandate = location.state?.mandate;
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [selectedBank, setSelectedBank] = useState(mandate?.debitAccount || 'XXXX3272');

  if (!mandate) {
    navigate('/mandates');
    return null;
  }

  const banks = [
    { name: 'Bank of Baroda', account: 'XXXX3272' },
    { name: 'Bank Name', account: 'XXXX1234' },
  ];

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 5) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleNumberPad = (num: string) => {
    const emptyIndex = pin.findIndex(p => p === '');
    if (emptyIndex !== -1) {
      handlePinChange(emptyIndex, num);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = pin.map((p, i) => (p ? i : -1)).filter(i => i !== -1).pop();
    if (lastFilledIndex !== undefined) {
      const newPin = [...pin];
      newPin[lastFilledIndex] = '';
      setPin(newPin);
      const input = document.getElementById(`pin-${lastFilledIndex}`);
      input?.focus();
    }
  };

  const handleSubmit = () => {
    if (pin.some(p => !p)) {
      toast({
        title: "Incomplete PIN",
        description: "Please enter all 6 digits",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing...",
      description: "Verifying your UPI PIN",
    });

    setTimeout(() => {
      navigate('/mandate-success', { state: { mandate: { ...mandate, debitAccount: selectedBank } } });
    }, 1500);
  };

  const handleBankChange = (value: string) => {
    setSelectedBank(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1178AC] to-[#1397DA] border-b border-[#1178AC]/20 sticky top-0 z-40 w-full shadow-sm">
        <div className="px-4 sm:px-6 py-4 max-w-screen-xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 text-sm font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-1.5" /> Cancel
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-white">
              {banks.find(bank => bank.account === selectedBank)?.name || 'Select Bank'}
            </h1>
            <p className="text-sm text-white/80">{selectedBank}</p>
          </div>
          <div className="w-14"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 sm:px-6 py-8 max-w-screen-md mx-auto w-full">
        {/* Bank Selection */}
        <div className="mb-6">
          <Select value={selectedBank} onValueChange={handleBankChange}>
            <SelectTrigger className="h-10 text-base border-[#1178AC]/20 focus:ring-[#1397DA] focus:border-[#1397DA]">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map(bank => (
                <SelectItem key={bank.account} value={bank.account}>
                  {bank.name} - {bank.account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PIN Entry Section */}
        <div className="flex-1 flex flex-col justify-center text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Enter 6-Digit UPI PIN</h2>
          <p className="text-sm text-muted-foreground mt-2">Enter your PIN to confirm the mandate</p>
          
          {/* PIN Input Circles */}
          <div className="flex justify-center space-x-3 mt-6">
            {pin.map((digit, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  digit ? 'border-[#1178AC] bg-[#1178AC]/10' : 'border-border bg-background'
                }`}
              >
                <Input
                  id={`pin-${index}`}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(index, e.key)}
                  className="w-full h-full bg-transparent text-center text-xl font-semibold text-foreground outline-none border-none"
                  inputMode="numeric"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Number Pad */}
        <div className="max-w-sm mx-auto w-full mt-8">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="ghost"
                onClick={() => handleNumberPad(num.toString())}
                className="h-14 text-xl font-medium hover:bg-[#1178AC]/10 rounded-lg"
              >
                {num}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={handleBackspace}
              className="h-14 hover:bg-[#1178AC]/10 rounded-lg"
            >
              <X className="h-6 w-6 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNumberPad('0')}
              className="h-14 text-xl font-medium hover:bg-[#1178AC]/10 rounded-lg"
            >
              0
            </Button>
            <div></div>
          </div>
        </div>
      </div>

      {/* Fixed Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-[#1178AC]/20 z-50">
        <div className="px-4 sm:px-6 py-4 max-w-screen-xl mx-auto">
          <Button
            className="w-full h-11 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-base rounded-lg transition-colors duration-200 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={pin.some(p => !p)}
          >
            Submit PIN
          </Button>
        </div>
      </div>

      {/* Bank Logo */}
      <div className="p-4 flex justify-center">
        <div className="text-[#1178AC]">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor">
            <text x="0" y="16" fontSize="14" fontWeight="bold">UPI</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MandateReview;


// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ArrowLeft, X } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const MandateReview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { toast } = useToast();
//   const mandate = location.state?.mandate;
  
//   const [pin, setPin] = useState(['', '', '', '', '', '']);
//   const [showPinPad, setShowPinPad] = useState(true);

//   if (!mandate) {
//     navigate('/mandates');
//     return null;
//   }

//   const handlePinChange = (index: number, value: string) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newPin = [...pin];
//       newPin[index] = value;
//       setPin(newPin);

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`pin-${index + 1}`);
//         nextInput?.focus();
//       }
//     }
//   };

//   const handleKeyPress = (index: number, key: string) => {
//     if (key === 'Backspace' && !pin[index] && index > 0) {
//       const prevInput = document.getElementById(`pin-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleNumberPad = (num: string) => {
//     const emptyIndex = pin.findIndex(p => p === '');
//     if (emptyIndex !== -1) {
//       handlePinChange(emptyIndex, num);
//     }
//   };

//   const handleBackspace = () => {
//     const lastFilledIndex = pin.map((p, i) => p ? i : -1).filter(i => i !== -1).pop();
//     if (lastFilledIndex !== undefined) {
//       const newPin = [...pin];
//       newPin[lastFilledIndex] = '';
//       setPin(newPin);
//       const input = document.getElementById(`pin-${lastFilledIndex}`);
//       input?.focus();
//     }
//   };

//   const handleSubmit = () => {
//     if (pin.some(p => !p)) {
//       toast({
//         title: "Incomplete PIN",
//         description: "Please enter all 6 digits",
//         variant: "destructive"
//       });
//       return;
//     }

//     // Simulate PIN verification
//     toast({
//       title: "Processing...",
//       description: "Verifying your UPI PIN",
//     });

//     setTimeout(() => {
//       navigate('/mandate-success');
//     }, 1500);
//   };

//   const formatCurrency = (amount: string) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(parseFloat(amount));
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* Header */}
//       <div className="bg-card border-b border-border">
//         <div className="px-4 py-4 flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => navigate(-1)}
//             className="text-muted-foreground hover:text-foreground"
//           >
//             CANCEL
//           </Button>
//           <div className="text-center flex-1">
//             <h1 className="font-semibold text-foreground">Bank of Baroda</h1>
//             <p className="text-sm text-muted-foreground">{mandate.debitAccount}</p>
//           </div>
//           <div className="w-16"></div>
//         </div>
//       </div>

//       {/* PIN Entry Section */}
//       <div className="flex-1 flex flex-col justify-center px-4 py-8">
//         <div className="text-center mb-8">
//           <h2 className="text-lg font-semibold text-foreground mb-2">ENTER 6-DIGIT UPI PIN</h2>
          
//           {/* PIN Input Circles */}
//           <div className="flex justify-center space-x-3 mt-6">
//             {pin.map((digit, index) => (
//               <div
//                 key={index}
//                 className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
//                   digit ? 'border-primary bg-primary/10' : 'border-border bg-background'
//                 }`}
//               >
//                 <input
//                   id={`pin-${index}`}
//                   type="password"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handlePinChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyPress(index, e.key)}
//                   className="w-full h-full bg-transparent text-center text-xl font-bold text-foreground outline-none"
//                   inputMode="none"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Number Pad */}
//         <div className="max-w-sm mx-auto w-full">
//           <div className="grid grid-cols-3 gap-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//               <Button
//                 key={num}
//                 variant="ghost"
//                 onClick={() => handleNumberPad(num.toString())}
//                 className="h-16 text-2xl font-semibold hover:bg-muted"
//               >
//                 {num}
//               </Button>
//             ))}
//             <Button
//               variant="ghost"
//               onClick={handleBackspace}
//               className="h-16 hover:bg-muted"
//             >
//               <X className="h-6 w-6" />
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => handleNumberPad('0')}
//               className="h-16 text-2xl font-semibold hover:bg-muted"
//             >
//               0
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={handleSubmit}
//               disabled={pin.some(p => !p)}
//               className="h-16 font-semibold hover:bg-muted disabled:opacity-50"
//             >
//               SUBMIT
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Bank Logo - Fixed at bottom */}
//       <div className="p-4 flex justify-center">
//         <div className="text-muted-foreground">
//           <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor">
//             <text x="0" y="15" fontSize="12" fontWeight="bold">UPI</text>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MandateReview;