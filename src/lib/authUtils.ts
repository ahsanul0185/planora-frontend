export type UserRole = "ADMIN" | "ORGANIZER" | "PARTICIPANT";

export const authRoutes = [ "/login", "/register", "/forgot-password", "/reset-password", "/verify-email" ];

export const isAuthRoute = (pathname : string) => {
    return authRoutes.some((router : string) => router === pathname);
}

export type RouteConfig = {
    exact : string[],
    pattern : RegExp[]
}

export const commonProtectedRoutes : RouteConfig = {
    exact : ["/my-profile", "/change-password"],
    pattern : []
}

export const organizerProtectedRoutes : RouteConfig = {
    pattern: [/^\/organizer\/dashboard/ ], // Matches any path that starts with /organizer/dashboard
    exact : []
}

export const adminProtectedRoutes : RouteConfig = {
    pattern: [/^\/admin\/dashboard/ ], // Matches any path that starts with /admin/dashboard
    exact : []
}

export const participantProtectedRoutes : RouteConfig = {
    pattern: [/^\/dashboard/ ], // Matches any path that starts with /dashboard
    exact : [ "/payment/success"]
};

export const isRouteMatches = (pathname : string, routes : RouteConfig) => {
    if(routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern : RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname : string) : "ADMIN" | "ORGANIZER" | "PARTICIPANT" | "COMMON" | null => {
    if(isRouteMatches(pathname, organizerProtectedRoutes)) {
        return "ORGANIZER";
    }

    if(isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    
    if(isRouteMatches(pathname, participantProtectedRoutes)) {
        return "PARTICIPANT";
    }

    if(isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    return null; // public route
}

export const getDefaultDashboardRoute = (role : UserRole) => {
    if(role === "ADMIN") {
        return "/admin/dashboard";
    }
    if(role === "ORGANIZER") {
        return "/organizer/dashboard";
    }
    if(role === "PARTICIPANT") {
        return "/dashboard";
    }

    return "/";
}

export const isValidRedirectForRole = (redirectPath : string, role : UserRole) => {
    const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
    const routeOwner = getRouteOwner(sanitizedRedirectPath);

    if(routeOwner === null || routeOwner === "COMMON"){
        return true;
    }

    if(routeOwner === role){
        return true;
    }

    return false;
}