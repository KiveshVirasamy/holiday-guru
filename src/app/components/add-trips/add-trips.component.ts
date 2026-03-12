import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Trip } from 'src/app/models/types/store/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { addTripSuccess, loadTrips } from 'src/app/store/actions/trips.action';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm!: FormGroup;
  formError = '';

  constructor(
    private firestore: FirestoreService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.addTripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  addUserTrip() {
    if (this.addTripForm.invalid) {
      this.formError = 'Please fill in all required fields.';
      this.addTripForm.markAllAsTouched();
      return;
    }

    const tripId = this.firestore.generateRandomString();
    const trip: Trip = {
      id: tripId,
      ...this.addTripForm.value,
    };

    this.firestore.addTrips(trip).subscribe({
      next: (newTrip) => {
        this.store.dispatch(addTripSuccess({ trip: newTrip }));
        this.store.dispatch(loadTrips());
        this.formError = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err: Error) => {
        this.formError = `Failed to add trip: ${err.message}`;
      },
    });
  }

  clearForm() {
    this.addTripForm.reset();
  }
}
