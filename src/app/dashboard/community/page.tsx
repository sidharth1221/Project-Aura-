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
import { Badge } from '@/components/ui/badge';
import { Trophy, Users } from 'lucide-react';
import { communityLeaderboardData } from '@/lib/data';


export default function CommunityPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-start gap-4">
            <div className="rounded-lg border bg-card p-3">
                <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="font-headline text-2xl font-bold">Community Leaderboard</h1>
                <p className="text-muted-foreground">
                    See how you stack up against others in the community. All data is anonymized.
                </p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Top Energy Producers</CardTitle>
                <CardDescription>
                Monthly leaderboard of top energy producers by district.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>User ID (Anonymized)</TableHead>
                    <TableHead className="text-right">Monthly Production (kWh)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {communityLeaderboardData.map((entry, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-bold">
                            <div className='flex items-center gap-2'>
                                {index < 3 && <Trophy className={`h-4 w-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-yellow-700'}`} />}
                                {index + 1}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{entry.district}</Badge>
                        </TableCell>
                        <TableCell>{entry.anonymizedUserId}</TableCell>
                        <TableCell className="text-right font-medium">{entry.production.toLocaleString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
