'use client';

import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  useUser,
} from '@/firebase';
import {
  collection,
  doc,
  increment,
} from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Award, CheckCircle } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  reward: number;
}

function MissionSkeleton() {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Skeleton className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

export function MissionsList() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const missionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'missions');
  }, [firestore]);

  const { data: missions, isLoading } = useCollection<Mission>(missionsQuery);

  const handleCompleteMission = (mission: Mission) => {
    if (!user || !firestore) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    updateDocumentNonBlocking(userDocRef, {
      auraPoints: increment(mission.reward),
    });

    toast({
      title: 'Mission Complete!',
      description: `You've earned ${mission.reward} Aura Points!`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <MissionSkeleton />
        <MissionSkeleton />
        <MissionSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {missions &&
        missions.map(mission => (
          <div
            key={mission.id}
            className="flex items-center space-x-4 rounded-md border p-4"
          >
            <Award className="h-6 w-6 text-yellow-500" />
            <div className="flex-1">
              <p className="font-medium">{mission.title}</p>
              <p className="text-sm text-muted-foreground">
                Reward: {mission.reward} Aura Points
              </p>
            </div>
            <Button
              onClick={() => handleCompleteMission(mission)}
              size="sm"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
          </div>
        ))}
    </div>
  );
}
