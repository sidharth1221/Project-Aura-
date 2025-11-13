'use server';
/**
 * @fileOverview A flow to determine the best anonymization strategy for user data before aggregation.
 *
 * - anonymizeData - A function that handles the anonymization process.
 * - AnonymizeDataInput - The input type for the anonymizeData function.
 * - AnonymizeDataOutput - The return type for the anonymizeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnonymizeDataInputSchema = z.object({
  userData: z.record(z.any()).describe('User data to be anonymized.'),
  district: z.string().describe('The district the user belongs to.'),
  sensitivityLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('Sensitivity level of the data.'),
});
export type AnonymizeDataInput = z.infer<typeof AnonymizeDataInputSchema>;

const AnonymizeDataOutputSchema = z.object({
  anonymizationStrategy:
    z.string().describe('The recommended anonymization strategy.'),
  anonymizedData: z.record(z.any()).describe('The anonymized user data.'),
});
export type AnonymizeDataOutput = z.infer<typeof AnonymizeDataOutputSchema>;

export async function anonymizeData(
  input: AnonymizeDataInput
): Promise<AnonymizeDataOutput> {
  return anonymizeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anonymizeDataPrompt',
  input: {schema: AnonymizeDataInputSchema},
  output: {schema: AnonymizeDataOutputSchema},
  prompt: `You are an expert in data privacy and anonymization techniques.

  Based on the user data, district, and sensitivity level, recommend the most suitable anonymization strategy and provide the anonymized data.

  User Data: {{{userData}}}
  District: {{{district}}}
  Sensitivity Level: {{{sensitivityLevel}}}

  Consider techniques such as data masking, generalization, suppression, and perturbation.

  Provide the anonymization strategy as a string and the anonymized data as a JSON object.
  Ensure that the anonymized data maintains the utility for district-level analysis while protecting user privacy.

  Output the anonymization strategy and the anonymized data.
  `,
});

const anonymizeDataFlow = ai.defineFlow(
  {
    name: 'anonymizeDataFlow',
    inputSchema: AnonymizeDataInputSchema,
    outputSchema: AnonymizeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
