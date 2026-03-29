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
