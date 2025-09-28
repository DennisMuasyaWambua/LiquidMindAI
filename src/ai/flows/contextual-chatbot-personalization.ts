'use server';

/**
 * @fileOverview An AI agent that personalizes chatbot responses based on client data.
 *
 * - contextualChatbotPersonalization - A function that handles the personalized chatbot interaction.
 * - ContextualChatbotPersonalizationInput - The input type for the contextualChatbotPersonalization function.
 * - ContextualChatbotPersonalizationOutput - The return type for the contextualChatbotPersonalization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualChatbotPersonalizationInputSchema = z.object({
  clientId: z.string().describe('The ID of the client interacting with the chatbot.'),
  userQuery: z.string().describe('The user query to the chatbot.'),
});
export type ContextualChatbotPersonalizationInput = z.infer<
  typeof ContextualChatbotPersonalizationInputSchema
>;

const ContextualChatbotPersonalizationOutputSchema = z.object({
  response: z.string().describe('The personalized response from the chatbot.'),
});
export type ContextualChatbotPersonalizationOutput = z.infer<
  typeof ContextualChatbotPersonalizationOutputSchema
>;

export async function contextualChatbotPersonalization(
  input: ContextualChatbotPersonalizationInput
): Promise<ContextualChatbotPersonalizationOutput> {
  return contextualChatbotPersonalizationFlow(input);
}

const getClientData = ai.defineTool(
  {
    name: 'getClientData',
    description: 'Retrieves the 360-degree client data for a given client ID.',
    inputSchema: z.object({
      clientId: z.string().describe('The ID of the client.'),
    }),
    outputSchema: z.object({
      products: z.array(z.string()).describe('List of products the client uses.'),
      paymentHistory: z.string().describe('Summary of the client payment history.'),
      recentIssues: z.array(z.string()).describe('List of recent issues reported by the client.'),
      futureNeeds: z.string().describe('Summary of potential future needs of the client.'),
    }),
  },
  async (input) => {
    // TODO: Replace with actual data retrieval logic.
    // This is a placeholder implementation.
    return {
      products: ['Product A', 'Product B'],
      paymentHistory: 'Payments are up to date.',
      recentIssues: ['Issue 1', 'Issue 2'],
      futureNeeds: 'Interested in upgrading to a premium plan.',
    };
  }
);

const prompt = ai.definePrompt({
  name: 'contextualChatbotPersonalizationPrompt',
  tools: [getClientData],
  input: {schema: ContextualChatbotPersonalizationInputSchema},
  output: {schema: ContextualChatbotPersonalizationOutputSchema},
  prompt: `You are a helpful and friendly AI chatbot assisting customers.

  Based on the user's query and the available client data, provide a personalized and relevant response.
  If the user asks a question that can be answered using the client data, use the getClientData tool to retrieve the information.
  Reference the client's products, payment history, recent issues, and potential future needs when crafting your response to make it feel more personal.

  User Query: {{{userQuery}}}

  Instructions: Use the getClientData tool to obtain client information before answering the query.
  If the query is unrelated to client-specific data, respond generically.
  Remember to be friendly and helpful!
  `,      
});

const contextualChatbotPersonalizationFlow = ai.defineFlow(
  {
    name: 'contextualChatbotPersonalizationFlow',
    inputSchema: ContextualChatbotPersonalizationInputSchema,
    outputSchema: ContextualChatbotPersonalizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
