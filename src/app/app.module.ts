import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignUpComponent } from './components/sign-up/signup.component';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import * as fromTripsState from 'src/app/store/reducers/trips.reducer';
import { ActivityComponent } from './components/activity/activity.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteActivityComponent } from './components/delete-activity/delete-activity.component';
import { DeleteTripComponent } from './components/delete-trip/delete-trip.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TripComponent } from './components/trip/trip.component';
import { updateactivityComponent } from './components/updateactivity/updateactivity.component';
import { UpdatetripComponent } from './components/updatetrip/updatetrip.component';
import { AuthService } from './shared/services/auth.service';
import { FirestoreService } from './shared/services/firestore.service';
import { TripsEffects } from './store/effects/trips.effects';
import { ServiceWorkerModule } from '@angular/service-worker';



registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingPageComponent,
    DashboardComponent,
    TripComponent,
    ActivityComponent,
    LogoutComponent,
    UpdatetripComponent,
    updateactivityComponent,
    DeleteTripComponent,
    DeleteActivityComponent,
    CalendarComponent,
    ErrorpageComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule,
    NzListModule,
    NzCollapseModule,
    NzCalendarModule,
    NzResultModule,
    NzCardModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromTripsState.tripsFeatureKey, fromTripsState.reducer),
    EffectsModule.forFeature([TripsEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),



  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthService,
    FirestoreService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
