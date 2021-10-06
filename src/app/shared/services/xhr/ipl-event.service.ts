import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './../base.service';
import { CookieService } from './../cookie.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class IplEventService extends BaseService {
	constructor(private _http: Http) {
		super();
	}
	_cookies = new CookieService();

	getIplEvents(season) {
		return this._http
			.get(this._url + `/ipl-events/${season}`, this.get_options())
            .pipe(map(this.extractData), catchError(this.handleError))
            .toPromise();
	}
}
