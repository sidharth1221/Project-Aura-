'use server';
/**
 * @fileOverview An AI flow to estimate solar potential for a given address.
 *
 * - getSolarPotential - A function that returns a solar potential analysis.
 * - GetSolarPotentialInput - The input type for the getSolarPotential function.
 * - GetSolarPotentialOutput - The return type for the getSolarPotential function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetSolarPotentialInputSchema = z.object({
  address: z.string().describe('The full street address for solar potential analysis.'),
});
export type GetSolarPotentialInput = z.infer<typeof GetSolarPotentialInputSchema>;

const GetSolarPotentialOutputSchema = z.object({
  yearlyEnergyKWh: z.number().describe('The estimated annual energy production in kWh.'),
  analysis: z.string().describe('A brief analysis of the location\'s solar potential, mentioning factors like sun exposure and roof space.'),
});
export type GetSolarPotentialOutput = z.infer<typeof GetSolarPotentialOutputSchema>;

export async function getSolarPotential(
  input: GetSolarPotentialInput
): Promise<GetSolarPotentialOutput> {
  return solarPotentialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solarPotentialPrompt',
  input: {schema: GetSolarPotentialInputSchema},
  output: {schema: GetSolarPotentialOutputSchema},
  prompt: `You are a solar energy expert. Based on the address provided, you will act as if you have analyzed it using Google's Solar API.

  Address: {{{address}}}

  Based on this *fictional* analysis, generate a realistic estimated annual energy production in kWh. Also, provide a brief summary of the analysis, mentioning hypothetical factors like roof orientation, sun exposure, and available roof space.

  Do not state that the data is fictional. Present it as a real analysis.
  For the address "Vidhana Soudha, Bengaluru, Karnataka, India", use a yearlyEnergyKWh value of around 18,000 to 22,000. For other addresses, generate a realistic but different number.
  `,
});

const solarPotentialFlow = ai.defineFlow(
  {
    name: 'solarPotentialFlow',
    inputSchema: GetSolarPotentialInputSchema,
    outputSchema: GetSolarPotentialOutputSchema,
  },
  async input => {
    // In a real application, this is where you would call the Google Solar API.
    // For this demo, we are simulating the API call with an LLM.
    const {output} = await prompt(input);
    return output!;
  }
);
