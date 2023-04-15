import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection, deleteDoc, doc, documentId, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { ITrips } from 'src/app/models/types/interfaces/trips';




@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) { }


  //Create
  addTrips(trip: ITrips) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripRef = collection(this.firestore, `users/${userId}/trips`);
    return addDoc(tripRef, trip);

  }

  //Read
  getTrips() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripRef = collection(this.firestore, `users/${userId}/trips`);
    return collectionData(tripRef) as Observable<ITrips[]>

  }


  //Update
  upDateTrip(trip, tripId: string) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return updateDoc(tripRef, trip);
  }

  //Delete
  deleteTrip() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = '';// To remove later
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return deleteDoc(activityRef);
  }

  getActivities() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = documentId();
    const activityRef = collection(this.firestore, `users/${userId}/trips/${tripId}/activities`);
    return collectionData(activityRef) as Observable<IActivities[]>
  }
  //Create
  addActivities(activity: IActivities) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = documentId();
    const activityRef = collection(this.firestore, `users/${userId}/trips/${tripId}/activities`);
    return addDoc(activityRef, activity);
  }
  //Update
  updateActivities(activity) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = documentId();
    const activityId = '';//To remove later
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return updateDoc(activityRef, activity);
  }

  //Delete
  deleteActivities() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = documentId();
    const activityId = '';//To remove later
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return deleteDoc(activityRef);
  }

}
