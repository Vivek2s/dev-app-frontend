import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CookieService } from './cookie.service';

export class BaseService {
	token: any;
	protected _url = environment.API;
	protected _intercomUrl = 'https://api.intercom.io';
	protected bae64EncodeToken = btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET);
	protected headers: any;
	protected options: any;
	// private loggedOutService : LoggedOutService = new LoggedOutService();
	private _cookieService = new CookieService();
	protected cookie: any;
	constructor() {
		this.setHeaders();
	}

	private setHeaders() {
		this.cookie = null;
		this.token = this.cookie ? this.cookie.token : null;
		if (this.token != null) {
			this.headers = new Headers({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token });
		} else {
			this.headers = new Headers({ 'Content-Type': 'application/json' });
		}
	}

	protected post_options(type = null) {
		this.setHeaders();
		if (type == 'auth') {
			this.headers = new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + this.bae64EncodeToken
			});
		}
		return new RequestOptions({ headers: this.headers, method: 'post' });
	}

	protected get_options(type = null) {
		this.setHeaders();
		if (this.token && !type) {
			this.headers = new Headers({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token });
		} else if (type == 'auth') {
			this.headers = new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + this.bae64EncodeToken
			});
		} 
		return new RequestOptions({ headers: this.headers });
	}

	protected put_options(type = null) {
		this.setHeaders();
		if (this.token && !type) {
			this.headers = new Headers({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token });
		}
		if (type == 'auth')
			this.headers = new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + this.bae64EncodeToken
			});
		return new RequestOptions({ headers: this.headers, method: 'put' });
	}

	protected patch_options() {
		this.setHeaders();
		return new RequestOptions({ headers: this.headers, method: 'patch' });
	}

	protected extractData(res: Response) {
		let body = res.json();
		return body.data || {};
	}

	protected boolData(res: Response) {
		let body = res.json();
		return body.data;
	}

	protected handleError(error: Response) {
		let body = error.json();
		if (body.error && body.error.code === 'TokenExpiredError') {
			let expires = '';
			// let domain  = environment.APP_EXTENSION;
			let days = -1;
			let value = '';
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = '; expires=' + date.toUTCString();
			}
			// document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
			// window.location.href = environment.APP_DOMAIN;
		}
		return throwError(body);
	}

	//  Authorization Handlers
	protected extractAuthData(res: Response) {
		let body = res.json();
		return body || {};
	}

	protected handleAuthError(error: Response) {
		let body = error.json();
		if (body.error) body = body.error;
		return throwError(body);
	}

	protected extractAuthDataPromise(res: Response) {
		let body = res.json();
		return body.data || {};
	}

	protected handleErrorPromise(error: Response) {
		let body = error.json();
		console.log(body, 'Erorrrrrrrrrrrrr');
		if (body.error && body.error.code === 'TokenExpiredError') {
			let expires = '';
			// let domain  = environment.APP_EXTENSION;
			let days = -1;
			let value = '';
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = '; expires=' + date.toUTCString();
			}
			// document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
			// window.location.href = environment.APP_DOMAIN;
		}
		return body;
	}
}
