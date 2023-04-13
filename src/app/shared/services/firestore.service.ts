import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable, switchMap } from 'rxjs';
import { ITrips } from 'src/app/models/user';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  constructor(private auth: AuthService) {

  }
  //Read
  getTrips() {
    // const userId = this.auth.getUserId;
    const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';

    const tripRef = collection(this.firestore, `users/${userId}/trips`);

    return collectionData(tripRef).pipe(switchMap(data => { console.log(data); return data })) as Observable<ITrips[]>

  }
  //Create
  addTrips(trip: ITrips) {
    const userId = this.auth.getUserId;
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripRef = collection(this.firestore, `users/${userId}/trips`);
    return addDoc(tripRef, trip);
  }
  //Update
  upDateTrip(trip) {
    const userId = this.auth.getUserId;
    const tripId = 'j8DdhI7slMw1ohXctyTF';
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return updateDoc(tripRef, trip);
  }

  //Delete
  deleteTrip(tripId: string) {
    const userId = this.auth.getUserId;
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return deleteDoc(tripRef);
  }

  getActivities() {
    // const userId = this.auth.getUserId;
    const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';

    const tripRef = collection(this.firestore, `users/${userId}/trips/activities`);

    return collectionData(tripRef).pipe(switchMap(data => { console.log(data); return data })) as Observable<ITrips[]>

  }
  //Create
  addActivities(trip: ITrips) {
    const userId = this.auth.getUserId;
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripRef = collection(this.firestore, `users/${userId}/trips/activities`);
    return addDoc(tripRef, trip);
  }
  //Update
  updateActivities(activity) {
    const userId = this.auth.getUserId;
    const tripId = 'j8DdhI7slMw1ohXctyTF';
    const activityId = 'j8DdhI7slMw1ohXctyTF';
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return updateDoc(tripRef, activity);
  }

  //Delete
  deleteActivities() {
    const userId = this.auth.getUserId;
    // const userId = 'R8McYo1CASSrzqVArC5fwQkSydp2';
    const tripId = 'j8DdhI7slMw1ohXctyTF';
    const activityId = 'j8DdhI7slMw1ohXctyTF';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return deleteDoc(tripRef);
  }

}
