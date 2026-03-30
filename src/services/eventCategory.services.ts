"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IEventCategory } from "@/types/event.types";

export const getEventCategories = async () => {
  const res = await httpClient.get<IEventCategory[]>("/categories");
  return res;
};

export const createEventCategory = async (formData: FormData) => {
  const res = await httpClient.post<IEventCategory>("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateEventCategory = async (id: string, formData: FormData) => {
  const res = await httpClient.put<IEventCategory>(
    `/categories/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const deleteEventCategory = async (id: string) => {
  const res = await httpClient.delete<null>(`/categories/${id}`);
  return res;
};
