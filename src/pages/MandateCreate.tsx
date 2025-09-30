import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  payeeName: string;
  upiId: string;
  referenceId: string;
  remarks: string;
  validFrom: string;
  validTo: string;
  frequency: string;
  amountPerCycle: string;
  debitAccount: string;
}

const MandateCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    payeeName: '',
    upiId: '',
    referenceId: '',
    remarks: '',
    validFrom: '',
    validTo: '',
    frequency: 'as-presented',
    amountPerCycle: '',
    debitAccount: 'XXXX3272'
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.payeeName || !formData.upiId || !formData.amountPerCycle || !formData.validFrom || !formData.validTo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (new Date(formData.validFrom) > new Date(formData.validTo)) {
      toast({
        title: "Invalid Date Range",
        description: "Valid From date must be before Valid To date",
        variant: "destructive"
      });
      return;
    }

    navigate('/mandate-review', { state: { mandate: formData } });
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#134e5e] to-[#71b280] border-b border-border sticky top-0 z-40 w-full shadow-sm">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-white">Create Autopay Mandate</h1>
              <p className="text-xs text-white/80">Fill in the details below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 max-w-screen-xl mx-auto w-full space-y-3">
        {/* Info Card */}
        <Card className="bg-[#134e5e]/10 border-[#134e5e]/20 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm font-medium text-[#134e5e]">
              {formData.payeeName || 'Enter Payee Name Below'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All mandate operations (Pause, Revoke, Recurring Debit) will be managed via the BHIM UPI App.
            </p>
          </CardContent>
        </Card>

        {/* Form Fields */}
        <div className="space-y-2.5">
          {/* Payee Name */}
          <div className="space-y-1">
            <Label htmlFor="payeeName" className="text-sm font-medium text-foreground">
              Payee Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="payeeName"
              placeholder="Enter payee name"
              value={formData.payeeName}
              onChange={(e) => handleInputChange('payeeName', e.target.value)}
              className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
            />
          </div>

          {/* UPI ID */}
          <div className="space-y-1">
            <Label htmlFor="upiId" className="text-sm font-medium text-foreground">
              UPI ID <span className="text-destructive">*</span>
            </Label>
            <Input
              id="upiId"
              placeholder="username@bankname"
              value={formData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
            />
          </div>

          {/* Reference ID */}
          <div className="space-y-1">
            <Label htmlFor="referenceId" className="text-sm font-medium text-foreground">
              Reference ID
            </Label>
            <Input
              id="referenceId"
              placeholder="Enter reference ID (optional)"
              value={formData.referenceId}
              onChange={(e) => handleInputChange('referenceId', e.target.value)}
              className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
            />
          </div>

          {/* Remarks */}
          <div className="space-y-1">
            <Label htmlFor="remarks" className="text-sm font-medium text-foreground">
              Remarks
            </Label>
            <Input
              id="remarks"
              placeholder="Optional remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
            />
          </div>

          {/* Mandate Validity */}
          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">Mandate Validity <span className="text-destructive">*</span></Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="validFrom" className="text-xs text-muted-foreground">From</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => handleInputChange('validFrom', e.target.value)}
                  className="h-9 text-sm mt-0.5 border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
                />
              </div>
              <div>
                <Label htmlFor="validTo" className="text-xs text-muted-foreground">To</Label>
                <Input
                  id="validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => handleInputChange('validTo', e.target.value)}
                  className="h-9 text-sm mt-0.5 border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
                />
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-1">
            <Label htmlFor="frequency" className="text-sm font-medium text-foreground">
              Frequency
            </Label>
            <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
              <SelectTrigger className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="as-presented">As Presented</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cycles Completed */}
          <div className="space-y-1">
            <Label htmlFor="cyclesCompleted" className="text-sm font-medium text-foreground">
              Cycles Completed
            </Label>
            <Input
              id="cyclesCompleted"
              value="0"
              readOnly
              className="h-9 text-sm bg-muted/20 text-muted-foreground border-[#134e5e]/20"
            />
          </div>

          {/* Amount per Cycle */}
          <div className="space-y-1">
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">
              Amount per Cycle <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amountPerCycle}
                onChange={(e) => handleInputChange('amountPerCycle', e.target.value)}
                className="h-9 text-sm pl-6 border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]"
              />
            </div>
          </div>

          {/* Debit Account */}
          <div className="space-y-1">
            <Label htmlFor="debitAccount" className="text-sm font-medium text-foreground">
              Debit Account
            </Label>
            <Select value={formData.debitAccount} onValueChange={(value) => handleInputChange('debitAccount', value)}>
              <SelectTrigger className="h-9 text-sm border-[#134e5e]/20 focus:ring-[#71b280] focus:border-[#71b280]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XXXX3272">Bank of Baroda - XXXX3272</SelectItem>
                <SelectItem value="XXXX1234">Bank Name - XXXX1234</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Fixed Transfer Mandate Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-[#134e5e]/20 z-50">
        <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
          <Button
            className="w-full h-12 bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-md rounded-md transition-colors duration-200"
            onClick={handleSubmit}
          >
            Transfer Mandate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MandateCreate;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { ArrowLeft, Calendar } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const MandateCreate = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
//   const [formData, setFormData] = useState({
//     payeeName: '',
//     upiId: '',
//     referenceId: '',
//     remarks: '',
//     validFrom: '',
//     validTo: '',
//     frequency: 'as-presented',
//     amountPerCycle: '',
//     debitAccount: 'XXXX3272'
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     // Validate form
//     if (!formData.payeeName || !formData.upiId || !formData.amountPerCycle) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill in all required fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     // Navigate to review page
//     navigate('/mandate-review', { state: { mandate: formData } });
//   };

//   return (
//     <div className="min-h-screen bg-background pb-6">
//       {/* Header */}
//       <div className="bg-primary text-primary-foreground">
//         <div className="px-4 py-4">
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate(-1)}
//               className="rounded-full text-primary-foreground hover:bg-primary-foreground/20"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h1 className="text-xl font-bold">Autopay Request form</h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="px-4 mt-6 space-y-4">
//         {/* Info Card */}
//         <Card className="bg-primary/10 border-primary/20">
//           <CardContent className="p-4">
//             <p className="text-sm text-foreground font-medium mb-1">
//               {formData.payeeName || 'Payee Name'}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               Upon transferring, all mandate operations- Pause, Revoke, recurring debit shall happen via BHIM UPI App
//             </p>
//           </CardContent>
//         </Card>

//         {/* Form Fields */}
//         <div className="space-y-4">
//           {/* Payee Name */}
//           <div className="space-y-2">
//             <Label htmlFor="payeeName" className="text-sm font-medium">
//               Payee Name <span className="text-destructive">*</span>
//             </Label>
//             <Input
//               id="payeeName"
//               placeholder="Enter payee name"
//               value={formData.payeeName}
//               onChange={(e) => handleInputChange('payeeName', e.target.value)}
//               className="h-11"
//             />
//           </div>

//           {/* UPI ID */}
//           <div className="space-y-2">
//             <Label htmlFor="upiId" className="text-sm font-medium">
//               UPI <span className="text-destructive">*</span>
//             </Label>
//             <Input
//               id="upiId"
//               placeholder="username@bankname"
//               value={formData.upiId}
//               onChange={(e) => handleInputChange('upiId', e.target.value)}
//               className="h-11"
//             />
//           </div>

//           {/* Reference ID */}
//           <div className="space-y-2">
//             <Label htmlFor="referenceId" className="text-sm font-medium">
//               Reference ID
//             </Label>
//             <Input
//               id="referenceId"
//               placeholder="Auto-generated or enter manually"
//               value={formData.referenceId}
//               onChange={(e) => handleInputChange('referenceId', e.target.value)}
//               className="h-11 bg-muted/30"
//               disabled
//             />
//           </div>

//           {/* Remarks */}
//           <div className="space-y-2">
//             <Label htmlFor="remarks" className="text-sm font-medium">
//               Remarks
//             </Label>
//             <Input
//               id="remarks"
//               placeholder="Optional"
//               value={formData.remarks}
//               onChange={(e) => handleInputChange('remarks', e.target.value)}
//               className="h-11"
//             />
//           </div>

//           {/* Mandate Validity */}
//           <div className="space-y-2">
//             <Label className="text-sm font-medium">Mandate validity</Label>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <Label htmlFor="validFrom" className="text-xs text-muted-foreground">From</Label>
//                 <Input
//                   id="validFrom"
//                   type="date"
//                   value={formData.validFrom}
//                   onChange={(e) => handleInputChange('validFrom', e.target.value)}
//                   className="h-11 mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="validTo" className="text-xs text-muted-foreground">To</Label>
//                 <Input
//                   id="validTo"
//                   type="date"
//                   value={formData.validTo}
//                   onChange={(e) => handleInputChange('validTo', e.target.value)}
//                   className="h-11 mt-1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Frequency */}
//           <div className="space-y-2">
//             <Label htmlFor="frequency" className="text-sm font-medium">
//               Frequency
//             </Label>
//             <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="as-presented">As Presented</SelectItem>
//                 <SelectItem value="daily">Daily</SelectItem>
//                 <SelectItem value="weekly">Weekly</SelectItem>
//                 <SelectItem value="monthly">Monthly</SelectItem>
//                 <SelectItem value="quarterly">Quarterly</SelectItem>
//                 <SelectItem value="yearly">Yearly</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Cycles Completed */}
//           <div className="space-y-2">
//             <Label className="text-sm font-medium">Cycles Completed</Label>
//             <Input
//               value="0"
//               disabled
//               className="h-11 bg-muted/30"
//             />
//           </div>

//           {/* Amount per Cycle */}
//           <div className="space-y-2">
//             <Label htmlFor="amount" className="text-sm font-medium">
//               Amount per Cycle <span className="text-destructive">*</span>
//             </Label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
//               <Input
//                 id="amount"
//                 type="number"
//                 placeholder="0.00"
//                 value={formData.amountPerCycle}
//                 onChange={(e) => handleInputChange('amountPerCycle', e.target.value)}
//                 className="h-11 pl-7"
//               />
//             </div>
//           </div>

//           {/* Debit Account */}
//           <div className="space-y-2">
//             <Label htmlFor="debitAccount" className="text-sm font-medium">
//               Debit account
//             </Label>
//             <Select value={formData.debitAccount} onValueChange={(value) => handleInputChange('debitAccount', value)}>
//               <SelectTrigger className="h-11">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="XXXX3272">Bank of Baroda - XXXX3272</SelectItem>
//                 <SelectItem value="XXXX1234">Bank Name - XXXX1234</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <Button
//           className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
//           onClick={handleSubmit}
//         >
//           TRANSFER MANDATE
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MandateCreate;