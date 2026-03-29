export type UserRole = "ADMIN" | "ORGANIZER" | "PARTICIPANT";
export type UserStatus = "ACTIVE" | "BLOCKED";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  image?: string | null;
  bio?: string | null;
  birthdate?: string | null;
  gender?: Gender | null;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
}
export type UserInfo = IUser;

export interface IUpdateProfilePayload {
  name?: string;
  bio?: string;
  birthdate?: string;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
  image?: File;
}