/* eslint-disable @ngrx/select-style */
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { selectTrips } from 'src/app/store/selectors/trips.selector';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {

  tripData$: Observable<ITrips[]> | undefined;



  newTrip: ITrips = {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }





  constructor(private firestore: FirestoreService, private store: Store) {
    this.tripData$ = store.pipe(select(selectTrips));
  }

  addUserTrip() {
    const tripId = this.firestore.generateRandomString();
    this.newTrip.id = tripId;
    this.firestore.addTrips(this.newTrip);
  }

  clearForm() {
    this.newTrip = {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    };
  }
}
