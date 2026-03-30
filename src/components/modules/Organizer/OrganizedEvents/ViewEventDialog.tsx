"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IDetailedEvent, IEvent } from "@/types/event.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Calendar,
  CalendarClock,
  Globe,
  MapPin,
  Monitor,
  Ticket,
  Clock,
  Users,
  Tag,
  Mail,
  User,
  ExternalLink,
  Lock,
  Star,
  TrendingUp,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/services/event.services";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: IEvent | null;
  hideOrganizer?: boolean;
}

// ── tiny helpers ────────────────────────────────────────────────────────────

const Pill = ({
  icon: Icon,
  children,
  variant = "default",
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
  variant?: "default" | "green" | "amber" | "blue";
}) => {
  const colors = {
    default: "bg-muted text-muted-foreground",
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${colors[variant]}`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
};

const Stat = ({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon: React.ElementType;
}) => (
  <div className="flex flex-col gap-1 rounded-xl border bg-card p-4">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    <div className="mt-1 text-lg font-bold leading-none">{value}</div>
    {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
  </div>
);

const Row = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="text-sm font-medium">{children}</div>
    </div>
  </div>
);

// ── skeleton ─────────────────────────────────────────────────────────────────

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-0">
    <Skeleton className="h-56 w-full rounded-none" />
    <div className="space-y-6 p-6">
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

// ── main component ────────────────────────────────────────────────────────────

const ViewEventDialog = ({
  open,
  onOpenChange,
  event: initialEvent,
  hideOrganizer = false,
}: ViewEventDialogProps) => {
  const { data: fetchedEvent, isLoading } = useQuery({
    queryKey: ["event", initialEvent?.id],
    queryFn: () => getEventById(initialEvent!.id),
    enabled: open && !!initialEvent?.id,
  });

  const event = (fetchedEvent || initialEvent) as Partial<IDetailedEvent>;

  const participations = event?._count?.participations ?? 0;
  const maxP = event?.maxParticipants;
  const fillPct = maxP && participations != null ? Math.round((participations / maxP) * 100) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[92vh] flex flex-col p-0 overflow-hidden gap-0 rounded-lg [&>button:last-child]:bg-white [&>button:last-child]:text-zinc-900 [&>button:last-child]:rounded-full [&>button:last-child]:shadow-md [&>button:last-child]:opacity-100 [&>button:last-child]:hover:bg-white/90 [&>button:last-child]:top-4 [&>button:last-child]:right-4">
        {isLoading ? (
          <LoadingSkeleton />
        ) : event ? (
          <>
            {/* ── Hero banner ───────────────────────────────────────────── */}
            <div className="relative h-52 w-full shrink-0 overflow-hidden">
              {event.bannerImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
              )}

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* top-right badges */}
              <div className="absolute right-12 top-4 flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow ${
                    event.status === "PUBLISHED"
                      ? "bg-emerald-500 text-white"
                      : event.status === "DRAFT"
                      ? "bg-zinc-600 text-white"
                      : event.status === "CANCELLED"
                      ? "bg-red-500 text-white"
                      : "bg-zinc-500 text-white"
                  }`}
                >
                  {event.status}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow flex items-center gap-1 ${
                    event.visibility === "PUBLIC"
                      ? "bg-white/90 text-zinc-800"
                      : "bg-black/60 text-white"
                  }`}
                >
                  {event.visibility === "PUBLIC" ? (
                    <Globe className="h-3 w-3" />
                  ) : (
                    <Lock className="h-3 w-3" />
                  )}
                  {event.visibility}
                </span>
                {event.isFeatured && (
                  <span className="rounded-full bg-amber-500 text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow flex items-center gap-1">
                    <Star className="h-3 w-3 fill-white" />
                    Featured
                  </span>
                )}
              </div>

              {/* bottom meta */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10 bg-gradient-to-t from-black/80 to-transparent">
                {event.category && (
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    {event.category.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.category.icon}
                        alt={event.category.name}
                        className="h-3.5 w-3.5 rounded-full object-cover"
                      />
                    ) : (
                      <Tag className="h-3 w-3" />
                    )}
                    {event.category.name}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow">
                  {event.title}
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 relative">
              <div className="px-6 py-6 space-y-7 pb-10">

                {/* ── Stats row ──────────────────────────────────────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Stat
                    icon={Ticket}
                    label="Fee"
                    value={
                      event.registrationFee === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `$${event.registrationFee}`
                      )
                    }
                    sub={event.currency || "USD"}
                  />
                  <Stat
                    icon={Users}
                    label="Joined"
                    value={participations}
                    sub={maxP ? `of ${maxP} max` : "Unlimited"}
                  />
                  <Stat
                    icon={Star}
                    label="Rating"
                    value={
                      event.averageRating
                        ? event.averageRating.toFixed(1)
                        : "—"
                    }
                    sub={`${event._count?.reviews ?? 0} reviews`}
                  />
                  <Stat
                    icon={TrendingUp}
                    label="Capacity"
                    value={fillPct !== null ? `${fillPct}%` : "—"}
                    sub={fillPct !== null ? "filled" : "No limit"}
                  />
                </div>

                {/* capacity bar */}
                {fillPct !== null && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{participations} registered</span>
                      <span>{maxP} capacity</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          fillPct >= 90
                            ? "bg-red-500"
                            : fillPct >= 60
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(fillPct, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Description ──────────────────────────────────────── */}
                {event.description && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      About this event
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* ── Two-column info ───────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Dates */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Schedule
                    </p>
                    <Row icon={Calendar} label="Starts">
                      {event.startDate
                        ? format(new Date(event.startDate), "PPP")
                        : "TBD"}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {event.startDate
                          ? format(new Date(event.startDate), "p")
                          : ""}
                      </span>
                    </Row>
                    <Row icon={CalendarClock} label="Ends">
                      {event.endDate
                        ? format(new Date(event.endDate), "PPP")
                        : "TBD"}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {event.endDate
                          ? format(new Date(event.endDate), "p")
                          : ""}
                      </span>
                    </Row>
                    {event.registrationDeadline && (
                      <Row icon={Timer} label="Registration closes">
                        <span
                          className={
                            new Date(event.registrationDeadline) < new Date()
                              ? "text-red-500"
                              : ""
                          }
                        >
                          {format(new Date(event.registrationDeadline), "PPP")}
                        </span>
                      </Row>
                    )}
                    {/* {event.timezone && (
                      <Row icon={Clock} label="Timezone">
                        {event.timezone}
                      </Row>
                    )} */}
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Location
                    </p>
                    <Row
                      icon={event.isOnline ? Monitor : MapPin}
                      label={event.isOnline ? "Format" : "Venue"}
                    >
                      {event.isOnline ? (
                        <Pill icon={Monitor} variant="blue">
                          Online / Virtual
                        </Pill>
                      ) : (
                        <span>{event.venueName || "TBD"}</span>
                      )}
                    </Row>
                    {!event.isOnline && event.venueAddress && (
                      <Row icon={MapPin} label="Address">
                        <span className="text-muted-foreground">
                          {event.venueAddress}
                        </span>
                      </Row>
                    )}
                    {event.isOnline && event.onlineLink && (
                      <Row icon={ExternalLink} label="Meeting link">
                        <a
                          href={event.onlineLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 hover:no-underline flex items-center gap-1"
                        >
                          Join meeting
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Row>
                    )}
                  </div>

                  {/* Map Embed Code */}
                  {event.mapEmbedCode && (
                    <div className="sm:col-span-2 space-y-3 mt-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Map
                      </p>
                      <div 
                        className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border bg-muted/30 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                        dangerouslySetInnerHTML={{ __html: event.mapEmbedCode }}
                      />
                    </div>
                  )}

                </div>



                {/* ── Tags ─────────────────────────────────────────────── */}
                {event.tags && event.tags.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => {
                        const key =
                          typeof tag === "string" ? tag : tag.id;
                        const name =
                          typeof tag === "string" ? tag : tag.name;
                        return (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="gap-1.5 px-3 py-1 text-xs font-medium"
                          >
                            <Tag className="h-3 w-3 opacity-60" />
                            {name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Organizer ─────────────────────────────────────────── */}
                {!hideOrganizer && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Organizer
                    </p>
                    <div className="flex items-center gap-4 rounded-xl border bg-muted/30 p-4">
                      <div className="h-11 w-11 shrink-0 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-background">
                        {event.organizer?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.organizer.image}
                            alt={event.organizer.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm truncate">
                          {event.organizer?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                          <Mail className="h-3 w-3 shrink-0" />
                          {event.organizer?.email || "—"}
                        </span>
                      </div>
                      <div className="ml-auto shrink-0">
                        <Pill icon={CheckCircle2} variant="green">
                          Organizer
                        </Pill>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Meta footer ───────────────────────────────────────── */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground border-t pt-4">
                  <span>
                    Created{" "}
                    {event.createdAt
                      ? format(new Date(event.createdAt), "PPP")
                      : "—"}
                  </span>
                  <span>
                    Last updated{" "}
                    {event.updatedAt
                      ? format(new Date(event.updatedAt), "PPP")
                      : "—"}
                  </span>
                  {event.isFeatured && (
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="h-3 w-3 fill-amber-500" /> Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ViewEventDialog;