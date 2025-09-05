import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, UserPlus, Building, CreditCard } from 'lucide-react';

const AddBeneficiary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bank');

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Add Beneficiary</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bank">Bank Account</TabsTrigger>
            <TabsTrigger value="upi">UPI ID</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          {/* Bank Account Tab */}
          <TabsContent value="bank">
            <BankingCard>
              <h3 className="font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Bank Account Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="beneficiary-name">Beneficiary Name</Label>
                  <Input 
                    id="beneficiary-name"
                    placeholder="Enter full name as per bank records"
                  />
                </div>
                
                <div>
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input 
                    id="account-number"
                    placeholder="Enter account number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirm-account">Confirm Account Number</Label>
                  <Input 
                    id="confirm-account"
                    placeholder="Re-enter account number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input 
                    id="ifsc"
                    placeholder="Enter IFSC code"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input 
                    id="bank-name"
                    placeholder="Bank name (auto-filled)"
                    disabled
                  />
                </div>
                
                <div>
                  <Label htmlFor="transfer-type">Transfer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transfer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imps">IMPS (Immediate)</SelectItem>
                      <SelectItem value="neft">NEFT (Next working hour)</SelectItem>
                      <SelectItem value="rtgs">RTGS (Real-time - Above ₹2 Lakh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="nickname">Nickname (Optional)</Label>
                  <Input 
                    id="nickname"
                    placeholder="e.g., John's Savings"
                  />
                </div>
              </div>
            </BankingCard>
          </TabsContent>

          {/* UPI ID Tab */}
          <TabsContent value="upi">
            <BankingCard>
              <h3 className="font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                UPI Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upi-id">UPI ID / VPA</Label>
                  <Input 
                    id="upi-id"
                    placeholder="e.g., john@paytm or john@okaxis"
                  />
                </div>
                
                <div>
                  <Label htmlFor="upi-name">Beneficiary Name</Label>
                  <Input 
                    id="upi-name"
                    placeholder="Name will be verified automatically"
                  />
                </div>
                
                <div>
                  <Label htmlFor="upi-nickname">Nickname (Optional)</Label>
                  <Input 
                    id="upi-nickname"
                    placeholder="e.g., John UPI"
                  />
                </div>
                
                <Button variant="outline" className="w-full">
                  Verify UPI ID
                </Button>
              </div>
            </BankingCard>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet">
            <BankingCard>
              <h3 className="font-semibold mb-4 flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Wallet Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallet-type">Wallet Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="googlepay">Google Pay</SelectItem>
                      <SelectItem value="mobikwik">MobiKwik</SelectItem>
                      <SelectItem value="freecharge">FreeCharge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="wallet-number">Mobile Number / Wallet ID</Label>
                  <Input 
                    id="wallet-number"
                    placeholder="Enter mobile number or wallet ID"
                  />
                </div>
                
                <div>
                  <Label htmlFor="wallet-name">Beneficiary Name</Label>
                  <Input 
                    id="wallet-name"
                    placeholder="Name as registered with wallet"
                  />
                </div>
                
                <div>
                  <Label htmlFor="wallet-nickname">Nickname (Optional)</Label>
                  <Input 
                    id="wallet-nickname"
                    placeholder="e.g., John Paytm"
                  />
                </div>
              </div>
            </BankingCard>
          </TabsContent>
        </Tabs>

        {/* Terms and Conditions */}
        <BankingCard className="bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please verify all details before adding beneficiary</li>
            <li>• New beneficiaries may take 30 minutes to activate</li>
            <li>• Daily transfer limits apply as per your account type</li>
            <li>• Keep your mobile number updated for OTP verification</li>
          </ul>
        </BankingCard>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button className="flex-1">
            Add Beneficiary
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default AddBeneficiary;