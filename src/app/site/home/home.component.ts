import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent {
	// varaibles start
	iplEventsBySeason = [];

	constructor(
	) {
		
	}

	ngOnInit() {
		console.clear();
	}

	ngOnDestroy() {
	}
}
