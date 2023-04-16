import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.scss']
})
export class DeleteTripComponent {

  constructor(private firestore: FirestoreService) {
  }

  deleteTrip() {
    this.firestore.deleteTrip();
    this.firestore.deleteActivities();
  }
}
