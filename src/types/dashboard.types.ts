export interface NavItem {
    title : string,
    href : string,
    icon : string
}

export interface NavSection {
    title ?: string,
    items : NavItem[]
}

// Organizer Dashboard Types

export interface IOrganizerStatCards {
    totalEvents: number;
    activeEvents: number;
    totalParticipants: number;
    revenueEarned: number;
    pendingRequests: number;
    avgRating: number;
}

export interface IParticipantPerEvent {
    event: string;
    count: number;
}

export interface IParticipationStatusBreakdown {
    status: string;
    count: number;
}

export interface IJoinRequestsOverTime {
    date: string;
    count: number;
}

export interface IRevenuePerEvent {
    event: string;
    revenue: number;
}

export interface IAverageRatingPerEvent {
    event: string;
    averageRating: number;
}

export interface IOrganizerCharts {
    participantsPerEvent: IParticipantPerEvent[];
    participationStatusBreakdown: IParticipationStatusBreakdown[];
    joinRequestsOverTime: IJoinRequestsOverTime[];
    revenuePerEvent: IRevenuePerEvent[];
    averageRatingPerEvent: IAverageRatingPerEvent[];
}

export interface IOrganizerUpcomingEvent {
    id: string;
    title: string;
    startDate: string;
    status: string;
    fillRate: number;
    confirmedCount: number;
    maxParticipants: number | null;
}

export interface IOrganizerDashboardData {
    statCards: IOrganizerStatCards;
    charts: IOrganizerCharts;
    lists: {
        upcomingEvents: IOrganizerUpcomingEvent[];
    };
}

// Participant Dashboard Types

export interface IParticipantStatCards {
    eventsJoined: number;
    upcomingEvents: number;
    totalSpent: number;
    reviewsWritten: number;
    avgRatingGiven: number;
}

export interface IEventsJoinedByCategory {
    category: string;
    count: number;
}

export interface IEventActivityOverTime {
    month: string;
    count: number;
}

export interface IParticipantCharts {
    participationStatusBreakdown: IParticipationStatusBreakdown[];
    eventsJoinedByCategory: IEventsJoinedByCategory[];
    eventActivityOverTime: IEventActivityOverTime[];
}

export interface IParticipantUpcomingEvent {
    id: string;
    event: string;
    date: string;
    fee: number;
    currency: string;
}

export interface IParticipantPaymentHistory {
    id: string;
    event: string;
    amount: number;
    currency: string;
    status: string;
}

export interface IParticipantPendingInvitation {
    id: string;
    event: string;
    host: string;
    fee: number;
    currency: string;
}

export interface IParticipantLists {
    upcomingConfirmedEvents: IParticipantUpcomingEvent[];
    paymentHistory: IParticipantPaymentHistory[];
    pendingInvitations: IParticipantPendingInvitation[];
}

export interface IParticipantDashboardData {
    statCards: IParticipantStatCards;
    charts: IParticipantCharts;
    lists: IParticipantLists;
}

// Admin Dashboard Types

export interface IAdminStatCards {
    totalUsers: number;
    newUsersThisWeek: number;
    totalEvents: number;
    activeEvents: number;
    totalRevenue: number;
    pendingReports: number;
}

export interface INewUsersOverTime {
    date: string;
    count: number;
}

export interface IEventVisibilitySplit {
    visibility: string;
    count: number;
}

export interface IRevenueByPaymentStatus {
    status: string;
    total: number;
}

export interface IRevenueOverTime {
    month: string;
    amount: number;
}

export interface IAdminCharts {
    newUsersOverTime: INewUsersOverTime[];
    eventsByCategory: IEventsJoinedByCategory[];
    eventVisibilitySplit: IEventVisibilitySplit[];
    revenueByPaymentStatus: IRevenueByPaymentStatus[];
    revenueOverTime: IRevenueOverTime[];
}

export interface IAdminActivityFeed {
    id: string; // fallback shape
    title: string;
    timestamp: string;
}

export interface IAdminLists {
    recentActivityFeed: IAdminActivityFeed[];
}

export interface IAdminDashboardData {
    statCards: IAdminStatCards;
    charts: IAdminCharts;
    lists: IAdminLists;
}
