/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTrips } from "src/app/store/actions/trips.action";
import { TripsState } from './store/reducers/trips.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'holiday-guru';

  constructor(private store: Store<TripsState>) { }

  ngOnInit() {
    this.store.dispatch(loadTrips());
  }
}
