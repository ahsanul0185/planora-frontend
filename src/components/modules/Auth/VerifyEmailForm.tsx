"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IVerifyEmailPayload, verifyEmailZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { verifyEmail } from "@/services/auth.services";

interface VerifyEmailFormProps {
    email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IVerifyEmailPayload) => verifyEmail(payload, email),
    });

    const form = useForm({
        defaultValues: {
            otp: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;

                if (!result.success) {
                    setServerError(result.message || "Verification failed");
                    return;
                }
            } catch (error: any) {
                setServerError(`Verification failed: ${error.message}`);
            }
        }
    });

    return (
        <Card className="w-full max-w-md mx-auto shadow-md mt-10">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                <CardDescription>
                    We sent a 6-digit OTP code to <span className="font-semibold text-foreground">{email}</span>. Please enter it below to verify your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    method="POST"
                    action="#"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="otp"
                        validators={{ onChange: verifyEmailZodSchema.shape.otp }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Verification Code"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className="text-center tracking-[0.5em] font-mono text-lg"
                            />
                        )}
                    </form.Field>

                    {serverError && (
                        <Alert variant={"destructive"}>
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <form.Subscribe
                        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Verifying...." disabled={!canSubmit}>
                                Verify Account
                            </AppSubmitButton>
                        )}
                    </form.Subscribe>
                </form>
            </CardContent>
        </Card>
    );
}

export default VerifyEmailForm;
