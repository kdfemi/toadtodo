import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class LoggedoutGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,  private router: Router, private firebaseAuth: AngularFireAuth) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const promise = new Promise((resolved, rejected) => {
        this.firebaseAuth.authState.subscribe(
          (success) => resolved(success),
          (err) => rejected(err)
        );
        });
      return promise.then(
          (v) => {
            if (v !== null ) {
              this.router.navigate(['/', 'todo']);
            } else {
              return true;
            }
          }
        );
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

}
