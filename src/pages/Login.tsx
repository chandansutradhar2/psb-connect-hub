import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fingerprint, Eye, EyeOff, Smartphone, Lock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mpin, setMpin] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (type: 'password' | 'mpin' | 'biometric') => {
    setLoading(true);
    
    // Basic validation
    if (type === 'mpin' && (!userId || mpin.length !== 4)) {
      setLoading(false);
      return;
    }
    
    if (type === 'password' && (!userId || !password)) {
      setLoading(false);
      return;
    }
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would validate credentials with your backend
      // For demo purposes, we'll accept any input
      
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMpinInput = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setMpin(value);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#134e5e] to-[#71b280]  flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative w-full max-w-md">
        {/* Bank Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto  rounded-full bg-yellow-400 backdrop-blur-sm border-4 border-red-800 flex items-center justify-center">
  <img 
    src="images/simbollogo-psb.png" 
    alt="Punjab & Sind Bank" 
    className="w-20 h-20 object-contain"
  />
</div>
          {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
            <span className="text-2xl font-bold text-white">PSB</span>
          </div> */}
          <h1 className="text-xl font-bold text-white mt-2">Punjab Sind Bank</h1>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-foreground">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Sign in to your account securely
            </p>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="mpin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mpin" className="text-xs">MPIN</TabsTrigger>
                <TabsTrigger value="password" className="text-xs">Password</TabsTrigger>
                <TabsTrigger value="biometric" className="text-xs">Biometric</TabsTrigger>
              </TabsList>

              <TabsContent value="mpin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID / Mobile Number</Label>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your User ID"
                    className="h-12"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mpin">4-Digit MPIN</Label>
                  <Input
                    id="mpin"
                    type="password"
                    value={mpin}
                    onChange={(e) => handleMpinInput(e.target.value)}
                    placeholder="••••"
                    className="h-12 text-center text-2xl tracking-widest"
                    maxLength={4}
                  />
                </div>

                <Button 
                  onClick={() => handleLogin('mpin')}
                  className="w-full h-12  bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white flex items-center justify-center"
                  disabled={loading || !userId || mpin.length !== 4}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Sign In with MPIN
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="password" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userIdPass">User ID / Mobile Number</Label>
                  <Input
                    id="userIdPass"
                    type="text"
                    placeholder="Enter your User ID"
                    className="h-12"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => handleLogin('password')}
                  className="w-full h-12  bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white flex items-center justify-center"
                  disabled={loading || !userId || !password}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign In with Password
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="biometric" className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#134e5e] to-[#71b280] flex items-center justify-center">
                    <Fingerprint className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Biometric Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Use your fingerprint or face ID to sign in securely
                  </p>
                  
                  <Button 
                    onClick={() => handleLogin('biometric')}
                    className=" bg-gradient-to-r from-[#134e5e] to-[#71b280] text-white w-full h-12 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <>
                        <Fingerprint className="mr-2 h-4 w-4" />
                        Authenticate
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <button 
                  className="text-primary hover:underline"
                  onClick={() => navigate('/forgot-mpin')}
                >
                  Forgot MPIN?
                </button>
                <button 
                  className="text-primary hover:underline"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  New to mobile banking?{' '}
                  <button 
                    className="text-primary font-medium hover:underline"
                    onClick={() => navigate('/register')}
                  >
                    Register Now
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
            <Shield className="h-4 w-4 text-white" />
            <span className="text-white text-xs">256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;