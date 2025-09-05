
import { LucideIcon } from 'lucide-react';

export interface Account {
  type: string;
  balance: number;
  number: string;
  color: string;
  icon: LucideIcon;
}

export interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  time: string;
  icon: LucideIcon;
}

export interface Bill {
  name: string;
  amount: number;
  dueDate: string;
  icon: LucideIcon;
  urgent: boolean;
}

export interface QuickAction {
  icon: LucideIcon;
  label: string;
  path: string;
  color: string;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface CardType {
  id: number;
  name: string;
  number: string;
  type: "Credit Card" | "Debit Card";
  variant: string;
  status: "Active" | "Blocked" | "Expired";
  limit: string;
  available: string;
  expiryDate: string;
  rewardPoints: number;
  color: string;
  cvv?: string;
  pinSet?: boolean;
  internationalEnabled?: boolean;
  onlineEnabled?: boolean;
  contactlessEnabled?: boolean;
  spendingLimit?: number;
  currentSpending?: number;
  cardDesign?: string;
  issuer?: string;
  cardNetwork?: "Visa" | "Mastercard" | "RuPay";
  billingDate?: string;
  dueDate?: string;
  minimumDue?: string;
}

export interface CardApplication {
  id: string;
  title: string;
  description: string;
  features: string[];
  fee: string;
  color: string;
  eligibility: string;
  processingTime: string;
  type: "Credit Card" | "Debit Card";
  variant: string;
}

export interface LocationState {
  newCard?: Partial<CardType>;
}