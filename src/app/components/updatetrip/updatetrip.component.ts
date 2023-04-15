import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-updatetrip',
  templateUrl: './updatetrip.component.html',
  styleUrls: ['./updatetrip.component.scss']
})
export class UpdatetripComponent {
  tripId = this.route.snapshot.paramMap.get('tripId') ?? '';
  updateTrip = {
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }
  constructor(private firestore: FirestoreService, private route: ActivatedRoute) {

  }

  updateUserTrip() {
    this.firestore.upDateTrip(this.updateTrip, this.tripId);
  }


}
