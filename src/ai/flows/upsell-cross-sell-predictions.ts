'use server';
/**
 * @fileOverview AI-powered predictions for upselling and cross-selling opportunities.
 *
 * - predictUpsellCrossSell - A function that predicts opportunities for upselling or cross-selling.
 * - PredictUpsellCrossSellInput - The input type for the predictUpsellCrossSell function.
 * - PredictUpsellCrossSellOutput - The return type for the predictUpsellCrossSell function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictUpsellCrossSellInputSchema = z.object({
  clientData: z.string().describe('Comprehensive data about the client, including product usage, contract details, and interaction history.'),
  currentProducts: z.string().describe('List of products or services the client currently uses.'),
  businessGoals: z.string().describe('The stated business goals of the client.'),
});
export type PredictUpsellCrossSellInput = z.infer<typeof PredictUpsellCrossSellInputSchema>;

const PredictUpsellCrossSellOutputSchema = z.object({
  upsellOpportunities: z.array(z.string()).describe('Potential upselling opportunities for the client.'),
  crossSellOpportunities: z.array(z.string()).describe('Potential cross-selling opportunities for the client.'),
  reasoning: z.string().describe('Explanation of why these opportunities are relevant to the client.'),
});
export type PredictUpsellCrossSellOutput = z.infer<typeof PredictUpsellCrossSellOutputSchema>;

export async function predictUpsellCrossSell(input: PredictUpsellCrossSellInput): Promise<PredictUpsellCrossSellOutput> {
  return predictUpsellCrossSellFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictUpsellCrossSellPrompt',
  input: {schema: PredictUpsellCrossSellInputSchema},
  output: {schema: PredictUpsellCrossSellOutputSchema},
  prompt: `You are an AI-powered sales assistant specializing in identifying upselling and cross-selling opportunities for clients.

  Analyze the following client data, current products, and business goals to identify relevant opportunities.

  Client Data: {{{clientData}}}
Current Products: {{{currentProducts}}}
Business Goals: {{{businessGoals}}}

  Based on this information, suggest potential upselling and cross-selling opportunities.
  Explain why these opportunities are relevant to the client and how they align with their business goals.
  Format your response as a JSON object with "upsellOpportunities", "crossSellOpportunities", and "reasoning" fields.
`,
});

const predictUpsellCrossSellFlow = ai.defineFlow(
  {
    name: 'predictUpsellCrossSellFlow',
    inputSchema: PredictUpsellCrossSellInputSchema,
    outputSchema: PredictUpsellCrossSellOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
