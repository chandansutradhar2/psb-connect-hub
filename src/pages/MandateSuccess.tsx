import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const MandateSuccess = () => {
  const navigate = useNavigate();

  const mandateDetails = {
    payeeName: 'Spotify India',
    upiId: 'spotify.bds@icici',
    referenceId: 'EZAa144e4dd5Bbf4192b37ec21e23afbbd6',
    remarks: 'MandateRequest',
    validFrom: '23/07/2024',
    validTo: '21/07/2034',
    frequency: 'As Presented',
    cyclesCompleted: 7,
    amountPerCycle: 149.00,
    debitAccount: 'XXXX0'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#134e5e] to-[#71b280] border-b border-[#134e5e]/20 sticky top-0 z-40 w-full shadow-sm">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mandates')}
              className="h-9 w-9 rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-base sm:text-lg font-semibold text-white">Mandates</h1>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="px-4 sm:px-6 py-5 max-w-screen-xl mx-auto">
        {/* Success Banner */}
        <Card className="bg-gradient-to-r from-[#134e5e]/10 to-[#71b280]/10 border-[#134e5e]/20 mb-4">
          <CardContent className="p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#134e5e]/20 mb-3">
              <CheckCircle2 className="h-6 w-6 text-[#134e5e]" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#134e5e] mb-1">
              Mandate has been successfully transferred
            </h2>
          </CardContent>
        </Card>

        {/* Mandate Details */}
        <Card className="border-[#134e5e]/20">
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-base text-[#134e5e] mb-1">
                {mandateDetails.payeeName}
              </h3>
              <p className="text-xs text-muted-foreground">UPI ID</p>
              <p className="text-sm text-[#134e5e]">{mandateDetails.upiId}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <div className="flex items-center text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#134e5e]/40 mr-2"></span>
                <span className="text-muted-foreground flex-1">Reference ID</span>
              </div>
              <p className="text-sm text-[#134e5e] ml-4">{mandateDetails.referenceId}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <p className="text-xs text-muted-foreground">Remarks</p>
              <p className="text-sm text-[#134e5e]">{mandateDetails.remarks}</p>
            </div>

            <div className="pt-2 border-t border-[#134e5e]/20">
              <p className="text-xs text-muted-foreground mb-2">Mandate validity</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-sm font-medium text-[#134e5e]">{mandateDetails.validFrom}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">To</p>
                  <p className="text-sm font-medium text-[#134e5e]">{mandateDetails.validTo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Frequency</p>
                <p className="text-sm font-medium text-[#134e5e]">{mandateDetails.frequency}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Cycles Completed</p>
                <p className="text-sm font-medium text-[#134e5e]">{mandateDetails.cyclesCompleted}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Amount per Cycle</p>
                <p className="text-base font-semibold text-[#134e5e]">{formatCurrency(mandateDetails.amountPerCycle)}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#134e5e]/20">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Debit account</p>
                <p className="text-sm font-medium text-[#134e5e]">{mandateDetails.debitAccount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-[#134e5e]/20 z-50">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-12 font-medium text-[#134e5e] border-[#134e5e]/20 hover:bg-[#71b280]/10 rounded-lg"
              onClick={() => navigate('/dashboard')}
            >
              Home
            </Button>
            <Button
              className="h-12 bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium rounded-lg"
              onClick={() => navigate('/support')}
            >
              Call bank
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandateSuccess;


// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle2, ArrowLeft } from 'lucide-react';

// const MandateSuccess = () => {
//   const navigate = useNavigate();

//   const mandateDetails = {
//     payeeName: 'Spotify India',
//     upiId: 'spotify.bds@icici',
//     referenceId: 'EZAa144e4dd5Bbf4192b37ec21e23afbbd6',
//     remarks: 'MandateRequest',
//     validFrom: '23/07/2024',
//     validTo: '21/07/2034',
//     frequency: 'As Presented',
//     cyclesCompleted: 7,
//     amountPerCycle: 149.00,
//     debitAccount: 'XXXX0'
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-card border-b border-border sticky top-0 z-40">
//         <div className="px-4 py-4">
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/mandates')}
//               className="rounded-full"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-bold text-foreground">Mandates</h1>
//           </div>
//         </div>
//       </div>

//       {/* Success Content */}
//       <div className="px-4 pt-8 pb-6">
//         {/* Success Banner */}
//         <Card className="bg-success/10 border-success/20 mb-6">
//           <CardContent className="p-6 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
//               <CheckCircle2 className="h-8 w-8 text-success" />
//             </div>
//             <h2 className="text-xl font-bold text-foreground mb-2">
//               Mandate has been successfully transferred
//             </h2>
//           </CardContent>
//         </Card>

//         {/* Mandate Details */}
//         <Card className="border-border">
//           <CardContent className="p-4">
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold text-lg text-foreground mb-1">
//                   {mandateDetails.payeeName}
//                 </h3>
//                 <p className="text-xs text-muted-foreground">UPI ID</p>
//                 <p className="text-sm text-foreground">{mandateDetails.upiId}</p>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <div className="flex items-center text-xs">
//                   <span className="w-2 h-2 rounded-full bg-muted-foreground/40 mr-2"></span>
//                   <span className="text-muted-foreground flex-1">Reference ID</span>
//                 </div>
//                 <p className="text-sm text-foreground ml-4">{mandateDetails.referenceId}</p>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <p className="text-xs text-muted-foreground">Remarks</p>
//                 <p className="text-sm text-foreground">{mandateDetails.remarks}</p>
//               </div>

//               <div className="pt-2 border-t border-border">
//                 <p className="text-xs text-muted-foreground mb-3">Mandate validity</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-muted-foreground">From</p>
//                     <p className="text-sm font-medium text-foreground">{mandateDetails.validFrom}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-muted-foreground">To</p>
//                     <p className="text-sm font-medium text-foreground">{mandateDetails.validTo}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-muted-foreground">Frequency</p>
//                   <p className="text-sm font-medium text-foreground">{mandateDetails.frequency}</p>
//                 </div>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-muted-foreground">Cycles Completed</p>
//                   <p className="text-sm font-medium text-foreground">{mandateDetails.cyclesCompleted}</p>
//                 </div>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-muted-foreground">Amount per Cycle</p>
//                   <p className="text-lg font-bold text-foreground">{formatCurrency(mandateDetails.amountPerCycle)}</p>
//                 </div>
//               </div>

//               <div className="space-y-2 pt-2 border-t border-border">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-muted-foreground">Debit account</p>
//                   <p className="text-sm font-medium text-foreground">{mandateDetails.debitAccount}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-2 gap-3 mt-6">
//           <Button
//             variant="outline"
//             className="h-12 font-semibold"
//             onClick={() => navigate('/dashboard')}
//           >
//             Home
//           </Button>
//           <Button
//             className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
//             onClick={() => navigate('/support')}
//           >
//             Call bank
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MandateSuccess;