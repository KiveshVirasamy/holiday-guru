import { NgModule } from '@angular/core';
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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ActivityComponent } from './components/activity/activity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { TripComponent } from './components/trip/trip.component';
import { AuthService } from './shared/services/auth.service';


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
    NzListModule


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthService
    //FirestoreService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
