'use server';
/**
 * @fileOverview This file implements a Genkit flow for parsing and categorizing bank statement text.
 *
 * - parseBankStatement - A function that triggers the AI to extract transactions from raw text.
 * - ParseStatementInput - The input type for the parseBankStatement function.
 * - ParseStatementOutput - The return type for the parseBankStatement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StatementTransactionSchema = z.object({
  date: z.string().describe('The date of the transaction (YYYY-MM-DD).'),
  description: z.string().describe('The description or merchant name.'),
  amount: z.number().describe('The transaction amount (positive for income, negative for expenses).'),
  type: z.enum(['income', 'expense']).describe('The type of transaction.'),
  category: z.string().describe('The most likely category (e.g., Food, Transport, Rent, Shopping).'),
});

const ParseStatementInputSchema = z.object({
  statementText: z.string().describe('The raw text content extracted from a bank statement (CSV, PDF text, etc.).'),
});
export type ParseStatementInput = z.infer<typeof ParseStatementInputSchema>;

const ParseStatementOutputSchema = z.object({
  transactions: z.array(StatementTransactionSchema).describe('The list of parsed and categorized transactions.'),
  summary: z.string().describe('A brief summary of what was found in the statement.'),
});
export type ParseStatementOutput = z.infer<typeof ParseStatementOutputSchema>;

export async function parseBankStatement(input: ParseStatementInput): Promise<ParseStatementOutput> {
  return parseStatementFlow(input);
}

const parseStatementPrompt = ai.definePrompt({
  name: 'parseStatementPrompt',
  input: { schema: ParseStatementInputSchema },
  output: { schema: ParseStatementOutputSchema },
  prompt: `You are an expert financial data analyst for MoneyFlow Pro.
Your task is to parse the following raw bank statement text and extract a list of transactions.

Rules:
1. Identify dates, descriptions, and amounts.
2. Categorize each transaction into one of these categories: Food & Dining, Shopping, Transportation, Rent & Housing, Utilities & Bills, Healthcare, Entertainment, Education, Travel, Investments, Salary, or Miscellaneous.
3. If an amount represents money leaving the account, mark it as 'expense' and make the amount negative.
4. If an amount represents money entering the account, mark it as 'income' and make the amount positive.
5. All values should be treated as Indian Rupees (INR).

Statement Text:
{{{statementText}}}

Return a structured JSON object containing the transactions and a short summary.`,
});

const parseStatementFlow = ai.defineFlow(
  {
    name: 'parseStatementFlow',
    inputSchema: ParseStatementInputSchema,
    outputSchema: ParseStatementOutputSchema,
  },
  async (input) => {
    const { output } = await parseStatementPrompt(input);
    return output!;
  }
);
