import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/user';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {

  tripData$: Observable<ITrips[]> | undefined;
  constructor(private firestore: FirestoreService) {
    this.tripData$ = this.firestore.getTrips();
  }

  addUserTrip() {
    const newTrip: ITrips = {
      name: 'cars',
      description: 'cars going fast',
      startDate: '23 March',
      endDate: '23 March',
    }
    this.firestore.addTrips(newTrip);
  }

  updateUserTrip() {
    const newTrip = {
      name: 'cars',
      description: 'cars going fast',
      startDate: '23 March',
      endDate: '23 March',
    }
    this.firestore.upDateTrip(newTrip);
  }


}
