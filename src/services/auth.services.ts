"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, IRegisterPayload, IVerifyEmailPayload, loginZodSchema, registerZodSchema, verifyEmailZodSchema } from "@/zod/auth.validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function loginUser(payload: ILoginPayload, redirectPath?: string): Promise<ILoginResponse | ApiErrorResponse> {
    const parsedPayload = loginZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);

        const { accessToken, refreshToken, token, user } = response.data;
        const { role, needPasswordChange, email } = user;
        
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        if (needPasswordChange) {
            redirect(`/reset-password?email=${email}`);
        } else {
            const targetPath = redirectPath && isValidRedirectForRole(redirectPath, role as UserRole) ? redirectPath : getDefaultDashboardRoute(role as UserRole);
            redirect(targetPath);
        }

    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        if (error?.response?.data?.message === "Email not verified") {
            redirect(`/verify-email?email=${payload.email}`);
        }
        return {
            success: false,
            message: error?.response?.data?.message || `Login failed: ${error.message}`,
        }
    }
}

export async function registerUser(payload: IRegisterPayload, redirectPath?: string): Promise<ILoginResponse | ApiErrorResponse> {
    const parsedPayload = registerZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    
    // Convert empty strings to undefined to match backend expectations
    const payloadData = { ...parsedPayload.data };
    if (!payloadData.gender) delete payloadData.gender;
    if (!payloadData.birthdate) {
        delete payloadData.birthdate;
    } else {
        payloadData.birthdate = new Date(payloadData.birthdate).toISOString();
    }
    
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/register", payloadData);

        const { accessToken, refreshToken, token, user } = response.data;
        const { email } = user;
        
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        // redirect to verify email always since the new user is not verified
        redirect(`/verify-email?email=${email}`);

    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: error?.response?.data?.message || `Registration failed: ${error.message}`,
        }
    }
}

export async function verifyEmail(payload: IVerifyEmailPayload, email: string) {
    const parsedPayload = verifyEmailZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return {
            success: false,
            message: parsedPayload.error.issues[0].message || "Invalid OTP",
        }
    }

    try {
        await httpClient.post("/auth/verify-email", { email, otp: parsedPayload.data.otp });
        
        // Use user info from cookies to redirect right away
        const userInfo = await getUserInfo();
        const role = userInfo?.role;
        const targetPath = getDefaultDashboardRoute(role as UserRole || "PARTICIPANT");
        redirect(targetPath);
        
    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: error?.response?.data?.message || `Failed to verify email.`,
        }
    }
}


export async function getNewTokensWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`
            }
        });

        if (!res.ok) {
            return false;
        }

        const { data } = await res.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (accessToken) {
            await setTokenInCookies("accessToken", accessToken);
        }

        if (newRefreshToken) {
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if (token) {
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

export async function getUserInfo() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const sessionToken = cookieStore.get("better-auth.session_token")?.value

        if (!accessToken) {
            return null;
        }

        const res = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`
            }
        });

        if (!res.ok) {
            return null;
        }

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}
