import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const useCapacitor = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');

  useEffect(() => {
    const checkPlatform = async () => {
      const native = Capacitor.isNativePlatform();
      const currentPlatform = Capacitor.getPlatform();
      
      setIsNative(native);
      setPlatform(currentPlatform as 'ios' | 'android' | 'web');

      if (native) {
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#00B800' });
        
        // Hide splash screen
        await SplashScreen.hide();
      }
    };

    checkPlatform();
  }, []);

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
    if (isNative) {
      await Haptics.impact({ style });
    }
  };

  const setStatusBarColor = async (color: string, style: Style = Style.Light) => {
    if (isNative) {
      await StatusBar.setBackgroundColor({ color });
      await StatusBar.setStyle({ style });
    }
  };

  return {
    isNative,
    platform,
    triggerHaptic,
    setStatusBarColor,
  };
};