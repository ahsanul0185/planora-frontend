"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { forgotPassword } from "@/services/auth.services";
import { IForgotPasswordPayload, forgotPasswordZodSchema } from "@/zod/auth.validation";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import Link from "next/link";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IForgotPasswordPayload) => forgotPassword(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    } as IForgotPasswordPayload,
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        const result = await mutateAsync(value);
        if (result.success) {
          toast.success(result.message);
          router.push(`/reset-password?email=${encodeURIComponent(value.email)}`);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-none bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-newsreader font-semibold text-primary">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-gray-500 font-medium">
          Enter your email and we'll send you an OTP to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="email"
            validators={{
              onChange: forgotPasswordZodSchema.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                className="bg-transparent border-gray-200 focus:border-primary transition-all"
              />
            )}
          </form.Field>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-600">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isPending || isSubmitting}
                pendingLabel="Sending OTP..."
                disabled={!canSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                Send Reset OTP
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4 pt-2 pb-8">
        <div className="text-sm text-gray-500 font-medium">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline font-bold transition-all">
            Back to Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
