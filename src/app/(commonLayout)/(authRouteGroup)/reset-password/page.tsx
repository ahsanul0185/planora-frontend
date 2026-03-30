import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password | Planora",
  description: "Securely reset your Planora account password.",
};

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] pt-32 pb-12 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
      {/* Suspense boundary because ResetPasswordForm uses useSearchParams */}
      <Suspense fallback={
        <div className="w-full max-w-md p-8 text-center animate-pulse">
          <div className="h-48 bg-gray-100 rounded-2xl mb-4"></div>
          <div className="h-8 bg-gray-100 rounded-full w-1/2 mx-auto"></div>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;