import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/services/cookie.service';
declare var jQuery, $, window;
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent {
	// vraibles start
	user:any;
	constructor(
		private _cookieService: CookieService,
		private _router: Router
	) {
		
	}

	ngOnInit() {
		let cookie = JSON.parse(this._cookieService.readCookie('storage', true));
		this.user = cookie.user;

	}

	logout(){
		this._cookieService.eraseCookie(['storage']);
        // this._cookieService.editDomainCookie('storage') // for clearing domain cookie
        this._router.navigate(['/login']);
	}
}
