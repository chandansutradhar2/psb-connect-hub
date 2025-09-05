import { Card, CardContent } from '@/components/ui/card';

interface Promotion {
  title: string;
  description: string;
  color: string;
}

interface PromotionsAndRewardsProps {
  promotions: Promotion[];
}

export const PromotionsAndRewards = ({ promotions }: PromotionsAndRewardsProps) => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {promotions.map((promotion, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-br ${promotion.color} text-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
        >
          <CardContent className="p-4">
            <h4 className="font-semibold mb-1">{promotion.title}</h4>
            <p className="text-sm opacity-90">{promotion.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};