import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  activityData$: Observable<IActivities[]> | undefined;

  newActivity: IActivities = {
    name: '',
    tag: '',
    description: '',
    cost_estimate: '',
    startTime: '',
    endTime: '',
    startLocation: '',
    endLocation: ''
  }

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
    this.activityData$ = this.firestore.getActivities();
  }

  addUserActivity() {
    this.firestore.addActivities(this.newActivity);
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

  updateUserActivity() {

    this.firestore.updateActivities(this.updateactivity);
  }

}
