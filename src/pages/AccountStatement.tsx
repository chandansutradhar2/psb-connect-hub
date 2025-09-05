import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Share, Filter, Calendar, Search } from 'lucide-react';

const AccountStatement = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('last30');
  const [transactionType, setTransactionType] = useState('all');

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Account Statement</h1>
          </div>
        </div>

        {/* Filters */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Statement Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="account">Select Account</Label>
              <Select defaultValue="savings">
                <SelectTrigger>
                  <SelectValue placeholder="Choose account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account ****7890</SelectItem>
                  <SelectItem value="current">Current Account ****8901</SelectItem>
                  <SelectItem value="fd">Fixed Deposit ****9012</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="period">Time Period</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 3 months</SelectItem>
                  <SelectItem value="last180">Last 6 months</SelectItem>
                  <SelectItem value="custom">Custom Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="from-date">From Date</Label>
              <Input type="date" id="from-date" />
            </div>

            <div>
              <Label htmlFor="to-date">To Date</Label>
              <Input type="date" id="to-date" />
            </div>

            <div>
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="credit">Credit Only</SelectItem>
                  <SelectItem value="debit">Debit Only</SelectItem>
                  <SelectItem value="upi">UPI Transactions</SelectItem>
                  <SelectItem value="neft">NEFT/RTGS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount-range">Amount Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Amount</SelectItem>
                  <SelectItem value="below-1000">Below ₹1,000</SelectItem>
                  <SelectItem value="1000-10000">₹1,000 - ₹10,000</SelectItem>
                  <SelectItem value="above-10000">Above ₹10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Generate Statement
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </BankingCard>

        {/* Statement Options */}
        <BankingCard>
          <h3 className="font-semibold mb-4">Statement Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Download className="h-5 w-5 mb-2" />
              Download PDF
            </Button>
            
            <Button variant="outline" className="h-16 flex-col">
              <Share className="h-5 w-5 mb-2" />
              Email Statement
            </Button>
            
            <Button variant="outline" className="h-16 flex-col">
              <Calendar className="h-5 w-5 mb-2" />
              Schedule Regular
            </Button>
          </div>
        </BankingCard>

        {/* Quick Statement Options */}
        <div className="grid grid-cols-2 gap-4">
          <BankingCard className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Monthly Statement</h4>
              <p className="text-sm text-muted-foreground mb-4">Current month transactions</p>
              <Button size="sm" className="w-full">Download</Button>
            </div>
          </BankingCard>

          <BankingCard className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Tax Statement</h4>
              <p className="text-sm text-muted-foreground mb-4">For income tax filing</p>
              <Button size="sm" className="w-full">Download</Button>
            </div>
          </BankingCard>
        </div>

        {/* Information */}
        <BankingCard className="bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Statement Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Statements are available for the last 5 years</li>
            <li>• Email delivery may take up to 30 minutes</li>
            <li>• PDF statements are password protected</li>
            <li>• Maximum 1000 transactions per statement</li>
          </ul>
        </BankingCard>
      </div>
    </BankingLayout>
  );
};

export default AccountStatement;