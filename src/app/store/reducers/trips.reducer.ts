/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createFeature, createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/models/types/store/trips';
import * as TripsActions from 'src/app/store/actions/trips.action';

export const tripsFeatureKey = 'trips';

export interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  trips: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TripsActions.loadTrips, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TripsActions.loadTripsSuccess, (state, { trips }) => ({
    ...state,
    loading: false,
    trips,
  })),
  on(TripsActions.loadTripsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TripsActions.addTrip, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TripsActions.addTripSuccess, (state, { trip }) => ({
    ...state,
    loading: false,
    trips: [...state.trips, trip],
  })),
  on(TripsActions.addTripFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TripsActions.updateTrip, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TripsActions.updateTripSuccess, (state, { trip }) => ({
    ...state,
    loading: false,
    trips: state.trips.map((t) => (t.id === trip.id ? trip : t)),
  })),
  on(TripsActions.updateTripFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TripsActions.deleteTrip, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TripsActions.deleteTripSuccess, (state, { tripId }) => ({
    ...state,
    loading: false,
    trips: state.trips.filter((t) => t.id !== tripId),
  })),
  on(TripsActions.deleteTripFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const tripsFeature = createFeature({
  name: tripsFeatureKey,
  reducer,
});
