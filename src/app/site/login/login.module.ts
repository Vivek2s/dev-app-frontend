import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    SharedModule,
    SharedComponentModule
  ],
  providers:[]
})
export class LoginModule { }
