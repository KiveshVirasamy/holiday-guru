import { Component } from '@angular/core';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss']
})
export class AddTripsComponent {


  newTrip: ITrips = {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }

  constructor(private firestore: FirestoreService) {

  }
  addUserTrip() {
    const tripId = this.firestore.generateRandomString();
    this.newTrip.id = tripId;
    this.firestore.addTrips(this.newTrip);
  }

  clearForm() {
    this.newTrip = {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    };
  }

}
