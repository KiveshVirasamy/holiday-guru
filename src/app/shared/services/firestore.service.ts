import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { ITrips } from 'src/app/models/types/interfaces/trips';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);

  private readonly demoUserId = 'demo-user-uid';

  private isDemoUser(): boolean {
    return localStorage.getItem('userId') === this.demoUserId;
  }

  private getDemoTrips(): ITrips[] {
    const d = localStorage.getItem('demoTrips');
    return d ? (JSON.parse(d) as ITrips[]) : [];
  }

  private setDemoTrips(trips: ITrips[]) {
    localStorage.setItem('demoTrips', JSON.stringify(trips));
  }

  private getDemoActivities(): IActivities[] {
    const d = localStorage.getItem('demoActivities');
    return d ? (JSON.parse(d) as IActivities[]) : [];
  }

  private setDemoActivities(activities: IActivities[]) {
    localStorage.setItem('demoActivities', JSON.stringify(activities));
  }

  //Create
  addTrips(trip: ITrips): Observable<any> {
    if (this.isDemoUser()) {
      const trips = this.getDemoTrips();
      const newTrip = { ...trip, id: trip.id || `${Date.now()}` };
      this.setDemoTrips([...trips, newTrip]);
      localStorage.setItem('tripId', newTrip.id ?? '');
      return from(Promise.resolve(newTrip));
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripId = trip.id ?? '';
    localStorage.setItem('tripId', trip.id ?? '');
    const tripRef = doc(this.firestore, `users/${userId}/trips/${tripId}`);
    return from(setDoc(tripRef, trip));
  }

  generateRandomString(): string {
    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  //Read
  getTrips(): Observable<ITrips[]> {
    if (this.isDemoUser()) {
      return of(this.getDemoTrips());
    }
    const userId = localStorage.getItem('userId') ?? '';
    const tripRef = collection(this.firestore, `users/${userId}/trips`);
    return collectionData(tripRef) as Observable<ITrips[]>;
  }

  //Update
  upDateTrip(
    tripId: string | undefined,
    trip: Partial<ITrips>,
  ): Observable<any> {
    const idToUse =
      tripId ||
      localStorage.getItem('selectedTripId') ||
      localStorage.getItem('tripId') ||
      '';

    if (!idToUse) {
      return from(Promise.reject(new Error('Trip ID is required for update')));
    }

    if (this.isDemoUser()) {
      let trips = this.getDemoTrips();
      trips = trips.map((t) => (t.id === idToUse ? { ...t, ...trip } : t));
      this.setDemoTrips(trips);
      localStorage.setItem('tripId', idToUse);
      return from(Promise.resolve());
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${idToUse}`);
    return from(updateDoc(tripRef, trip));
  }

  //Delete
  deleteTrip(tripId?: string): Observable<any> {
    const idToUse =
      tripId ||
      localStorage.getItem('selectedTripId') ||
      localStorage.getItem('tripId') ||
      '';

    if (!idToUse) {
      return from(Promise.reject(new Error('Trip ID is required for delete')));
    }

    if (this.isDemoUser()) {
      let trips = this.getDemoTrips();
      trips = trips.filter((t) => t.id !== idToUse);
      this.setDemoTrips(trips);
      return from(Promise.resolve());
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripRef = doc(this.firestore, `users/${userId}/trips/${idToUse}`);
    return from(deleteDoc(tripRef));
  }

  getActivities(): Observable<IActivities[]> {
    if (this.isDemoUser()) {
      return of(this.getDemoActivities());
    }
    const userId = localStorage.getItem('userId') ?? '';
    const tripId = localStorage.getItem('tripId') ?? '';
    const activityRef = collection(
      this.firestore,
      `users/${userId}/trips/${tripId}/activities`,
    );
    return collectionData(activityRef) as Observable<IActivities[]>;
  }

  //Create
  addActivities(activity: IActivities): Observable<any> {
    if (this.isDemoUser()) {
      const activities = this.getDemoActivities();
      const newActivity = { ...activity, id: activity.id || `${Date.now()}` };
      this.setDemoActivities([...activities, newActivity]);
      localStorage.setItem('activityId', newActivity.id ?? '');
      return from(Promise.resolve(newActivity));
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripId = localStorage.getItem('tripId') ?? '';
    const activityId = activity.id ?? '';
    localStorage.setItem('activityId', activityId);
    const activityRef = doc(
      this.firestore,
      `users/${userId}/trips/${tripId}/activities/${activityId}`,
    );
    return from(setDoc(activityRef, activity));
  }
  //Update
  updateActivities(activity: Partial<IActivities>): Observable<any> {
    if (this.isDemoUser()) {
      let activities = this.getDemoActivities();
      const activityId = localStorage.getItem('activityId') ?? '';
      activities = activities.map((a) =>
        a.id === activityId ? { ...a, ...activity } : a,
      );
      this.setDemoActivities(activities);
      return from(Promise.resolve());
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripId = localStorage.getItem('tripId') ?? '';
    const activityId = localStorage.getItem('activityId') ?? '';
    const activityRef = doc(
      this.firestore,
      `users/${userId}/trips/${tripId}/activities/${activityId}`,
    );
    return from(setDoc(activityRef, activity));
  }

  //Delete
  deleteActivities(): Observable<any> {
    if (this.isDemoUser()) {
      let activities = this.getDemoActivities();
      const activityId = localStorage.getItem('activityId') ?? '';
      activities = activities.filter((a) => a.id !== activityId);
      this.setDemoActivities(activities);
      return from(Promise.resolve());
    }

    const userId = localStorage.getItem('userId') ?? '';
    const tripId = localStorage.getItem('tripId') ?? '';
    const activityId = localStorage.getItem('activityId') ?? '';
    const activityRef = doc(
      this.firestore,
      `users/${userId}/trips/${tripId}/activities/${activityId}`,
    );
    return from(deleteDoc(activityRef));
  }
}
