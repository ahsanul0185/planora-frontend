"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { resetPassword } from "@/services/auth.services";
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IResetPasswordPayload) => resetPassword(payload),
    });

    const form = useForm({
        defaultValues: {
            email: emailFromQuery,
            otp: "",
            newPassword: "",
            confirmPassword: "",
        } as IResetPasswordPayload,
        onSubmit: async ({ value }) => {
            setError(null);
            try {
                const result = await mutateAsync(value);
                if (result.success) {
                    toast.success(result.message);
                    router.push(`/login?email=${encodeURIComponent(value.email)}`);
                } else {
                    setError(result.message);
                }
            } catch (err: any) {
                if (err?.message?.includes("NEXT_REDIRECT") || (err && typeof err === "object" && "digest" in err && typeof err.digest === "string" && err.digest.startsWith("NEXT_REDIRECT"))) {
                    throw err;
                }
                setError(err.message || "An unexpected error occurred");
            }
        },
    });

    // Handle case where email arrives later or user changes it manually (though it's prefilled)
    useEffect(() => {
        if (emailFromQuery && !form.state.values.email) {
            form.setFieldValue("email", emailFromQuery);
        }
    }, [emailFromQuery, form]);

    return (
        <Card className="w-full max-w-md mx-auto shadow-xl border-none bg-white/90 backdrop-blur-md">
            <CardHeader className="text-center space-y-2 pb-6">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-newsreader font-semibold text-primary">
                    Reset Your Password
                </CardTitle>
                <CardDescription className="text-gray-500 font-medium">
                    Enter the OTP sent to your email and choose a strong new password.
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
                    <div className="flex flex-col items-center gap-3">
                        <label className="text-sm font-medium text-muted-foreground">
                            Verification Code
                        </label>
                        <form.Field
                            name="otp"
                            validators={{
                                onChange: resetPasswordZodSchema.shape.otp,
                            }}
                        >
                            {(field) => (
                                <InputOTP
                                    maxLength={6}
                                    value={field.state.value}
                                    onChange={(value) => {
                                        field.handleChange(value);
                                        if (error) setError(null);
                                    }}
                                    pattern={REGEXP_ONLY_DIGITS}
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                                className="h-12 w-12 text-lg font-semibold border-2 border-input first:rounded-l-lg last:rounded-r-lg data-[active=true]:border-primary data-[active=true]:ring-primary/20"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        </form.Field>
                        <p className="text-xs text-muted-foreground">
                            Check your email <span className="font-semibold text-foreground">{emailFromQuery}</span> for the code.
                        </p>
                    </div>

                    <form.Field
                        name="newPassword"
                        validators={{
                            onChange: resetPasswordZodSchema.shape.newPassword,
                        }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="New Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="At least 8 characters"
                                append={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-primary transition-colors hover:bg-transparent focus-visible:ring-0"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                }
                            />
                        )}
                    </form.Field>

                    <form.Field
                        name="confirmPassword"
                        validators={{
                            onChange: resetPasswordZodSchema.shape.confirmPassword,
                        }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Confirm New Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Re-enter your new password"
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
                                pendingLabel="Resetting Password..."
                                disabled={!canSubmit}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                            >
                                Reset Password
                            </AppSubmitButton>
                        )}
                    </form.Subscribe>
                </form>
            </CardContent>
            <CardFooter className="justify-center border-t border-gray-100 pt-6 pb-8">
                <Link href="/login" className="text-sm text-gray-500 hover:text-primary transition-all font-medium">
                    ← Back to Login
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ResetPasswordForm;
