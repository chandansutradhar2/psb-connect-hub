
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowLeft, User, Users, Shield, ArrowRight, AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define interfaces for type safety
interface Plan {
  name: string;
  coverage: string;
  premium: string;
}

interface LocationState {
  plan?: Plan;
  insuranceType?: string;
}

interface FormData {
  fullName: string;
  dateOfBirth: string;
  panNumber: string;
  aadhaarNumber: string;
  address: string;
  mobile: string;
  email: string;
  occupation: string;
  annualIncome: string;
  height: string;
  weight: string;
  smokingHabit: string;
  drinkingHabit: string;
  medicalHistory: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeDOB: string;
  nomineeAddress: string;
}

interface FormErrors {
  mobile?: string;
  email?: string;
  occupation?: string;
  annualIncome?: string;
  height?: string;
  weight?: string;
  smokingHabit?: string;
  drinkingHabit?: string;
  nomineeName?: string;
  nomineeRelation?: string;
  nomineeDOB?: string;
}

const InsuranceKYC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useLocation() as { state: LocationState };
  const { plan, insuranceType } = state || {};
  const [formData, setFormData] = useState<FormData>({
    fullName: 'Dheeraj Sharma',
    dateOfBirth: '1990-06-15',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '1234-5678-9012',
    address: '123, Model Town, Ludhiana, Punjab - 141002',
    mobile: '+91 98765 43210',
    email: 'dheeraj.sharma@email.com',
    occupation: '',
    annualIncome: '',
    height: '',
    weight: '',
    smokingHabit: '',
    drinkingHabit: '',
    medicalHistory: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineeDOB: '',
    nomineeAddress: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle missing plan data
  if (!plan) {
    return (
      <BankingLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-600 mb-4">Plan details not found</p>
          <Button
            onClick={() => navigate('/insurance-plans')}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            aria-label="Go back to insurance plans"
          >
            Go Back
          </Button>
        </div>
      </BankingLayout>
    );
  }

  // Form validation
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    const mobileRegex = /^\+91\s\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid mobile number (e.g., +91 9876543210)';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.occupation) {
      errors.occupation = 'Please select an occupation';
    }
    if (!formData.annualIncome) {
      errors.annualIncome = 'Please select an income range';
    }
    if ((insuranceType === 'health' || insuranceType === 'life') && !formData.height) {
      errors.height = 'Please enter your height';
    }
    if ((insuranceType === 'health' || insuranceType === 'life') && !formData.weight) {
      errors.weight = 'Please enter your weight';
    }
    if ((insuranceType === 'health' || insuranceType === 'life') && !formData.smokingHabit) {
      errors.smokingHabit = 'Please select a smoking habit';
    }
    if ((insuranceType === 'health' || insuranceType === 'life') && !formData.drinkingHabit) {
      errors.drinkingHabit = 'Please select a drinking habit';
    }
    if (!formData.nomineeName) {
      errors.nomineeName = 'Please enter nominee name';
    }
    if (!formData.nomineeRelation) {
      errors.nomineeRelation = 'Please select nominee relation';
    }
    if (!formData.nomineeDOB) {
      errors.nomineeDOB = 'Please enter nominee date of birth';
    }

    return errors;
  };

  // Handle form submission
  const handleContinue = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: 'Form Error',
        description: 'Please fill all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'KYC Submitted',
        description: 'Your details have been saved. Proceeding to coverage selection.',
        variant: 'default',
      });
      navigate('/insurance-coverage-selection', { state: { plan, insuranceType, kycData: formData } });
    }, 1000); // Simulate API call
  };

  return (
    <div className=" min-h-screen pb-24 bg-gray-50">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-blue-50 transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">KYC & Personal Details</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </header>

        {/* Progress Bar */}
        <section>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-blue-600 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Step 1 of 4</p>
        </section>

        {/* Plan Summary */}
        <BankingCard className="rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800">{plan.name}</h3>
              <p className="text-sm text-gray-600">Coverage: {plan.coverage}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-blue-800">{plan.premium}</p>
              <p className="text-xs text-gray-600">Annual Premium</p>
            </div>
          </div>
        </BankingCard>

        {/* Personal Details */}
        <BankingCard title="Personal Details" icon={<User className="h-5 w-5 text-blue-600" />} className="rounded-2xl shadow-md">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  className="bg-gray-100"
                  disabled
                  aria-readonly="true"
                />
                <p className="text-xs text-gray-500 mt-1">From bank records</p>
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  className="bg-gray-100"
                  disabled
                  aria-readonly="true"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  className="bg-gray-100"
                  disabled
                  aria-readonly="true"
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  className="bg-gray-100"
                  disabled
                  aria-readonly="true"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                className="bg-gray-100"
                disabled
                aria-readonly="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={formErrors.mobile ? 'border-red-500' : ''}
                  aria-invalid={!!formErrors.mobile}
                  aria-describedby={formErrors.mobile ? 'mobile-error' : undefined}
                />
                {formErrors.mobile && (
                  <p id="mobile-error" className="text-xs text-red-600 mt-1">{formErrors.mobile}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={formErrors.email ? 'border-red-500' : ''}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, occupation: value })}
                aria-invalid={!!formErrors.occupation}
                aria-describedby={formErrors.occupation ? 'occupation-error' : undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.occupation && (
                <p id="occupation-error" className="text-xs text-red-600 mt-1">{formErrors.occupation}</p>
              )}
            </div>
            <div>
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, annualIncome: value })}
                aria-invalid={!!formErrors.annualIncome}
                aria-describedby={formErrors.annualIncome ? 'annualIncome-error' : undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-3">₹0 - ₹3 Lakh</SelectItem>
                  <SelectItem value="3-5">₹3 - ₹5 Lakh</SelectItem>
                  <SelectItem value="5-10">₹5 - ₹10 Lakh</SelectItem>
                  <SelectItem value="10+">₹10+ Lakh</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.annualIncome && (
                <p id="annualIncome-error" className="text-xs text-red-600 mt-1">{formErrors.annualIncome}</p>
              )}
            </div>
          </div>
        </BankingCard>

        {/* Health Details (for Health/Life Insurance) */}
        {(insuranceType === 'health' || insuranceType === 'life') && (
          <BankingCard title="Health Information" icon={<Shield className="h-5 w-5 text-blue-600" />} className="rounded-2xl shadow-md">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className={formErrors.height ? 'border-red-500' : ''}
                    aria-invalid={!!formErrors.height}
                    aria-describedby={formErrors.height ? 'height-error' : undefined}
                  />
                  {formErrors.height && (
                    <p id="height-error" className="text-xs text-red-600 mt-1">{formErrors.height}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className={formErrors.weight ? 'border-red-500' : ''}
                    aria-invalid={!!formErrors.weight}
                    aria-describedby={formErrors.weight ? 'weight-error' : undefined}
                  />
                  {formErrors.weight && (
                    <p id="weight-error" className="text-xs text-red-600 mt-1">{formErrors.weight}</p>
                  )}
                </div>
              </div>
              <div>
                <Label>Smoking Habit</Label>
                <RadioGroup
                  value={formData.smokingHabit}
                  onValueChange={(value) => setFormData({ ...formData, smokingHabit: value })}
                  className="flex flex-wrap gap-4 mt-2"
                  aria-invalid={!!formErrors.smokingHabit}
                  aria-describedby={formErrors.smokingHabit ? 'smokingHabit-error' : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="smoke-no" />
                    <Label htmlFor="smoke-no">Never</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="smoke-occasional" />
                    <Label htmlFor="smoke-occasional">Occasional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="smoke-regular" />
                    <Label htmlFor="smoke-regular">Regular</Label>
                  </div>
                </RadioGroup>
                {formErrors.smokingHabit && (
                  <p id="smokingHabit-error" className="text-xs text-red-600 mt-1">{formErrors.smokingHabit}</p>
                )}
              </div>
              <div>
                <Label>Drinking Habit</Label>
                <RadioGroup
                  value={formData.drinkingHabit}
                  onValueChange={(value) => setFormData({ ...formData, drinkingHabit: value })}
                  className="flex flex-wrap gap-4 mt-2"
                  aria-invalid={!!formErrors.drinkingHabit}
                  aria-describedby={formErrors.drinkingHabit ? 'drinkingHabit-error' : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="drink-no" />
                    <Label htmlFor="drink-no">Never</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social" id="drink-social" />
                    <Label htmlFor="drink-social">Social</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="drink-regular" />
                    <Label htmlFor="drink-regular">Regular</Label>
                  </div>
                </RadioGroup>
                {formErrors.drinkingHabit && (
                  <p id="drinkingHabit-error" className="text-xs text-red-600 mt-1">{formErrors.drinkingHabit}</p>
                )}
              </div>
            </div>
          </BankingCard>
        )}

        {/* Nominee Details */}
        <BankingCard title="Nominee Details" icon={<Users className="h-5 w-5 text-blue-600" />} className="rounded-2xl shadow-md">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomineeName">Nominee Name</Label>
                <Input
                  id="nomineeName"
                  placeholder="Enter nominee name"
                  value={formData.nomineeName}
                  onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                  className={formErrors.nomineeName ? 'border-red-500' : ''}
                  aria-invalid={!!formErrors.nomineeName}
                  aria-describedby={formErrors.nomineeName ? 'nomineeName-error' : undefined}
                />
                {formErrors.nomineeName && (
                  <p id="nomineeName-error" className="text-xs text-red-600 mt-1">{formErrors.nomineeName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="nomineeRelation">Relation</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, nomineeRelation: value })}
                  aria-invalid={!!formErrors.nomineeRelation}
                  aria-describedby={formErrors.nomineeRelation ? 'nomineeRelation-error' : undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="brother">Brother</SelectItem>
                    <SelectItem value="sister">Sister</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.nomineeRelation && (
                  <p id="nomineeRelation-error" className="text-xs text-red-600 mt-1">{formErrors.nomineeRelation}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomineeDOB">Nominee Date of Birth</Label>
                <Input
                  id="nomineeDOB"
                  type="date"
                  value={formData.nomineeDOB}
                  onChange={(e) => setFormData({ ...formData, nomineeDOB: e.target.value })}
                  className={formErrors.nomineeDOB ? 'border-red-500' : ''}
                  aria-invalid={!!formErrors.nomineeDOB}
                  aria-describedby={formErrors.nomineeDOB ? 'nomineeDOB-error' : undefined}
                />
                {formErrors.nomineeDOB && (
                  <p id="nomineeDOB-error" className="text-xs text-red-600 mt-1">{formErrors.nomineeDOB}</p>
                )}
              </div>
              <div>
                <Label htmlFor="nomineeAddress">Nominee Address</Label>
                <Input
                  id="nomineeAddress"
                  placeholder="Enter nominee address"
                  value={formData.nomineeAddress}
                  onChange={(e) => setFormData({ ...formData, nomineeAddress: e.target.value })}
                />
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Continue Button */}
        {/* <div className="sticky bottom-4 z-10"> */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button
            onClick={handleContinue}
             size="lg"
            className="w-full rounded-lg h-12 text-white shadow-md transition-colors"
            disabled={isSubmitting}
            aria-label="Continue to coverage selection"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceKYC;




// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Checkbox } from '@/components/ui/checkbox';
// import { 
//   ArrowLeft, 
//   User,
//   Users,
//   Shield,
//   CheckCircle,
//   ArrowRight
// } from 'lucide-react';

// const InsuranceKYC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { plan, insuranceType } = location.state || {};
  
//   const [formData, setFormData] = useState({
//     // Pre-filled from bank KYC
//     fullName: 'Dheeraj Sharma',
//     dateOfBirth: '1990-06-15',
//     panNumber: 'ABCDE1234F',
//     aadhaarNumber: '1234-5678-9012',
//     address: '123, Model Town, Ludhiana, Punjab - 141002',
    
//     // Additional details
//     mobile: '+91 98765 43210',
//     email: 'dheeraj.sharma@email.com',
//     occupation: '',
//     annualIncome: '',
    
//     // Health specific
//     height: '',
//     weight: '',
//     smokingHabit: '',
//     drinkingHabit: '',
//     medicalHistory: '',
    
//     // Nominee details
//     nomineeName: '',
//     nomineeRelation: '',
//     nomineeDOB: '',
//     nomineeAddress: ''
//   });

//   const handleContinue = () => {
//     navigate('/insurance-coverage-selection', { state: { plan, insuranceType, kycData: formData } });
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => navigate(-1)}
//             className="rounded-full p-2"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-lg font-semibold">KYC & Personal Details</h1>
//           <div className="w-10" />
//         </div>

//         {/* Progress */}
//         <div className="flex items-center space-x-2 px-4">
//           <div className="flex-1 h-2 bg-psb-primary rounded-full" />
//           <div className="flex-1 h-2 bg-muted rounded-full" />
//           <div className="flex-1 h-2 bg-muted rounded-full" />
//           <div className="flex-1 h-2 bg-muted rounded-full" />
//         </div>
//         <p className="text-center text-sm text-muted-foreground">Step 1 of 4</p>

//         {/* Plan Summary */}
//         <BankingCard className="rounded-2xl bg-gradient-to-r from-psb-primary/10 to-psb-secondary/10 border-psb-primary/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-psb-primary">{plan?.name}</h3>
//               <p className="text-sm text-muted-foreground">Coverage: {plan?.coverage}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-bold text-psb-primary">{plan?.premium}</p>
//               <p className="text-xs text-muted-foreground">Annual Premium</p>
//             </div>
//           </div>
//         </BankingCard>

//         {/* Personal Details */}
//         <BankingCard title="Personal Details" icon={<User className="h-5 w-5" />} className="rounded-2xl">
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input 
//                   id="fullName" 
//                   value={formData.fullName} 
//                   className="bg-muted/50" 
//                   disabled
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">From bank records</p>
//               </div>
//               <div>
//                 <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                 <Input 
//                   id="dateOfBirth" 
//                   type="date" 
//                   value={formData.dateOfBirth} 
//                   className="bg-muted/50" 
//                   disabled
//                 />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="mobile">Mobile Number</Label>
//                 <Input 
//                   id="mobile" 
//                   value={formData.mobile} 
//                   onChange={(e) => setFormData({...formData, mobile: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input 
//                   id="email" 
//                   type="email" 
//                   value={formData.email} 
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="occupation">Occupation</Label>
//               <Select onValueChange={(value) => setFormData({...formData, occupation: value})}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select occupation" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="salaried">Salaried</SelectItem>
//                   <SelectItem value="business">Business</SelectItem>
//                   <SelectItem value="professional">Professional</SelectItem>
//                   <SelectItem value="retired">Retired</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="annualIncome">Annual Income</Label>
//               <Select onValueChange={(value) => setFormData({...formData, annualIncome: value})}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select income range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-3">₹0 - ₹3 Lakh</SelectItem>
//                   <SelectItem value="3-5">₹3 - ₹5 Lakh</SelectItem>
//                   <SelectItem value="5-10">₹5 - ₹10 Lakh</SelectItem>
//                   <SelectItem value="10+">₹10+ Lakh</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </BankingCard>

//         {/* Health Details (for Health/Life Insurance) */}
//         {(insuranceType === 'health' || insuranceType === 'life') && (
//           <BankingCard title="Health Information" icon={<Shield className="h-5 w-5" />} className="rounded-2xl">
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="height">Height (cm)</Label>
//                   <Input 
//                     id="height" 
//                     placeholder="170" 
//                     value={formData.height}
//                     onChange={(e) => setFormData({...formData, height: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="weight">Weight (kg)</Label>
//                   <Input 
//                     id="weight" 
//                     placeholder="70" 
//                     value={formData.weight}
//                     onChange={(e) => setFormData({...formData, weight: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label>Smoking Habit</Label>
//                 <RadioGroup 
//                   value={formData.smokingHabit} 
//                   onValueChange={(value) => setFormData({...formData, smokingHabit: value})}
//                   className="flex space-x-6 mt-2"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="no" id="smoke-no" />
//                     <Label htmlFor="smoke-no">Never</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="occasional" id="smoke-occasional" />
//                     <Label htmlFor="smoke-occasional">Occasional</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="regular" id="smoke-regular" />
//                     <Label htmlFor="smoke-regular">Regular</Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div>
//                 <Label>Drinking Habit</Label>
//                 <RadioGroup 
//                   value={formData.drinkingHabit} 
//                   onValueChange={(value) => setFormData({...formData, drinkingHabit: value})}
//                   className="flex space-x-6 mt-2"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="no" id="drink-no" />
//                     <Label htmlFor="drink-no">Never</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="social" id="drink-social" />
//                     <Label htmlFor="drink-social">Social</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="regular" id="drink-regular" />
//                     <Label htmlFor="drink-regular">Regular</Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </div>
//           </BankingCard>
//         )}

//         {/* Nominee Details */}
//         <BankingCard title="Nominee Details" icon={<Users className="h-5 w-5" />} className="rounded-2xl">
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="nomineeName">Nominee Name</Label>
//                 <Input 
//                   id="nomineeName" 
//                   placeholder="Enter nominee name"
//                   value={formData.nomineeName}
//                   onChange={(e) => setFormData({...formData, nomineeName: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="nomineeRelation">Relation</Label>
//                 <Select onValueChange={(value) => setFormData({...formData, nomineeRelation: value})}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select relation" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="spouse">Spouse</SelectItem>
//                     <SelectItem value="father">Father</SelectItem>
//                     <SelectItem value="mother">Mother</SelectItem>
//                     <SelectItem value="son">Son</SelectItem>
//                     <SelectItem value="daughter">Daughter</SelectItem>
//                     <SelectItem value="brother">Brother</SelectItem>
//                     <SelectItem value="sister">Sister</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
            
//             <div>
//               <Label htmlFor="nomineeDOB">Nominee Date of Birth</Label>
//               <Input 
//                 id="nomineeDOB" 
//                 type="date"
//                 value={formData.nomineeDOB}
//                 onChange={(e) => setFormData({...formData, nomineeDOB: e.target.value})}
//               />
//             </div>
//           </div>
//         </BankingCard>

//         {/* Continue Button */}
//         <div className="sticky bottom-4">
//           <Button 
//             onClick={handleContinue}
//             className="w-full rounded-2xl h-14 text-lg bg-psb-primary hover:bg-psb-primary/90"
//           >
//             Continue
//             <ArrowRight className="h-5 w-5 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default InsuranceKYC;


