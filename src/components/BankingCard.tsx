
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BankingCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'gradient' | 'account' | 'action';
  icon?: ReactNode;
  onClick?: () => void;
}

export const BankingCard = ({ 
  children, 
  title, 
  className, 
  variant = 'default',
  icon,
  onClick 
}: BankingCardProps) => {
  const getVariantClasses = () => {
    const base = 'rounded-3xl border transition-all duration-300 ease-out backdrop-blur-sm';
    switch (variant) {
      case 'gradient':
        return cn(
          base,
          'bg-gradient-to-br from-primary/95 via-primary to-primary-dark text-white',
          'shadow-xl hover:shadow-2xl hover:scale-[1.01] border-0'
        );
      case 'account':
        return cn(
          base,
          'bg-gradient-to-br from-card via-card to-muted/30 border-l-4 border-l-primary',
          'shadow-md hover:shadow-lg border-border/50'
        );
      case 'action':
        return cn(
          base,
          'border-border/50 shadow-sm hover:shadow-lg hover:scale-[1.01]',
          'bg-card/80 backdrop-blur-md hover:bg-card'
        );
      default:
        return cn(
          base,
          'bg-card/90 shadow-sm hover:shadow-md border-border/50',
          'backdrop-blur-md hover:bg-card'
        );
    }
  };

  return (
    <Card
      className={cn(
        getVariantClasses(), 
        className, 
        onClick && 'cursor-pointer focus-ring group'
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className={cn(
            "flex items-center gap-3 text-lg font-bold tracking-tight",
            onClick && "group-hover:text-primary transition-colors duration-200"
          )}>
            {icon && (
              <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                {icon}
              </span>
            )}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(
        title ? 'pt-0' : 'pt-6',
        "animate-fade-in"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};
