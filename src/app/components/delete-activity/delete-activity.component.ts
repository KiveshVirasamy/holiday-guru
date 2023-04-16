import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html',
  styleUrls: ['./delete-activity.component.scss']
})
export class DeleteActivityComponent {

  constructor(private firestore: FirestoreService) {
  }

  deleteActivity() {
    this.firestore.deleteActivities();
  }

}
