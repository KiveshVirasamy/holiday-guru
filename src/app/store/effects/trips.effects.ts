import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, switchMap } from "rxjs";
import { FirestoreService } from "src/app/shared/services/firestore.service";
import * as tripsActions from "src/app/store/actions/trips.action";



@Injectable()
export class TripsEffects {

    getTrips = createEffect(() => {
        return this.actions$.pipe(
            ofType(tripsActions.loadTrips),

            switchMap(() =>
                this.firestore.getTrips()
                    .pipe(map(res => tripsActions.loadTripsSuccess({ trips: res })))
            ),
            catchError(err => {
                console.error(err);
                return EMPTY;
            })

        )
    })


    constructor(private actions$: Actions, private firestore: FirestoreService) { }
}



