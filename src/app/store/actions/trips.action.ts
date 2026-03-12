import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/types/store/trips';

export const loadTrips = createAction('[Trips] Load Trips');

export const loadTripsSuccess = createAction(
  '[Trips] Load Trips Success',
  props<{ trips: Trip[] }>(),
);

export const loadTripsFailure = createAction(
  '[Trips] Load Trips Failure',
  props<{ error: string }>(),
);

export const addTrip = createAction(
  '[Trips] Add Trip',
  props<{ trip: Trip }>(),
);

export const addTripSuccess = createAction(
  '[Trips] Add Trip Success',
  props<{ trip: Trip }>(),
);

export const addTripFailure = createAction(
  '[Trips] Add Trip Failure',
  props<{ error: string }>(),
);

export const updateTrip = createAction(
  '[Trips] Update Trip',
  props<{ trip: Trip }>(),
);

export const updateTripSuccess = createAction(
  '[Trips] Update Trip Success',
  props<{ trip: Trip }>(),
);

export const updateTripFailure = createAction(
  '[Trips] Update Trip Failure',
  props<{ error: string }>(),
);

export const deleteTrip = createAction(
  '[Trips] Delete Trip',
  props<{ tripId: string }>(),
);

export const deleteTripSuccess = createAction(
  '[Trips] Delete Trip Success',
  props<{ tripId: string }>(),
);

export const deleteTripFailure = createAction(
  '[Trips] Delete Trip Failure',
  props<{ error: string }>(),
);
