import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";
import { redirect } from "next/navigation";

interface VerifyEmailParams {
  searchParams: Promise<{ email?: string }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailParams) => {
  const params = await searchParams;
  const email = params.email;

  if (!email) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f9faf6] via-[#f0f4ef] to-[#e8f0e8]">
      <VerifyEmailForm email={email} />
    </div>
  )
}

export default VerifyEmailPage