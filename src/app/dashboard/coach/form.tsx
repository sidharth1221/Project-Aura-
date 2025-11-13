'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnergyCoachRequest, FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
            <Sparkles className="mr-2 h-4 w-4" />
            Get Advice
        </>
      )}
    </Button>
  );
}

export function EnergyCoachForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(submitEnergyCoachRequest, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Analysis successful.') {
        const errorMessages = 
            state.errors?.energyUsage?.join(', ') ||
            state.errors?.homeSize?.join(', ') ||
            state.errors?.householdSize?.join(', ') ||
            state.errors?._form?.join(', ') ||
            state.message;
      
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessages,
        });
    }
  }, [state, toast]);


  return (
    <div className="space-y-6">
        <form
            ref={formRef}
            action={formAction}
            className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="energyUsage">Monthly Energy (kWh)</Label>
                <Input id="energyUsage" name="energyUsage" type="number" defaultValue="750" placeholder="e.g., 750" />
              {state.errors?.energyUsage && <p className="text-sm font-medium text-destructive">{state.errors.energyUsage}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeSize">Home Size (sq. ft.)</Label>
                <Input id="homeSize" name="homeSize" type="number" defaultValue="1500" placeholder="e.g., 1500" />
              {state.errors?.homeSize && <p className="text-sm font-medium text-destructive">{state.errors.homeSize}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="householdSize">Household Size</Label>
                <Input id="householdSize" name="householdSize" type="number" defaultValue="3" placeholder="e.g., 3" />
                {state.errors?.householdSize && <p className="text-sm font-medium text-destructive">{state.errors.householdSize}</p>}
            </div>
          </div>
          <SubmitButton />
        </form>

      {state.data && (
        <Card className="mt-6 bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <Alert>
                <AlertTitle className='font-bold'>Energy Profile Analysis</AlertTitle>
                <AlertDescription>
                    {state.data.analysis}
                </AlertDescription>
            </Alert>
            <div>
              <h4 className="font-semibold mb-2">Personalized Tips:</h4>
              <ul className="list-disc space-y-2 pl-5">
                {state.data.recommendations.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
