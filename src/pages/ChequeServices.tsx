import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, StopCircle, Eye, CheckCircle } from 'lucide-react';

const ChequeServices = () => {
  const navigate = useNavigate();

  return (
    <BankingLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Cheque Services</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="text-center space-y-3">
              <FileText className="h-8 w-8 mx-auto text-primary" />
              <h3 className="font-semibold">Request Cheque Book</h3>
              <p className="text-sm text-muted-foreground">Order new cheque book</p>
              <Button size="sm" className="w-full">Request</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="text-center space-y-3">
              <StopCircle className="h-8 w-8 mx-auto text-red-600" />
              <h3 className="font-semibold">Stop Payment</h3>
              <p className="text-sm text-muted-foreground">Stop cheque payment</p>
              <Button size="sm" className="w-full">Stop Payment</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="text-center space-y-3">
              <Eye className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="font-semibold">Track Status</h3>
              <p className="text-sm text-muted-foreground">Track cheque status</p>
              <Button size="sm" className="w-full">Track</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="text-center space-y-3">
              <CheckCircle className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="font-semibold">Positive Pay</h3>
              <p className="text-sm text-muted-foreground">Submit cheque details</p>
              <Button size="sm" className="w-full">Submit</Button>
            </div>
          </BankingCard>
        </div>
      </div>
    </BankingLayout>
  );
};

export default ChequeServices;