import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { v4 as uuidv4 } from 'uuid';




@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private firestore = inject(Firestore);




  //Create
  addTrips(trip: ITrips) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = trip.id ?? '';
    localStorage.setItem('tripId', trip.id ?? '');
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return from(setDoc(tripRef, trip));
  }


  generateRandomString() {
    return uuidv4();
  }



  //Read
  getTrips() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripRef = collection(this.firestore, `users/${userId}/trips`);
    return collectionData(tripRef) as Observable<ITrips[]>
  }

  //Update
  upDateTrip(trip) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return updateDoc(tripRef, trip)
      .catch(() => {
        window.alert('An error occurred while updating the trip. Please try again later.');
      });
  }

  //Delete
  deleteTrip() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return deleteDoc(tripRef)
      .catch(() => {
        window.alert('An error occurred while deleting the trip. Please try again later.');
      });
  }


  getActivities() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const activityRef = collection(this.firestore, `users/${userId}/trips/${tripId}/activities`);
    return collectionData(activityRef) as Observable<IActivities[]>
  }

  //Create
  addActivities(activity: IActivities) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const activityId = activity.id ?? '';
    localStorage.setItem('activityId', activityId);
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return from(setDoc(activityRef, activity));
  }
  //Update
  updateActivities(activity) {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const activityId = localStorage.getItem('activityId' ?? '');
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return setDoc(activityRef, activity)
      .catch(() => {
        window.alert('An error occurred while updating the activity. Please try again later.');
      });
  }

  //Delete
  deleteActivities() {
    const userId = localStorage.getItem('userId' ?? '');
    const tripId = localStorage.getItem('tripId' ?? '');
    const activityId = localStorage.getItem('activityId' ?? '');
    const activityRef = doc(this.firestore, `users/${userId}/trips/${tripId}/activities/${activityId}`);
    return deleteDoc(activityRef)
      .catch(() => {
        window.alert('An error occurred while deleting the activity. Please try again later.');
      });
  }

}
