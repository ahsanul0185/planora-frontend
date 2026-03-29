import { getAdminDashboardData } from "@/services/dashboard.services";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import { KpiCard } from "@/components/modules/Dashboord/KpiCard";
import { ChartCard } from "@/components/modules/Dashboord/ChartCard";
import { BarChart } from "@/components/ui/charts/BarChart";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import { LineChart } from "@/components/ui/charts/LineChart";

export const metadata: Metadata = {
  title: "Dashboard | Admin | Planora",
  description: "View system administration statistics and performance.",
};

export default async function AdminDashboardPage() {
  const response = await getAdminDashboardData();
  const { statCards, charts, lists } = response.data;

  // Colors for Visibility Split
  const VISIBILITY_COLORS: Record<string, string> = {
    PUBLIC: "#3b82f6", // blue
    PRIVATE: "#f59e0b", // amber
  };

  const visibilityLabels = charts.eventVisibilitySplit.map((c) =>
    c.visibility.charAt(0).toUpperCase() + c.visibility.slice(1).toLowerCase()
  );
  const visibilityData = charts.eventVisibilitySplit.map((c) => c.count);
  const visibilityColors = charts.eventVisibilitySplit.map(
    (c) => VISIBILITY_COLORS[c.visibility] || "#6366f1"
  );

  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              System Administration
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Overview of platform health, user growth, and global revenue.
            </p>
          </div>
        </div>
      </div>

      {/* STAT CARDS (TOP ROW) */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Global Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Total Users"
          value={statCards.totalUsers}
          subtitle={`+${statCards.newUsersThisWeek} this week`}
        />
        <KpiCard
          title="Total Events"
          value={statCards.totalEvents}
          subtitle="platform wide"
        />
        <KpiCard
          title="Active Events"
          value={statCards.activeEvents}
          subtitle="currently published"
        />
        <KpiCard
          title="Total Revenue"
          value={`$${statCards.totalRevenue.toLocaleString()}`}
          subtitle="all completed payments"
        />
        <KpiCard
          title="Pending Reports"
          value={statCards.pendingReports}
          subtitle="awaiting review"
        />
      </div>

      {/* CHARTS */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-12 mb-4">
        Platform Analytics
      </h2>

      {/* R2: Growth + Visibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="User Growth Over Time"
          description="New user registrations by date"
        >
          {charts.newUsersOverTime.length > 0 ? (
            <LineChart
              dataLabels={charts.newUsersOverTime.map((d) => d.date)}
              dataValues={charts.newUsersOverTime.map((d) => d.count)}
              color="#10b981" // emerald
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No recent registration data available.
            </p>
          )}
        </ChartCard>

        <ChartCard
          title="Event Visibility Split"
          description="Public vs Private events breakdown"
        >
          {visibilityData.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 flex-1 mt-4">
              <div className="w-full flex items-center justify-center">
                <DonutChart
                  dataLabels={visibilityLabels}
                  dataValues={visibilityData}
                  colors={visibilityColors}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-6 w-full mt-2">
                {visibilityLabels.map((lbl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: visibilityColors[idx] }}
                    ></div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No visibility data available.
            </p>
          )}
        </ChartCard>

        {/* R3: Categories + Revenue by Status */}
        <ChartCard
          title="Events by Category"
          description="Global distribution of event types"
        >
          {charts.eventsByCategory.length > 0 ? (
            <BarChart
              dataLabels={charts.eventsByCategory.map((c) => c.category)}
              dataValues={charts.eventsByCategory.map((c) => c.count)}
              label="Total Events"
              indexAxis="y"
              color="#a855f7" // Purple
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No category data available.
            </p>
          )}
        </ChartCard>

        <ChartCard
          title="Revenue by Payment Status"
          description="Completed vs Refunded volumes"
        >
          {charts.revenueByPaymentStatus.length > 0 ? (
             <BarChart
              dataLabels={charts.revenueByPaymentStatus.map((c) => c.status)}
              dataValues={charts.revenueByPaymentStatus.map((c) => c.total)}
              label="Total ($)"
              indexAxis="x"
              color="#f59e0b" // amber
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No payment status data available.
            </p>
          )}
        </ChartCard>

        {/* R4: Revenue Over Time (Full Width) */}
        <ChartCard
          title="Total System Revenue"
          description="Monthly aggregated transaction volume"
          className="lg:col-span-2"
        >
          {charts.revenueOverTime.length > 0 ? (
            <LineChart
              dataLabels={charts.revenueOverTime.map((d) => d.month)}
              dataValues={charts.revenueOverTime.map((d) => d.amount)}
              color="#6366f1" // indigo
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No revenue data recorded yet.
            </p>
          )}
        </ChartCard>
      </div>

      {/* R5: Recent Activity Feed */}
      <div className="grid grid-cols-1 gap-6 mt-8">
        <ChartCard
          title="Recent Platform Activity"
          description="Latest auditable actions across the system"
        >
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="font-medium pb-3 pr-4">Activity</th>
                  <th className="font-medium pb-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {lists.recentActivityFeed?.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/10 last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium">
                      {item.title}
                    </td>
                    <td className="py-4 text-right text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
                {(!lists.recentActivityFeed || lists.recentActivityFeed.length === 0) && (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No recent activity feed available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

    </div>
  );
}