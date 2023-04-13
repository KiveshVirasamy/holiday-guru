
export interface IUserData {
    email: string | null;
    userId: string;
    trips: ITrips[];
}

export interface ITrips {
    userID: string | unknown;
    name: string | unknown;
    description?: string;
    startDate: string | unknown;
    endDate: string | unknown;
    activities: IActivities[];
}

export interface IActivities {
    userID: string | null;
    name: string | null;
    description?: string;
    cost_estimate: string | null;
    startTime: string | null;
    endTime: string | null;
    startLocation?: string;
    endLocation?: string;
}