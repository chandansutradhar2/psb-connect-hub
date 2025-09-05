import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive } from '@/hooks/useResponsive';
import { useCapacitor } from '@/hooks/useCapacitor';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
  enableAnimations?: boolean;
  enableGestures?: boolean;
}

export const ResponsiveLayout = ({ 
  children, 
  className,
  enableAnimations = true,
  enableGestures = true
}: ResponsiveLayoutProps) => {
  const { isMobile, isTablet, screenSize } = useResponsive();
  const { isNative, platform } = useCapacitor();

  useEffect(() => {
    // Set CSS custom properties for responsive calculations
    document.documentElement.style.setProperty('--screen-width', `${screenSize.width}px`);
    document.documentElement.style.setProperty('--screen-height', `${screenSize.height}px`);
    document.documentElement.style.setProperty('--is-mobile', isMobile ? '1' : '0');
    document.documentElement.style.setProperty('--is-tablet', isTablet ? '1' : '0');
    document.documentElement.style.setProperty('--is-native', isNative ? '1' : '0');
  }, [screenSize, isMobile, isTablet, isNative]);

  const layoutVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerClasses = cn(
    'min-h-screen w-full',
    'transition-all duration-300 ease-out',
    // Mobile optimizations
    isMobile && [
      'touch-manipulation',
      'select-none',
      '-webkit-overflow-scrolling: touch',
    ],
    // Native app optimizations
    isNative && [
      'safe-area-inset-top',
      'safe-area-inset-bottom',
    ],
    // Platform-specific optimizations
    platform === 'ios' && 'ios-scroll-bounce',
    platform === 'android' && 'android-overscroll',
    className
  );

  if (enableAnimations) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className={containerClasses}
          variants={layoutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};