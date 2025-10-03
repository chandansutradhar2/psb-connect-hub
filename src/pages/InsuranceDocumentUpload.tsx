
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Upload,
  Camera,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const InsuranceDocumentUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, insuranceType, kycData, coverageData } = location.state || {};
  
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const requiredDocuments = [
    { id: 'aadhaar', name: 'Aadhaar Card', required: true, uploaded: false },
    { id: 'pan', name: 'PAN Card', required: true, uploaded: false },
    { id: 'address', name: 'Address Proof', required: true, uploaded: false },
    { id: 'income', name: 'Income Proof', required: false, uploaded: false },
    ...(insuranceType === 'motor' ? [
      { id: 'rc', name: 'Vehicle RC', required: true, uploaded: false },
      { id: 'pollution', name: 'Pollution Certificate', required: true, uploaded: false }
    ] : []),
    ...(insuranceType === 'health' || insuranceType === 'life' ? [
      { id: 'medical', name: 'Medical Reports', required: false, uploaded: false }
    ] : [])
  ];

  const [documents, setDocuments] = useState(requiredDocuments);

  const handleDocumentUpload = (docId: string) => {
    // Simulate upload
    const updatedDocs = documents.map(doc => 
      doc.id === docId ? { ...doc, uploaded: true } : doc
    );
    setDocuments(updatedDocs);
    
    const uploadedCount = updatedDocs.filter(doc => doc.uploaded).length;
    setUploadProgress((uploadedCount / updatedDocs.length) * 100);
    
    if (!uploadedDocs.includes(docId)) {
      setUploadedDocs([...uploadedDocs, docId]);
    }
  };

  const handleContinue = () => {
    const requiredUploaded = documents.filter(doc => doc.required && doc.uploaded).length;
    const totalRequired = documents.filter(doc => doc.required).length;
    
    if (requiredUploaded === totalRequired) {
      navigate('/insurance-review-payment', { 
        state: { plan, insuranceType, kycData, coverageData, documents: uploadedDocs } 
      });
    }
  };

  const canContinue = documents.filter(doc => doc.required).every(doc => doc.uploaded);

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
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="flex items-center space-x-2 px-4">
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-psb-primary rounded-full" />
          <div className="flex-1 h-2 bg-muted rounded-full" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Step 3 of 4</p>

        {/* Upload Progress */}
        <BankingCard className="rounded-2xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Upload Progress</h3>
              <span className="text-sm font-medium">{uploadedDocs.length}/{documents.length}</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {documents.filter(doc => doc.required && !doc.uploaded).length} required documents remaining
            </p>
          </div>
        </BankingCard>

        {/* Document List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <BankingCard key={doc.id} className="rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${doc.uploaded ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {doc.uploaded ? (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        doc.required ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {doc.required ? 'Required' : 'Optional'}
                      </span>
                      {doc.uploaded && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {!doc.uploaded && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentUpload(doc.id)}
                      className="rounded-lg"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentUpload(doc.id)}
                      className="rounded-lg"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                )}
              </div>
            </BankingCard>
          ))}
        </div>

        {/* Upload Guidelines */}
        <BankingCard title="Upload Guidelines" className="rounded-2xl bg-blue-50 border-blue-200">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <span className="text-sm text-blue-800">Documents should be clear and readable</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <span className="text-sm text-blue-800">File size should be less than 5MB</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <span className="text-sm text-blue-800">Supported formats: JPG, PNG, PDF</span>
            </div>
          </div>
        </BankingCard>

        {/* Error/Warning Messages */}
        {!canContinue && (
          <BankingCard className="rounded-2xl bg-orange-50 border-orange-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Required Documents Missing</h4>
                <p className="text-sm text-orange-700">
                  Please upload all required documents to continue with your application.
                </p>
              </div>
            </div>
          </BankingCard>
        )}

        {/* Continue Button */}
        <div className="sticky bottom-4">
          <Button 
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full rounded-2xl h-14 text-lg bg-psb-primary hover:bg-psb-primary/90 disabled:opacity-50"
          >
            {canContinue ? 'Review & Pay' : 'Upload Required Documents'}
            {canContinue && <ArrowRight className="h-5 w-5 ml-2" />}
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default InsuranceDocumentUpload;
