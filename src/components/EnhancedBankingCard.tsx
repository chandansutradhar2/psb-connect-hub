import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useResponsive } from '@/hooks/useResponsive';
import { useGestures } from '@/hooks/useGestures';
import { cn } from '@/lib/utils';

interface EnhancedBankingCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enableAnimations?: boolean;
  enableGestures?: boolean;
  variant?: 'default' | 'elevated' | 'flat' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const EnhancedBankingCard = forwardRef<HTMLDivElement, EnhancedBankingCardProps>(({
  children,
  className,
  onClick,
  onSwipeLeft,
  onSwipeRight,
  enableAnimations = true,
  enableGestures = true,
  variant = 'default',
  padding = 'md',
  ...props
}, ref) => {
  const { isMobile } = useResponsive();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const gestureHandlers = useGestures({
    onSwipeLeft,
    onSwipeRight,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    },
    hover: {
      y: -2,
      scale: 1.02
    },
    tap: {
      scale: 0.98
    }
  };

  const variantClasses = {
    default: 'bg-card border border-border shadow-sm',
    elevated: 'bg-card border border-border shadow-md',
    flat: 'bg-card border-0',
    gradient: 'bg-gradient-to-br from-card via-card to-accent/5 border border-border/50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const combinedClasses = cn(
    'rounded-xl transition-all duration-200',
    variantClasses[variant],
    paddingClasses[padding],
    onClick && 'cursor-pointer',
    isMobile && 'active:scale-[0.98] active:bg-accent/50',
    className
  );

  const CardComponent = enableAnimations ? motion.div : 'div';

  const cardProps = enableAnimations ? {
    ref: ref,
    variants: cardVariants,
    initial: "hidden",
    animate: inView ? "visible" : "hidden",
    whileHover: !isMobile ? "hover" : undefined,
    whileTap: "tap",
    onClick,
    className: combinedClasses,
    ...(enableGestures ? gestureHandlers : {}),
    ...props
  } : {
    ref: ref,
    onClick,
    className: combinedClasses,
    ...(enableGestures ? gestureHandlers : {}),
    ...props
  };

  return (
    <div ref={inViewRef}>
      <CardComponent {...cardProps}>
        {children}
      </CardComponent>
    </div>
  );
});

EnhancedBankingCard.displayName = 'EnhancedBankingCard';