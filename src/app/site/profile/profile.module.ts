import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { ProfileComponent } from './profile.component';
//import { HOME_ROUTES } from './../../config/routes/home.route';
import { SharedComponentModule } from './../../shared/component/shared-component.module';
import { SignupModule } from '../auth/signup/signup.module';
import { LoginModule } from '../auth/login/login.module';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: ProfileComponent
  }
]
@NgModule({
  declarations: [
    ProfileComponent
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

export class ProfileModule { }
 