import {EventEmitter, Injectable, Output} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {UserModel} from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class AuthmbService {
  private _currentUser: UserModel;
  public waiting: boolean;
  @Output() getLoggedInData: EventEmitter<any> = new EventEmitter();
  constructor(private rest: ApiService,
              private utils: UtilsService,
              private router: Router
  ) {
    if (this.localtoken && this.rest.headers) {
      this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + this.localtoken);
      this.rest.headers = this.rest.headers.set('deviceInfo', '{"language_local":"en-US","uuid":"unknown","os":"Web",' +
        '"os_version":"unknown","device":"unknown","carrier":"unknown"}');
    } else if (!this.rest.headers) {
      console.error('headers object is not available!');
    }
  }


  public login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.waiting = true;
      this.rest.post('/login', {email: username, password: password})
        .then(((response: any) => {
          if (response.user) {
            const token = response.token;
            if (token) {
              this._currentUser = response.user;
              this.emitlogin(this._currentUser);
              console.log(this._currentUser);
              localStorage.setItem('currentUser', JSON.stringify({email: username, token: token, datauser: response.user}));
              this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + token);
              resolve(true, this._currentUser);
            }
            resolve(false);
          } else {
            resolve(false);
          }
          this.waiting = false;
        }).bind(this))
        .catch((e) => {
          this.waiting = false;
          reject(e);
        });
    }).bind(this));
  }

  public logout(): void {
    localStorage.clear();
    this.waiting = true;
    this.cleanSession();
    this.utils.openSnackBar('sesión finalizada', 'success');
  }

  public validate(): Promise<string> {
    return new Promise<string>(((resolve, reject) => {
      this.waiting = true;
      if (this.rest.headers.has('Authorization')) {
        this.rest.get('/token').then(((response: any) => {
          this.rest.headers = this.rest.headers.set('Authorization', 'Bearer ' + response.token);
          this.waiting = false;
          console.log('Second Validation');
          resolve(true);
        }).bind(this)).catch((error) => {
          this.cleanSession();
          this.router.navigateByUrl('/');
          this.waiting = false;
          reject(error.message);
        });
      } else {
        this.cleanSession();
        this.router.navigateByUrl('/');
      }
    }).bind(this));
  }

  private get localtoken(): string {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj) {
      return obj.token;
    }
    return null;
  }

  public get isAuthenticated(): boolean {
    return !!this.localtoken && this.rest.headers.has('Authorization');
  }

  public get user(): UserModel {
    return this._currentUser;
  }


  public getCurrentUser() {
    const _current = localStorage.getItem('currentUser');
    const _parseCurrent = JSON.parse(localStorage.getItem('currentUser'));
    const _userData = (_current && _parseCurrent) ? JSON.parse(localStorage.getItem('currentUser')) : null;
    return _userData;
  }

  public emitlogin(data) {
    this.getLoggedInData.emit(data);
  }

  public cleanSession() {
    this._currentUser = null;
    this.rest.headers.delete('Authorization');
    localStorage.removeItem('currentUser');
    this.getLoggedInData.emit('logout');
  }
}
