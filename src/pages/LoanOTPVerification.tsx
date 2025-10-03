import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Smartphone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanOTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { loanType, formData, nextStep } = location.state || {};
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setVerificationStatus('verifying');
    
    // Simulate OTP verification
    setTimeout(() => {
      // Simulate success (in real app, this would be based on API response)
      const isSuccess = true; // Always success for demo
      
      if (isSuccess) {
        setVerificationStatus('success');
        toast({
          title: "OTP Verified",
          description: "Your mobile number has been verified successfully",
          className: "bg-blue-50 border-blue-200 text-blue-800"
        });
        
        // Navigate after a brief success display
        setTimeout(() => {
          navigate(nextStep || '/loan-eligibility-result', { 
            state: { loanType, formData, verified: true } 
          });
        }, 1500);
      } else {
        setVerificationStatus('error');
        toast({
          title: "Verification Failed",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOTP = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp('');
    setVerificationStatus('idle');
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your registered mobile number",
    });
  };

  const maskedPhone = "+91 ••••••7890"; // Mock masked phone number

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-md mx-auto flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">OTP Verification</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 space-y-6 pt-6">
          {/* Progress Bar */}
          {/* <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step 2 of 3</span>
              <span>66% Complete</span>
            </div>
            <Progress value={66} className="h-1.5 bg-gray-200" />
          </div> */}

          {/* Mobile Verification Card */}
          <div className=" text-center">
            <div className="mx-auto w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Mobile</h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter the 6-digit code sent to your registered mobile number
            </p>
            <p className="text-base font-medium text-gray-900">
              {maskedPhone}
            </p>
             <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 mb-4 text-sm">Enter verification code</h3>
                
                <div className="flex justify-center mb-6">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      setVerificationStatus('idle');
                    }}
                    disabled={isLoading}
                    autoFocus
                  >
                    <InputOTPGroup className="gap-3">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index} 
                          className="h-12 w-12 font-semibold border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {/* Status Indicator */}
                {verificationStatus === 'success' && (
                  <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg mb-4 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified successfully</span>
                  </div>
                )}
                
                {verificationStatus === 'error' && (
                  <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Incorrect OTP. Please try again.</span>
                  </div>
                )}
              </div>

              {/* Timer and Resend */}
              <div className="text-center">
                {!canResend ? (
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Resend code in {countdown}s</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-600 mr-2">Didn't receive the code?</span>
                    <button
                      onClick={handleResendOTP}
                      className="text-blue-600 font-medium text-sm hover:text-blue-700"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <Button 
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading || verificationStatus === 'success'}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4c] hover:to-[#5f9b6b] text-white text-sm font-medium transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : verificationStatus === 'success' ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verified
                </>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanOTPVerification;