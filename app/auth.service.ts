import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  // Create propery that stores backend url
  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient,
              private router: Router) { }

  // define a register method for both user and temperature
  // in user case accepts a user object of name, username, email and password
  /*
      registerUser method accepts a user object and returns a response that the backend API
      sends whenever it is available
  */
  registerUser(user) {
    // NOTE HttpClienModule does NOT have post request, butHttpClient does

    // make http request that has the url and the user object as arguments

    return this.http.post<any>(this._registerUrl, user);

  }
/*
the loginUser method takes in a user that contains username and password
add type any to be aboe to return the observable
*/
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
