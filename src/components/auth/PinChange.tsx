import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PinChangeProps {
  onSuccess: () => void;
  onCancel: () => void;
  hasExistingPin: boolean;
  title?: string;
  description?: string;
}

export const PinChange = ({ 
  onSuccess, 
  onCancel, 
  hasExistingPin,
  title = "Set Card PIN",
  description = "Set a PIN for your card to enable transactions"
}: PinChangeProps) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePinSubmit = async () => {
    if (newPin.length !== 4 || confirmPin.length !== 4 || (hasExistingPin && currentPin.length !== 4)) {
      toast({
        title: "Invalid PIN",
        description: "All PIN fields must be 4 digits long",
        variant: "destructive",
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "New PIN and confirm PIN do not match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate PIN change
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: hasExistingPin ? "PIN Changed Successfully" : "PIN Set Successfully",
        description: hasExistingPin ? "Your card PIN has been updated successfully" : "Your card PIN has been set successfully",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "PIN Change Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePinChange = (value: string, setPin: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(numericValue);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#134e5e] to-[#71b280] rounded-full flex items-center justify-center">
            <Key className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          {hasExistingPin && (
            <div className="grid gap-2">
              <Label htmlFor="current-pin">Current PIN</Label>
              <div className="relative">
                <Input
                  id="current-pin"
                  type={showCurrentPin ? "text" : "password"}
                  value={currentPin}
                  onChange={(e) => handlePinChange(e.target.value, setCurrentPin)}
                  placeholder="••••"
                  className="text-center text-2xl font-mono tracking-wider h-14"
                  maxLength={4}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                >
                  {showCurrentPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="new-pin">New PIN</Label>
            <div className="relative">
              <Input
                id="new-pin"
                type={showNewPin ? "text" : "password"}
                value={newPin}
                onChange={(e) => handlePinChange(e.target.value, setNewPin)}
                placeholder="••••"
                className="text-center text-2xl font-mono tracking-wider h-14"
                maxLength={4}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPin(!showNewPin)}
              >
                {showNewPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">Confirm New PIN</Label>
            <div className="relative">
              <Input
                id="confirm-pin"
                type={showConfirmPin ? "text" : "password"}
                value={confirmPin}
                onChange={(e) => handlePinChange(e.target.value, setConfirmPin)}
                placeholder="••••"
                className="text-center text-2xl font-mono tracking-wider h-14"
                maxLength={4}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
              >
                {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePinSubmit}
              className="flex-1 bg-gradient-to-br from-[#134e5e] to-[#71b280]"
              disabled={(hasExistingPin && currentPin.length !== 4) || newPin.length !== 4 || confirmPin.length !== 4 || isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                hasExistingPin ? 'Change PIN' : 'Set PIN'
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