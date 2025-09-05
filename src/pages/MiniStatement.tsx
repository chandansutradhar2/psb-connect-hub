import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankingLayout } from '@/components/BankingLayout';
import { BankingCard } from '@/components/BankingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const MiniStatement = () => {
  const navigate = useNavigate();
  
  const transactions = [
    {
      id: '1',
      type: 'debit',
      amount: 2500,
      description: 'Amazon Pay',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'Success',
      reference: 'UPI001234',
      balance: 72920.50
    },
    {
      id: '2',
      type: 'credit',
      amount: 15000,
      description: 'Salary Credit',
      date: '2024-01-15',
      time: '09:00 AM',
      status: 'Success',
      reference: 'SAL202401',
      balance: 75420.50
    },
    {
      id: '3',
      type: 'debit',
      amount: 500,
      description: 'ATM Withdrawal',
      date: '2024-01-14',
      time: '04:45 PM',
      status: 'Success',
      reference: 'ATM789012',
      balance: 60420.50
    },
    {
      id: '4',
      type: 'debit',
      amount: 1200,
      description: 'Electricity Bill',
      date: '2024-01-14',
      time: '02:20 PM',
      status: 'Success',
      reference: 'BILL456789',
      balance: 60920.50
    },
    {
      id: '5',
      type: 'credit',
      amount: 5000,
      description: 'Fund Transfer Received',
      date: '2024-01-13',
      time: '11:15 AM',
      status: 'Success',
      reference: 'NEFT123456',
      balance: 62120.50
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <BankingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Mini Statement</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Account Info */}
        <BankingCard>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Savings Account</p>
            <p className="font-semibold">****7890</p>
            <p className="text-xs text-muted-foreground">Last 5 transactions</p>
          </div>
        </BankingCard>

        {/* Transactions */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <BankingCard key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)} • {transaction.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ref: {transaction.reference}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bal: {formatCurrency(transaction.balance)}
                  </p>
                  <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </BankingCard>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/account-statement')}
          >
            View Full Statement
          </Button>
          <Button 
            className="flex-1"
            onClick={() => navigate('/transfer')}
          >
            New Transaction
          </Button>
        </div>
      </div>
    </BankingLayout>
  );
};

export default MiniStatement;