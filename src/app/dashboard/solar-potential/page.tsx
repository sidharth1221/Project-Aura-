import { SolarPotentialForm } from './form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sun } from 'lucide-react';

export default function SolarPotentialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border bg-card p-3">
            <Sun className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="font-headline text-2xl font-bold">Solar Potential Estimator</h1>
            <p className="text-muted-foreground">
                Use our AI-powered tool to estimate the solar energy potential of a location.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Estimate Solar Potential</CardTitle>
          <CardDescription>
            Enter a location address to get an AI-generated solar analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SolarPotentialForm />
        </CardContent>
      </Card>
    </div>
  );
}
