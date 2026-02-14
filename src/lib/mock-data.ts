import { Transaction, Ledger } from './types';

export const MOCK_LEDGERS: Ledger[] = [
  { id: '1', name: 'Main Account', description: 'Primary checking account', balance: 4500.50, icon: 'Wallet' },
  { id: '2', name: 'Savings Account', description: 'Emergency fund', balance: 12000.00, icon: 'PiggyBank' },
  { id: '3', name: 'Investment Account', description: 'Stock portfolio', balance: 8500.25, icon: 'TrendingUp' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-03-01', description: 'Salary Deposit', amount: 5000, type: 'income', category: 'Salary', ledgerId: '1' },
  { id: 't2', date: '2024-03-02', description: 'Rent Payment', amount: -1500, type: 'expense', category: 'Rent', ledgerId: '1' },
  { id: 't3', date: '2024-03-05', description: 'Grocery Store', amount: -150.75, type: 'expense', category: 'Groceries', ledgerId: '1' },
  { id: 't4', date: '2024-03-08', description: 'Electric Bill', amount: -85.20, type: 'expense', category: 'Utilities', ledgerId: '1' },
  { id: 't5', date: '2024-03-10', description: 'Freelance Work', amount: 450, type: 'income', category: 'Salary', ledgerId: '1' },
  { id: 't6', date: '2024-03-12', description: 'Netflix Subscription', amount: -15.99, type: 'expense', category: 'Entertainment', ledgerId: '1' },
  { id: 't7', date: '2024-03-15', description: 'Dining Out', amount: -65.40, type: 'expense', category: 'Entertainment', ledgerId: '1' },
];