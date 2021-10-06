import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from '../../../shared/services/cookie.service';
import { IplEventService } from '../../../shared/services/xhr/ipl-event.service';

import { AppStateStore } from '../../../shared/store/app-state.store';

declare var jQuery, $, window;
@Component({
	selector: 'app-ipl-event',
	templateUrl: './ipl-event.component.html'
})
export class IplEventComponent {
	// varaibles start
	iplEventsBySeason = [];

	constructor( 
		private _cookieService: CookieService,
		private _appStateStore: AppStateStore,
		private _iplEventService: IplEventService,
		private _router: Router
	) {
		
	}

	ngOnInit() {
//		console.clear();

	//	this._appStateStore.getStateByKey('storage');
	console.log('.................Ipl Event...')
		this.initiateIplEvents();
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

	redirectTo(event){
		let url = `seat-booking/${event.match_number}/${event.slug_id}`;
		console.log(url)
		this._router.navigateByUrl(url);
		//this._router.navigate([url])
	}

	ngOnDestroy() {
	}
}
