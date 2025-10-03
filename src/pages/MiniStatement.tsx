// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BankingLayout } from '@/components/BankingLayout';
// import { BankingCard } from '@/components/BankingCard';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Download, Share, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// const MiniStatement = () => {
//   const navigate = useNavigate();
  
//   const transactions = [
//     {
//       id: '1',
//       type: 'debit',
//       amount: 2500,
//       description: 'Amazon Pay',
//       date: '2024-01-15',
//       time: '10:30 AM',
//       status: 'Success',
//       reference: 'UPI001234',
//       balance: 72920.50
//     },
//     {
//       id: '2',
//       type: 'credit',
//       amount: 15000,
//       description: 'Salary Credit',
//       date: '2024-01-15',
//       time: '09:00 AM',
//       status: 'Success',
//       reference: 'SAL202401',
//       balance: 75420.50
//     },
//     {
//       id: '3',
//       type: 'debit',
//       amount: 500,
//       description: 'ATM Withdrawal',
//       date: '2024-01-14',
//       time: '04:45 PM',
//       status: 'Success',
//       reference: 'ATM789012',
//       balance: 60420.50
//     },
//     {
//       id: '4',
//       type: 'debit',
//       amount: 1200,
//       description: 'Electricity Bill',
//       date: '2024-01-14',
//       time: '02:20 PM',
//       status: 'Success',
//       reference: 'BILL456789',
//       balance: 60920.50
//     },
//     {
//       id: '5',
//       type: 'credit',
//       amount: 5000,
//       description: 'Fund Transfer Received',
//       date: '2024-01-13',
//       time: '11:15 AM',
//       status: 'Success',
//       reference: 'NEFT123456',
//       balance: 62120.50
//     }
//   ];

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(amount);
//   };

//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <BankingLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-semibold">Mini Statement</h1>
//           </div>
          
//           <div className="flex space-x-2">
//             <Button variant="outline" size="sm">
//               <Filter className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="sm">
//               <Download className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="sm">
//               <Share className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Account Info */}
//         <BankingCard>
//           <div className="text-center">
//             <p className="text-sm text-muted-foreground mb-1">Savings Account</p>
//             <p className="font-semibold">****7890</p>
//             <p className="text-xs text-muted-foreground">Last 5 transactions</p>
//           </div>
//         </BankingCard>

//         {/* Transactions */}
//         <div className="space-y-3">
//           {transactions.map((transaction) => (
//             <BankingCard key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className={`p-2 rounded-full ${
//                     transaction.type === 'credit' 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'bg-red-100 text-red-600'
//                   }`}>
//                     {transaction.type === 'credit' ? (
//                       <ArrowDownLeft className="h-4 w-4" />
//                     ) : (
//                       <ArrowUpRight className="h-4 w-4" />
//                     )}
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium">{transaction.description}</h4>
//                     <p className="text-sm text-muted-foreground">
//                       {formatDate(transaction.date)} • {transaction.time}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       Ref: {transaction.reference}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                   <p className={`font-semibold ${
//                     transaction.type === 'credit' ? 'text-blue-600' : 'text-red-600'
//                   }`}>
//                     {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Bal: {formatCurrency(transaction.balance)}
//                   </p>
//                   <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'} className="text-xs">
//                     {transaction.status}
//                   </Badge>
//                 </div>
//               </div>
//             </BankingCard>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex space-x-4">
//           <Button 
//             variant="outline" 
//             className="flex-1"
//             onClick={() => navigate('/account-statement')}
//           >
//             View Full Statement
//           </Button>
//           <Button 
//             className="flex-1"
//             onClick={() => navigate('/transfer')}
//           >
//             New Transaction
//           </Button>
//         </div>
//       </div>
//     </BankingLayout>
//   );
// };

// export default MiniStatement;

import { useNavigate } from "react-router-dom";
import { BankingLayout } from "@/components/BankingLayout";
import { BankingCard } from "@/components/BankingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast"; // your toast
import {
  ArrowLeft,
  Download,
  Share,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

const MiniStatement = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      id: "1",
      type: "debit",
      amount: 2500,
      description: "Amazon Pay",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "Success",
      reference: "UPI001234",
      balance: 72920.5,
    },
    {
      id: "2",
      type: "credit",
      amount: 15000,
      description: "Salary Credit",
      date: "2024-01-15",
      time: "09:00 AM",
      status: "Success",
      reference: "SAL202401",
      balance: 75420.5,
    },
    {
      id: "3",
      type: "debit",
      amount: 500,
      description: "ATM Withdrawal",
      date: "2024-01-14",
      time: "04:45 PM",
      status: "Success",
      reference: "ATM789012",
      balance: 60420.5,
    },
    {
      id: "4",
      type: "debit",
      amount: 1200,
      description: "Electricity Bill",
      date: "2024-01-14",
      time: "02:20 PM",
      status: "Success",
      reference: "BILL456789",
      balance: 60920.5,
    },
    {
      id: "5",
      type: "credit",
      amount: 5000,
      description: "Fund Transfer Received",
      date: "2024-01-13",
      time: "11:15 AM",
      status: "Success",
      reference: "NEFT123456",
      balance: 62120.5,
    },
  ];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is coming soon!`,
      duration: 3000,
    });
  };

  return (
    <BankingLayout>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1178AC] to-[#1397DA] bg-clip-text text-transparent">
            Mini Statement
          </h1>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleComingSoon("Filter")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleComingSoon("Download")}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleComingSoon("Share")}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 pb-32 mt-2 p-2">
        {/* Account Info */}
        <BankingCard>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Savings Account</p>
            <p className="text-lg font-semibold tracking-wide">****7890</p>
            <p className="text-xs text-muted-foreground">
              Last 5 transactions
            </p>
          </div>
        </BankingCard>

        {/* Transactions */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <BankingCard
              key={transaction.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">
                      {transaction.description}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)} • {transaction.time}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Ref: {transaction.reference}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p
                    className={`font-semibold text-sm ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bal: {formatCurrency(transaction.balance)}
                  </p>
                  <Badge
                    variant={
                      transaction.status === "Success"
                        ? "default"
                        : "destructive"
                    }
                    className="text-[11px] px-2 py-0.5 rounded-md"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </BankingCard>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 p-4 flex space-x-4 shadow-md border-t">
        <Button
          variant="outline"
          className="flex-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => handleComingSoon("View Full Statement")}
        >
          View Full Statement
        </Button>
        <Button
          className="flex-1 rounded-lg bg-gradient-to-r from-[#1178AC] to-[#1397DA] text-white hover:opacity-90"
          onClick={() => navigate("/transfer")}
        >
          New Transaction
        </Button>
      </div>
    </BankingLayout>
  );
};

export default MiniStatement;
