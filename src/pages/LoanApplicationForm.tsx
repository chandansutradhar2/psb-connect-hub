import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  IndianRupee
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { loanType, creditScore, selectedAmount, selectedTenure } = location.state || {};
  
  const [formData, setFormData] = useState({
    // Employment Details
    employmentType: '',
    employerName: '',
    designation: '',
    workExperience: '',
    monthlyIncome: '',
    
    // Business Details (for self-employed)
    businessName: '',
    businessType: '',
    annualTurnover: '',
    businessVintage: '',
    
    // Personal Details
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    education: '',
    
    // Address Details
    currentAddress: '',
    permanentAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Existing EMIs
    hasExistingEMI: '',
    existingEMIAmount: '',
    existingEMIDetails: '',
    
    // Nominee Details
    nomineeName: '',
    nomineeRelation: '',
    nomineeDOB: '',
    nomineeAddress: '',
    
    // Contact Details
    mobile: '',
    email: '',
    alternateMobile: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // Basic validation
    const requiredFields = ['employmentType', 'monthlyIncome', 'currentAddress', 'nomineeName'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    navigate('/loan-document-upload', { 
      state: { 
        loanType,
        creditScore,
        selectedAmount,
        selectedTenure,
        formData 
      } 
    });
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/loan-eligibility-result')}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Loan Application</h1>
          <div></div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">✓</div>
          <div className="w-16 h-0.5 bg-primary"></div>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">✓</div>
          <div className="w-16 h-0.5 bg-primary"></div>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
        </div>

        {/* Loan Summary */}
        <BankingCard title="Loan Summary" className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-bold">₹{selectedAmount?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tenure</p>
              <p className="font-bold">{selectedTenure} months</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CIBIL Score</p>
              <p className="font-bold text-blue-600">{creditScore}</p>
            </div>
          </div>
        </BankingCard>

        {/* Employment Details */}
        <BankingCard title="Employment Details" className="rounded-2xl">
          <div className="space-y-4">
            <div>
              <Label>Employment Type *</Label>
              <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.employmentType === 'salaried' && (
              <>
                <div>
                  <Label>Employer Name *</Label>
                  <Input
                    value={formData.employerName}
                    onChange={(e) => handleInputChange('employerName', e.target.value)}
                    placeholder="Enter employer name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Designation</Label>
                  <Input
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="Enter designation"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Work Experience (years)</Label>
                  <Input
                    value={formData.workExperience}
                    onChange={(e) => handleInputChange('workExperience', e.target.value)}
                    placeholder="Enter work experience"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Monthly Income *</Label>
                  <Input
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    placeholder="Enter monthly income"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {(formData.employmentType === 'self-employed' || formData.employmentType === 'business') && (
              <>
                <div>
                  <Label>Business Name *</Label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter business name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Business Type</Label>
                  <Input
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    placeholder="Enter business type"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Annual Turnover *</Label>
                  <Input
                    value={formData.annualTurnover}
                    onChange={(e) => handleInputChange('annualTurnover', e.target.value)}
                    placeholder="Enter annual turnover"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Business Vintage (years)</Label>
                  <Input
                    value={formData.businessVintage}
                    onChange={(e) => handleInputChange('businessVintage', e.target.value)}
                    placeholder="Enter business vintage"
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>
        </BankingCard>

        {/* Personal Details */}
        <BankingCard title="Personal Details" className="rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Father's Name</Label>
              <Input
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                placeholder="Enter father's name"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Mother's Name</Label>
              <Input
                value={formData.motherName}
                onChange={(e) => handleInputChange('motherName', e.target.value)}
                placeholder="Enter mother's name"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Education</Label>
              <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="post-graduate">Post Graduate</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </BankingCard>

        {/* Address Details */}
        <BankingCard title="Address Details" className="rounded-2xl">
          <div className="space-y-4">
            <div>
              <Label>Current Address *</Label>
              <Textarea
                value={formData.currentAddress}
                onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                placeholder="Enter current address"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>PIN Code</Label>
              <Input
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter PIN code"
                className="mt-1"
              />
            </div>
          </div>
        </BankingCard>

        {/* Existing EMIs */}
        <BankingCard title="Existing EMIs" className="rounded-2xl">
          <div className="space-y-4">
            <div>
              <Label>Do you have any existing EMIs?</Label>
              <Select value={formData.hasExistingEMI} onValueChange={(value) => handleInputChange('hasExistingEMI', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.hasExistingEMI === 'yes' && (
              <>
                <div>
                  <Label>Total Existing EMI Amount</Label>
                  <Input
                    value={formData.existingEMIAmount}
                    onChange={(e) => handleInputChange('existingEMIAmount', e.target.value)}
                    placeholder="Enter total EMI amount"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>EMI Details</Label>
                  <Textarea
                    value={formData.existingEMIDetails}
                    onChange={(e) => handleInputChange('existingEMIDetails', e.target.value)}
                    placeholder="Enter details of existing EMIs"
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>
        </BankingCard>

        {/* Nominee Details */}
        <BankingCard title="Nominee Details" className="rounded-2xl">
          <div className="space-y-4">
            <div>
              <Label>Nominee Name *</Label>
              <Input
                value={formData.nomineeName}
                onChange={(e) => handleInputChange('nomineeName', e.target.value)}
                placeholder="Enter nominee name"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Relationship *</Label>
                <Select value={formData.nomineeRelation} onValueChange={(value) => handleInputChange('nomineeRelation', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="brother">Brother</SelectItem>
                    <SelectItem value="sister">Sister</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.nomineeDOB}
                  onChange={(e) => handleInputChange('nomineeDOB', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </BankingCard>

        {/* Contact Details */}
        <BankingCard title="Contact Details" className="rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mobile Number</Label>
              <Input
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="Enter mobile number"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email ID</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email ID"
                className="mt-1"
              />
            </div>
          </div>
        </BankingCard>

        <Button onClick={handleNext} className="w-full">
          Continue to Document Upload
        </Button>
      </div>
    </BankingLayout>
  );
};

export default LoanApplicationForm;
