import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from '../../../../shared/services/cookie.service';

declare var jQuery: any;
declare var window: any;
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    storageCookie:any
    constructor(
        private _cookieService: CookieService,
        private _router: Router
    ){}

    ngOnInit(){
        this.storageCookie = this._cookieService.readCookie('storage', true);
        console.log(this.storageCookie)
    }

    logout(){
        //this._cookieService.eraseCookie(['storage']);
        console.log('......reload...')
        const currentUrl = this._router.url;
		this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            console.log('....hjhjhjhj', currentUrl)
            this._router.navigate([currentUrl]);
        });
	}
}