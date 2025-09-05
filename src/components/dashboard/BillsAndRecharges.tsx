import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Bill {
  icon: JSX.Element;
  title: string;
  provider: string;
}

interface BillsAndRechargesProps {
  billsAndRecharges: Bill[];
}

export const BillsAndRecharges = ({ billsAndRecharges }: BillsAndRechargesProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Bills & Recharges</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/bills')} className="text-gray-600">
          Manage <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {billsAndRecharges.map((bill, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  {bill.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{bill.title}</h4>
                  <p className="text-sm text-gray-500">{bill.provider}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};