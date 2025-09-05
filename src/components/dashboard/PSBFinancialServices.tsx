import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Service {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  path: string;
}

interface PSBFinancialServicesProps {
  psbFinancialServices: Service[];
}

export const PSBFinancialServices = ({ psbFinancialServices }: PSBFinancialServicesProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">PSB Financial Services</h3>
      {/* <p className="text-sm text-gray-600 mb-4">Explore our range of financial products to secure your future.</p> */}
      <div className="grid grid-cols-2 gap-4">
        {psbFinancialServices.map((service, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{service.title}</h4>
                  <p className="text-xs text-gray-500">{service.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};