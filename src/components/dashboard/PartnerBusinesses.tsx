import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Business {
  icon: JSX.Element;
  title: string;
  color: string;
}

interface PartnerBusinessesProps {
  partnerBusinesses: Business[];
}

export const PartnerBusinesses = ({ partnerBusinesses }: PartnerBusinessesProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Partner Businesses</h3>
        <Button variant="ghost" size="sm" className="text-gray-600">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {partnerBusinesses.map((business, index) => (
          <div key={index} className="text-center">
            <div className={`w-14 h-14 ${business.color} rounded-xl flex items-center justify-center text-white mb-2 mx-auto shadow-sm`}>
              {business.icon}
            </div>
            <p className="text-sm font-medium text-gray-800">{business.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};