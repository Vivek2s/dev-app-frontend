import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from '../../shared/services/cookie.service';

import { AppStateStore } from '../../shared/store/app-state.store';
declare var jQuery, $, window;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
	// vraibles start

	constructor( 
		private _cookieService: CookieService,
		private _appStateStore: AppStateStore
	) {
		
	}

	ngOnInit() {
		console.clear();

	//	this._appStateStore.getStateByKey('storage');
	}

	ngOnDestroy() {
	}
}
