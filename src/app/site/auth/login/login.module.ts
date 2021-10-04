import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';
import { LoginComponent } from './login.component';


export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
    SharedComponentModule
  ],
  providers:[]
})
export class LoginModule { }
