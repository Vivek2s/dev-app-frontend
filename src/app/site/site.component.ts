import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from '../shared/services/cookie.service';
declare var window: any;
declare var jQuery: any;
@Component({
	selector: 'app-site',
	template: `
      <router-outlet></router-outlet>
    `
})
export class SiteComponent {
	/* title = 'app';*/

	constructor(
		
		public cookieService: CookieService,
	) {
	}
	ngAfterViewInit() {
	}
}
