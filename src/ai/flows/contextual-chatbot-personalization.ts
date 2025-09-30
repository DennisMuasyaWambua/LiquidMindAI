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


const contextualChatbotPersonalizationFlow = ai.defineFlow(
  {
    name: 'contextualChatbotPersonalizationFlow',
    inputSchema: ContextualChatbotPersonalizationInputSchema,
    outputSchema: ContextualChatbotPersonalizationOutputSchema,
  },
  async (input) => {
    // This flow now acts as a proxy to the external API to avoid CORS issues.
    try {
      const response = await fetch('https://whatsappinventoryragbot-production.up.railway.app/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input.userQuery }),
      });
      
      if (!response.ok) {
        console.error('API response was not ok.', response.status, response.statusText);
        return { response: "I'm sorry, there was an issue with the external API." };
      }
      
      const result = await response.json();
      
      return { response: result.response || "I'm sorry, I couldn't find an answer to that." };

    } catch (error) {
      console.error("Error calling external chat API from flow:", error);
      return { response: "Sorry, I'm having trouble connecting to the chat service. Please try again later." };
    }
  }
);
