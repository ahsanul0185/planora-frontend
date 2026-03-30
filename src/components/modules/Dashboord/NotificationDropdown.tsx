"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  UserPlus,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "event" | "registration" | "system" | "featured";
  timestamp: Date;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Registration",
    message:
      "John Doe has registered for your event 'Tech Summit 2025'. Confirmation is pending.",
    type: "registration",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: "2",
    title: "Event Starting Soon",
    message:
      "'Design Workshop: UI Principles' starts in 2 hours. Make sure everything is ready!",
    type: "event",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
  },
  {
    id: "3",
    title: "Event Featured",
    message:
      "Congratulations! Your event 'Music Night 2025' has been marked as featured by the admin.",
    type: "featured",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
  },
  {
    id: "4",
    title: "System Maintenance",
    message:
      "Planora will undergo scheduled maintenance on April 5th from 2:00 AM to 4:00 AM UTC.",
    type: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
  {
    id: "5",
    title: "New Participant Joined",
    message:
      "Sarah Williams has joined 'Startup Pitch Night'. You now have 48 confirmed participants.",
    type: "registration",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30),
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "event":
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case "registration":
      return <UserPlus className="h-4 w-4 text-emerald-500" />;
    case "featured":
      return <Star className="h-4 w-4 text-amber-500" />;
    case "system":
      return <CheckCircle className="h-4 w-4 text-purple-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getNotificationBg = (type: Notification["type"]) => {
  switch (type) {
    case "event":
      return "bg-blue-50 dark:bg-blue-950";
    case "registration":
      return "bg-emerald-50 dark:bg-emerald-950";
    case "featured":
      return "bg-amber-50 dark:bg-amber-950";
    case "system":
      return "bg-purple-50 dark:bg-purple-950";
    default:
      return "bg-muted";
  }
};

const NotificationDropdown = () => {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="m-0" />

        <ScrollArea className="h-[340px]">
          {MOCK_NOTIFICATIONS.length > 0 ? (
            MOCK_NOTIFICATIONS.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer focus:bg-accent/60"
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getNotificationBg(notification.type)}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 space-y-0.5 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-semibold leading-tight">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
              <Bell className="h-8 w-8 opacity-30" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="m-0" />

        <DropdownMenuItem className="justify-center py-2.5 text-sm font-medium text-primary cursor-pointer hover:text-primary/80">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;