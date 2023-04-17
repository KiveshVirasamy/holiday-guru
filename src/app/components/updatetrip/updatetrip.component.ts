import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-updatetrip',
  templateUrl: './updatetrip.component.html',
  styleUrls: ['./updatetrip.component.scss']
})
export class UpdatetripComponent {
  tripId = '';

  updateTrip = {
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }
  constructor(private firestore: FirestoreService) {

  }

  updateUserTrip() {
    this.firestore.upDateTrip(this.updateTrip);
  }


}
