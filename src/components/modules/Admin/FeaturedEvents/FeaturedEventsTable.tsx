"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllEvents } from "@/services/event.services";
import { IEvent } from "@/types/event.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { adminEventsColumns } from "../Events/eventsColumns";
import ToggleFeaturedDialog from "../Events/ToggleFeaturedDialog";
import { StarOff } from "lucide-react";

const FeaturedEventsTable = () => {
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [featureEventSelection, setFeatureEventSelection] = useState<IEvent | null>(null);

  const handleToggleFeatureAction = (event: IEvent) => {
    setFeatureEventSelection(event);
    setIsFeatureDialogOpen(true);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["all-events", { isFeatured: "true", limit: 50 }],
    queryFn: () => getAllEvents({ isFeatured: "true", limit: 50 }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <DataTable<IEvent>
        data={data?.data ?? []}
        columns={adminEventsColumns}
        isLoading={isFetching}
        emptyMessage="No featured events found."
        actions={{
          customActions: [
            {
              label: () => "Remove from Featured",
              icon: StarOff,
              onClick: handleToggleFeatureAction,
            },
          ],
        }}
      />

      <ToggleFeaturedDialog
        isOpen={isFeatureDialogOpen}
        onClose={() => setIsFeatureDialogOpen(false)}
        event={featureEventSelection}
      />
    </>
  );
};

export default FeaturedEventsTable;
