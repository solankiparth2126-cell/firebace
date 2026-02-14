'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized financial insight reports.
 *
 * - generateFinancialInsightReport - A function that triggers the AI to analyze spending habits,
 *   identify anomalies, and suggest savings.
 * - FinancialInsightReportInput - The input type for the generateFinancialInsightReport function.
 * - FinancialInsightReportOutput - The return type for the generateFinancialInsightReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TransactionSchema = z.object({
  id: z.string().describe('Unique identifier for the transaction.'),
  date: z.string().describe('The date of the transaction in YYYY-MM-DD format.'),
  description: z.string().describe('A brief description of the transaction.'),
  amount: z.number().describe('The amount of the transaction. Positive for income, negative for expenses.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction (income or expense).'),
  category: z.string().describe('The category of the transaction (e.g., Groceries, Salary, Rent).'),
});

const FinancialInsightReportInputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('A list of financial transactions for the reporting period.'),
  reportingPeriod: z.string().describe('A descriptive string of the reporting period (e.g., "Last Month", "Q1 2024").'),
  currentBalance: z.number().describe('The current account balance.'),
});
export type FinancialInsightReportInput = z.infer<typeof FinancialInsightReportInputSchema>;

const FinancialInsightReportOutputSchema = z.object({
  overallFinancialHealth: z.string().describe('A summary assessment of the user\'s financial health for the period.'),
  spendingAnalysis: z.string().describe('An analysis of overall spending patterns and trends.'),
  anomaliesDetected: z.array(z.string()).describe('A list of identified unusual or anomalous expenses.'),
  savingRecommendations: z.array(z.string()).describe('A list of personalized and actionable saving suggestions.'),
});
export type FinancialInsightReportOutput = z.infer<typeof FinancialInsightReportOutputSchema>;

export async function generateFinancialInsightReport(input: FinancialInsightReportInput): Promise<FinancialInsightReportOutput> {
  return financialInsightReportFlow(input);
}

const financialInsightReportPrompt = ai.definePrompt({
  name: 'financialInsightReportPrompt',
  input: { schema: FinancialInsightReportInputSchema },
  output: { schema: FinancialInsightReportOutputSchema },
  prompt: `You are an expert financial advisor named MoneyFlow AI, providing personalized financial insight reports.

Your task is to analyze the provided financial data for the reporting period: {{{reportingPeriod}}}.

Based on the transactions and current balance, perform the following:
1.  **Overall Financial Health**: Provide a concise summary of the user's financial health for this period. Mention positive aspects and areas for improvement.
2.  **Spending Analysis**: Analyze the user's spending habits. Identify key spending categories, trends, and how spending compares to income.
3.  **Anomalies Detected**: Point out any unusual, unexpectedly high, or seemingly anomalous expenses. Explain why they might be considered anomalous.
4.  **Saving Recommendations**: Provide 3-5 personalized and actionable suggestions for saving money, based on general financial principles and the user's spending patterns.

All currency values provided are in Indian Rupees (INR/₹).

Here is the financial data:

Reporting Period: {{{reportingPeriod}}}
Current Balance: ₹ {{{currentBalance}}}

Transactions:
{{#each transactions}}
  Date: {{{this.date}}}, Type: {{{this.type}}}, Category: {{{this.category}}}, Description: {{{this.description}}}, Amount: {{{this.amount}}}
{{/each}}

Focus on providing clear, actionable advice in a supportive and encouraging tone. Ensure your output strictly adheres to the JSON schema provided.
`,
});

const financialInsightReportFlow = ai.defineFlow(
  {
    name: 'financialInsightReportFlow',
    inputSchema: FinancialInsightReportInputSchema,
    outputSchema: FinancialInsightReportOutputSchema,
  },
  async (input) => {
    const { output } = await financialInsightReportPrompt(input);
    return output!;
  }
);
