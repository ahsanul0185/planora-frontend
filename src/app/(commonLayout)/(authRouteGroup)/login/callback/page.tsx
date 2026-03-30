"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setOAuthTokens } from "@/services/auth.services"

const OAuthCallbackPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get("accessToken")
        const refreshToken = searchParams.get("refreshToken")
        const sessionToken = searchParams.get("sessionToken")
        const redirectPath = searchParams.get("redirect") || "/dashboard"

        if (accessToken && refreshToken && sessionToken) {
            (async () => {
                await setOAuthTokens(accessToken, refreshToken, sessionToken)
                router.push(redirectPath)
                router.refresh()
            })()
        } else {
            router.push("/login?error=oauth_failed")
        }
    }, [searchParams, router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold">Completing sign-in...</h2>
                <p className="text-muted-foreground mt-2">Please wait while we set up your session.</p>
            </div>
        </div>
    )
}

export default OAuthCallbackPage
