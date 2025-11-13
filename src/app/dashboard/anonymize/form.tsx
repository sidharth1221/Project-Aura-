'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitAnonymizationRequest, FormState } from './actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const defaultUserData = {
    "name": "John Doe",
    "age": 35,
    "address": "123 Main St",
    "energy_usage": 750
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Anonymizing...
        </>
      ) : (
        'Anonymize Data'
      )}
    </Button>
  );
}

export function AnonymizeForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(submitAnonymizationRequest, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Anonymization successful.') {
        const errorMessages = 
            state.errors?.userData?.join(', ') ||
            state.errors?.district?.join(', ') ||
            state.errors?.sensitivityLevel?.join(', ') ||
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormItem className="md:col-span-2">
              <FormLabel>User Data (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  name="userData"
                  rows={10}
                  defaultValue={JSON.stringify(defaultUserData, null, 2)}
                  placeholder='{ "name": "John Doe", "age": 35 }'
                  className="font-code"
                />
              </FormControl>
              <FormMessage>{state.errors?.userData}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input name="district" defaultValue="Downtown" placeholder="e.g., Northwood" />
              </FormControl>
              <FormMessage>{state.errors?.district}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Sensitivity Level</FormLabel>
              <Select
                name="sensitivityLevel"
                defaultValue="medium"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sensitivity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{state.errors?.sensitivityLevel}</FormMessage>
            </FormItem>
          </div>
          <SubmitButton />
        </form>

      {state.data && (
        <Card className="mt-6 bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Anonymization Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Recommended Strategy</AlertTitle>
              <AlertDescription>
                {state.data.anonymizationStrategy}
              </AlertDescription>
            </Alert>
            <div>
              <h4 className="font-semibold">Anonymized Data:</h4>
              <pre className="mt-2 rounded-md bg-background p-4 text-sm font-code">
                <code>
                  {JSON.stringify(state.data.anonymizedData, null, 2)}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
