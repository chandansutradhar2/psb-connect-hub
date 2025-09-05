import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PinAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export const PinAuth = ({ 
  onSuccess, 
  onCancel, 
  title = "Enter Transaction PIN",
  description = "Please enter your 4-digit transaction PIN to continue"
}: PinAuthProps) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 4-digit PIN",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      // Simulate PIN verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, accept any 4-digit PIN
      toast({
        title: "Authentication Successful",
        description: "PIN verified successfully.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
      setPin('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePinChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(numericValue);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              placeholder="••••"
              className="text-center text-2xl font-mono tracking-wider h-14"
              maxLength={4}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPin(!showPin)}
            >
              {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePinSubmit}
              className="flex-1"
              disabled={pin.length !== 4 || isVerifying}
            >
              {isVerifying ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button variant="link" className="text-sm text-muted-foreground">
            Forgot PIN?
          </Button>
        </div>
      </Card>
    </div>
  );
};