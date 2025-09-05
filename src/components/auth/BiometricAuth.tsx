
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Fingerprint, Eye, Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BiometricAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
  type?: 'fingerprint' | 'face' | 'both';
}

export const BiometricAuth = ({ onSuccess, onCancel, type = 'both' }: BiometricAuthProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [supportedMethods, setSupportedMethods] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check for biometric support
    if (navigator.credentials) {
      setSupportedMethods(['fingerprint', 'face']);
    }
  }, []);

  const handleBiometricAuth = async (method: string) => {
    setIsAuthenticating(true);
    
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Authentication Successful",
        description: `${method} authentication completed successfully.`,
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Please try again or use PIN authentication.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold">Secure Authentication</h2>
          <p className="text-sm text-muted-foreground">
            Use your biometric authentication to continue
          </p>
        </div>

        <div className="space-y-3">
          {supportedMethods.includes('fingerprint') && (
            <Button
              onClick={() => handleBiometricAuth('Fingerprint')}
              disabled={isAuthenticating}
              className="w-full h-14 flex items-center gap-3"
              variant="outline"
            >
              <Fingerprint className="h-5 w-5" />
              <span>Use Fingerprint</span>
              {isAuthenticating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600" />}
            </Button>
          )}

          {supportedMethods.includes('face') && (
            <Button
              onClick={() => handleBiometricAuth('Face ID')}
              disabled={isAuthenticating}
              className="w-full h-14 flex items-center gap-3"
              variant="outline"
            >
              <Eye className="h-5 w-5" />
              <span>Use Face ID</span>
              {isAuthenticating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600" />}
            </Button>
          )}

          <Button
            onClick={onCancel}
            variant="ghost"
            className="w-full flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            Use PIN Instead
          </Button>
        </div>
      </Card>
    </div>
  );
};
