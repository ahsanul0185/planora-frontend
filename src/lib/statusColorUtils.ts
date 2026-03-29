import { InvitationStatus } from "@/types/invitation.types";
import { ParticipationStatus, PaymentStatus } from "@/types/participation.types";

export const getParticipationStatusColor = (status: ParticipationStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200";
    case "CONFIRMED":
    case "APPROVED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200";
    case "BANNED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200";
    case "CANCELLED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200";
  }
};

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "REFUNDED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export const getInvitationStatusColor = (status: InvitationStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200";
    case "ACCEPTED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200";
    case "DECLINED":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200";
    case "REVOKED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200";
  }
};
