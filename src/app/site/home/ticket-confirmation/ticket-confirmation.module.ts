import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

import { TicketConfirmationComponent } from './ticket-confirmation.component';

import { IplEventService } from './../../../shared/services/xhr/ipl-event.service';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: TicketConfirmationComponent
  }
]
@NgModule({
  declarations: [
    TicketConfirmationComponent
  ],
  imports: [
   RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
  ],
  providers:[ IplEventService ]
})

export class TicketConfirmationModule { }
 