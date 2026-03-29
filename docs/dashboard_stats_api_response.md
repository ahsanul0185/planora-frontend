organizer : 

{
    "success": true,
    "message": "Organizer dashboard data retrieved successfully",
    "data": {
        "statCards": {
            "totalEvents": 3,
            "activeEvents": 3,
            "totalParticipants": 2,
            "revenueEarned": 0,
            "pendingRequests": 0,
            "avgRating": 0
        },
        "charts": {
            "participantsPerEvent": [
                {
                    "event": "Midnight Jazz & Soul: Private Loft Session",
                    "count": 1
                },
                {
                    "event": "The Golden Hour: Private Vineyard Dinner",
                    "count": 1
                }
            ],
            "participationStatusBreakdown": [
                {
                    "status": "CONFIRMED",
                    "count": 2
                }
            ],
            "joinRequestsOverTime": [
                {
                    "date": "2026-03-29",
                    "count": 2
                }
            ],
            "revenuePerEvent": [],
            "averageRatingPerEvent": []
        },
        "lists": {
            "upcomingEvents": [
                {
                    "id": "019d37d2-9214-70f0-b653-408579221668",
                    "title": "Midnight Jazz & Soul: Private Loft Session",
                    "startDate": "2026-03-30T00:00:00.000Z",
                    "status": "PUBLISHED",
                    "fillRate": 1,
                    "confirmedCount": 1,
                    "maxParticipants": 75
                },
                {
                    "id": "019d3905-b357-763b-bbc5-4cb5855b944b",
                    "title": "The Golden Hour: Private Vineyard Dinner",
                    "startDate": "2026-04-02T18:00:00.000Z",
                    "status": "PUBLISHED",
                    "fillRate": 0,
                    "confirmedCount": 1,
                    "maxParticipants": null
                },
                {
                    "id": "019d3948-0672-77bb-bb90-c7062d76fe09",
                    "title": "Atelier SS26: Private Runway & Cocktail",
                    "startDate": "2026-04-03T18:00:00.000Z",
                    "status": "PUBLISHED",
                    "fillRate": 0,
                    "confirmedCount": 0,
                    "maxParticipants": 60
                }
            ]
        }
    }
}


admin : 
{
    "success": true,
    "message": "Admin dashboard data retrieved successfully",
    "data": {
        "statCards": {
            "totalUsers": 6,
            "newUsersThisWeek": 6,
            "totalEvents": 5,
            "activeEvents": 5,
            "totalRevenue": 530,
            "pendingReports": 0
        },
        "charts": {
            "newUsersOverTime": [
                {
                    "date": "2026-03-27",
                    "count": 4
                },
                {
                    "date": "2026-03-28",
                    "count": 2
                }
            ],
            "eventsByCategory": [
                {
                    "category": "Fashion",
                    "count": 2
                },
                {
                    "category": "Food & Drink",
                    "count": 2
                },
                {
                    "category": "Music",
                    "count": 1
                }
            ],
            "eventVisibilitySplit": [
                {
                    "visibility": "PUBLIC",
                    "count": 1
                },
                {
                    "visibility": "PRIVATE",
                    "count": 4
                }
            ],
            "revenueByPaymentStatus": [
                {
                    "status": "COMPLETED",
                    "total": 530
                },
                {
                    "status": "REFUNDED",
                    "total": 0
                }
            ],
            "revenueOverTime": [
                {
                    "month": "2026-03",
                    "amount": 530
                }
            ]
        },
        "lists": {
            "recentActivityFeed": []
        }
    }
}

participant : 
{
    "success": true,
    "message": "Participant dashboard data retrieved successfully",
    "data": {
        "statCards": {
            "eventsJoined": 3,
            "upcomingEvents": 3,
            "totalSpent": 450,
            "reviewsWritten": 0,
            "avgRatingGiven": 0
        },
        "charts": {
            "participationStatusBreakdown": [
                {
                    "status": "CONFIRMED",
                    "count": 3
                }
            ],
            "eventsJoinedByCategory": [
                {
                    "category": "Food & Drink",
                    "count": 2
                },
                {
                    "category": "Music",
                    "count": 1
                }
            ],
            "eventActivityOverTime": [
                {
                    "month": "2026-03",
                    "count": 3
                }
            ]
        },
        "lists": {
            "upcomingConfirmedEvents": [
                {
                    "id": "019d37d2-9214-70f0-b653-408579221668",
                    "event": "Midnight Jazz & Soul: Private Loft Session",
                    "date": "2026-03-30T00:00:00.000Z",
                    "fee": 0,
                    "currency": "USD"
                },
                {
                    "id": "019d3905-b357-763b-bbc5-4cb5855b944b",
                    "event": "The Golden Hour: Private Vineyard Dinner",
                    "date": "2026-04-02T18:00:00.000Z",
                    "fee": 0,
                    "currency": "USD"
                },
                {
                    "id": "019d332e-553b-766d-abc6-e5bac93e1576",
                    "event": "Vintage & Vine: Exclusive Estate Dinner",
                    "date": "2026-07-18T18:00:00.000Z",
                    "fee": 450,
                    "currency": "USD"
                }
            ],
            "paymentHistory": [
                {
                    "id": "019d3339-b20c-750e-be88-65c9fb1bf6e2",
                    "event": "Vintage & Vine: Exclusive Estate Dinner",
                    "amount": 450,
                    "currency": "USD",
                    "status": "COMPLETED"
                }
            ],
            "pendingInvitations": [
                {
                    "id": "019d395e-ac0a-7229-8d2d-71ab05df2f5f",
                    "event": "Atelier SS26: Private Runway & Cocktail",
                    "host": "Anisuzzaman Khokan",
                    "fee": 250,
                    "currency": "USD"
                }
            ]
        }
    }
}