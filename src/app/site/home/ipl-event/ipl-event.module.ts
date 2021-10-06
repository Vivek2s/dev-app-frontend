import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

import { IplEventComponent } from './ipl-event.component';

import { IplEventService } from './../../../shared/services/xhr/ipl-event.service';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: IplEventComponent
  }
]
@NgModule({
  declarations: [
    IplEventComponent
  ],
  imports: [
   RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
  ],
  providers:[ IplEventService ]
})

export class IplEventModule { }
 