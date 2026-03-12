export interface Trip {
  id?: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}
