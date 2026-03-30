"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyEmail } from "@/services/auth.services";
import { IVerifyEmailPayload } from "@/zod/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

interface VerifyEmailFormProps {
    email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [otp, setOtp] = useState("");

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IVerifyEmailPayload) =>
            verifyEmail(payload, email),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setServerError("Please enter all 6 digits of your OTP.");
            return;
        }
        setServerError(null);
        try {
            const result = (await mutateAsync({ otp })) as any;
            if (result && !result.success) {
                setServerError(result.message || "Verification failed");
            }
        } catch (error: any) {
            // Re-throw NEXT_REDIRECT so Next.js can handle it
            if (
                error &&
                typeof error === "object" &&
                "digest" in error &&
                typeof error.digest === "string" &&
                error.digest.startsWith("NEXT_REDIRECT")
            ) {
                throw error;
            }
            setServerError(
                error?.message || "An unexpected error occurred. Please try again."
            );
        }
    };

    return (
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                    <ShieldCheck className="h-7 w-7 text-emerald-700" />
                </div>
                <CardTitle className="text-3xl font-newsreader font-semibold text-primary">
                    Verify Your Email
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-1">
                    We sent a 6-digit OTP code to{" "}
                    <span className="font-semibold text-foreground">{email}</span>.
                    <br />
                    Please enter it below to verify your account.
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="flex flex-col items-center gap-3">
                        <label className="text-sm font-medium text-muted-foreground">
                            Verification Code
                        </label>
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                setOtp(value);
                                if (serverError) setServerError(null);
                            }}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup>
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <InputOTPSlot
                                        key={i}
                                        index={i}
                                        className="h-12 w-12 text-lg font-semibold border-2 border-input first:rounded-l-lg last:rounded-r-lg data-[active=true]:border-emerald-600 data-[active=true]:ring-emerald-200"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        <p className="text-xs text-muted-foreground">
                            You can also paste your code directly.
                        </p>
                    </div>

                    {serverError && (
                        <Alert variant="destructive">
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <AppSubmitButton
                        isPending={isPending}
                        pendingLabel="Verifying..."
                        disabled={otp.length !== 6 || isPending}
                    >
                        Verify Account
                    </AppSubmitButton>
                </form>
            </CardContent>
        </Card>
    );
};

export default VerifyEmailForm;
