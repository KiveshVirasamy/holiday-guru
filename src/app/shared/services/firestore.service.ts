import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase, AngularFireList, AngularFireObject
} from '@angular/fire/compat/database';
import {
  CollectionReference, Firestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/user';




@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  tripsCollection: CollectionReference;
  trips$: Observable<ITrips[]>;
  trips: AngularFireList<ITrips>;
  tripRef: AngularFireObject<ITrips>;

  private firestore = inject(Firestore);

  constructor(public auth: AngularFireAuth, private db: AngularFireDatabase) {

  }
  addTrip(trip: ITrips) {
    this.trips.push({
      userID: trip.userID,
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      activities: trip.activities,
    });
  }

  // getAllTrips() {
  //   this.tripRef = this.db.list('trips');
  //   return this.tripRef;

  // }

  getTrips(userID: string) {
    this.tripRef = this.db.object(`trips/${userID}`);
    return this.tripRef;
  }


}
