import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();

  return (
    <BankingLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Support & Feedback</h1>
        </div>

        <BankingCard>
          <h3 className="font-semibold mb-4">Send Feedback</h3>
          <div className="space-y-4">
            <Textarea placeholder="Share your feedback or report an issue..." rows={5} />
            <Button className="w-full">Submit Feedback</Button>
          </div>
        </BankingCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BankingCard className="text-center">
            <Phone className="h-8 w-8 mx-auto text-primary mb-3" />
            <h3 className="font-semibold">24/7 Helpline</h3>
            <p className="text-sm text-muted-foreground mb-3">1800-123-4567</p>
            <Button size="sm">Call Now</Button>
          </BankingCard>

          <BankingCard className="text-center">
            <Mail className="h-8 w-8 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">support@psbank.in</p>
            <Button size="sm">Send Email</Button>
          </BankingCard>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Support;