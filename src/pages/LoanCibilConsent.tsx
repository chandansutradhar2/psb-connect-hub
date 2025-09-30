import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const LoanCibilConsent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const loanType = location.state?.loanType || 'personal';
  
  const [formData, setFormData] = useState({
    pan: '',
    dob: '',
    consent: false
  });
  const [errors, setErrors] = useState({ pan: '', dob: '' });
  const [isLoading, setIsLoading] = useState(false);

  const loanTypes = {
    personal: { name: 'Personal Loan', icon: <CreditCard className="h-5 w-5" /> },
    home: { name: 'Home Loan', icon: <CreditCard className="h-5 w-5" /> },
    car: { name: 'Car Loan', icon: <CreditCard className="h-5 w-5" /> },
    education: { name: 'Education Loan', icon: <CreditCard className="h-5 w-5" /> }
  };

  const currentLoan = loanTypes[loanType] || loanTypes.personal;

  const validateForm = () => {
    const newErrors = { pan: '', dob: '' };
    let isValid = true;

    // PAN validation
    if (!formData.pan) {
      newErrors.pan = 'PAN number is required';
      isValid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA9999A)';
      isValid = false;
    }

    // DOB validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    } else {
      const today = new Date();
      const dob = new Date(formData.dob);
      const age = today.getFullYear() - dob.getFullYear();
      const hasBirthdayOccurred = today.getMonth() > dob.getMonth() || 
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
      const actualAge = hasBirthdayOccurred ? age : age - 1;
      
      if (dob >= today || actualAge < 18) {
        newErrors.dob = 'You must be at least 18 years old';
        isValid = false;
      } else if (actualAge > 100) {
        newErrors.dob = 'Please enter a valid date of birth';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please provide consent to check your credit score",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent",
        description: "Please check your registered mobile number",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      navigate('/loan-otp-verification', { 
        state: { 
          loanType,
          formData,
          nextStep: '/loan-eligibility-result'
        } 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/loan-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Loan Eligibility Assessment</h1>
            <div className="w-9"></div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-600">
              <span>Step 1 of 3</span>
              <span>33% Complete</span>
            </div>
            <Progress value={33} className="h-1 bg-gray-200 rounded-full" />
          </div>

          {/* Loan Type */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              {currentLoan.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500">Applying for</p>
              <p className="font-medium text-gray-900">{currentLoan.name}</p>
            </div>
          </div>

          {/* Form Card */}
          <BankingCard title="Credit Score Authorization" className="rounded-lg border-gray-200 shadow-sm">
            <div className="space-y-6 p-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pan" className="text-sm font-medium text-gray-700 mb-1.5">
                    PAN Number *
                  </Label>
                  <Input
                    id="pan"
                    type="text"
                    placeholder="Enter PAN (e.g., AAAAA9999A)"
                    value={formData.pan}
                    onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                    className={`h-10 rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 ${errors.pan ? 'border-red-500' : ''}`}
                    maxLength={10}
                    aria-invalid={!!errors.pan}
                    aria-describedby="pan-error"
                  />
                  {errors.pan && (
                    <p id="pan-error" className="text-red-500 text-xs mt-1">{errors.pan}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1.5">
                    Date of Birth *
                  </Label>
                  <div className="relative">
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className={`h-10 rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 appearance-none ${errors.dob ? 'border-red-500' : ''}`}
                      max={format(new Date(), 'yyyy-MM-dd')}
                      aria-invalid={!!errors.dob}
                      aria-describedby="dob-error"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                  {errors.dob && (
                    <p id="dob-error" className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>

              {/* Consent */}
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                    className="mt-0.5 h-4 w-4 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 focus:ring-2 focus:ring-green-500"
                  />
                  <div className="text-sm text-gray-700">
                    <label htmlFor="consent" className="font-medium cursor-pointer">
                      I authorize Bank Name to access and process my credit score for loan eligibility assessment.
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      This is a soft inquiry that will not affect your credit score. Your information is securely stored in compliance with RBI guidelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="text-center gap-2 text-xs text-gray-600">
                {/* <Lock className="h-4 w-4 text-blue-600 flex" /> */}
                <p>Data encrypted and secured per RBI guidelines.</p>
              </div>
            </div>
          </BankingCard>
        </div>

        {/* Fixed Proceed Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm p-4 z-10">
          <div className=" mx-auto">
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-[#134e5e] to-[#71b280] hover:from-[#0f3f4c] hover:to-[#5f9b6b] text-white text-sm font-medium transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing
                </>
              ) : (
                'Proceed to Verification'
              )}
            </Button>
          </div>
        </div>

     
      </div>
    </BankingLayout>
  );
};

export default LoanCibilConsent;