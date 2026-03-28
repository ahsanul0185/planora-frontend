import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            // title : "Dashboard",
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
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
                title: "My Events",
                href: "/organizer/dashboard/my-events",
                icon: "CalendarRange"
            },
            {
                title: "Create Event",
                href: "/organizer/dashboard/create-event",
                icon: "PlusCircle",
            },
        ]
    },
    {
        title: "Attendees & Invites",
        items: [
            {
                title: "Participant Requests",
                href: "/organizer/dashboard/participant-requests",
                icon: "Users",
            },
            {
                title: "Send Invitations",
                href: "/organizer/dashboard/send-invitations",
                icon: "Send",
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
            {
                title: "Organizers",
                href: "/admin/dashboard/organizers-management",
                icon: "UserCheck",
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
                title: "Event Categories",
                href: "/admin/dashboard/categories-management",
                icon: "Tags",
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star",
            },
        ],
    },
    {
        title: "Reports & Analytics",
        items: [
            {
                title: "Revenue Reports",
                href: "/admin/dashboard/revenue",
                icon: "BarChart3",
            },
        ]
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