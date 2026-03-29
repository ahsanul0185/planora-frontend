import { PaginationMeta } from "./api.types";
import { UserStatus } from "./user.types";

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  contactNumber?: string;
  profilePhoto?: string;
  isDeleted: boolean;
  status: UserStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminsResponse {
  data: IAdmin[];
  meta: PaginationMeta;
}

export interface ICreateAdminPayload {
  password: string;
  admin: {
    name: string;
    email: string;
    contactNumber?: string;
    profilePhoto?: string;
  };
}
