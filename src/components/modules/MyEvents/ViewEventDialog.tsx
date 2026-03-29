"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IEvent } from "@/types/event.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Globe, MapPin, Monitor, Ticket, Clock } from "lucide-react";

interface ViewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: IEvent | null;
}

const ViewEventDialog = ({ open, onOpenChange, event }: ViewEventDialogProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline">{event.category?.name || "Uncategorized"}</Badge>
            <Badge variant={event.visibility === "PUBLIC" ? "default" : "secondary"}>
              {event.visibility === "PUBLIC" ? <Globe className="mr-1 h-3 w-3" /> : null}
              {event.visibility}
            </Badge>
          </div>
          <DialogTitle className="text-2xl pt-2">{event.title}</DialogTitle>
          <DialogDescription className="text-base text-foreground mt-2">
            {event.description || "No description provided."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Event Details</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Start Date</span>
                  <span className="text-sm font-medium">{format(new Date(event.startDate), "PPP")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">End Date</span>
                  <span className="text-sm font-medium">{format(new Date(event.endDate), "PPP")}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Registration Fee</span>
                  <span className="text-sm font-medium">
                    {event.registrationFee === 0 ? "Free" : `$${event.registrationFee}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.isOnline ? (
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Venue</span>
                  <span className="text-sm font-medium">
                    {event.isOnline ? "Online Event" : (event.venueName || "TBD")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex justify-between items-center">
             <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Participants</span>
                <span className="text-xl font-bold">{event._count?.participations || 0}</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Status</span>
                <Badge variant={event.status === "PUBLISHED" ? "default" : "secondary"}>
                  {event.status}
                </Badge>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEventDialog;
