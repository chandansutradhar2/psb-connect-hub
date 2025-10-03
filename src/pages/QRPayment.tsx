import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  QrCode, 
  Scan, 
  ArrowLeft, 
  Smartphone,
  History,
  Settings,
  Camera,
  Upload,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  User,
  Clock,
  Shield,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'scan' | 'pay' | 'receive'>('scan');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const recentPayments = [
    { id: 1, name: 'Coffee Shop', amount: 250, time: '2 min ago', status: 'Success', type: 'debit' },
    { id: 2, name: 'Grocery Store', amount: 1200, time: '1 hour ago', status: 'Success', type: 'debit' },
    { id: 3, name: 'Petrol Pump', amount: 2000, time: '2 hours ago', status: 'Success', type: 'debit' },
    { id: 4, name: 'John Doe', amount: 500, time: '3 hours ago', status: 'Received', type: 'credit' },
  ];

  // Initialize camera when scan tab is active
  useEffect(() => {
    if (activeTab === 'scan' && cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [activeTab, cameraActive]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsLoading(false);
      setCameraError(true);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleScanClick = () => {
    setCameraActive(true);
    setScanResult(null);
    setCameraError(false);
  };

  const simulateQRScan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setScanResult("merchant@psb|Coffee Shop|250");
      setIsLoading(false);
      toast({
        title: "QR Code Scanned",
        description: "Merchant details retrieved successfully",
      });
    }, 2000);
  };

  const handlePayment = () => {
    if (activeTab === 'pay') {
      if (!phoneNumber || !amount) {
        toast({
          title: "Missing Information",
          description: "Please enter both phone number and amount",
          variant: "destructive"
        });
        return;
      }
      
      navigate('/payment-confirmation', { 
        state: { 
          amount, 
          recipient: phoneNumber,
          type: 'upi'
        } 
      });
    } else if (activeTab === 'scan' && scanResult) {
      const [upiId, merchant, amount] = scanResult.split('|');
      navigate('/payment-confirmation', { 
        state: { 
          amount, 
          recipient: merchant,
          upiId,
          type: 'qr'
        } 
      });
    } else {
      toast({
        title: "No QR Code Scanned",
        description: "Please scan a QR code first",
        variant: "destructive"
      });
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText('9876543210@psb');
    toast({
      title: "UPI ID Copied",
      description: "Your UPI ID has been copied to clipboard",
    });
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My UPI QR Code',
          text: 'Scan this QR code to send me money via UPI',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyUPIId();
    }
  };

  const formatAmount = (value: string) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Format with commas for thousands
    if (cleanValue) {
      return parseInt(cleanValue).toLocaleString('en-IN');
    }
    return '';
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(formatAmount(value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">QR Payments</h1>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-gray-100 rounded-xl p-1">
            <div className="flex">
              {[
                { key: 'scan', label: 'Scan QR', icon: <Scan className="h-4 w-4" /> },
                { key: 'pay', label: 'Pay', icon: <Smartphone className="h-4 w-4" /> },
                { key: 'receive', label: 'Receive', icon: <QrCode className="h-4 w-4" /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as any);
                    if (tab.key !== 'scan') {
                      setCameraActive(false);
                    } else {
                      setCameraActive(true);
                    }
                    setScanResult(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                    activeTab === tab.key
                      ? 'bg-white text-primary shadow-sm font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          {activeTab === 'scan' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                {cameraActive ? (
                  <div className="relative bg-black aspect-square rounded-xl overflow-hidden">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm">Initializing camera...</p>
                        </div>
                      </div>
                    ) : cameraError ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white p-4">
                          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
                          <p className="text-sm mb-4">Camera access denied. Please allow camera permissions.</p>
                          <Button onClick={handleScanClick} variant="outline" className="bg-white text-black">
                            Try Again
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <video 
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Scanner frame overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-64 h-64">
                            {/* Corner markers */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
                            
                            {/* Scanning animation */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400 animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Simulate scan button for demo */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                          <Button 
                            onClick={simulateQRScan}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            Simulate Scan
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative bg-gray-50 aspect-square rounded-xl flex items-center justify-center">
                    <div className="text-center p-4">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 mb-4">Scan QR codes to make payments securely</p>
                      <Button onClick={handleScanClick} className="rounded-lg">
                        Open Camera
                      </Button>
                    </div>
                  </div>
                )}

                {scanResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium text-blue-800">QR Code Scanned</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Merchant:</span>
                        <span className="font-medium">Coffee Shop</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">UPI ID:</span>
                        <span className="font-medium text-xs">merchant@psb</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-3 h-10 rounded-lg bg-blue-600 hover:bg-blue-700"
                      onClick={handlePayment}
                    >
                      Pay Now
                    </Button>
                  </div>
                )}
              </div>

              <Button variant="outline" className="w-full h-12 rounded-xl">
                <Upload className="h-4 w-4 mr-2" />
                Upload QR code
              </Button>
            </div>
          )}

          {activeTab === 'pay' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      placeholder="Enter recipient's phone number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="rounded-lg h-12 text-base"
                      type="tel"
                    />
                    {phoneNumber && phoneNumber.length !== 10 && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="rounded-lg h-12 text-base pl-10"
                        type="text"
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full h-12 rounded-lg bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white"
                    disabled={!phoneNumber || !amount || phoneNumber.length !== 10}
                    onClick={handlePayment}
                  >
                    Continue to Pay
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'receive' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-48 h-48 bg-white border border-gray-200 rounded-xl flex items-center justify-center p-4">
                    <QrCode className="h-full w-full text-gray-800" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Your UPI ID</p>
                    <div className="flex items-center justify-center">
                      <p className="text-lg font-semibold text-gray-900">9876543210@psb</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={copyUPIId}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-lg"
                    onClick={shareQRCode}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share QR Code
                  </Button>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Your UPI ID is safe to share. Payments will only be credited to your verified bank account.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <History className="h-5 w-5 text-gray-500" />
                Recent Transactions
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/transaction-details', { state: { payment } })}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payment.type === 'credit' ? 'bg-blue-100' : 'bg-blue-100'
                    }`}>
                      {payment.type === 'credit' ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <IndianRupee className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{payment.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {payment.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      payment.type === 'credit' ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {payment.type === 'credit' ? '+' : '-'}₹{payment.amount}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        payment.status === 'Success' 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button 
                variant="ghost" 
                className="w-full text-primary"
                onClick={() => navigate('/transactions')}
              >
                View all transactions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default QRPayment;


// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   QrCode, 
//   Scan, 
//   ArrowLeft, 
//   Smartphone,
//   History,
//   Settings,
//   Camera,
//   Upload,
//   Share2,
//   Copy
// } from 'lucide-react';

// const QRPayment = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<'scan' | 'pay' | 'receive'>('scan');
//   const [amount, setAmount] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const recentPayments = [
//     { name: 'Coffee Shop', amount: 250, time: '2 min ago', status: 'Success' },
//     { name: 'Grocery Store', amount: 1200, time: '1 hour ago', status: 'Success' },
//     { name: 'Petrol Pump', amount: 2000, time: '2 hours ago', status: 'Success' },
//   ];

//   // Initialize camera when scan tab is active
//   useEffect(() => {
//     if (activeTab === 'scan' && cameraActive) {
//       startCamera();
//     } else {
//       stopCamera();
//     }

//     return () => {
//       stopCamera();
//     };
//   }, [activeTab, cameraActive]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'environment' } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//       // Handle error (show message to user)
//     }
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//   };

//   const handleScanClick = () => {
//     setCameraActive(true);
//   };

//   const handlePayment = () => {
//     navigate('/payment-confirmation');
//   };

//   const copyUPIId = () => {
//     navigator.clipboard.writeText('9876543210@psb');
//     // Add toast notification here
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6 p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => navigate(-1)}
//             className="rounded-full"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-xl font-semibold text-gray-900">QR Payments</h1>
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <Settings className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex bg-gray-100 rounded-xl p-1">
//           {[
//             { key: 'scan', label: 'Scan', icon: <Scan className="h-4 w-4" /> },
//             { key: 'pay', label: 'Pay', icon: <Smartphone className="h-4 w-4" /> },
//             { key: 'receive', label: 'Receive', icon: <QrCode className="h-4 w-4" /> },
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => {
//                 setActiveTab(tab.key as any);
//                 if (tab.key !== 'scan') setCameraActive(false);
//               }}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
//                 activeTab === tab.key
//                   ? 'bg-white text-primary shadow-sm'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               {tab.icon}
//               <span className="text-sm font-medium">{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Main Content */}
//         {activeTab === 'scan' && (
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//               {cameraActive ? (
//                 <div className="relative bg-black aspect-square rounded-xl overflow-hidden">
//                   <video 
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     muted
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Scanner frame overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="relative w-64 h-64">
//                       {/* Corner markers */}
//                       <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
//                       <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
//                       <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
//                       <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="relative bg-gray-50 aspect-square rounded-xl flex items-center justify-center">
//                   <div className="text-center">
//                     <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
//                     <p className="text-sm text-gray-500 mb-4">Scan QR codes to make payments</p>
//                     <Button onClick={handleScanClick}>
//                       Open Camera
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Button variant="outline" className="w-full h-12 rounded-xl">
//               <Upload className="h-4 w-4 mr-2" />
//               Upload QR code
//             </Button>
//           </div>
//         )}

//         {/* Rest of the component remains the same */}
//         {activeTab === 'pay' && (
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <Input
//                     placeholder="Enter recipient's phone number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="rounded-lg h-12"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
//                   <Input
//                     placeholder="Enter amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="rounded-lg h-12"
//                     type="number"
//                   />
//                 </div>
//                 <Button 
//                   className="w-full h-12 rounded-lg"
//                   disabled={!phoneNumber || !amount}
//                   onClick={handlePayment}
//                 >
//                   Continue
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'receive' && (
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
//               <div className="space-y-4">
//                 <div className="mx-auto w-48 h-48 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
//                   <QrCode className="h-32 w-32 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-700">Your UPI ID</p>
//                   <div className="flex items-center justify-center mt-1">
//                     <p className="text-sm text-gray-900">9876543210@psb</p>
//                     <Button 
//                       variant="ghost" 
//                       size="sm" 
//                       onClick={copyUPIId}
//                       className="ml-2 text-primary"
//                     >
//                       <Copy className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//                 <Button variant="outline" className="w-full h-12 rounded-lg">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Share QR Code
//                 </Button>
//               </div>
//             </div>
//                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-4 border-b border-gray-100">
//             <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {recentPayments.map((payment, index) => (
//               <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                     <div className="text-primary font-medium text-sm">
//                       {payment.name.charAt(0)}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm text-gray-900">{payment.name}</p>
//                     <p className="text-xs text-gray-500">{payment.time}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-sm">-₹{payment.amount}</p>
//                   <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-100">
//                     {payment.status}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-4 border-t border-gray-100">
//             <Button 
//               variant="ghost" 
//               className="w-full text-primary"
//               onClick={() => navigate('/transactions')}
//             >
//               <History className="h-4 w-4 mr-2" />
//               View all transactions
//             </Button>
//           </div>
//         </div>
//           </div>
          
//         )}

//         {/* Recent Transactions */}
     
//       </div>
//     </BankingLayout>
//   );
// };

// export default QRPayment;

