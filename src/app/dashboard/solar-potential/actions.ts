'use server';

import { z } from 'zod';
import { getSolarPotential, GetSolarPotentialOutput } from '@/ai/flows/solar-potential-flow';

const FormSchema = z.object({
  address: z.string().min(10, 'Please enter a full address.'),
});

export type FormState = {
  message: string;
  data?: GetSolarPotentialOutput;
  errors?: {
    address?: string[];
    _form?: string[];
  };
};

export async function submitSolarPotentialRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    address: formData.get('address'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to validate fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await getSolarPotential(validatedFields.data);
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
