import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
  /*
   import { AuthService } from 'ngx-auth';
    import {TemperatureService} from "./temperature.service";
  */
import {GaugesModule} from 'ng-canvas-gauges/lib';
import {AlertModule} from 'ngx-alerts';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomsComponent } from './rooms/rooms.component';
import {TemperatureService} from './temperature.service';
import { AdministratorComponent } from './administrator/administrator.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RoomService} from './room.service';
import { AddSensorComponent } from './add-sensor/add-sensor.component';
import { TemperatureDataOverviewComponent } from './temperature-data-overview/temperature-data-overview.component';
import { TemperatureDataHistoricalComponent } from './temperature-data-historical/temperature-data-historical.component';

// Declarations contains all the components used by the app
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TemperatureComponent,
    HomeComponent,
    RoomListComponent,
    RoomDetailComponent,
    RoomsComponent,
    AdministratorComponent,
    NavbarComponent,
    AddSensorComponent,
    TemperatureDataOverviewComponent,
    TemperatureDataHistoricalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AmChartsModule,
    AlertModule.forRoot({}),
    AppRoutingModule
  ],
  providers: [AuthService, TemperatureService, AuthGuard, RoomService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  // AppComponent is is bootstrapped from here (App.module.ts).
  // While the App.Module is bootstraped from the Main.ts
  bootstrap: [AppComponent]
})
export class AppModule { }
