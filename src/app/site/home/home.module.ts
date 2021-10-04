import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { HeaderComponent } from './toolbar/header/header.component';
import { FooterComponent } from './toolbar/footer/footer.component';

import { HomeComponent } from './home.component';
import { SharedComponentModule } from './../../shared/component/shared-component.module';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent
  }
]
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
   RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
    SharedComponentModule
  ],
  providers:[]
})

export class HomeModule { }
 