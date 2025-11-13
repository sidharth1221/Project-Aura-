'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitSolarPotentialRequest, FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Estimating...
        </>
      ) : (
        'Estimate Potential'
      )}
    </Button>
  );
}

export function SolarPotentialForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(submitSolarPotentialRequest, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Analysis successful.') {
        const errorMessages =
            state.errors?.address?.join(', ') ||
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
            className="space-y-4"
        >
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" defaultValue="Vidhana Soudha, Bengaluru, Karnataka, India" placeholder="Enter a full address" />
              {state.errors?.address && <p className="text-sm font-medium text-destructive">{state.errors.address}</p>}
            </div>
          <SubmitButton />
        </form>

      {state.data && (
        <Card className="mt-6 bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Solar Potential Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Estimated Yearly Production</AlertTitle>
              <AlertDescription>
                <span className='font-bold text-lg'>{state.data.yearlyEnergyKWh.toLocaleString()} kWh</span>
              </AlertDescription>
            </Alert>
            <div>
              <h4 className="font-semibold">Analysis Summary:</h4>
              <p className="text-sm text-muted-foreground">{state.data.analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
