import { IEvent } from "./event.types";

export interface IBookmark {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  event: IEvent;
}
