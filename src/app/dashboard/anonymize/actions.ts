'use server';

import { z } from 'zod';
import { anonymizeData, AnonymizeDataOutput } from '@/ai/flows/anonymize-data-for-privacy';

const FormSchema = z.object({
  userData: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: "Invalid JSON format." }),
  district: z.string().min(1, 'District is required.'),
  sensitivityLevel: z.enum(['low', 'medium', 'high']),
});

export type FormState = {
  message: string;
  data?: AnonymizeDataOutput;
  errors?: {
    userData?: string[];
    district?: string[];
    sensitivityLevel?: string[];
    _form?: string[];
  };
};

export async function submitAnonymizationRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    userData: formData.get('userData'),
    district: formData.get('district'),
    sensitivityLevel: formData.get('sensitivityLevel'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to validate fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const parsedUserData = JSON.parse(validatedFields.data.userData);
    const result = await anonymizeData({
        userData: parsedUserData,
        district: validatedFields.data.district,
        sensitivityLevel: validatedFields.data.sensitivityLevel,
    });
    return { message: 'Anonymization successful.', data: result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { 
        message: 'An error occurred during anonymization.',
        errors: {
            _form: [errorMessage],
        }
    };
  }
}
