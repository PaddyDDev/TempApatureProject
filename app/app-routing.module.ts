import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth.guard';
import {AddSensorComponent} from './add-sensor/add-sensor.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {TemperatureDataOverviewComponent} from './temperature-data-overview/temperature-data-overview.component';
import {TemperatureDataHistoricalComponent} from './temperature-data-historical/temperature-data-historical.component';

/*
  Routes REPRESENT AN ARRAY OF OBJECTS WHERE EACH ROUTE IS AN OBJECT
*/
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'add-sensor', component: AddSensorComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'temperature', component: TemperatureComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
/*
  {path: 'room-detail/:roomName', component: RoomDetailComponent, canActivate: [AuthGuard]},
*/
  {
    path: 'dashboard/:roomName',
    component: RoomDetailComponent, canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: TemperatureDataOverviewComponent},
      { path: 'historical', component: TemperatureDataHistoricalComponent}
      ]
  },
  /*{path: 'temperature', component: TemperatureComponent},
  {path: 'dashboard', component: DashboardComponent},*/
  {path: 'register', component: RegisterComponent},
  // path '**' represents a catch all that redirects to home should the url not exist.
  // In production would redirect to a 404 error page.
  // Always have wildcard route last as will try to match from the top down
  {path: '**', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
