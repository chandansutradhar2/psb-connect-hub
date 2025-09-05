import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({ 
  className, 
  variant = 'rectangular',
  animation = 'pulse'
}: SkeletonProps) => {
  const pulseVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6]
    }
  };

  const waveVariants = {
    wave: {
      backgroundPosition: ['200% 0', '-200% 0']
    }
  };

  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm h-4'
  };

  const animationClasses = {
    pulse: 'bg-muted',
    wave: 'bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]',
    none: 'bg-muted'
  };

  const Component = animation !== 'none' ? motion.div : 'div';

  return (
    <Component
      className={cn(
        'animate-pulse',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      {...(animation === 'pulse' ? { variants: pulseVariants, animate: 'pulse' } : {})}
      {...(animation === 'wave' ? { variants: waveVariants, animate: 'wave' } : {})}
    />
  );
};

export const CardSkeleton = () => (
  <div className="space-y-3 p-4 border border-border rounded-xl">
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" className="h-10 w-10" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton variant="rectangular" className="h-20 w-full" />
  </div>
);

export const TransactionSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" className="h-8 w-8" />
          <div className="space-y-1">
            <Skeleton variant="text" className="h-3 w-24" />
            <Skeleton variant="text" className="h-2 w-16" />
          </div>
        </div>
        <Skeleton variant="text" className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => {
  const { isMobile } = useResponsive();

  return (
    <div className="space-y-6 p-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" className="h-10 w-10" />
          <div className="space-y-1">
            <Skeleton variant="text" className="h-3 w-20" />
            <Skeleton variant="text" className="h-4 w-32" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Skeleton variant="circular" className="h-8 w-8" />
          <Skeleton variant="circular" className="h-8 w-8" />
        </div>
      </div>

      {/* Account Card Skeleton */}
      <Skeleton 
        variant="rectangular" 
        className={cn(
          "h-32 w-full rounded-2xl",
          isMobile ? "mx-1" : ""
        )} 
      />

      {/* Quick Actions Grid Skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <Skeleton variant="rectangular" className="h-14 w-14 rounded-xl" />
            <Skeleton variant="text" className="h-2 w-12" />
          </div>
        ))}
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <motion.div
      className={cn(
        'border-2 border-muted border-t-primary rounded-full',
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-4">
      <img 
        src="/images/simbollogo-psb.png" 
        alt="PSB Logo" 
        className="h-12 w-12 animate-pulse"
      />
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);