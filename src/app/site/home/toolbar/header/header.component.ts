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
    ){}

    ngOnInit(){
        this.storageCookie = this._cookieService.readCookie('storage', true);
        console.log(this.storageCookie)
    }
}