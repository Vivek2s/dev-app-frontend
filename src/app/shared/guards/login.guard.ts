import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {CookieService} from './../services/cookie.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _cookieService:CookieService
    ) {}

    canActivate() {
        let cookie = JSON.parse(this._cookieService.readCookie('storage', true));
        if (cookie == null) {
            return true;
        }
        console.log('..................profile....')
        this._router.navigate(['/profile']);
        return false;
    }
}
