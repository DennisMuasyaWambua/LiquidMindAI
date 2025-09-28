'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting anomalies in financial data.
 *
 * The flow takes financial data as input and uses AI to identify potential anomalies.
 * - financialAnomalyDetection - A function that initiates the anomaly detection process.
 * - FinancialAnomalyDetectionInput - The input type for the financialAnomalyDetection function.
 * - FinancialAnomalyDetectionOutput - The return type for the financialAnomalyDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAnomalyDetectionInputSchema = z.object({
  financialData: z
    .string()
    .describe('The financial data to analyze, provided as a string.'),
  dataDescription: z
    .string()
    .describe('A description of the financial data being provided, including the columns and their meanings.'),
});
export type FinancialAnomalyDetectionInput = z.infer<
  typeof FinancialAnomalyDetectionInputSchema
>;

const FinancialAnomalyDetectionOutputSchema = z.object({
  anomalies: z
    .string()
    .describe('A description of any anomalies detected in the financial data.'),
  summary: z
    .string()
    .describe('A summary of the financial data and any identified anomalies.'),
});
export type FinancialAnomalyDetectionOutput = z.infer<
  typeof FinancialAnomalyDetectionOutputSchema
>;

export async function financialAnomalyDetection(
  input: FinancialAnomalyDetectionInput
): Promise<FinancialAnomalyDetectionOutput> {
  return financialAnomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAnomalyDetectionPrompt',
  input: {schema: FinancialAnomalyDetectionInputSchema},
  output: {schema: FinancialAnomalyDetectionOutputSchema},
  prompt: `You are a financial analyst expert. Analyze the provided financial data and identify any anomalies.
Data Description: {{{dataDescription}}}
Financial Data: {{{financialData}}}

Provide a description of any anomalies detected, and a summary of the data and anomalies.
`,
});

const financialAnomalyDetectionFlow = ai.defineFlow(
  {
    name: 'financialAnomalyDetectionFlow',
    inputSchema: FinancialAnomalyDetectionInputSchema,
    outputSchema: FinancialAnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
