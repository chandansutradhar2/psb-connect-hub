import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, FileText, Calculator, Award } from 'lucide-react';

const StatementsCenter = () => {
  const navigate = useNavigate();

  return (
    <BankingLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Statements & Certificates</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="space-y-3">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Account Statement</h3>
              <p className="text-sm text-muted-foreground">Download account statements</p>
              <Button size="sm" className="w-full">Download</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="space-y-3">
              <Calculator className="h-8 w-8 text-green-600" />
              <h3 className="font-semibold">TDS Certificate</h3>
              <p className="text-sm text-muted-foreground">Download TDS certificates</p>
              <Button size="sm" className="w-full">Download</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="space-y-3">
              <Award className="h-8 w-8 text-blue-600" />
              <h3 className="font-semibold">Balance Certificate</h3>
              <p className="text-sm text-muted-foreground">Get balance certificate</p>
              <Button size="sm" className="w-full">Request</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md">
            <div className="space-y-3">
              <Download className="h-8 w-8 text-purple-600" />
              <h3 className="font-semibold">Interest Certificate</h3>
              <p className="text-sm text-muted-foreground">Download interest certificates</p>
              <Button size="sm" className="w-full">Download</Button>
            </div>
          </BankingCard>
        </div>
      </div>
    </BankingLayout>
  );
};

export default StatementsCenter;