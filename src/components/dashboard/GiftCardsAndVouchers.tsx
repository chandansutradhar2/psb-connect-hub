import { Card, CardContent } from '@/components/ui/card';

interface GiftCategory {
  title: string;
  items: string[];
}

interface GiftCardsAndVouchersProps {
  giftCardsAndVouchers: GiftCategory[];
}

export const GiftCardsAndVouchers = ({ giftCardsAndVouchers }: GiftCardsAndVouchersProps) => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {giftCardsAndVouchers.map((category, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden cursor-pointer">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">{category.title}</h4>
            <div className="space-y-1">
              {category.items.map((item, itemIndex) => (
                <p key={itemIndex} className="text-sm text-gray-600">{item}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};