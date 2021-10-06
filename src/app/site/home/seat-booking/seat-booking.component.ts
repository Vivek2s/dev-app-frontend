import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from '../../../shared/services/cookie.service';
import { IplEventService } from '../../../shared/services/xhr/ipl-event.service';

import { AppStateStore } from '../../../shared/store/app-state.store';

declare var jQuery, $, window;
@Component({
	selector: 'app-seat-booking',
	templateUrl: './seat-booking.component.html'
})
export class SeatBookingComponent {
	// varaibles start
	iplEventsBySeason = [];

	constructor( 
		private _cookieService: CookieService,
		private _appStateStore: AppStateStore,
		private _iplEventService: IplEventService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
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

	redirectTo(){
		//let url = `seat-booking/${event.match_number}/${event.slug_id}`;
		//console.log(url)
		// this._router.navigateByUrl('ticket-confirmation');
		this._router.navigate(['ticket'])
	}

	ngOnDestroy() {
	}
}
