import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { ITrips } from 'src/app/models/types/interfaces/trips';

@Injectable({ providedIn: 'root' })
export class MockFirestoreService {
  private tripsStorageKey = 'demoTrips';
  private activitiesStorageKey = 'demoActivities';

  private readTrips(): ITrips[] {
    const data = localStorage.getItem(this.tripsStorageKey);
    if (data) {
      return JSON.parse(data) as ITrips[];
    }

    const initialTrips: ITrips[] = [
      {
        id: 'demo-trip-1',
        name: 'Sunset Beach Getaway',
        description:
          'Relaxing trip by the ocean with beach walks and local food',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-2',
        name: 'Mountain Hike Adventure',
        description: '3-day hiking trip with scenic views and campfire nights',
        startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-3',
        name: 'City Culture Weekend',
        description: 'Museum tours, food markets, and a historical city walk',
        startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-4',
        name: 'Rainforest Eco Tour',
        description:
          'Wildlife spotting, canopy walk, and guided conservation hikes',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-5',
        name: 'Desert Safari Escape',
        description:
          '4x4 dunes ride, stargazing camp, and cultural performance',
        startDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 43 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-6',
        name: 'River Cruise Retreat',
        description: 'Scenic river stops, wine tastings, and city excursions',
        startDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-7',
        name: 'National Park Campout',
        description: 'Hiking, lakeside campfires, and ranger sunset talks',
        startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-8',
        name: 'Winter Ski Adventure',
        description: 'Ski slopes, cozy lodges, and hot cocoa nights',
        startDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-9',
        name: 'Culinary Roadtrip',
        description: 'Roadside cafes, food trucks, and local chef workshops',
        startDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
      {
        id: 'demo-trip-10',
        name: 'Island Hopping Escape',
        description: 'Boating, snorkeling, and tropical sunset dinners',
        startDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        endDate: new Date(Date.now() + 96 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
    ];

    this.writeTrips(initialTrips);
    return initialTrips;
  }

  private writeTrips(trips: ITrips[]): void {
    localStorage.setItem(this.tripsStorageKey, JSON.stringify(trips));
  }

  private readActivities(): IActivities[] {
    const data = localStorage.getItem(this.activitiesStorageKey);
    return data ? (JSON.parse(data) as IActivities[]) : [];
  }

  private writeActivities(activities: IActivities[]): void {
    localStorage.setItem(this.activitiesStorageKey, JSON.stringify(activities));
  }

  addTrips(trip: ITrips) {
    const trips = this.readTrips();
    const newTrip = { ...trip, id: trip.id || `${Date.now()}` };
    this.writeTrips([...trips, newTrip]);
    localStorage.setItem('tripId', newTrip.id ?? '');
    return from(Promise.resolve(newTrip));
  }

  getTrips(): Observable<ITrips[]> {
    return of(this.readTrips());
  }

  upDateTrip(tripId: string | undefined, trip: Partial<ITrips>) {
    const currentId =
      tripId ||
      localStorage.getItem('selectedTripId') ||
      localStorage.getItem('tripId');

    if (!currentId) {
      return from(Promise.reject(new Error('Trip ID is required for update')));
    }

    const trips = this.readTrips().map((t) =>
      t.id === currentId ? { ...t, ...trip } : t,
    );
    this.writeTrips(trips);
    localStorage.setItem('tripId', currentId);
    return from(Promise.resolve());
  }

  deleteTrip(tripId?: string) {
    const currentId =
      tripId ||
      localStorage.getItem('selectedTripId') ||
      localStorage.getItem('tripId');

    if (!currentId) {
      return from(Promise.reject(new Error('Trip ID is required for delete')));
    }

    this.writeTrips(this.readTrips().filter((t) => t.id !== currentId));
    return from(Promise.resolve());
  }

  getActivities(): Observable<IActivities[]> {
    return of(this.readActivities());
  }

  addActivities(activity: IActivities) {
    const activities = this.readActivities();
    const newActivity = { ...activity, id: activity.id || `${Date.now()}` };
    this.writeActivities([...activities, newActivity]);
    localStorage.setItem('activityId', newActivity.id ?? '');
    return from(Promise.resolve(newActivity));
  }

  updateActivities(activity: Partial<IActivities>) {
    const activityId = localStorage.getItem('activityId');
    const activities = this.readActivities().map((a) =>
      a.id === activityId ? { ...a, ...activity } : a,
    );
    this.writeActivities(activities);
    return from(Promise.resolve());
  }

  deleteActivities() {
    const activityId = localStorage.getItem('activityId');
    this.writeActivities(
      this.readActivities().filter((a) => a.id !== activityId),
    );
    return from(Promise.resolve());
  }
}
