import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

export const TransactionItem = ({ transaction, onClick }: TransactionItemProps) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getAmountColor = () => {
    if (transaction.status === 'failed') return 'text-muted-foreground';
    return transaction.type === 'credit' ? 'text-success' : 'text-foreground';
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 border-b border-border/50 last:border-0",
        "hover:bg-muted/30 transition-colors duration-200",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "p-2 rounded-full",
          transaction.type === 'credit' 
            ? "bg-success/10 text-success" 
            : "bg-muted text-muted-foreground"
        )}>
          {transaction.type === 'credit' ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">
              {new Date(transaction.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </p>
            {getStatusIcon()}
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className={cn("text-sm font-semibold", getAmountColor())}>
          {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
        </p>
        {transaction.reference && (
          <p className="text-xs text-muted-foreground mt-1">
            Ref: {transaction.reference}
          </p>
        )}
      </div>
    </div>
  );
};