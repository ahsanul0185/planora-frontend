"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IEvent } from "@/types/event.types";

export const getMyBookmarks = async (): Promise<IEvent[]> => {
  const res = await httpClient.get<IEvent[]>("/bookmark/me");
  return res.data;
};

export const addBookmark = async (eventId: string) => {
  const res = await httpClient.post(`/bookmark/events/${eventId}`, {});
  return res;
};

export const removeBookmark = async (eventId: string) => {
  const res = await httpClient.delete(`/bookmark/events/${eventId}`);
  return res;
};
