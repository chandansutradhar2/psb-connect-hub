
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Video,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  PhoneOff,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoKYC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const steps = [
    { id: 1, title: 'Document Verification', description: 'Upload and verify your documents' },
    { id: 2, title: 'Video Call Setup', description: 'Camera and microphone setup' },
    { id: 3, title: 'Live Verification', description: 'Video call with verification officer' },
    { id: 4, title: 'Completion', description: 'KYC verification completed' }
  ];

  const documents = [
    { name: 'Aadhaar Card', status: 'uploaded', required: true },
    { name: 'PAN Card', status: 'uploaded', required: true },
    { name: 'Bank Statement', status: 'pending', required: true },
    { name: 'Passport Size Photo', status: 'uploaded', required: true }
  ];

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startVideoCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsConnected(true);
      setCurrentStep(3);
      
      toast({
        title: "Video Call Started",
        description: "Connected to verification officer. Please follow their instructions.",
      });
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera and microphone access to continue.",
        variant: "destructive"
      });
    }
  };

  const endVideoCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsConnected(false);
    setCurrentStep(4);
    
    toast({
      title: "Video KYC Completed",
      description: "Your verification has been completed successfully.",
    });
  };

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <BankingCard title="Document Upload" icon={<FileText className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${doc.status === 'uploaded' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {doc.status === 'uploaded' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Upload className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    <Badge variant={doc.status === 'uploaded' ? 'default' : 'secondary'}>
                      {doc.status === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                ))}
                
                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="w-full h-12 rounded-xl"
                  disabled={documents.some(doc => doc.required && doc.status !== 'uploaded')}
                >
                  Continue to Video Setup
                </Button>
              </div>
            </BankingCard>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <BankingCard title="Video Call Setup" icon={<Video className="h-5 w-5" />} className="rounded-2xl">
              <div className="space-y-6">
                <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="h-12 w-12 mx-auto mb-2" />
                      <p>Camera Preview</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-xl">
                    <Camera className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Camera Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-xl">
                    <Mic className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Microphone Ready</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-800 mb-2">Before we start:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Ensure good lighting on your face</li>
                    <li>• Keep your original documents ready</li>
                    <li>• Find a quiet place with stable internet</li>
                    <li>• The call may take 10-15 minutes</li>
                  </ul>
                </div>

                <Button 
                  onClick={startVideoCall}
                  className="w-full h-12 rounded-xl"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Start Video Verification
                </Button>
              </div>
            </BankingCard>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <BankingCard className="rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Live Verification Call</h3>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>

                <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted={false}
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  
                  {/* Officer Window */}
                  <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <span className="text-xs font-semibold">VO</span>
                      </div>
                      <p className="text-xs">Officer</p>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/20 border-white/30"
                      onClick={toggleMute}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/20 border-white/30"
                      onClick={toggleVideo}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                      onClick={endVideoCall}
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Verification in Progress</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Please follow the officer's instructions and show your documents when requested.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BankingCard>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <BankingCard className="rounded-2xl">
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">KYC Verification Completed!</h2>
                  <p className="text-muted-foreground">
                    Your video KYC has been successfully completed. You will receive a confirmation within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-muted-foreground">Reference ID</p>
                    <p className="font-mono font-semibold">KYC2024010001</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-muted-foreground">Completion Time</p>
                    <p className="font-semibold">{new Date().toLocaleTimeString('en-IN')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    Download Certificate
                  </Button>
                  <Button onClick={() => navigate('/dashboard')} className="h-12">
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </BankingCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="rounded-full p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Video KYC</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full p-2"
            >
              <Home className="text-lg text-gray-600" />
            </Button>
          </div>
        </header>

        <div className="px-4 space-y-6">
          {/* Progress Steps */}
          <BankingCard className="rounded-2xl">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">Verification Progress</h3>
                <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
              </div>
              
              <Progress value={(currentStep / 4) * 100} className="h-2" />
              
              <div className="grid grid-cols-4 gap-2 text-xs">
                {steps.map((step) => (
                  <div key={step.id} className="text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-semibold ${
                      currentStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.id ? '✓' : step.id}
                    </div>
                    <p className={currentStep >= step.id ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BankingCard>

          {/* Step Content */}
          {renderStepContent()}
        </div>
      </div>
    </BankingLayout>
  );
};

export default VideoKYC;
