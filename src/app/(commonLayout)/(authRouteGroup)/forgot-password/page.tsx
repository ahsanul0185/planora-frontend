import ForgotPasswordForm from "@/components/modules/Auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Planora",
  description: "Reset your password for Planora to regain access to your account.",
};

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] pt-32 pb-12 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;