import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();
  const [isFeedbackFocused, setIsFeedbackFocused] = useState(false);

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1178AC] to-[#1397DA] border-b border-[#1178AC]/20 sticky top-0 z-40 w-full shadow-sm">
          <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="h-9 w-9 rounded-full text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-base sm:text-lg font-semibold text-white">Support & Feedback</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-5 max-w-screen-xl mx-auto space-y-4">
          <BankingCard className="bg-gradient-to-r from-[#1178AC]/10 to-[#1397DA]/10 border-[#1178AC]/20">
            <h3 className="font-semibold text-base text-[#1178AC] mb-3">Send Feedback</h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Share your feedback or report an issue..."
                rows={5}
                className="border-[#1178AC]/20 focus:ring-[#1397DA] text-sm"
                onFocus={() => setIsFeedbackFocused(true)}
                onBlur={() => setIsFeedbackFocused(false)}
              />
              {!isFeedbackFocused && (
                <Button
                  className="w-full h-9 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-sm rounded-lg"
                >
                  Submit Feedback
                </Button>
              )}
            </div>
          </BankingCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BankingCard className="text-center bg-white border-[#1178AC]/20">
              <Phone className="h-6 w-6 mx-auto text-[#1178AC] mb-2" />
              <h3 className="font-semibold text-base text-[#1178AC]">24/7 Helpline</h3>
              <p className="text-xs text-muted-foreground mb-2">1800-123-4567</p>
              <Button
                size="sm"
                className="h-9 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-sm rounded-lg"
              >
                Call Now
              </Button>
            </BankingCard>

            <BankingCard className="text-center bg-white border-[#1178AC]/20">
              <Mail className="h-6 w-6 mx-auto text-[#1178AC] mb-2" />
              <h3 className="font-semibold text-base text-[#1178AC]">Email Support</h3>
              <p className="text-xs text-muted-foreground mb-2">support@psbank.in</p>
              <Button
                size="sm"
                className="h-9 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-sm rounded-lg"
              >
                Send Email
              </Button>
            </BankingCard>
          </div>
        </div>

        {/* Fixed Footer */}
        {isFeedbackFocused && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-[#1178AC]/20 z-50">
            <div className="px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
              <Button
                className="w-full h-9 bg-gradient-to-r from-[#1178AC] to-[#1397DA] hover:from-[#0f3f4b] hover:to-[#5e9b6a] text-white font-medium text-sm rounded-lg"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </div>
    </BankingLayout>
  );
};

export default Support;