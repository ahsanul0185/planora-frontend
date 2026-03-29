import { getOrganizerDashboardData } from "@/services/dashboard.services";
import { LayoutDashboard } from "lucide-react";
import { Metadata } from "next";
import { KpiCard } from "@/components/modules/Dashboord/KpiCard";
import { ChartCard } from "@/components/modules/Dashboord/ChartCard";
import { BarChart } from "@/components/ui/charts/BarChart";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import { LineChart } from "@/components/ui/charts/LineChart";

export const metadata: Metadata = {
  title: "Dashboard | Organizer | Planora",
  description: "View your event statistics and performance.",
};

export default async function OrganizerDashboardPage() {
  const response = await getOrganizerDashboardData();
  const { statCards, charts, lists } = response.data;

  const STATUS_COLORS: Record<string, string> = {
    CONFIRMED: "#14b8a6", // teal-500
    PENDING: "#f97316",   // orange-500
    REJECTED: "#dc2626",  // red-600
    BANNED: "#6b7280",
    CANCELLED: "#374151"
  };

  const donutLabels = charts.participationStatusBreakdown.map((c) => c.status);
  const donutData = charts.participationStatusBreakdown.map((c) => c.count);
  const donutColors = donutLabels.map((l) => STATUS_COLORS[l] || "#6366f1");

  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-8">
      {/* Header section similar to my-profile */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center">
            <LayoutDashboard className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My events performance
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Overview of your created events and participant statistics.
            </p>
          </div>
        </div>
      </div>

      {/* STAT CARDS (TOP ROW) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard title="Total events" value={statCards.totalEvents} subtitle={`${statCards.activeEvents} active`} />
        <KpiCard title="Total participants" value={statCards.totalParticipants} subtitle="across all events" />
        <KpiCard title="Revenue earned" value={`$${statCards.revenueEarned.toLocaleString()}`} subtitle="completed payments" />
        <KpiCard title="Pending requests" value={statCards.pendingRequests} subtitle="awaiting approval" />
        <KpiCard title="Avg rating" value={statCards.avgRating} subtitle="across all events" />
      </div>

      {/* CHARTS */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-12 mb-4">
        Overview
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart - Participants Per Event */}
        <ChartCard title="Participants per event" description="Confirmed count for each event you created">
          <BarChart 
            dataLabels={charts.participantsPerEvent.map(p => p.event.substring(0, 15) + (p.event.length > 15 ? "..." : ""))} 
            dataValues={charts.participantsPerEvent.map(p => p.count)}
            label="Participants"
            indexAxis="y"
            color="#10b981"
          />
        </ChartCard>

        {/* Donut Chart - Participation Status */}
        <ChartCard title="Participation status breakdown" description="All requests across your events">
          <div className="flex flex-col items-center justify-center gap-6 flex-1 mt-4">
            <div className="w-full flex items-center justify-center">
                <DonutChart 
                    dataLabels={donutLabels}
                    dataValues={donutData}
                    colors={donutColors}
                />
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-6 w-full mt-2">
                {charts.participationStatusBreakdown.map((item, idx) => {
                    return (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-4 h-4" style={{ backgroundColor: donutColors[idx] }}></div>
                            <span className="text-sm font-medium text-muted-foreground">{item.status}</span>
                        </div>
                    );
                })}
            </div>
          </div>
        </ChartCard>

        {/* Line Chart - Join Requests Over Time */}
        <ChartCard title="Join requests over time" description="How interest grows as events approach">
          <LineChart 
            dataLabels={charts.joinRequestsOverTime.map(d => d.date)}
            dataValues={charts.joinRequestsOverTime.map(d => d.count)}
          />
        </ChartCard>

        {/* Bar Chart - Revenue Per Event */}
        <ChartCard title="Revenue per event" description="Sum of completed payments by event">
          <BarChart 
            dataLabels={charts.revenuePerEvent.map(p => p.event.substring(0, 15) + (p.event.length > 15 ? "..." : ""))} 
            dataValues={charts.revenuePerEvent.map(p => p.revenue)}
            label="Revenue ($)"
            indexAxis="y"
            color="#8b5cf6" 
          />
        </ChartCard>

        {/* Bar Chart - Average Rating */}
        <ChartCard title="Average rating per event" description="AVG of reviews.rating for each event">
          <BarChart 
            dataLabels={charts.averageRatingPerEvent.map(p => p.event.substring(0, 15) + (p.event.length > 15 ? "..." : ""))} 
            dataValues={charts.averageRatingPerEvent.map(p => p.averageRating)}
            label="Avg Rating"
            indexAxis="y"
            color="#f59e0b" 
          />
        </ChartCard>

        {/* Upcoming Events Table */}
        <ChartCard title="Upcoming events at a glance" description="Your next events with fill rate" className="lg:col-span-1">
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="font-medium pb-3 pr-4">Event</th>
                  <th className="font-medium pb-3 pr-4">Date</th>
                  <th className="font-medium pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {lists.upcomingEvents.map((event) => (
                  <tr key={event.id} className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="py-4 pr-4 font-medium truncate max-w-[150px]">{event.title}</td>
                    <td className="py-4 pr-4">{new Date(event.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${event.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-secondary text-secondary-foreground border border-border'}`}>
                        {event.status === 'PUBLISHED' ? 'Active' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
                {lists.upcomingEvents.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-muted-foreground">No upcoming events found.</td>
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
