import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [SignupComponent],
  exports: [SignupComponent],
  imports: [
    SharedModule,
    SharedComponentModule,
    LoginModule
  ],
  providers:[]
})
export class SignupModule { }
