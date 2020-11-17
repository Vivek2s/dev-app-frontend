import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { CookieService } from './cookie.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class SignupLoginService extends BaseService {
	constructor(private _http: Http) {
		super();
	}
	_cookies = new CookieService();

	register(data: any): Observable<any> {
		return this._http
			.post(this._url + '/oauth/register', data, this.post_options('auth'))
			.pipe(map(this.extractAuthData), catchError(this.handleAuthError));
	}

	login(data: any): Observable<any> {
		return this._http
			.post(this._url + '/oauth/login', data, this.post_options('auth'))
			.pipe(map(this.extractAuthData), catchError(this.handleAuthError));
	}
}
