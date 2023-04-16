export interface Trip {
    id?: string;
    name: string | unknown;
    description?: string;
    startDate: string | unknown;
    endDate: string | unknown;
}

export interface TripsState {
    trips: Trip[];
    loading: boolean;
    error: string;
}
