import { AnonymizeForm } from './form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AnonymizePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border bg-card p-3">
            <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="font-headline text-2xl font-bold">Data Anonymization Engine</h1>
            <p className="text-muted-foreground">
                Use our AI-powered tool to determine the best anonymization strategy for user data before aggregation.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Anonymize Data</CardTitle>
          <CardDescription>
            Input user data, district, and sensitivity level to get a recommended anonymization strategy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnonymizeForm />
        </CardContent>
      </Card>
    </div>
  );
}
