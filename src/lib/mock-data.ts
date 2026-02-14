import { Transaction, Ledger } from './types';

export const MOCK_LEDGERS: Ledger[] = [
  { id: '1', name: 'Main Account', description: 'Primary checking account', balance: 4500.50, icon: 'Wallet' },
  { id: '2', name: 'Savings Account', description: 'Emergency fund', balance: 12000.00, icon: 'PiggyBank' },
  { id: '3', name: 'Investment Account', description: 'Stock portfolio', balance: 8500.25, icon: 'TrendingUp' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-03-01', description: 'Salary Deposit', amount: 50000, type: 'income', category: 'Salary', ledgerId: '1' },
  { id: 't2', date: '2024-03-02', description: 'Rent Payment', amount: 15000, type: 'expense', category: 'Rent', ledgerId: '1' },
  { id: 't3', date: '2024-03-05', description: 'Big Bazaar Groceries', amount: 3500.75, type: 'expense', category: 'Food & Dining', ledgerId: '1' },
  { id: 't4', date: '2024-03-08', description: 'Tata Power Bill', amount: 1200.20, type: 'expense', category: 'Utilities', ledgerId: '1' },
  { id: 't5', date: '2024-03-10', description: 'Upwork Payment', amount: 8500, type: 'income', category: 'Salary', ledgerId: '1' },
  { id: 't6', date: '2024-03-12', description: 'Amazon Shopping', amount: 2499, type: 'expense', category: 'Shopping', ledgerId: '1' },
  { id: 't7', date: '2024-03-15', description: 'PVR Cinemas', amount: 850.40, type: 'expense', category: 'Entertainment', ledgerId: '1' },
  { id: 't8', date: '2024-03-18', description: 'Apollo Pharmacy', amount: 450.00, type: 'expense', category: 'Healthcare', ledgerId: '1' },
  { id: 't9', date: '2024-03-20', description: 'Uber Ride', amount: 320.50, type: 'expense', category: 'Transportation', ledgerId: '1' },
  { id: 't10', date: '2024-03-22', description: 'Stock Dividend', amount: 1200, type: 'income', category: 'Investments', ledgerId: '3' },
];
