// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { ArrowLeft, Plus, ChevronRight, Calendar, Repeat } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// interface Mandate {
//   id: string;
//   payeeName: string;
//   upiId: string;
//   referenceId: string;
//   remarks: string;
//   validFrom: string;
//   validTo: string;
//   frequency: string;
//   cyclesCompleted: number;
//   amountPerCycle: number;
//   debitAccount: string;
//   status: 'active' | 'pending' | 'completed';
//   createdOn: string;
//   platform: 'account' | 'bhim' | 'paytm';
// }

// const Mandates = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState('account');

//   // Sample mandate data
//   const mandates: Mandate[] = [
//     {
//       id: '1',
//       payeeName: 'Spotify India',
//       upiId: 'spotify.bds@icici',
//       referenceId: 'EZAa144e4dd5Bbf4192b37ec21e23afbbd6',
//       remarks: 'MandateRequest',
//       validFrom: '23/07/2024',
//       validTo: '21/07/2034',
//       frequency: 'As Presented',
//       cyclesCompleted: 7,
//       amountPerCycle: 149.00,
//       debitAccount: 'XXXX0',
//       status: 'active',
//       createdOn: 'PhonePe',
//       platform: 'account'
//     },
//     {
//       id: '2',
//       payeeName: 'WWW.AIRTEL.IN',
//       upiId: 'airtel.autopay.paytm@hdfcbank',
//       referenceId: '18793015836',
//       remarks: '',
//       validFrom: '20/01/2034',
//       validTo: '20/01/2034',
//       frequency: 'As Presented',
//       cyclesCompleted: 0,
//       amountPerCycle: 15000.00,
//       debitAccount: 'XXXX0',
//       status: 'active',
//       createdOn: 'Paytm',
//       platform: 'account'
//     },
//     {
//       id: '3',
//       payeeName: 'NETFLIX.COM',
//       upiId: 'netflix.autopay.paytm@hdfcbank',
//       referenceId: '14668703041',
//       remarks: '',
//       validFrom: '06/02/2027',
//       validTo: '09/02/2027',
//       frequency: 'As Presented',
//       cyclesCompleted: 0,
//       amountPerCycle: 199.00,
//       debitAccount: 'XXXX0',
//       status: 'pending',
//       createdOn: 'Paytm',
//       platform: 'account'
//     }
//   ];

//   const getFilteredMandates = () => {
//     return mandates.filter(mandate => {
//       if (activeTab === 'account') return mandate.platform === 'account' && mandate.status === 'active';
//       if (activeTab === 'bhim') return mandate.platform === 'bhim' && mandate.status === 'active';
//       if (activeTab === 'pending') return mandate.status === 'pending';
//       if (activeTab === 'completed') return mandate.status === 'completed';
//       return false;
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   const handleTransferMandate = (mandate: Mandate) => {
//     navigate('/mandate-transfer', { state: { mandate } });
//   };

//   const MandateCard = ({ mandate }: { mandate: Mandate }) => (
//     <Card className="mb-3 border border-border hover:shadow-md transition-all duration-200">
//       <CardContent className="p-4">
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-start space-x-3 flex-1">
//             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//               <span className="text-primary font-bold text-sm">
//                 {mandate.payeeName.charAt(0)}
//               </span>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-foreground">{mandate.payeeName}</h4>
//               <p className="text-xs text-muted-foreground mt-0.5">UPI ID</p>
//               <p className="text-sm text-foreground">{mandate.upiId}</p>
              
//               <div className="mt-2 space-y-1">
//                 <div className="flex items-center text-xs text-muted-foreground">
//                   <span className="w-2 h-2 rounded-full bg-muted-foreground/40 mr-2"></span>
//                   {mandate.referenceId}
//                 </div>
//                 {mandate.remarks && (
//                   <p className="text-xs text-muted-foreground">Valid till</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="text-right flex-shrink-0 ml-4">
//             <p className="text-sm font-medium text-muted-foreground">up to</p>
//             <p className="text-lg font-bold text-foreground">{formatCurrency(mandate.amountPerCycle)}</p>
//           </div>
//         </div>

//         <div className="bg-muted/30 rounded-lg p-3 space-y-2">
//           <div className="flex items-center justify-between text-xs">
//             <span className="text-muted-foreground">Mandate validity</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-muted-foreground">From</p>
//               <p className="text-sm font-medium text-foreground">{mandate.validFrom}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-xs text-muted-foreground">To</p>
//               <p className="text-sm font-medium text-foreground">{mandate.validTo}</p>
//             </div>
//           </div>
          
//           <div className="pt-2 border-t border-border/50">
//             <div className="flex items-center justify-between text-xs mb-1">
//               <span className="text-muted-foreground">Frequency</span>
//               <span className="text-foreground font-medium">{mandate.frequency}</span>
//             </div>
//             <div className="flex items-center justify-between text-xs">
//               <span className="text-muted-foreground">Cycles Completed</span>
//               <span className="text-foreground font-medium">{mandate.cyclesCompleted}</span>
//             </div>
//           </div>

//           <div className="pt-2 border-t border-border/50">
//             <div className="flex items-center justify-between text-xs">
//               <span className="text-muted-foreground">Amount per Cycle</span>
//               <span className="text-foreground font-bold">{formatCurrency(mandate.amountPerCycle)}</span>
//             </div>
//             <div className="flex items-center justify-between text-xs mt-1">
//               <span className="text-muted-foreground">Debit account</span>
//               <span className="text-foreground font-medium">{mandate.debitAccount}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-3 flex items-center justify-between">
//           <Badge variant="outline" className="text-xs">
//             Created on {mandate.createdOn}
//           </Badge>
//           <Button
//             size="sm"
//             onClick={() => handleTransferMandate(mandate)}
//             className="bg-primary hover:bg-primary/90 text-primary-foreground"
//           >
//             Transfer
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen bg-background pb-6">
//       {/* Header */}
//       <div className="bg-card border-b border-border sticky top-0 z-40">
//         <div className="px-4 py-4">
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate(-1)}
//               className="rounded-full"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">Mandates</h1>
//               <p className="text-xs text-muted-foreground">↓ Pull down to refresh</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 mt-4">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="w-full grid grid-cols-3 mb-4 h-auto bg-muted/30">
//             <TabsTrigger value="account" className="text-xs py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Active on Account
//             </TabsTrigger>
//             <TabsTrigger value="bhim" className="text-xs py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Active on BHIM
//             </TabsTrigger>
//             <TabsTrigger value="pending" className="text-xs py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Pending
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="account" className="mt-0">
//             <div className="flex items-center justify-between mb-3">
//               <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
//                 Created on PhonePe
//               </Badge>
//               <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
//                 Transfer
//               </Badge>
//             </div>
//             {getFilteredMandates().map((mandate) => (
//               <MandateCard key={mandate.id} mandate={mandate} />
//             ))}
//           </TabsContent>

//           <TabsContent value="bhim" className="mt-0">
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No active mandates on BHIM</p>
//             </div>
//           </TabsContent>

//           <TabsContent value="pending" className="mt-0">
//             {getFilteredMandates().map((mandate) => (
//               <MandateCard key={mandate.id} mandate={mandate} />
//             ))}
//           </TabsContent>
//         </Tabs>

//         {/* Create New Mandate Button */}
//         <Button
//           className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
//           onClick={() => navigate('/mandate-create')}
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Create New Mandate
//         </Button>

//         {/* Info Card */}
//         <Card className="mt-4 bg-muted/30 border-border">
//           <CardContent className="p-4">
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               By viewing, details of all active mandates linked against your bank account will be visible in your UPI App
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Mandates;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Mandate {
  id: string;
  payeeName: string;
  upiId: string;
  referenceId: string;
  remarks: string;
  validFrom: string;
  validTo: string;
  frequency: string;
  cyclesCompleted: number;
  amountPerCycle: number;
  debitAccount: string;
  status: 'active' | 'pending' | 'completed';
  createdOn: string;
  platform: 'account' | 'bhim' | 'paytm';
}

const Mandates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('account');

  // Sample mandate data
  const mandates: Mandate[] = [
    {
      id: '1',
      payeeName: 'Spotify India',
      upiId: 'spotify.bds@icici',
      referenceId: 'EZAa144e4dd5Bbf4192b37ec21e23afbbd6',
      remarks: 'MandateRequest',
      validFrom: '23/07/2024',
      validTo: '21/07/2034',
      frequency: 'As Presented',
      cyclesCompleted: 7,
      amountPerCycle: 149.00,
      debitAccount: 'XXXX0',
      status: 'active',
      createdOn: 'PhonePe',
      platform: 'account'
    },
    {
      id: '2',
      payeeName: 'WWW.AIRTEL.IN',
      upiId: 'airtel.autopay.paytm@hdfcbank',
      referenceId: '18793015836',
      remarks: '',
      validFrom: '20/01/2034',
      validTo: '20/01/2034',
      frequency: 'As Presented',
      cyclesCompleted: 0,
      amountPerCycle: 15000.00,
      debitAccount: 'XXXX0',
      status: 'active',
      createdOn: 'Paytm',
      platform: 'account'
    },
    {
      id: '3',
      payeeName: 'NETFLIX.COM',
      upiId: 'netflix.autopay.paytm@hdfcbank',
      referenceId: '14668703041',
      remarks: '',
      validFrom: '06/02/2027',
      validTo: '09/02/2027',
      frequency: 'As Presented',
      cyclesCompleted: 0,
      amountPerCycle: 199.00,
      debitAccount: 'XXXX0',
      status: 'pending',
      createdOn: 'Paytm',
      platform: 'account'
    }
  ];

  const getFilteredMandates = () => {
    return mandates.filter(mandate => {
      if (activeTab === 'account') return mandate.platform === 'account' && mandate.status === 'active';
      if (activeTab === 'bhim') return mandate.platform === 'bhim' && mandate.status === 'active';
      if (activeTab === 'pending') return mandate.status === 'pending';
      if (activeTab === 'completed') return mandate.status === 'completed';
      return false;
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleTransferMandate = (mandate: Mandate) => {
    navigate('/mandate-transfer', { state: { mandate } });
  };

  const MandateCard = ({ mandate }: { mandate: Mandate }) => (
    <Card className="mb-3 border border-border hover:shadow-sm transition-all duration-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#1178AC]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#1178AC] font-semibold text-sm">
                {mandate.payeeName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-base">{mandate.payeeName}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">UPI ID: {mandate.upiId}</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mr-1.5"></span>
                  {mandate.referenceId}
                </div>
                {mandate.remarks && (
                  <p className="text-xs text-muted-foreground">{mandate.remarks}</p>
                )}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 sm:ml-3">
            <p className="text-xs text-muted-foreground">up to</p>
            <p className="text-base font-semibold text-foreground">{formatCurrency(mandate.amountPerCycle)}</p>
          </div>
        </div>

        <div className="bg-muted/20 rounded-md p-3 mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Valid From</p>
              <p className="font-medium text-foreground">{mandate.validFrom}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Valid To</p>
              <p className="font-medium text-foreground">{mandate.validTo}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/30">
            <div>
              <p className="text-muted-foreground">Frequency</p>
              <p className="font-medium text-foreground">{mandate.frequency}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Cycles Completed</p>
              <p className="font-medium text-foreground">{mandate.cyclesCompleted}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/30">
            <div>
              <p className="text-muted-foreground">Amount per Cycle</p>
              <p className="font-semibold text-foreground">{formatCurrency(mandate.amountPerCycle)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Debit Account</p>
              <p className="font-medium text-foreground">{mandate.debitAccount}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline" className="text-xs bg-[#1178AC]/10 text-[#1178AC] border-[#1178AC]/20">
            Created on {mandate.createdOn}
          </Badge>
          <Button
            size="sm"
            onClick={() => handleTransferMandate(mandate)}
            className="bg-[#1178AC] hover:bg-[#1397DA] text-white text-xs px-3"
          >
            Transfer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1178AC] to-[#1397DA] border-b border-border sticky top-0 z-40 w-full">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Mandates</h1>
              {/* <p className="text-xs text-white/80">↓ Pull down to refresh</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 max-w-screen-xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-3 h-auto bg-muted/30">
            <TabsTrigger 
              value="account" 
              className="text-xs py-2 data-[state=active]:bg-[#1178AC] data-[state=active]:text-white"
            >
              Active on Account
            </TabsTrigger>
            <TabsTrigger 
              value="bhim" 
              className="text-xs py-2 data-[state=active]:bg-[#1178AC] data-[state=active]:text-white"
            >
              Active on BHIM
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="text-xs py-2 data-[state=active]:bg-[#1178AC] data-[state=active]:text-white"
            >
              Pending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-0">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="bg-[#1178AC]/10 text-[#1178AC] border-[#1178AC]/20">
                Created on PhonePe
              </Badge>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                Transfer
              </Badge>
            </div>
            {getFilteredMandates().map((mandate) => (
              <MandateCard key={mandate.id} mandate={mandate} />
            ))}
          </TabsContent>

          <TabsContent value="bhim" className="mt-0">
            <div className="text-center py-10">
              <p className="text-muted-foreground text-sm">No active mandates on BHIM</p>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            {getFilteredMandates().map((mandate) => (
              <MandateCard key={mandate.id} mandate={mandate} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-4 bg-muted/30 border-border">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By viewing, details of all active mandates linked against your bank account will be visible in your UPI App
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Create New Mandate Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <Button
            className="w-full h-11 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-semibold text-sm transition-colors duration-200"
            onClick={() => navigate('/mandate-create')}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create New Mandate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mandates;