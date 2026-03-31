import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            // title : "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"

                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings"
                }
            ]
        }
    ]
}

export const organizerNavItems: NavSection[] = [
    {
        title: "Event Management",
        items: [
            {
                title: "Organized Events",
                href: "/organizer/dashboard/my-events",
                icon: "CalendarRange"
            },
            {
                title: "Participants",
                href: "/organizer/dashboard/participants",
                icon: "Users",
            },
            {
                title: "Invitations",
                href: "/organizer/dashboard/invitations",
                icon: "MailOpen",
            },
            {
                title: "Reviews",
                href: "/organizer/dashboard/reviews",
                icon: "Star",
            },
        ]
    }
]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
            },
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
            },
        ],
    },
    {
        title: "Platform Management",
        items: [
            {
                title: "All Events",
                href: "/admin/dashboard/events-management",
                icon: "CalendarDays",
            },
            {
                title: "Featured Events",
                href: "/admin/dashboard/featured-events",
                icon: "Star",
            },
            {
                title: "Event Categories",
                href: "/admin/dashboard/categories-management",
                icon: "Tags",
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "MessageSquare",
            },
        ],
    }
];

export const participantNavItems: NavSection[] = [
    {
        title: "My Activity",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "Ticket",
            },
            {
                title: "My Participations",
                href: "/dashboard/my-participations",
                icon: "ClipboardList",
            },
            {
                title: "Pending Invitations",
                href: "/dashboard/pending-invitations",
                icon: "Mail",
            },
            {
                title: "Bookmarks",
                href: "/dashboard/bookmarks",
                icon: "Bookmark",
            },
            {
                title: "My Reviews",
                href: "/dashboard/my-reviews",
                icon: "Star",
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];

        case "ORGANIZER":
            return [...commonNavItems, ...organizerNavItems];

        case "PARTICIPANT":
            return [...commonNavItems, ...participantNavItems]
            
        default: 
            return commonNavItems;
    }
}