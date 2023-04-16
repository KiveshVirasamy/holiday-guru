import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrips } from 'src/app/models/types/interfaces/trips';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  tripData$: Observable<ITrips[]> | undefined;

  constructor(private firestore: FirestoreService, private datePipe: DatePipe) {
    this.tripData$ = this.firestore.getTrips();
  }



}
