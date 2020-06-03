import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers: HttpHeaders;
  public readonly url: string = 'https://api.credimasoriente.com/public';
  constructor(public http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
  get(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.get(this.getUrl(endpoint, params), {headers: this.headers}).toPromise());
  }
  post(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.post(this.getUrl(endpoint, params), body, {headers: this.headers}).toPromise());
  }

  put(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.put(this.getUrl(endpoint, params), body, {headers: this.headers}).toPromise());
  }

  delete(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.delete(this.getUrl(endpoint, params), {headers: this.headers}).toPromise());
  }
  public getUrl(endpoint: string, params?: IUrlParams): string {
    return this.url
      + '/api'
      + (endpoint || '/')
      + this.parseParams(params);
  }

  public getUrldns(endpoint: string, params?: IUrlParams): string {
    return (endpoint || '/')
      + this.parseParams(params);
  }
  private parseParams(params: IUrlParams): string {
    let parsed: string = '';
    if (params)
      Object.keys(params).forEach((k, i) => {
        parsed += (i == 0) ? '?' : '&';
        parsed += k + '=' + params[k];
      });
    return parsed;
  }

  private check(requestPromise: Promise<object>): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      requestPromise.then(response => {
        resolve(response);
      }).catch(((err: HttpErrorResponse | any) => {
        switch (err.status) {
          case 401:
            break;
          default:
            if (err.error[0] === 'token_expired') {
              this.router.navigateByUrl('/authentication/login');
            }
            console.error('Another error in http request (Please, go to "check" function in "RestService" for debug)');
            break;
        }
        reject(err);
      }).bind(this));
    });
  }
}

interface IUrlParams {
  [key: string]: string | number | boolean;
}
