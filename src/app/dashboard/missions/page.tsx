import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Award } from 'lucide-react';
  import { MissionsList } from './missions-list';
  
  export default function MissionsPage() {
    return (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg border bg-card p-3">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold">Missions</h1>
            <p className="text-muted-foreground">
              Complete missions to earn Aura Points and contribute to a greener
              planet.
            </p>
          </div>
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Available Missions</CardTitle>
            <CardDescription>
              Check off missions as you complete them to claim your rewards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MissionsList />
          </CardContent>
        </Card>
      </div>
    );
  }
  