import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.116e8d716696470e8df88d8e14b5f9ff',
  appName: 'psb-connect-hub-89',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://116e8d71-6696-470e-8df8-8d8e14b5f9ff.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#00B800",
      showSpinner: false
    },
    StatusBar: {
      style: "light",
      backgroundColor: "#00B800"
    },
    Haptics: {
      enabled: true
    }
  }
};

export default config;