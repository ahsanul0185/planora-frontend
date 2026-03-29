"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEvent } from "@/types/event.types";
import { sendInvitations } from "@/services/invitation.services";
import { MailOpen, Send, Trash2, X } from "lucide-react";
import { singleEmailZodSchema } from "@/zod/invitation.validation";

interface SendInvitationModalProps {
  events: IEvent[];
  defaultEventId?: string;
}

export const SendInvitationModal = ({ events, defaultEventId }: SendInvitationModalProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>(defaultEventId || "");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [inputError, setInputError] = useState("");

  const futureEvents = events.filter((e) => new Date(e.startDate) > new Date());

  const { mutate: handleSend, isPending: isSending } = useMutation({
    mutationFn: () => sendInvitations(selectedEventId, emails),
    onSuccess: (res) => {
      toast.success(res.message || "Invitations sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["event-invitations", selectedEventId] });
      setIsOpen(false);
      setEmails([]);
      setEmailInput("");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send invitations.");
    },
  });

  const addEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    if (emails.includes(trimmed)) {
      setInputError("This email has already been added.");
      return;
    }

    if (!singleEmailZodSchema.safeParse(trimmed).success) {
      setInputError("Please enter a valid email address.");
      return;
    }

    setEmails((prev) => [...prev, trimmed]);
    setEmailInput("");
    setInputError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail(emailInput);
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((e) => e !== emailToRemove));
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setEmails([]);
      setEmailInput("");
      setInputError("");
    } else {
      const def = futureEvents.find((e) => e.id === defaultEventId);
      setSelectedEventId(def ? def.id : futureEvents.length > 0 ? futureEvents[0].id : "");
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Send className="h-4 w-4" />
          Send Invitations
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] flex flex-col max-h-[90vh] p-4">
        <DialogHeader>
          <DialogTitle>Send Invitations</DialogTitle>
          <DialogDescription>
            Invite participants to one of your upcoming events via email.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable body */}
        <ScrollArea className="flex-1 overflow-y-auto pr-1">
          <div className="grid gap-5 py-2">
            {/* Event selector */}
            <div className="grid gap-2">
              <Label htmlFor="event-select">Select Event</Label>
              <Select
                value={selectedEventId}
                onValueChange={setSelectedEventId}
                disabled={futureEvents.length === 0}
              >
                <SelectTrigger id="event-select">
                  <SelectValue placeholder="Select an upcoming event" />
                </SelectTrigger>
                <SelectContent>
                  {futureEvents.map((ev) => (
                    <SelectItem key={ev.id} value={ev.id}>
                      {ev.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {futureEvents.length === 0 && (
                <p className="text-xs text-destructive">You don&apos;t have any upcoming events.</p>
              )}
            </div>

            {/* Email input */}
            <div className="grid gap-2">
              <Label htmlFor="email-input">Add Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="email-input"
                  name="invitation-email"
                  type="email"
                  autoComplete="off"
                  placeholder="e.g. user@example.com"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (inputError) setInputError("");
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={futureEvents.length === 0 || isSending}
                  className={inputError ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => addEmail(emailInput)}
                  disabled={!emailInput.trim() || futureEvents.length === 0 || isSending}
                >
                  Add
                </Button>
              </div>
              {inputError ? (
                <p className="text-xs text-destructive">{inputError}</p>
              ) : (
                <p className="text-xs text-muted-foreground">Press Enter or click Add.</p>
              )}
            </div>

            {/* Email list */}
            {emails.length > 0 && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>
                    Added Emails{" "}
                    <span className="text-muted-foreground font-normal">({emails.length})</span>
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground hover:text-destructive gap-1"
                    onClick={() => setEmails([])}
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear all
                  </Button>
                </div>
                <div className="rounded-md border border-input divide-y divide-border">
                  {emails.map((em) => (
                    <div
                      key={em}
                      className="flex items-center justify-between px-3 py-2 text-sm group hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MailOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate max-w-[330px]">{em}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEmail(em)}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="pt-2 border-t mt-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSending}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSend()}
            disabled={isSending || emails.length === 0 || !selectedEventId}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            {isSending ? "Sending..." : `Send to ${emails.length} recipient${emails.length !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
