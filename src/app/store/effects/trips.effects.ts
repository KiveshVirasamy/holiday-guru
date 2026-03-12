import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import * as tripsActions from 'src/app/store/actions/trips.action';

@Injectable()
export class TripsEffects {
  getTrips = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripsActions.loadTrips),
      switchMap(() =>
        this.firestore.getTrips().pipe(
          map((res) => tripsActions.loadTripsSuccess({ trips: res })),
          catchError((err) =>
            of(
              tripsActions.loadTripsFailure({
                error: err?.message || 'Load trips failed',
              }),
            ),
          ),
        ),
      ),
    );
  });

  addTrip = createEffect(() =>
    this.actions$.pipe(
      ofType(tripsActions.addTrip),
      mergeMap(({ trip }) =>
        this.firestore.addTrips(trip).pipe(
          map(() => tripsActions.addTripSuccess({ trip })),
          catchError((err) =>
            of(
              tripsActions.addTripFailure({
                error: err?.message || 'Add trip failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateTrip = createEffect(() =>
    this.actions$.pipe(
      ofType(tripsActions.updateTrip),
      mergeMap(({ trip }) =>
        this.firestore.upDateTrip(trip.id, trip).pipe(
          map(() => tripsActions.updateTripSuccess({ trip })),
          catchError((err: Error) =>
            of(
              tripsActions.updateTripFailure({
                error: err?.message || 'Update trip failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteTrip = createEffect(() =>
    this.actions$.pipe(
      ofType(tripsActions.deleteTrip),
      mergeMap(({ tripId }) =>
        this.firestore.deleteTrip(tripId).pipe(
          map(() => tripsActions.deleteTripSuccess({ tripId })),
          catchError((err: Error) =>
            of(
              tripsActions.deleteTripFailure({
                error: err?.message || 'Delete trip failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  refreshTripsAfterMutations = createEffect(() =>
    this.actions$.pipe(
      ofType(
        tripsActions.addTripSuccess,
        tripsActions.updateTripSuccess,
        tripsActions.deleteTripSuccess,
      ),
      map(() => tripsActions.loadTrips()),
    ),
  );

  constructor(
    private actions$: Actions,
    private firestore: FirestoreService,
  ) {}
}
