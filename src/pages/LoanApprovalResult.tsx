import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Download, 
  Star,
  AlertCircle,
  Phone,
  MessageSquare,
  Calendar,
  IndianRupee,
  FileText,
  Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanApprovalResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { loanType, loanDetails, applicationId } = location.state || {};
  
  // Simulate approval status (in real app, this would come from API)
  const [approvalStatus, setApprovalStatus] = useState<'processing' | 'approved' | 'under_review'>('processing');
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    // Simulate processing
    const timer = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // 80% chance of instant approval for demo
          setApprovalStatus(Math.random() > 0.2 ? 'approved' : 'under_review');
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadSanctionLetter = () => {
    toast({
      title: "Download Started",
      description: "Your sanction letter is being downloaded",
    });
  };

  const handleScheduleVideoKYC = () => {
    navigate('/video-kyc', { state: { applicationId, loanType } });
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLoanManagement = () => {
    navigate('/loan-management', { state: { applicationId, loanDetails } });
  };

  if (approvalStatus === 'processing') {
    return (
      <BankingLayout>
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="p-6 rounded-full bg-primary/10 w-fit mx-auto mb-6">
              <Clock className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Processing Your Application</h1>
            <p className="text-muted-foreground mb-6">
              Please wait while we process your loan application
            </p>
            
            <BankingCard className="rounded-2xl max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="h-3" />
                <div className="space-y-2 text-left">
                  <div className={`flex items-center space-x-2 ${processingProgress >= 20 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Application received</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${processingProgress >= 40 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Documents verified</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${processingProgress >= 60 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Credit assessment</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${processingProgress >= 80 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Risk evaluation</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${processingProgress >= 100 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Final approval</span>
                  </div>
                </div>
              </div>
            </BankingCard>
          </div>
        </div>
      </BankingLayout>
    );
  }

  if (approvalStatus === 'approved') {
    return (
      <BankingLayout>
        <div className="space-y-6">
          {/* Success Header */}
          <div className="text-center py-8">
            <div className="p-6 rounded-full bg-blue-100 w-fit mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-blue-800 mb-2">
              Congratulations! 🎉
            </h1>
            <p className="text-lg text-blue-700 mb-2">Your loan has been approved</p>
            <p className="text-muted-foreground">
              Application ID: {applicationId}
            </p>
          </div>

          {/* Approval Details */}
          <BankingCard title="Loan Approval Details" className="rounded-2xl bg-blue-50 border-blue-200">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-white border border-blue-200">
                  <IndianRupee className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Approved Amount</p>
                  <p className="font-bold text-blue-600">₹{loanDetails?.amount.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-blue-200">
                  <Star className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-bold text-blue-600">{loanDetails?.interestRate}% p.a.</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-blue-200">
                  <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="font-bold text-blue-600">{loanDetails?.tenure} months</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-blue-200">
                  <IndianRupee className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="font-bold text-blue-600">₹{loanDetails?.emi.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-100 to-emerald-100 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Instant Approval</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your loan amount will be credited to your account within 24 hours
                </p>
              </div>
            </div>
          </BankingCard>

          {/* Next Steps */}
          <BankingCard title="Next Steps" className="rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                <div className="p-2 rounded-full bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Download Documents</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download your sanction letter and loan agreement
                  </p>
                  <Button size="sm" variant="outline" onClick={handleDownloadSanctionLetter}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Sanction Letter
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                <div className="p-2 rounded-full bg-primary/10">
                  <IndianRupee className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Disbursement Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Loan amount will be credited to your registered account within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                <div className="p-2 rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">EMI Schedule</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your first EMI will be due on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline" onClick={handleLoanManagement}>
                    View EMI Schedule
                  </Button>
                </div>
              </div>
            </div>
          </BankingCard>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleLoanManagement} className="w-full">
              Manage Your Loan
            </Button>
            <Button variant="outline" onClick={handleGoToDashboard} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </BankingLayout>
    );
  }

  // Under Review Status
  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Under Review Header */}
        <div className="text-center py-8">
          <div className="p-6 rounded-full bg-orange-100 w-fit mx-auto mb-6">
            <Clock className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-orange-800 mb-2">
            Application Under Review
          </h1>
          <p className="text-lg text-orange-700 mb-2">We're reviewing your application</p>
          <p className="text-muted-foreground">
            Application ID: {applicationId}
          </p>
        </div>

        {/* Status Tracker */}
        <BankingCard title="Application Status" className="rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Processing Status</span>
              <Badge variant="secondary">Under Review</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Document Verification</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Credit Assessment</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Final Approval</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Timeline */}
        <BankingCard title="Expected Timeline" className="rounded-2xl bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <h4 className="font-semibold mb-2">Processing Timeline</h4>
              <div className="space-y-1">
                <p>• Credit verification: 24-48 hours</p>
                <p>• Final approval decision: 2-3 working days</p>
                <p>• Disbursement (if approved): Within 24 hours of approval</p>
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Contact Support */}
        <BankingCard title="Need Help?" className="rounded-2xl">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our loan specialists are available to assist you with any queries
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call Support</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Live Chat</span>
              </Button>
            </div>
          </div>
        </BankingCard>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" onClick={handleGoToDashboard} className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanApprovalResult;