import { Component } from '@angular/core';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss']
})
export class AddActivitiesComponent {




  newActivity: IActivities = {
    id: '',
    name: '',
    tag: '',
    description: '',
    cost_estimate: '',
    startTime: '',
    endTime: '',
    startLocation: '',
    endLocation: ''
  }

  constructor(private firestore: FirestoreService) { }

  addUserActivity() {
    const activityId = this.firestore.generateRandomString();
    this.newActivity.id = activityId;
    this.firestore.addActivities(this.newActivity);

  }

  clearForm() {
    this.newActivity = {
      name: '',
      tag: '',
      description: '',
      cost_estimate: '',
      startTime: '',
      endTime: '',
      startLocation: '',
      endLocation: ''
    };
  }

}
