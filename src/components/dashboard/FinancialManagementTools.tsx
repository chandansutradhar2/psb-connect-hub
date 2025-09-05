import { Card, CardContent } from '@/components/ui/card';
import { Wallet, TrendingUp, ChevronRight } from 'lucide-react';

export const FinancialManagementTools = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Management Tools</h3>
      <Card className="shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-4 space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-800">Check CIBIL Score (Free)</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-800">View Bank Balance Details</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>
    </section>
  );
};