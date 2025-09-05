import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Camera, 
  CheckCircle,
  AlertTriangle,
  Eye,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
  category: 'kyc' | 'income' | 'collateral';
}

const LoanDocumentUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { loanType, formData } = location.state || {};
  
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'pan', name: 'PAN Card', required: true, uploaded: false, category: 'kyc' },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true, uploaded: false, category: 'kyc' },
    { id: 'salary', name: 'Salary Slip (Last 3 months)', required: true, uploaded: false, category: 'income' },
    { id: 'bank', name: 'Bank Statement (Last 6 months)', required: true, uploaded: false, category: 'income' },
    { id: 'address', name: 'Address Proof', required: false, uploaded: false, category: 'kyc' },
    { id: 'photo', name: 'Passport Size Photo', required: false, uploaded: false, category: 'kyc' }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const requiredDocs = documents.filter(doc => doc.required);
  const uploadedRequired = requiredDocs.filter(doc => doc.uploaded).length;
  const totalRequired = requiredDocs.length;
  const progress = (uploadedRequired / totalRequired) * 100;

  const handleFileSelect = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPEG, PNG, or PDF file",
          variant: "destructive"
        });
        return;
      }

      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { ...doc, uploaded: true, file }
          : doc
      ));

      toast({
        title: "Document uploaded",
        description: `${documents.find(d => d.id === docId)?.name} uploaded successfully`,
      });
    }
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { ...doc, uploaded: false, file: undefined }
        : doc
    ));
  };

  const handleCameraCapture = (docId: string) => {
    // In a real app, this would open the camera
    toast({
      title: "Camera feature",
      description: "Camera integration would open here in a mobile app",
    });
  };

  const handleContinue = async () => {
    if (uploadedRequired < totalRequired) {
      toast({
        title: "Missing documents",
        description: `Please upload all ${totalRequired} required documents`,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate document processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/loan-review-consent', { 
        state: { 
          loanType, 
          formData, 
          documents: documents.filter(doc => doc.uploaded) 
        } 
      });
    }, 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kyc': return <FileText className="h-4 w-4" />;
      case 'income': return <FileText className="h-4 w-4" />;
      case 'collateral': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Upload Documents</h1>
          <div></div>
        </div>

        {/* Progress */}
        <BankingCard className="rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Upload Progress</h3>
              <Badge variant={progress === 100 ? "default" : "secondary"}>
                {uploadedRequired}/{totalRequired} Required
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {progress === 100 
                ? "All required documents uploaded successfully" 
                : `${totalRequired - uploadedRequired} required documents remaining`
              }
            </p>
          </div>
        </BankingCard>

        {/* Document Categories */}
        <div className="space-y-4">
          {/* KYC Documents */}
          <BankingCard title="KYC Documents" className="rounded-2xl">
            <div className="space-y-4">
              {documents.filter(doc => doc.category === 'kyc').map((doc) => (
                <div key={doc.id} className="border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(doc.category)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <div className="flex items-center space-x-2">
                          {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          {doc.uploaded && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                      </div>
                    </div>
                    {doc.uploaded && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {!doc.uploaded ? (
                    <div className="flex space-x-2">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileSelect(doc.id, e)}
                          className="hidden"
                        />
                        <Button variant="outline" className="w-full" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </span>
                        </Button>
                      </label>
                      <Button
                        variant="outline"
                        onClick={() => handleCameraCapture(doc.id)}
                        className="px-3"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">
                          {doc.file?.name || `${doc.name} uploaded`}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </BankingCard>

          {/* Income Documents */}
          <BankingCard title="Income Proof" className="rounded-2xl">
            <div className="space-y-4">
              {documents.filter(doc => doc.category === 'income').map((doc) => (
                <div key={doc.id} className="border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(doc.category)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <div className="flex items-center space-x-2">
                          {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          {doc.uploaded && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                      </div>
                    </div>
                    {doc.uploaded && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {!doc.uploaded ? (
                    <div className="flex space-x-2">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileSelect(doc.id, e)}
                          className="hidden"
                        />
                        <Button variant="outline" className="w-full" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </span>
                        </Button>
                      </label>
                      <Button
                        variant="outline"
                        onClick={() => handleCameraCapture(doc.id)}
                        className="px-3"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">
                          {doc.file?.name || `${doc.name} uploaded`}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </BankingCard>
        </div>

        {/* Guidelines */}
        <BankingCard className="rounded-2xl bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <h4 className="font-semibold mb-2">Document Guidelines</h4>
              <ul className="space-y-1 text-xs">
                <li>• Clear, readable images or scanned copies</li>
                <li>• File size should be less than 5MB</li>
                <li>• Accepted formats: JPEG, PNG, PDF</li>
                <li>• Ensure all corners and details are visible</li>
                <li>• Documents should be recent and valid</li>
              </ul>
            </div>
          </div>
        </BankingCard>

        <Button 
          onClick={handleContinue}
          disabled={uploadedRequired < totalRequired || isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing Documents...' : 'Continue to Review'}
        </Button>
      </div>
    </BankingLayout>
  );
};

export default LoanDocumentUpload;