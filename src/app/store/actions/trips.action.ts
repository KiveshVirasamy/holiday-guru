import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/types/store/trips';


export const loadTrips = createAction(
    '[Trips] Load Trips'
);

export const loadTripsSuccess = createAction(
    '[Trips] Load Trips Success',
    props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
    '[Trips] Load Trips Failure',
    props<{ error: string }>()
);

