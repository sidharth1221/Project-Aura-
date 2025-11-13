
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

// Define a type for the user profile data we expect from Firestore
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  district: string;
  updatedAt: string; // Stored as ISO string
}

function ActivitySkeleton() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell><Skeleton className="h-4 w-48" /></TableCell>
            <TableCell className="text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
        </TableRow>
    )
}


export function RecentActivity() {
  const firestore = useFirestore();

  // Create a memoized query to fetch the 5 most recently updated users
  const recentUsersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'users'), 
        orderBy('updatedAt', 'desc'), 
        limit(5)
    );
  }, [firestore]);

  const { data: recentUsers, isLoading } = useCollection<UserProfile>(recentUsersQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          A log of the most recently updated profiles on the AuraTwin platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">District</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
                <>
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                </>
            )}
            {recentUsers && recentUsers.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://picsum.photos/seed/avatar${index}/100/100`} alt={`Avatar of ${activity.firstName}`} />
                        <AvatarFallback>{activity.firstName?.[0]}{activity.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{activity.firstName} {activity.lastName}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{activity.district || 'N/A'}</Badge>
                </TableCell>
                <TableCell>Profile updated.</TableCell>
                <TableCell className="text-right">{formatDistanceToNow(new Date(activity.updatedAt), { addSuffix: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
