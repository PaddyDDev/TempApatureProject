///<reference path="../../node_modules/@angular/router/src/router.d.ts"/>
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service';
import {AlertService} from 'ngx-alerts';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor
  (
    /*
    * Inject AuthService for the logged in method and
    * Router to control navigation
    */
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      // If TOKEN is present will return true so can log in
      return true;
    } else {
      // this.alertService.warning('Info Wrong.');
        this.router.navigate(['/login']);
        return false;
      }
  }
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;*/
}
