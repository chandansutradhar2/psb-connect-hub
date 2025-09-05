import { useNavigate } from "react-router-dom";
import { BankingLayout } from "@/components/BankingLayout";
import { BankingCard } from "@/components/BankingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    { question: "How to reset my login password?", category: "Login Issues" },
    { question: "What are the transaction limits?", category: "Transactions" },
    { question: "How to add a new beneficiary?", category: "Fund Transfer" },
    { question: "What are the service charges?", category: "Charges" },
  ];

  return (
    <BankingLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-auto mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Help Center
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for help..."
            className="pl-10 py-2 sm:py-3 text-sm sm:text-base rounded-full"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-16 sm:h-20 flex-col rounded-xl"
            onClick={() => navigate("/chat-support")}
          >
            <MessageCircle className="h-6 w-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm">Live Chat</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 sm:h-20 flex-col rounded-xl"
          >
            <Phone className="h-6 w-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm">Call Us</span>
          </Button>
        </div>

        {/* FAQs */}
        <BankingCard>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition"
              >
                <h4 className="font-medium text-sm sm:text-base">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {faq.category}
                </p>
              </div>
            ))}
          </div>
        </BankingCard>

        {/* Contact Info */}
        <BankingCard className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">
            Contact Information
          </h4>
          <div className="space-y-3 text-sm sm:text-base text-blue-700">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>Customer Care: 1800-123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>Email: support@psbank.in</span>
            </div>
          </div>
        </BankingCard>
      </div>
    </BankingLayout>
  );
};

export default HelpCenter;
