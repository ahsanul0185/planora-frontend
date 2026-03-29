import { getParticipantDashboardData } from "@/services/dashboard.services";
import { Activity } from "lucide-react";
import { Metadata } from "next";
import { KpiCard } from "@/components/modules/Dashboord/KpiCard";
import { ChartCard } from "@/components/modules/Dashboord/ChartCard";
import { BarChart } from "@/components/ui/charts/BarChart";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import { LineChart } from "@/components/ui/charts/LineChart";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard | Planora",
  description: "View your event activity and statistics.",
};

export default async function DashboardPage() {
  const response = await getParticipantDashboardData();
  const { statCards, charts, lists } = response.data;

  const STATUS_COLORS: Record<string, string> = {
    CONFIRMED: "#14b8a6", // teal-500
    PENDING: "#f97316",   // orange-500
    CANCELLED: "#6b7280", // gray-500
  };

  const donutLabels = charts.participationStatusBreakdown.map((c) =>
    c.status.charAt(0).toUpperCase() + c.status.slice(1).toLowerCase()
  );
  const donutData = charts.participationStatusBreakdown.map((c) => c.count);
  const donutColors = charts.participationStatusBreakdown.map(
    (c) => STATUS_COLORS[c.status] || "#6366f1"
  );

  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My activity & events
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Overview of your registered events, transactions, and reviews.
            </p>
          </div>
        </div>
      </div>

      {/* STAT CARDS (TOP ROW) */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Stat Cards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Events joined"
          value={statCards.eventsJoined}
          subtitle="all time"
        />
        <KpiCard
          title="Upcoming events"
          value={statCards.upcomingEvents}
          subtitle="confirmed"
        />
        <KpiCard
          title="Total spent"
          value={`$${statCards.totalSpent.toLocaleString()}`}
          subtitle="completed payments"
        />
        <KpiCard
          title="Reviews written"
          value={statCards.reviewsWritten}
          subtitle={`avg ${
            statCards.avgRatingGiven ? statCards.avgRatingGiven.toFixed(1) : 0
          } stars given`}
        />
      </div>

      {/* CHARTS */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-12 mb-4">
        Charts
      </h2>

      {/* R2: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="My participation status"
          description="Breakdown of all my requests"
        >
          {donutData.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 flex-1 mt-4">
              <div className="w-full flex items-center justify-center">
                <DonutChart
                  dataLabels={donutLabels}
                  dataValues={donutData}
                  colors={donutColors}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-6 w-full mt-2">
                {donutLabels.map((lbl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: donutColors[idx] }}
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
              No participation data available.
            </p>
          )}
        </ChartCard>

        <ChartCard
          title="Events joined by category"
          description="Which event types you attend most"
        >
          {charts.eventsJoinedByCategory.length > 0 ? (
            <BarChart
              dataLabels={charts.eventsJoinedByCategory.map((c) => c.category)}
              dataValues={charts.eventsJoinedByCategory.map((c) => c.count)}
              label="Events"
              indexAxis="y"
              color="#a855f7" // Purple flavor for participant categories
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No category data available.
            </p>
          )}
        </ChartCard>

        {/* R3: Line + Upcoming Confirmed */}
        <ChartCard
          title="Event activity over time"
          description="Number of events joined each month"
        >
          {charts.eventActivityOverTime.length > 0 ? (
            <LineChart
              dataLabels={charts.eventActivityOverTime.map((d) => d.month)}
              dataValues={charts.eventActivityOverTime.map((d) => d.count)}
              color="#3b82f6"
            />
          ) : (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No activity recorded yet.
            </p>
          )}
        </ChartCard>

        <ChartCard
          title="Upcoming confirmed events"
          description="What's next for you"
        >
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="font-medium pb-3 pr-4">Event</th>
                  <th className="font-medium pb-3 pr-4">Date</th>
                  <th className="font-medium pb-3 text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {lists.upcomingConfirmedEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    className="border-b border-border/10 last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium truncate max-w-[150px]">
                      {evt.event}
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">
                      {new Date(evt.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 text-right font-medium text-foreground">
                      {evt.fee === 0
                        ? "Free"
                        : `$${evt.fee.toFixed(0)} ${evt.currency}`}
                    </td>
                  </tr>
                ))}
                {lists.upcomingConfirmedEvents.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No upcoming confirmed events.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* R4: Payment History + Pending Invitations */}
        <ChartCard
          title="Payment history"
          description="Recent transactions with status"
        >
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="font-medium pb-3 pr-4">Event</th>
                  <th className="font-medium pb-3 pr-4">Amount</th>
                  <th className="font-medium pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {lists.paymentHistory.map((pay) => (
                  <tr
                    key={pay.id}
                    className="border-b border-border/10 last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium truncate max-w-[150px]">
                      {pay.event}
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">
                      ${pay.amount.toFixed(0)} {pay.currency}
                    </td>
                    <td className="py-4 text-right">
                      {pay.status === "COMPLETED" ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                        >
                          Paid
                        </Badge>
                      ) : pay.status === "REFUNDED" ? (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300"
                        >
                          Refunded
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
                        >
                          {pay.status.charAt(0) + pay.status.slice(1).toLowerCase()}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
                {lists.paymentHistory.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No payment history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard
          title="Pending invitations"
          description="Events you've been invited to"
        >
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="font-medium pb-3 pr-4">Event</th>
                  <th className="font-medium pb-3 pr-4">Host</th>
                  <th className="font-medium pb-3 text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {lists.pendingInvitations.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border/10 last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium truncate max-w-[150px]">
                      {inv.event}
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">
                      {inv.host}
                    </td>
                    <td className="py-4 text-right text-foreground font-medium">
                      {inv.fee === 0
                        ? "Free"
                        : `$${inv.fee.toFixed(0)} ${inv.currency}`}
                    </td>
                  </tr>
                ))}
                {lists.pendingInvitations.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No pending invitations.
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