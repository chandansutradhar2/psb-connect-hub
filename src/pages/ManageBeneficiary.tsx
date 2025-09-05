import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Building, 
  CreditCard, 
  Smartphone,
  MoreVertical
} from 'lucide-react';

const ManageBeneficiary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const beneficiaries = [
    {
      id: '1',
      name: 'John Doe',
      type: 'bank',
      account: '****1234',
      bank: 'HDFC Bank',
      nickname: 'John Savings',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      type: 'upi',
      account: 'sarah@paytm',
      bank: 'UPI',
      nickname: 'Sarah UPI',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      type: 'wallet',
      account: '+91 9876543210',
      bank: 'PhonePe',
      nickname: 'Mike PhonePe',
      status: 'Pending'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Building className="h-4 w-4" />;
      case 'upi': return <CreditCard className="h-4 w-4" />;
      case 'wallet': return <Smartphone className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Manage Beneficiaries</h1>
          </div>
          
          <Button onClick={() => navigate('/add-beneficiary')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search beneficiaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Beneficiary List */}
        <div className="space-y-3">
          {filteredBeneficiaries.map((beneficiary) => (
            <BankingCard key={beneficiary.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {getTypeIcon(beneficiary.type)}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">{beneficiary.name}</h4>
                    <p className="text-sm text-muted-foreground">{beneficiary.nickname}</p>
                    <p className="text-xs text-muted-foreground">
                      {beneficiary.account} • {beneficiary.bank}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={beneficiary.status === 'Active' ? 'default' : 'secondary'}>
                    {beneficiary.status}
                  </Badge>
                  
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </BankingCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-14">
            <Edit className="h-5 w-5 mr-2" />
            Edit Selected
          </Button>
          <Button variant="outline" className="h-14">
            <Trash2 className="h-5 w-5 mr-2" />
            Delete Selected
          </Button>
        </div>

        {/* Information */}
        <BankingCard className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Beneficiary Limits</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum 50 beneficiaries allowed</li>
            <li>• New beneficiaries activate in 30 minutes</li>
            <li>• IMPS available 24x7 for registered beneficiaries</li>
            <li>• Edit or delete beneficiaries anytime</li>
          </ul>
        </BankingCard>
      </div>
    </BankingLayout>
  );
};

export default ManageBeneficiary;