import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { HomeComponent } from './home.component';
import { SharedComponentModule } from './../../shared/component/shared-component.module';
import { SignupModule } from '../signup/signup.module';
import { LoginModule } from '../login/login.module';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent
  }
]
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
   RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
    SharedComponentModule,
    SignupModule,
    LoginModule
  ],
  providers:[]
})

export class HomeModule { }
 