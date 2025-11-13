import {
  kpiData,
  overviewChartData,
  districtChartData,
  recentActivityData,
} from '@/lib/data';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { DistrictChart } from '@/components/dashboard/district-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Energy Production vs Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart data={overviewChartData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Solar Adoption by District</CardTitle>
          </CardHeader>
          <CardContent>
            <DistrictChart data={districtChartData} />
          </CardContent>
        </Card>
      </div>
      <RecentActivity data={recentActivityData} />
    </div>
  );
}
