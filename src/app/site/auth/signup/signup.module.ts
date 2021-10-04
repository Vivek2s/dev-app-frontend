import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';


export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: SignupComponent
  }
]

@NgModule({
  declarations: [SignupComponent],
  exports: [SignupComponent],
  imports: [
    RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
    SharedComponentModule
  ],
  providers:[]
})
export class SignupModule { }
