import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-updatetrip',
  templateUrl: './updatetrip.component.html',
  styleUrls: ['./updatetrip.component.scss'],
})
export class UpdatetripComponent implements OnInit {
  tripId = '';
  formError = '';

  updateTrip: ITrips = {
    id: undefined,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    private firestore: FirestoreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const selectedTripId =
      localStorage.getItem('selectedTripId') || localStorage.getItem('tripId');

    if (!selectedTripId) {
      this.formError = 'No trip selected to edit.';
      return;
    }

    this.tripId = selectedTripId;

    this.firestore.getTrips().subscribe((trips) => {
      const selectedTrip = trips.find((trip) => trip.id === this.tripId);
      if (selectedTrip) {
        this.updateTrip = { ...selectedTrip };
      } else {
        this.formError = 'Selected trip not found.';
      }
    });
  }

  updateUserTrip(): void {
    if (!this.tripId) {
      this.formError = 'Trip ID is required.';
      return;
    }

    this.firestore.upDateTrip(this.tripId, this.updateTrip).subscribe({
      next: () => {
        localStorage.removeItem('selectedTripId');
        this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        this.formError = `Failed to update trip: ${error.message}`;
      },
    });
  }
}
