import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

import { MatchDetailComponent } from './match-detail.component';

import { IplEventService } from './../../../shared/services/xhr/ipl-event.service';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: MatchDetailComponent
  }
]
@NgModule({
  declarations: [
    MatchDetailComponent
  ],
  imports: [
   RouterModule.forChild(BOOT_ROUTES),
    SharedModule,
  ],
  providers:[ IplEventService ]
})

export class MatchDetailModule { }
 