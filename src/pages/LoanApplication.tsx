import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ArrowLeft, 
  Calculator, 
  Upload, 
  User, 
  Home, 
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
  BadgeCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const loanType = location.state?.loanType || 'personal';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: '',
    tenure: [24],
    purpose: '',
    employmentType: '',
    monthlyIncome: '',
    existingEMI: '',
    panNumber: '',
    aadharNumber: '',
    documentsUploaded: {
      identity: false,
      income: false,
      address: false,
      property: false
    }
  });

  const loanTypeConfig = {
    personal: { 
      title: 'Personal Loan', 
      maxAmount: 3000000, 
      minTenure: 6, 
      maxTenure: 84,
      rate: 10.5,
      icon: <User className="h-5 w-5" />
    },
    home: { 
      title: 'Home Loan', 
      maxAmount: 100000000, 
      minTenure: 60, 
      maxTenure: 360,
      rate: 8.5,
      icon: <Home className="h-5 w-5" />
    },
    car: { 
      title: 'Car Loan', 
      maxAmount: 15000000, 
      minTenure: 12, 
      maxTenure: 84,
      rate: 9.0,
      icon: <FileText className="h-5 w-5" />
    }
  };

  const config = loanTypeConfig[loanType] || loanTypeConfig.personal;

  const calculateEMI = () => {
    const principal = parseFloat(formData.loanAmount) || 0;
    const rate = config.rate / 100 / 12;
    const months = formData.tenure[0];
    
    if (principal === 0) return 0;
    
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  const handleNext = () => {
    if (step === 1 && (!formData.loanAmount || !formData.purpose)) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your loan application has been submitted successfully. We'll contact you within 24 hours.",
    });
    navigate('/loan-application-success', { 
      state: { 
        loanData: formData, 
        loanType: config.title,
        emi: calculateEMI(),
        applicationId: `LA${Date.now().toString().slice(-8)}`
      } 
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">Loan Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Up to ₹${(config.maxAmount / 100000).toFixed(0)}L`}
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                className="h-12 text-base border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Loan Tenure: {formData.tenure[0]} months ({(formData.tenure[0] / 12).toFixed(1)} years)
              </Label>
              <div className="mb-4">
                <Slider
                  value={formData.tenure}
                  onValueChange={(value) => setFormData({ ...formData, tenure: value })}
                  max={config.maxTenure}
                  min={config.minTenure}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{config.minTenure / 12} yrs</span>
                  <span>{config.maxTenure / 12} yrs</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="purpose" className="text-sm font-medium text-gray-700 mb-2 block">Purpose *</Label>
              <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {loanType === 'personal' && (
                    <>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="debt">Debt Consolidation</SelectItem>
                      <SelectItem value="home-renovation">Home Renovation</SelectItem>
                    </>
                  )}
                  {loanType === 'home' && (
                    <>
                      <SelectItem value="purchase">Buy Property</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                      <SelectItem value="balance-transfer">Balance Transfer</SelectItem>
                    </>
                  )}
                  {loanType === 'car' && (
                    <>
                      <SelectItem value="new-car">New Car</SelectItem>
                      <SelectItem value="used-car">Used Car</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {formData.loanAmount && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm text-blue-800">EMI Estimate</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{(parseFloat(formData.loanAmount) / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium text-blue-600">{config.rate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className="font-medium">{formData.tenure[0]} months</span>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  <div className="flex justify-between font-semibold text-blue-700">
                    <span>Monthly EMI:</span>
                    <span>₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Employment Type</Label>
              <RadioGroup
                value={formData.employmentType}
                onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300">
                  <RadioGroupItem value="salaried" id="salaried" />
                  <Label htmlFor="salaried" className="text-sm cursor-pointer">Salaried</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300">
                  <RadioGroupItem value="self-employed" id="self-employed" />
                  <Label htmlFor="self-employed" className="text-sm cursor-pointer">Self Employed</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="text-sm cursor-pointer">Business Owner</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="income" className="text-sm font-medium text-gray-700 mb-2 block">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter monthly income"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                className="h-12 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="existing-emi" className="text-sm font-medium text-gray-700 mb-2 block">Existing EMIs (₹)</Label>
              <Input
                id="existing-emi"
                type="number"
                placeholder="Total existing EMIs"
                value={formData.existingEMI}
                onChange={(e) => setFormData({ ...formData, existingEMI: e.target.value })}
                className="h-12 border-gray-300 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">Include all loan & credit card EMIs</p>
            </div>

            {formData.monthlyIncome && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-sm text-blue-800 mb-3">Eligibility Check</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income:</span>
                    <span className="font-medium">₹{(parseFloat(formData.monthlyIncome) / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Existing EMI:</span>
                    <span className="font-medium">₹{parseFloat(formData.existingEMI || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New EMI:</span>
                    <span className="font-medium">₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Total EMI:</span>
                    <span className="text-blue-700">₹{(calculateEMI() + parseFloat(formData.existingEMI || '0')).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">EMI/Income Ratio:</span>
                    <span className={`font-medium ${
                      ((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100 > 50 
                        ? 'text-red-600' 
                        : 'text-blue-600'
                    }`}>
                      {(((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
            <h3 className="font-semibold text-gray-900">Upload Documents</h3>
            
            <div className="space-y-4">
              <DocumentUploadCard
                title="Identity Proof"
                description="PAN, Aadhaar, Passport, DL"
                checked={formData.documentsUploaded.identity}
                onChange={(checked) => setFormData({ 
                  ...formData, 
                  documentsUploaded: { ...formData.documentsUploaded, identity: checked } 
                })}
              />

              <DocumentUploadCard
                title="Income Proof"
                description="Salary slips, Bank statements"
                checked={formData.documentsUploaded.income}
                onChange={(checked) => setFormData({ 
                  ...formData, 
                  documentsUploaded: { ...formData.documentsUploaded, income: checked } 
                })}
              />

              <DocumentUploadCard
                title="Address Proof"
                description="Utility bills, Aadhaar"
                checked={formData.documentsUploaded.address}
                onChange={(checked) => setFormData({ 
                  ...formData, 
                  documentsUploaded: { ...formData.documentsUploaded, address: checked } 
                })}
              />

              {loanType === 'home' && (
                <DocumentUploadCard
                  title="Property Documents"
                  description="Sale agreement, NOC"
                  checked={formData.documentsUploaded.property}
                  onChange={(checked) => setFormData({ 
                    ...formData, 
                    documentsUploaded: { ...formData.documentsUploaded, property: checked } 
                  })}
                />
              )}
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> Upload clear documents under 5MB each. Supported formats: PDF, JPG, PNG
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Review Application</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Loan Type:</span>
                <span className="font-medium">{config.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{(parseFloat(formData.loanAmount) / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Tenure:</span>
                <span className="font-medium">{formData.tenure[0]} months</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-medium text-blue-600">{config.rate}% p.a.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-medium text-blue-600">₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Purpose:</span>
                <span className="font-medium capitalize">{formData.purpose.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-sm text-blue-800 mb-3">Document Status</h4>
              <div className="space-y-2 text-sm">
                <DocumentStatus 
                  label="Identity Proof" 
                  uploaded={formData.documentsUploaded.identity} 
                />
                <DocumentStatus 
                  label="Income Proof" 
                  uploaded={formData.documentsUploaded.income} 
                />
                <DocumentStatus 
                  label="Address Proof" 
                  uploaded={formData.documentsUploaded.address} 
                />
                {loanType === 'home' && (
                  <DocumentStatus 
                    label="Property Documents" 
                    uploaded={formData.documentsUploaded.property} 
                  />
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-700">
                By submitting, you agree to our Terms & Conditions and confirm that all information provided is accurate.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const DocumentUploadCard = ({ title, description, checked, onChange }: { 
    title: string; 
    description: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void 
  }) => (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm text-gray-900">{title}</h4>
        <Checkbox 
          checked={checked}
          onCheckedChange={(checked) => onChange(checked as boolean)}
          className="data-[state=checked]:bg-blue-600"
        />
      </div>
      <p className="text-xs text-gray-500 mb-3">{description}</p>
      <Button variant="outline" size="sm" className="w-full h-9 text-xs">
        <Upload className="h-3.5 w-3.5 mr-1.5" />
        Upload Documents
      </Button>
    </div>
  );

  const DocumentStatus = ({ label, uploaded }: { label: string; uploaded: boolean }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={`inline-flex items-center text-xs font-medium ${
        uploaded ? 'text-blue-600' : 'text-amber-600'
      }`}>
        {uploaded ? (
          <>
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Uploaded
          </>
        ) : (
          <>
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pending
          </>
        )}
      </span>
    </div>
  );

  const stepLabels = ['Loan Details', 'Income Info', 'Documents', 'Review'];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-md mx-auto flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">{config.title} Application</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              {stepLabels.map((label, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-1 ${index + 1 <= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1 flex-1 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-md mx-auto px-6 pt-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)} 
                  className="flex-1 h-12 border-gray-300"
                >
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button 
                  onClick={handleNext} 
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default LoanApplication;



// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import { Checkbox } from '@/components/ui/checkbox';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { ArrowLeft, Calculator, FileText, Upload, User, Home, ChevronRight } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const LoanApplication = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { toast } = useToast();
  
//   const loanType = location.state?.loanType || 'personal';
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     loanAmount: '',
//     tenure: [24], // months
//     purpose: '',
//     employmentType: '',
//     monthlyIncome: '',
//     existingEMI: '',
//     panNumber: '',
//     aadharNumber: '',
//     documentsUploaded: {
//       identity: false,
//       income: false,
//       address: false,
//       property: false
//     }
//   });

//   const loanTypeConfig = {
//     personal: { 
//       title: 'Personal Loan', 
//       maxAmount: 3000000, 
//       minTenure: 6, 
//       maxTenure: 84,
//       rate: 10.5,
//       icon: <User className="h-5 w-5" />
//     },
//     home: { 
//       title: 'Home Loan', 
//       maxAmount: 100000000, 
//       minTenure: 60, 
//       maxTenure: 360,
//       rate: 8.5,
//       icon: <Home className="h-5 w-5" />
//     },
//     car: { 
//       title: 'Car Loan', 
//       maxAmount: 15000000, 
//       minTenure: 12, 
//       maxTenure: 84,
//       rate: 9.0,
//       icon: <FileText className="h-5 w-5" />
//     }
//   };

//   const config = loanTypeConfig[loanType] || loanTypeConfig.personal;

//   const calculateEMI = () => {
//     const principal = parseFloat(formData.loanAmount) || 0;
//     const rate = config.rate / 100 / 12;
//     const months = formData.tenure[0];
    
//     if (principal === 0) return 0;
    
//     const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
//     return emi;
//   };

//   const handleNext = () => {
//     if (step === 1 && (!formData.loanAmount || !formData.purpose)) {
//       toast({
//         title: "Required Fields Missing",
//         description: "Please fill in all required fields",
//         variant: "destructive"
//       });
//       return;
//     }
//     if (step < 4) setStep(step + 1);
//   };

//   const handleSubmit = () => {
//     toast({
//       title: "Application Submitted",
//       description: "Your loan application has been submitted successfully. We'll contact you within 24 hours.",
//     });
//     navigate('/loan-application-success', { 
//       state: { 
//         loanData: formData, 
//         loanType: config.title,
//         emi: calculateEMI(),
//         applicationId: `LA${Date.now().toString().slice(-8)}`
//       } 
//     });
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <BankingCard className="space-y-4">
//             <div>
//               <Label htmlFor="amount" className="text-sm">Loan Amount (₹) *</Label>
//               <Input
//                 id="amount"
//                 type="number"
//                 placeholder={`Up to ₹${(config.maxAmount / 100000).toFixed(0)}L`}
//                 value={formData.loanAmount}
//                 onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
//                 className="h-12 text-base"
//               />
//             </div>

//             <div>
//               <Label className="text-sm">Loan Tenure: {formData.tenure[0]} months ({(formData.tenure[0] / 12).toFixed(1)} years)</Label>
//               <div className="mt-3 mb-4">
//                 <Slider
//                   value={formData.tenure}
//                   onValueChange={(value) => setFormData({ ...formData, tenure: value })}
//                   max={config.maxTenure}
//                   min={config.minTenure}
//                   step={6}
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>{config.minTenure / 12} yrs</span>
//                   <span>{config.maxTenure / 12} yrs</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="purpose" className="text-sm">Purpose *</Label>
//               <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
//                 <SelectTrigger className="h-12">
//                   <SelectValue placeholder="Select purpose" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {loanType === 'personal' && (
//                     <>
//                       <SelectItem value="medical">Medical</SelectItem>
//                       <SelectItem value="wedding">Wedding</SelectItem>
//                       <SelectItem value="education">Education</SelectItem>
//                       <SelectItem value="travel">Travel</SelectItem>
//                       <SelectItem value="debt">Debt Consolidation</SelectItem>
//                       <SelectItem value="home-renovation">Home Renovation</SelectItem>
//                     </>
//                   )}
//                   {loanType === 'home' && (
//                     <>
//                       <SelectItem value="purchase">Buy Property</SelectItem>
//                       <SelectItem value="construction">Construction</SelectItem>
//                       <SelectItem value="renovation">Renovation</SelectItem>
//                       <SelectItem value="balance-transfer">Balance Transfer</SelectItem>
//                     </>
//                   )}
//                   {loanType === 'car' && (
//                     <>
//                       <SelectItem value="new-car">New Car</SelectItem>
//                       <SelectItem value="used-car">Used Car</SelectItem>
//                     </>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             {formData.loanAmount && (
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Calculator className="h-4 w-4 text-blue-600" />
//                   <span className="font-medium text-sm">EMI Estimate</span>
//                 </div>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span>Amount:</span>
//                     <span>₹{(parseFloat(formData.loanAmount) / 100000).toFixed(1)}L</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Rate:</span>
//                     <span className="text-blue-600">{config.rate}% p.a.</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tenure:</span>
//                     <span>{formData.tenure[0]} months</span>
//                   </div>
//                   <hr className="my-1 border-gray-200" />
//                   <div className="flex justify-between font-semibold text-blue-600">
//                     <span>Monthly EMI:</span>
//                     <span>₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </BankingCard>
//         );

//       case 2:
//         return (
//           <BankingCard className="space-y-4">
//             <div>
//               <Label className="text-sm">Employment Type</Label>
//               <RadioGroup
//                 value={formData.employmentType}
//                 onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
//                 className="space-y-2"
//               >
//                 <div className="flex items-center space-x-3">
//                   <RadioGroupItem value="salaried" id="salaried" />
//                   <Label htmlFor="salaried" className="text-sm">Salaried</Label>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <RadioGroupItem value="self-employed" id="self-employed" />
//                   <Label htmlFor="self-employed" className="text-sm">Self Employed</Label>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <RadioGroupItem value="business" id="business" />
//                   <Label htmlFor="business" className="text-sm">Business Owner</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label htmlFor="income" className="text-sm">Monthly Income (₹)</Label>
//               <Input
//                 id="income"
//                 type="number"
//                 placeholder="Enter monthly income"
//                 value={formData.monthlyIncome}
//                 onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
//                 className="h-12"
//               />
//             </div>

//             <div>
//               <Label htmlFor="existing-emi" className="text-sm">Existing EMIs (₹)</Label>
//               <Input
//                 id="existing-emi"
//                 type="number"
//                 placeholder="Total existing EMIs"
//                 value={formData.existingEMI}
//                 onChange={(e) => setFormData({ ...formData, existingEMI: e.target.value })}
//                 className="h-12"
//               />
//               <p className="text-xs text-gray-500 mt-1">Include all loan & credit card EMIs</p>
//             </div>

//             {formData.monthlyIncome && (
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <h4 className="font-medium text-sm mb-2">Eligibility Check</h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span>Income:</span>
//                     <span>₹{(parseFloat(formData.monthlyIncome) / 1000).toFixed(1)}k</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Existing EMI:</span>
//                     <span>₹{parseFloat(formData.existingEMI || '0').toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>New EMI:</span>
//                     <span>₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                   <hr className="my-1 border-gray-200" />
//                   <div className="flex justify-between font-medium">
//                     <span>Total EMI:</span>
//                     <span>₹{(calculateEMI() + parseFloat(formData.existingEMI || '0')).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                   <div className="flex justify-between text-xs">
//                     <span>EMI/Income:</span>
//                     <span className={`${((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100 > 50 ? 'text-red-600' : 'text-blue-600'}`}>
//                       {(((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </BankingCard>
//         );

//       case 3:
//         return (
//           <BankingCard className="space-y-3">
//             <h3 className="font-semibold text-sm">Upload Documents</h3>
            
//             <div className="space-y-2">
//               <DocumentUploadCard
//                 title="Identity Proof"
//                 description="PAN, Aadhaar, Passport, DL"
//                 checked={formData.documentsUploaded.identity}
//                 onChange={(checked) => setFormData({ 
//                   ...formData, 
//                   documentsUploaded: { ...formData.documentsUploaded, identity: checked } 
//                 })}
//               />

//               <DocumentUploadCard
//                 title="Income Proof"
//                 description="Salary slips, Bank statements"
//                 checked={formData.documentsUploaded.income}
//                 onChange={(checked) => setFormData({ 
//                   ...formData, 
//                   documentsUploaded: { ...formData.documentsUploaded, income: checked } 
//                 })}
//               />

//               <DocumentUploadCard
//                 title="Address Proof"
//                 description="Utility bills, Aadhaar"
//                 checked={formData.documentsUploaded.address}
//                 onChange={(checked) => setFormData({ 
//                   ...formData, 
//                   documentsUploaded: { ...formData.documentsUploaded, address: checked } 
//                 })}
//               />

//               {loanType === 'home' && (
//                 <DocumentUploadCard
//                   title="Property Documents"
//                   description="Sale agreement, NOC"
//                   checked={formData.documentsUploaded.property}
//                   onChange={(checked) => setFormData({ 
//                     ...formData, 
//                     documentsUploaded: { ...formData.documentsUploaded, property: checked } 
//                   })}
//                 />
//               )}
//             </div>

//             <div className="bg-amber-50 p-3 rounded-lg">
//               <p className="text-xs text-amber-700">
//                 <strong>Note:</strong> Clear documents under 5MB each
//               </p>
//             </div>
//           </BankingCard>
//         );

//       case 4:
//         return (
//           <BankingCard className="space-y-4">
//             <h3 className="font-semibold">{config.title} Application</h3>
            
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Amount:</span>
//                 <span>₹{(parseFloat(formData.loanAmount) / 100000).toFixed(1)}L</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Tenure:</span>
//                 <span>{formData.tenure[0]} months</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Rate:</span>
//                 <span className="text-blue-600">{config.rate}% p.a.</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">EMI:</span>
//                 <span className="font-medium">₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Purpose:</span>
//                 <span className="capitalize">{formData.purpose.replace('-', ' ')}</span>
//               </div>
//             </div>

//             <div className="bg-blue-50 p-3 rounded-lg">
//               <h4 className="font-medium text-sm text-blue-800 mb-1">Documents</h4>
//               <div className="space-y-1 text-xs">
//                 <DocumentStatus 
//                   label="Identity Proof" 
//                   uploaded={formData.documentsUploaded.identity} 
//                 />
//                 <DocumentStatus 
//                   label="Income Proof" 
//                   uploaded={formData.documentsUploaded.income} 
//                 />
//                 <DocumentStatus 
//                   label="Address Proof" 
//                   uploaded={formData.documentsUploaded.address} 
//                 />
//               </div>
//             </div>

//             <div className="bg-blue-50 p-3 rounded-lg">
//               <p className="text-xs text-blue-700">
//                 By submitting, you agree to our Terms & Conditions
//               </p>
//             </div>
//           </BankingCard>
//         );

//       default:
//         return null;
//     }
//   };

//   const DocumentUploadCard = ({ title, description, checked, onChange }: { 
//     title: string; 
//     description: string; 
//     checked: boolean; 
//     onChange: (checked: boolean) => void 
//   }) => (
//     <div className="p-3 border rounded-lg">
//       <div className="flex items-center justify-between mb-1">
//         <h4 className="font-medium text-sm">{title}</h4>
//         <Checkbox 
//           checked={checked}
//           onCheckedChange={(checked) => onChange(checked as boolean)}
//         />
//       </div>
//       <p className="text-xs text-gray-500 mb-2">{description}</p>
//       <Button variant="outline" size="sm" className="w-full h-8 text-xs">
//         <Upload className="h-3 w-3 mr-1" />
//         Upload
//       </Button>
//     </div>
//   );

//   const DocumentStatus = ({ label, uploaded }: { label: string; uploaded: boolean }) => (
//     <div className="flex justify-between">
//       <span>{label}:</span>
//       <span className={uploaded ? 'text-blue-600' : 'text-red-600'}>
//         {uploaded ? 'Uploaded' : 'Pending'}
//       </span>
//     </div>
//   );

//   return (
//     <BankingLayout>
//       <div className="pb-24">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
//               className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
//             >
//               <ArrowLeft className="h-5 w-5 text-gray-700" />
//             </Button>
//             <h1 className="text-lg font-semibold text-gray-900">{config.title}</h1>
//             <div className="w-10" />
//           </div>
//         </div>

//         {/* Progress Steps */}
//         <div className="px-4 py-3">
//           <div className="flex items-center justify-center space-x-1">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="flex items-center">
//                 <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
//                   i <= step ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
//                 }`}>
//                   {i}
//                 </div>
//                 {i < 4 && <div className={`w-6 h-1 ${i < step ? 'bg-primary' : 'bg-gray-100'}`} />}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Step Content */}
//         <div className="px-4">
//           {renderStep()}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
//           <div className="flex gap-2">
//             {step > 1 && (
//               <Button 
//                 variant="outline" 
//                 onClick={() => setStep(step - 1)} 
//                 className="flex-1 h-12"
//               >
//                 Back
//               </Button>
//             )}
//             {step < 4 ? (
//               <Button 
//                 onClick={handleNext} 
//                 className="flex-1 h-12"
//               >
//                 Continue
//               </Button>
//             ) : (
//               <Button 
//                 onClick={handleSubmit} 
//                 className="flex-1 h-12"
//               >
//                 Submit Application
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default LoanApplication;

// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import { Checkbox } from '@/components/ui/checkbox';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { ArrowLeft, Calculator, FileText, Upload, User, Home } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const LoanApplication = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { toast } = useToast();
  
//   const loanType = location.state?.loanType || 'personal';
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     loanAmount: '',
//     tenure: [24], // months
//     purpose: '',
//     employmentType: '',
//     monthlyIncome: '',
//     existingEMI: '',
//     panNumber: '',
//     aadharNumber: '',
//     documentsUploaded: {
//       identity: false,
//       income: false,
//       address: false,
//       property: false
//     }
//   });

//   const loanTypeConfig = {
//     personal: { 
//       title: 'Personal Loan', 
//       maxAmount: 3000000, 
//       minTenure: 6, 
//       maxTenure: 84,
//       rate: 10.5,
//       icon: <User className="h-6 w-6" />
//     },
//     home: { 
//       title: 'Home Loan', 
//       maxAmount: 100000000, 
//       minTenure: 60, 
//       maxTenure: 360,
//       rate: 8.5,
//       icon: <Home className="h-6 w-6" />
//     },
//     car: { 
//       title: 'Car Loan', 
//       maxAmount: 15000000, 
//       minTenure: 12, 
//       maxTenure: 84,
//       rate: 9.0,
//       icon: <FileText className="h-6 w-6" />
//     }
//   };

//   const config = loanTypeConfig[loanType] || loanTypeConfig.personal;

//   const calculateEMI = () => {
//     const principal = parseFloat(formData.loanAmount) || 0;
//     const rate = config.rate / 100 / 12;
//     const months = formData.tenure[0];
    
//     if (principal === 0) return 0;
    
//     const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
//     return emi;
//   };

//   const handleNext = () => {
//     if (step === 1 && (!formData.loanAmount || !formData.purpose)) {
//       toast({
//         title: "Required Fields Missing",
//         description: "Please fill in all required fields",
//         variant: "destructive"
//       });
//       return;
//     }
//     if (step < 4) setStep(step + 1);
//   };

//   const handleSubmit = () => {
//     toast({
//       title: "Application Submitted",
//       description: "Your loan application has been submitted successfully. We'll contact you within 24 hours.",
//     });
//     navigate('/loan-application-success', { 
//       state: { 
//         loanData: formData, 
//         loanType: config.title,
//         emi: calculateEMI(),
//         applicationId: `LA${Date.now().toString().slice(-8)}`
//       } 
//     });
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <BankingCard title="Loan Requirements" className="space-y-6">
//             <div>
//               <Label htmlFor="amount">Loan Amount (₹) *</Label>
//               <Input
//                 id="amount"
//                 type="number"
//                 placeholder={`Enter amount (Max: ₹${(config.maxAmount / 100000).toFixed(0)}L)`}
//                 value={formData.loanAmount}
//                 onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
//                 className="text-lg"
//               />
//             </div>

//             <div>
//               <Label>Loan Tenure: {formData.tenure[0]} months ({(formData.tenure[0] / 12).toFixed(1)} years)</Label>
//               <div className="mt-4 mb-6">
//                 <Slider
//                   value={formData.tenure}
//                   onValueChange={(value) => setFormData({ ...formData, tenure: value })}
//                   max={config.maxTenure}
//                   min={config.minTenure}
//                   step={6}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-xs text-muted-foreground mt-2">
//                   <span>{config.minTenure / 12} years</span>
//                   <span>{config.maxTenure / 12} years</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="purpose">Purpose of Loan *</Label>
//               <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select loan purpose" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {loanType === 'personal' && (
//                     <>
//                       <SelectItem value="medical">Medical Emergency</SelectItem>
//                       <SelectItem value="wedding">Wedding Expenses</SelectItem>
//                       <SelectItem value="education">Education</SelectItem>
//                       <SelectItem value="travel">Travel</SelectItem>
//                       <SelectItem value="debt">Debt Consolidation</SelectItem>
//                       <SelectItem value="home-renovation">Home Renovation</SelectItem>
//                     </>
//                   )}
//                   {loanType === 'home' && (
//                     <>
//                       <SelectItem value="purchase">Property Purchase</SelectItem>
//                       <SelectItem value="construction">Property Construction</SelectItem>
//                       <SelectItem value="renovation">Home Renovation</SelectItem>
//                       <SelectItem value="balance-transfer">Balance Transfer</SelectItem>
//                     </>
//                   )}
//                   {loanType === 'car' && (
//                     <>
//                       <SelectItem value="new-car">New Car Purchase</SelectItem>
//                       <SelectItem value="used-car">Used Car Purchase</SelectItem>
//                     </>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             {formData.loanAmount && (
//               <div className="bg-primary/5 p-4 rounded-xl">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Calculator className="h-4 w-4 text-primary" />
//                   <span className="font-medium">EMI Calculation</span>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Loan Amount:</span>
//                     <span>₹{parseFloat(formData.loanAmount).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Interest Rate:</span>
//                     <span className="text-blue-600">{config.rate}% p.a.</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tenure:</span>
//                     <span>{formData.tenure[0]} months</span>
//                   </div>
//                   <hr className="my-2" />
//                   <div className="flex justify-between font-semibold text-primary">
//                     <span>Monthly EMI:</span>
//                     <span>₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </BankingCard>
//         );

//       case 2:
//         return (
//           <BankingCard title="Employment & Income Details" className="space-y-6">
//             <div>
//               <Label>Employment Type</Label>
//               <RadioGroup
//                 value={formData.employmentType}
//                 onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="salaried" id="salaried" />
//                   <Label htmlFor="salaried">Salaried</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="self-employed" id="self-employed" />
//                   <Label htmlFor="self-employed">Self Employed</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="business" id="business" />
//                   <Label htmlFor="business">Business Owner</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label htmlFor="income">Monthly Income (₹)</Label>
//               <Input
//                 id="income"
//                 type="number"
//                 placeholder="Enter your monthly income"
//                 value={formData.monthlyIncome}
//                 onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
//               />
//             </div>

//             <div>
//               <Label htmlFor="existing-emi">Existing EMI (₹)</Label>
//               <Input
//                 id="existing-emi"
//                 type="number"
//                 placeholder="Total of all existing EMIs"
//                 value={formData.existingEMI}
//                 onChange={(e) => setFormData({ ...formData, existingEMI: e.target.value })}
//               />
//               <p className="text-xs text-muted-foreground mt-1">Include all loan EMIs, credit card EMIs</p>
//             </div>

//             {formData.monthlyIncome && (
//               <div className="bg-blue-50 p-4 rounded-xl">
//                 <h4 className="font-medium mb-2">Eligibility Check</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Monthly Income:</span>
//                     <span>₹{parseFloat(formData.monthlyIncome).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Existing EMI:</span>
//                     <span>₹{parseFloat(formData.existingEMI || '0').toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>New EMI:</span>
//                     <span>₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between font-medium">
//                     <span>Total EMI Burden:</span>
//                     <span>₹{(calculateEMI() + parseFloat(formData.existingEMI || '0')).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                   </div>
//                   <div className="flex justify-between text-xs">
//                     <span>EMI to Income Ratio:</span>
//                     <span className={`${((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100 > 50 ? 'text-red-600' : 'text-blue-600'}`}>
//                       {(((calculateEMI() + parseFloat(formData.existingEMI || '0')) / parseFloat(formData.monthlyIncome)) * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </BankingCard>
//         );

//       case 3:
//         return (
//           <BankingCard title="Document Upload" className="space-y-6">
//             <div className="space-y-4">
//               <div className="p-4 border rounded-xl">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium">Identity Proof</h4>
//                   <Checkbox 
//                     checked={formData.documentsUploaded.identity}
//                     onCheckedChange={(checked) => setFormData({ 
//                       ...formData, 
//                       documentsUploaded: { ...formData.documentsUploaded, identity: checked as boolean }
//                     })}
//                   />
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-3">PAN Card, Aadhaar, Passport, Driving License</p>
//                 <Button variant="outline" size="sm" className="w-full">
//                   <Upload className="h-4 w-4 mr-2" />
//                   Upload Document
//                 </Button>
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium">Income Proof</h4>
//                   <Checkbox 
//                     checked={formData.documentsUploaded.income}
//                     onCheckedChange={(checked) => setFormData({ 
//                       ...formData, 
//                       documentsUploaded: { ...formData.documentsUploaded, income: checked as boolean }
//                     })}
//                   />
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-3">Salary Slips, Form 16, Bank Statements</p>
//                 <Button variant="outline" size="sm" className="w-full">
//                   <Upload className="h-4 w-4 mr-2" />
//                   Upload Document
//                 </Button>
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium">Address Proof</h4>
//                   <Checkbox 
//                     checked={formData.documentsUploaded.address}
//                     onCheckedChange={(checked) => setFormData({ 
//                       ...formData, 
//                       documentsUploaded: { ...formData.documentsUploaded, address: checked as boolean }
//                     })}
//                   />
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-3">Utility Bills, Rent Agreement, Aadhaar</p>
//                 <Button variant="outline" size="sm" className="w-full">
//                   <Upload className="h-4 w-4 mr-2" />
//                   Upload Document
//                 </Button>
//               </div>

//               {loanType === 'home' && (
//                 <div className="p-4 border rounded-xl">
//                   <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium">Property Documents</h4>
//                     <Checkbox 
//                       checked={formData.documentsUploaded.property}
//                       onCheckedChange={(checked) => setFormData({ 
//                         ...formData, 
//                         documentsUploaded: { ...formData.documentsUploaded, property: checked as boolean }
//                       })}
//                     />
//                   </div>
//                   <p className="text-sm text-muted-foreground mb-3">Sale Agreement, Approved Plan, NOC</p>
//                   <Button variant="outline" size="sm" className="w-full">
//                     <Upload className="h-4 w-4 mr-2" />
//                     Upload Document
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="bg-amber-50 p-4 rounded-xl">
//               <p className="text-sm text-amber-700">
//                 <strong>Note:</strong> All documents should be clear and readable. File size should not exceed 5MB per document.
//               </p>
//             </div>
//           </BankingCard>
//         );

//       case 4:
//         return (
//           <BankingCard title="Review Application" className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="font-semibold text-lg">{config.title} Application</h3>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Loan Amount:</span>
//                   <span className="font-semibold">₹{parseFloat(formData.loanAmount).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Tenure:</span>
//                   <span className="font-semibold">{formData.tenure[0]} months ({(formData.tenure[0] / 12).toFixed(1)} years)</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Interest Rate:</span>
//                   <span className="font-semibold text-blue-600">{config.rate}% p.a.</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Monthly EMI:</span>
//                   <span className="font-semibold">₹{calculateEMI().toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Purpose:</span>
//                   <span className="font-semibold capitalize">{formData.purpose.replace('-', ' ')}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Employment:</span>
//                   <span className="font-semibold capitalize">{formData.employmentType.replace('-', ' ')}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Monthly Income:</span>
//                   <span className="font-semibold">₹{parseFloat(formData.monthlyIncome).toLocaleString()}</span>
//                 </div>
//               </div>

//               <div className="bg-blue-50 p-4 rounded-xl">
//                 <h4 className="font-medium text-blue-800 mb-2">Documents Status</h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span>Identity Proof:</span>
//                     <span className={formData.documentsUploaded.identity ? 'text-blue-600' : 'text-red-600'}>
//                       {formData.documentsUploaded.identity ? 'Uploaded' : 'Pending'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Income Proof:</span>
//                     <span className={formData.documentsUploaded.income ? 'text-blue-600' : 'text-red-600'}>
//                       {formData.documentsUploaded.income ? 'Uploaded' : 'Pending'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Address Proof:</span>
//                     <span className={formData.documentsUploaded.address ? 'text-blue-600' : 'text-red-600'}>
//                       {formData.documentsUploaded.address ? 'Uploaded' : 'Pending'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-xl">
//               <p className="text-sm text-blue-700">
//                 By submitting this application, you agree to our Terms & Conditions and authorize us to verify your information.
//               </p>
//             </div>
//           </BankingCard>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button variant="ghost" size="sm" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-lg font-semibold">{config.title} Application</h1>
//           <div className="w-10" />
//         </div>

//         {/* Progress Steps */}
//         <div className="flex items-center justify-center space-x-2">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="flex items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
//               }`}>
//                 {i}
//               </div>
//               {i < 4 && <div className={`w-8 h-1 ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
//             </div>
//           ))}
//         </div>

//         {/* Step Content */}
//         {renderStep()}

//         {/* Navigation Buttons */}
//         <div className="flex gap-3">
//           {step > 1 && (
//             <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
//               Previous
//             </Button>
//           )}
//           {step < 4 ? (
//             <Button onClick={handleNext} className="flex-1">
//               Next
//             </Button>
//           ) : (
//             <Button onClick={handleSubmit} className="flex-1">
//               Submit Application
//             </Button>
//           )}
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default LoanApplication;
