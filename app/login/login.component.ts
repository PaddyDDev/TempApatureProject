import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  loginUser() {
    // console.log(this.loginUserData);
    /*
    * need to subscribe to the data that is returned which either provides a response or an error
    * */
    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          // store the json webtoken in the browser locally
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
          this.alertService.success('You are now logged in.');

        },

        err => {
          console.log(err);
          this.router.navigate(['/login']);
          this.alertService.warning('Details are incorrect or do not match.');
        }
      );
  }

  logMessage(value) {
    console.log(value);
  }
}
