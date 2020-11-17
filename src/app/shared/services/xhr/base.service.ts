import { HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { environment } from './../../../../environments/environment';
import { CookieService } from './../cookie.service';

export class BaseService {

  token: any;
  protected _url = environment.API;
  protected _intercomUrl = 'https://api.intercom.io';
  protected bae64EncodeToken = btoa(environment.CLIENT_ID + ":" + environment.CLIENT_SECRET);
  protected headers: any;
  protected options: any;
  // private loggedOutService : LoggedOutService = new LoggedOutService();
  private _cookieService = new CookieService();
  protected cookie:any; 
  constructor() {
    this.setHeaders();
  }

  private setHeaders() {
  this.cookie = JSON.parse(this._cookieService.readCookie('storage'));
    this.token = this.cookie ? this.cookie.token : null;
    if (this.token != null) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    } else {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  protected post_options(type = null) {
	  this.setHeaders();
    if (type == 'auth') {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    }
    return Object.assign({ headers: this.headers, method: 'post' });
  }

  protected get_options(type=null){
	  this.setHeaders();
    if (this.token && !type) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    }
    else if (type == 'auth') {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    }
    // else if(type == 'intercom'){
    //   this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + environment.INTERCOM_ACCESS_TOKEN });
    //   console.log(this.headers, 'Intercom Access Token')
    // }
    return Object.assign({ headers: this.headers });
  }

  protected put_options(type = null) {
	  this.setHeaders();
    if (this.token && !type) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    }
    if (type == 'auth')
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    return Object.assign({ headers: this.headers, method: 'put' });
  }

  protected patch_options() {
	  this.setHeaders();
    return Object.assign({ headers: this.headers, method: 'patch' });
  }

  protected extractData(res: HttpResponse<any>) {
    //let body = res.json();
    return res['data'] || {};
  }

  protected boolData(res: HttpResponse<any>) {
    return res['data'];
  }

  protected handleError(res: HttpErrorResponse) {
    let body = res;
    if (body.error && body.error.code === 'TokenExpiredError') {
      let expires = "";
      // let domain  = environment.APP_EXTENSION;
      let days = -1;
      let value = '';
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      // document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
      // window.location.href = environment.APP_DOMAIN;
    }
    return Observable.throw(body);
  }

  //  Authorization Handlers
  protected extractAuthData(res: HttpResponse<any>) {
    let body = res;
    return body || {};
  }

  protected handleAuthError(error: HttpErrorResponse) {
    let body = error;
    if (body.error) body = body.error;
    return Observable.throw(body);
  }

  protected extractAuthDataPromise(res: HttpResponse<any>) {
    let body = res['data'];
    return body || {};
  }

  protected handleErrorPromise(res: HttpErrorResponse) {
	let body = res;
	console.log(body,'Erorrrrrrrrrrrrr')
    if (body.error && body.error.code === 'TokenExpiredError') {
      let expires = "";
      // let domain  = environment.APP_EXTENSION;
      let days = -1;
      let value = '';
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      // document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
      // window.location.href = environment.APP_DOMAIN;
    }
	return body;
  }
}

