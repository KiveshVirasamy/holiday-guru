import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {

  tripData$: Observable<ITrips[]> | undefined;

  newTrip: ITrips = {
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }



  constructor(private firestore: FirestoreService) {
    this.tripData$ = this.firestore.getTrips();
  }

  addUserTrip() {
    this.firestore.addTrips(this.newTrip);
  }
}
