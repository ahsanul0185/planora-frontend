import { Badge } from "@/components/ui/badge";
import { EventStatus } from "@/types/event.types";

interface EventStatusBadgeProps {
  status: EventStatus;
}

const variantMap: Record<EventStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PUBLISHED: "default",
  DRAFT: "secondary",
  CANCELLED: "destructive",
  ENDED: "outline",
};

const EventStatusBadge = ({ status }: EventStatusBadgeProps) => {
  return (
    <Badge variant={variantMap[status]}>
      <span className="capitalize text-xs">{status.toLowerCase()}</span>
    </Badge>
  );
};

export default EventStatusBadge;
