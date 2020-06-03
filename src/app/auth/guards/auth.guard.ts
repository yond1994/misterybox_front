import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, CanLoad, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {AuthmbService} from '../authmb.service';
import {UtilsService} from '../../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild  {
  constructor(private router: Router, private rest: ApiService, private auth: AuthmbService, private utils: UtilsService) {

  }

  canLoad(route: Route): Promise<boolean> {
    return this.verify();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verify();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }
  verify(): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      if (!this.auth.isAuthenticated) {
        this.router.navigate(['/']);
        reject(false);
      } else {
        if (!this.auth.user) {
          this.auth.validate().then((response => {
            resolve(true);
          }).bind(this)).catch((error) => {
            reject(false);
          });
        } else {
          resolve(true);
        }
      }
    }).bind(this));
  }
}
