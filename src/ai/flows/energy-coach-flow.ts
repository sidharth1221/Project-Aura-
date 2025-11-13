'use server';
/**
 * @fileOverview An AI flow to provide energy saving advice.
 *
 * - getEnergyAdvice - A function that returns energy-saving recommendations.
 * - GetEnergyAdviceInput - The input type for the getEnergyAdvice function.
 * - GetEnergyAdviceOutput - The return type for the getEnergyAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetEnergyAdviceInputSchema = z.object({
  energyUsage: z.number().describe('The monthly energy usage in kWh.'),
  homeSize: z.number().describe('The size of the home in square feet.'),
  householdSize: z.number().describe('The number of people in the household.'),
});
export type GetEnergyAdviceInput = z.infer<typeof GetEnergyAdviceInputSchema>;

const GetEnergyAdviceOutputSchema = z.object({
  analysis: z.string().describe('A brief analysis of the user\'s energy consumption compared to averages.'),
  recommendations: z.array(z.string()).describe('A list of actionable energy-saving recommendations.'),
});
export type GetEnergyAdviceOutput = z.infer<typeof GetEnergyAdviceOutputSchema>;

export async function getEnergyAdvice(
  input: GetEnergyAdviceInput
): Promise<GetEnergyAdviceOutput> {
  return energyCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'energyCoachPrompt',
  input: {schema: GetEnergyAdviceInputSchema},
  output: {schema: GetEnergyAdviceOutputSchema},
  prompt: `You are an expert AI Energy Coach. Your goal is to help users reduce their energy consumption.

  Based on the user's monthly energy usage ({{{energyUsage}}} kWh), home size ({{{homeSize}}} sq. ft.), and household size ({{{householdSize}}} people), provide a brief analysis of their consumption and a list of 3-5 actionable recommendations.

  Keep the tone encouraging and helpful. Frame the analysis in a way that provides context (e.g., "Your usage is slightly above average for a household of your size.").

  Provide a concise analysis and a list of recommendations.
  `,
});

const energyCoachFlow = ai.defineFlow(
  {
    name: 'energyCoachFlow',
    inputSchema: GetEnergyAdviceInputSchema,
    outputSchema: GetEnergyAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
