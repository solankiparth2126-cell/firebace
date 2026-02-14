
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  ledgerId: string;
}

export interface Ledger {
  id: string;
  name: string;
  description: string;
  balance: number;
  icon: string;
}
