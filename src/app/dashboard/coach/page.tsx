import { EnergyCoachForm } from './form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function EnergyCoachPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border bg-card p-3">
            <Zap className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="font-headline text-2xl font-bold">AI Energy Coach</h1>
            <p className="text-muted-foreground">
                Get personalized recommendations to reduce your energy consumption.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Energy Analysis</CardTitle>
          <CardDescription>
            Enter your monthly energy usage and home details to receive AI-powered advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EnergyCoachForm />
        </CardContent>
      </Card>
    </div>
  );
}
