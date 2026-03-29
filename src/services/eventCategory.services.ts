"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IEventCategory } from "@/types/event.types";

export const getEventCategories = async () => {
  const res = await httpClient.get<IEventCategory[]>("/categories");
  return res;
};
