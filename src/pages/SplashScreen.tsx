import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone, Shield, Clock, Users } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      icon: <Smartphone className="h-16 w-16 text-white" />,
      title: "Mobile Banking Made Simple",
      description: "Bank anytime, anywhere with Bank Name's secure mobile app"
    },
    {
      icon: <Shield className="h-16 w-16 text-white" />,
      title: "Bank-Grade Security",
      description: "Your transactions are protected with advanced encryption and biometric authentication"
    },
    {
      icon: <Clock className="h-16 w-16 text-white" />,
      title: "Instant Transfers",
      description: "Send money instantly with UPI, NEFT, RTGS, and IMPS - 24/7 banking"
    },
    {
      icon: <Users className="h-16 w-16 text-white" />,
      title: "Trusted by Millions",
      description: "Join millions of customers who trust Bank Name for their banking needs"
    }
  ];

  useEffect(() => {
    // Simulate app loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(slideTimer);
    }
  }, [isLoading, slides.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen  bg-gradient-to-b from-[#1178AC] to-[#1397DA] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          </div> */}
          {/* <div className="w-40 h-40 mx-auto  rounded-full bg-yellow-400 backdrop-blur-sm border-4 border-red-800 flex items-center justify-center">
  <img 
    src="images/simbollogo-psb.png" 
    alt="Bank Name" 
    className="w-38 h-38 object-contain"
  />
</div> */}

          <h1 className="text-3xl font-bold text-white mb-2">Bank Name</h1>
          <p className="text-white/80 mb-8">Mobile Banking</p>
          
          <p className="text-white/60 text-sm">Loading...</p>
          <div className="mt-4"></div>
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#1178AC] to-[#1397DA] flex flex-col">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="mb-8 transition-all duration-500 ease-in-out">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              {slides[currentSlide].icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mb-">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative p-6 space-y-3 mb-8">
        <Button 
          className="w-full h-12 bg-white text-primary hover:bg-white/90 font-semibold"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>
        
        <div className="text-center">
          <p className="text-white/80 text-xs">
            Already have an account?{' '}
            <button 
              className="text-white font-medium underline"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <Shield className="h-4 w-4 text-white/60" />
          <span className="text-white/60 text-xs">RBI Approved • 256-bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;