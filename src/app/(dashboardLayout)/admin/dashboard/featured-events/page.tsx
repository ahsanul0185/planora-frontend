import FeaturedEventsTable from "@/components/modules/Admin/FeaturedEvents/FeaturedEventsTable";
import { Star } from "lucide-react";

export const metadata = {
  title: "Featured Events | Admin Dashboard",
  description: "Manage featured events to show on the platform.",
};

const FeaturedEventsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-amber-100 rounded-full">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
            Featured Events
          </h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium pl-14">
          Manage the premier events featured across the platform.
        </p>
      </div>

      <FeaturedEventsTable />
    </div>
  );
};

export default FeaturedEventsPage;
