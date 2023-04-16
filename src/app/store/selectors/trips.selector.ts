/* eslint-disable @ngrx/prefix-selectors-with-select */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTripsState from 'src/app/store/reducers/trips.reducer';

export const selectTripState = createFeatureSelector<fromTripsState.TripsState>(
    fromTripsState.tripsFeatureKey
);

export const selectTrips = createSelector(
    selectTripState,
    (state) => state.trips
)
