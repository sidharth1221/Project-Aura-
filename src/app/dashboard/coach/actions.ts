'use server';

import { z } from 'zod';
import { getEnergyAdvice, GetEnergyAdviceOutput } from '@/ai/flows/energy-coach-flow';

const FormSchema = z.object({
  energyUsage: z.coerce.number().positive('Energy usage must be a positive number.'),
  homeSize: z.coerce.number().positive('Home size must be a positive number.'),
  householdSize: z.coerce.number().positive('Household size must be a positive number.'),
});

export type FormState = {
  message: string;
  data?: GetEnergyAdviceOutput;
  errors?: {
    energyUsage?: string[];
    homeSize?: string[];
    householdSize?: string[];
    _form?: string[];
  };
};

export async function submitEnergyCoachRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    energyUsage: formData.get('energyUsage'),
    homeSize: formData.get('homeSize'),
    householdSize: formData.get('householdSize'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to validate fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await getEnergyAdvice(validatedFields.data);
    return { message: 'Analysis successful.', data: result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { 
        message: 'An error occurred during analysis.',
        errors: {
            _form: [errorMessage],
        }
    };
  }
}
