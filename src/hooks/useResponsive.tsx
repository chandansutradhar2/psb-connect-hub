import { useState, useEffect } from 'react';

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

const breakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  large: 1920,
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < breakpoints.mobile;
  const isTablet = screenSize.width >= breakpoints.mobile && screenSize.width < breakpoints.tablet;
  const isDesktop = screenSize.width >= breakpoints.tablet && screenSize.width < breakpoints.desktop;
  const isLarge = screenSize.width >= breakpoints.desktop;

  const getResponsiveValue = <T,>(values: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    large?: T;
    default: T;
  }): T => {
    if (isMobile && values.mobile !== undefined) return values.mobile;
    if (isTablet && values.tablet !== undefined) return values.tablet;
    if (isDesktop && values.desktop !== undefined) return values.desktop;
    if (isLarge && values.large !== undefined) return values.large;
    return values.default;
  };

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    getResponsiveValue,
    breakpoints,
  };
};