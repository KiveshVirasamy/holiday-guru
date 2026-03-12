/* eslint-disable @ngrx/select-style */
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { loadTrips } from 'src/app/store/actions/trips.action';
import { selectTrips } from 'src/app/store/selectors/trips.selector';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  tripData$: Observable<ITrips[]> | undefined;

  constructor(
    private firestore: FirestoreService,
    private store: Store,
  ) {
    this.tripData$ = store.pipe(select(selectTrips));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTrips());
  }

  selectTripForEdit(tripId: string): void {
    localStorage.setItem('selectedTripId', tripId);
    localStorage.setItem('tripId', tripId);
  }
}
