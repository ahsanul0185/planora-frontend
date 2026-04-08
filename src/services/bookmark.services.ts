"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IEvent } from "@/types/event.types";

import { IBookmark } from "@/types/bookmark.types";

export const getMyBookmarks = async (): Promise<IBookmark[]> => {
  const res = await httpClient.get<IBookmark[]>("/bookmark/me");
  console.log(res.data)
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
