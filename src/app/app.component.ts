import { Component, OnInit } from '@angular/core';

declare var window, firebase;
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  phoneNumber:any;


  constructor(){}

  ngOnInit(){
}
}

