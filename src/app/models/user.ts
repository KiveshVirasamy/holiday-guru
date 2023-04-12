export interface IUserData {
    idToken: string;
    email: string | null;
    userId: string;
    trips: ITrips[];
}

export interface ITrips {
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    activities: IActivities[];
}

export interface IActivities {
    name: string;
    description?: string;
    tag: string;
    cost_estimate: string;
    startDate: string;
    endDate: string;
    startLocation?: string;
    endLocation?: string;
}