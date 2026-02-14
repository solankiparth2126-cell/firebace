import { Transaction, Ledger } from './types';

export const MOCK_LEDGERS: Ledger[] = [
  { id: '1', name: 'HDFC Checking', description: 'Primary bank account for daily expenses', balance: 45000.50, icon: 'Wallet' },
  { id: '2', name: 'ICICI Savings', description: 'Emergency fund and savings', balance: 125000.00, icon: 'PiggyBank' },
  { id: '3', name: 'SBI Salary', description: 'Salary deposit account', balance: 85000.00, icon: 'Banknote' },
  { id: '4', name: 'Kotak Business', description: 'Freelance and business income', balance: 32000.75, icon: 'Banknote' },
  { id: '5', name: 'Amex Platinum', description: 'Travel and dining card', balance: -12500.00, icon: 'CreditCard' },
  { id: '6', name: 'HDFC Regalia', description: 'Lifestyle and shopping card', balance: -8400.20, icon: 'CreditCard' },
  { id: '7', name: 'SBI Prime', description: 'Utility and grocery card', balance: -3200.50, icon: 'CreditCard' },
  { id: '8', name: 'Investment Account', description: 'Equity and Mutual Funds', balance: 250000.00, icon: 'TrendingUp' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-03-01', description: 'Salary Deposit', amount: 95000, type: 'income', category: 'Salary', ledgerId: '3' },
  { id: 't2', date: '2024-03-02', description: 'Rent Payment', amount: 25000, type: 'expense', category: 'Rent', ledgerId: '1' },
  { id: 't3', date: '2024-03-05', description: 'Big Bazaar Groceries', amount: 4500.75, type: 'expense', category: 'Food & Dining', ledgerId: '7' },
  { id: 't4', date: '2024-03-08', description: 'Tata Power Bill', amount: 1800.20, type: 'expense', category: 'Utilities', ledgerId: '7' },
  { id: 't5', date: '2024-03-10', description: 'Freelance Project', amount: 15000, type: 'income', category: 'Salary', ledgerId: '4' },
  { id: 't6', date: '2024-03-12', description: 'Amazon Shopping', amount: 5499, type: 'expense', category: 'Shopping', ledgerId: '6' },
  { id: 't7', date: '2024-03-15', description: 'Dining at Taj', amount: 3200.40, type: 'expense', category: 'Food & Dining', ledgerId: '5' },
  { id: 't8', date: '2024-03-18', description: 'Health Checkup', amount: 1200.00, type: 'expense', category: 'Healthcare', ledgerId: '1' },
  { id: 't9', date: '2024-03-20', description: 'Uber Ride', amount: 450.50, type: 'expense', category: 'Transportation', ledgerId: '6' },
  { id: 't10', date: '2024-03-22', description: 'Mutual Fund Dividend', amount: 2200, type: 'income', category: 'Investments', ledgerId: '8' },
];
