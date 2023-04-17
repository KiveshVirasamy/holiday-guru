import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/signup.component';
import { updateactivityComponent } from './components/updateactivity/updateactivity.component';
import { UpdatetripComponent } from './components/updatetrip/updatetrip.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/editTrip', component: UpdatetripComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/editActivity', component: updateactivityComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
