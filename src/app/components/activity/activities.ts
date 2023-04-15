export interface IActivities {
    name: string | null;
    tag: string | null;
    description?: string;
    cost_estimate: string | null;
    startTime: string | null;
    endTime: string | null;
    startLocation?: string;
    endLocation?: string;
}