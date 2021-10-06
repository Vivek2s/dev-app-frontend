import { Component, ElementRef, ViewChild } from '@angular/core';

import { CookieService } from '../../../shared/services/cookie.service';
import { IplEventService } from '../../../shared/services/xhr/ipl-event.service';

import { AppStateStore } from '../../../shared/store/app-state.store';

declare var jQuery, $, window;
@Component({
	selector: 'app-match-detail',
	templateUrl: './match-detail.component.html'
})
export class MatchDetailComponent {
	// varaibles start
	iplEventsBySeason = [];

	constructor( 
		private _cookieService: CookieService,
		private _appStateStore: AppStateStore,
		private _iplEventService: IplEventService
	) {
		
	}

	ngOnInit() {
//		console.clear();

	//	this._appStateStore.getStateByKey('storage');
		//this.initiateIplEvents();
	}

	async initiateIplEvents(){
		try{
			let iplEvents = await this._iplEventService.getIplEvents('2021');
			console.log(iplEvents)
			this.iplEventsBySeason.push(...iplEvents);
		}catch(error){
			console.log(error);
		}
	}

	ngOnDestroy() {
	}
}
