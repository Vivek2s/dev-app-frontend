import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import { compressToBase64, decompressFromBase64 } from 'lz-string';

@Injectable()
export class CookieService {
	showUniList: boolean = false;
	setShowUniList(a) {
		this.showUniList = a;
	}
	showPage: number = 1;
	setPage(a) {
		this.showPage = a;
	}

	showUnideadline: boolean = false;
	setshowUnideadline(a) {
		this.showUnideadline = a;
	}
	createCookie(name: string, value: any, expireTime: number, type = null, encode=false) {
		let expires = '';

		if (expireTime) {
			let date = new Date();
			date.setTime(date.getTime() + expireTime * 1000);
			expires = '; expires=' + date.toUTCString();
		}

		if (type) {
			let readData = this.readCookie(name);
			if (typeof readData == 'object') {
				let cookie = JSON.parse(this.readCookie(name));
				value = Object.assign(value, cookie);
			}
		}
		// if (encode) value = compressToBase64(JSON.stringify(value));
		// else value = JSON.stringify(value);
		if (name == 'storage' || encode) {
			if (name == 'storage' && value && value.user) value.user.student_details = '';
			value = compressToBase64(JSON.stringify(value));
		} else value = JSON.stringify(value);
		document.cookie = name + '=' + value + expires;
	}

	readCookie(name: string, decode = false) {
		let nameEQ = name + '=';
		let ca = document.cookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			// console.log(c.charAt(0));
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) {
				// console.log(c.substring(nameEQ.length,c.length));
				if (decode) return decompressFromBase64(c.substring(nameEQ.length, c.length));
				else return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	}

	addCookie(name: string, obj: any, expireTime: number, replaceKey = null) {
		let expires = '';
		let cookie = JSON.parse(this.readCookie(name));

		if (replaceKey && cookie[replaceKey]) cookie[replaceKey] = obj[replaceKey];

		let newVal = Object.assign(obj, cookie);
		if (expireTime) {
			let date = new Date();
			date.setTime(date.getTime() + expireTime * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + JSON.stringify(newVal) + expires + '; path=/';
	}

	eraseCookie(cookies: string[]) {
		cookies.forEach((name) => this.createCookie(name, '', -1));
	}

	updateCookie(cookieName: string, key: any, value: any, expireTime: number, type = null) {
		let expires = '';
		let cookie = JSON.parse(this.readCookie(cookieName));
		if (cookie && cookie[key]) {
			if (expireTime) {
				let date = new Date();
				date.setTime(date.getTime() + expireTime * 1000);
				expires = '; expires=' + date.toUTCString();
			}
			cookie[key] = value;
			let updatedValue;
			if (cookieName == 'storage') updatedValue = compressToBase64(JSON.stringify(cookie));
			else updatedValue = JSON.stringify(cookie);
			document.cookie = cookieName + '=' + updatedValue + expires + '; path=/';
		}
	}
}
