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
    error: null
};

export const reducer = createReducer(
    initialState,
    on(TripsActions.loadTrips, state => state),
    on(TripsActions.loadTripsSuccess, (state, { trips }) => ({
        ...state,
        loading: false,
        trips
    })),
    on(TripsActions.loadTripsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)

export const tripsFeature = createFeature({
    name: tripsFeatureKey,
    reducer,
});
