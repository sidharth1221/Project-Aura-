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
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Activity {
  user: string;
  action: string;
  timestamp: string;
  district: string;
}

interface RecentActivityProps {
  data: Activity[];
}

export function RecentActivity({ data }: RecentActivityProps) {
    const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          A log of recent activities on the AuraTwin platform.
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
            {data.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        {userAvatar && <AvatarImage src={`https://picsum.photos/seed/avatar${index}/100/100`} alt={`Avatar of ${activity.user}`} />}
                        <AvatarFallback>{activity.user.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{activity.user}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{activity.district}</Badge>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="text-right">{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
