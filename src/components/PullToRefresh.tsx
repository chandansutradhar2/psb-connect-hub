import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useCapacitor } from '@/hooks/useCapacitor';
import { ImpactStyle } from '@capacitor/haptics';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  className?: string;
  disabled?: boolean;
}

export const PullToRefresh = ({
  children,
  onRefresh,
  threshold = 80,
  className,
  disabled = false
}: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [canRefresh, setCanRefresh] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  
  const { triggerHaptic } = useCapacitor();
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        isDragging.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || isRefreshing) return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0 && container.scrollTop === 0) {
        e.preventDefault();
        
        // Apply resistance curve - gets harder to pull as distance increases
        const resistance = Math.min(deltaY / 2, threshold * 1.5);
        setPullDistance(resistance);

        if (resistance >= threshold && !canRefresh) {
          setCanRefresh(true);
          triggerHaptic(ImpactStyle.Light);
        } else if (resistance < threshold && canRefresh) {
          setCanRefresh(false);
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging.current) return;

      isDragging.current = false;

      if (canRefresh && !isRefreshing) {
        setIsRefreshing(true);
        triggerHaptic(ImpactStyle.Medium);
        
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setIsRefreshing(false);
          setCanRefresh(false);
          setPullDistance(0);
        }
      } else {
        // Animate back to 0
        controls.start({
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        });
        setPullDistance(0);
        setCanRefresh(false);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, disabled, isRefreshing, canRefresh, triggerHaptic, controls]);

  const refreshIndicatorY = Math.min(pullDistance / 2, 40);
  const iconRotation = (pullDistance / threshold) * 180;
  const iconScale = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-auto h-full', className)}
    >
      {/* Pull to refresh indicator */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50"
        animate={{
          y: refreshIndicatorY - 60,
          opacity: pullDistance > 10 ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200',
            canRefresh
              ? 'bg-primary text-primary-foreground scale-110'
              : 'bg-background border border-border text-muted-foreground'
          )}
        >
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : iconRotation,
              scale: iconScale
            }}
            transition={{
              rotate: isRefreshing 
                ? { duration: 1, repeat: Infinity, ease: 'linear' }
                : { type: 'spring', stiffness: 300, damping: 30 },
              scale: { type: 'spring', stiffness: 300, damping: 30 }
            }}
          >
            <RefreshCw className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content with pull distance transform */}
      <motion.div
        animate={{ y: isRefreshing ? 60 : pullDistance }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};