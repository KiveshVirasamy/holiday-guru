import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-updateactivity',
  templateUrl: './updateactivity.component.html',
  styleUrls: ['./updateactivity.component.scss']
})
export class updateactivityComponent {

  updateactivity = {
    name: '',
    tag: '',
    description: '',
    cost_estimate: '',
    startTime: '',
    endTime: '',
    startLocation: '',
    endLocation: ''
  }


  constructor(private firestore: FirestoreService) {
  }
  updateUserActivity() {

    this.firestore.updateActivities(this.updateactivity);
  }
}
