
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const QuickAction = ({ 
  icon, 
  title, 
  onClick, 
  className,
  variant = 'primary' 
}: QuickActionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary/70 text-secondary-foreground border-secondary/20 hover:bg-secondary';
      case 'outline':
        return 'bg-background border-2 border-border text-foreground hover:border-primary/40 hover:bg-muted/30';
      default:
        return 'bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground hover:shadow-lg';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98] min-h-[120px] space-y-3",
        "border backdrop-blur-sm focus-ring shadow-sm hover:shadow-md",
        getVariantClasses(),
        className
      )}
    >
      <div className={cn(
        "text-2xl transition-transform duration-200 group-hover:scale-110",
        "flex items-center justify-center w-12 h-12 rounded-2xl",
        variant === 'primary' ? 'bg-white/20' : 'bg-primary/10'
      )}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-center leading-tight tracking-wide">
        {title}
      </span>
    </button>
  );
};
