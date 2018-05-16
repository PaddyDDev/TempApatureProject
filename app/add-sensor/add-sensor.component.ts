import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertModule, AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {

  sensorToRegData = {};
  constructor(
    private router: Router,
    private alertService: AlertService,) { }

  ngOnInit() {
  }

  addSensor() {

  }
}
