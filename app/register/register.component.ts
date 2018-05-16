import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertModule, AlertService} from 'ngx-alerts';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // inputs will be bound to this registerUserData
  registerUserData = {};

  constructor(
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  registerUser() {
    // console.log(this.registerUserData);

    // subscirbe to the observable that is returned
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          // store the json weboken in the browser locally
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
          this.alertService.success('You are now registered.');

        },
        err => {
          /*
                    if (this.registerUserData !== registerUserData.name || ) {
          */
          console.log(err);
          this.router.navigate(['/register']);
          this.alertService.danger('Details are incorrect.');
          //}
        }
      );
  }
}

