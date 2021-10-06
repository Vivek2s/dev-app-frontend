import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { HeaderComponent } from './toolbar/header/header.component';
import { FooterComponent } from './toolbar/footer/footer.component';

import { HomeComponent } from './home.component';
import { SharedComponentModule } from './../../shared/component/shared-component.module';


import { IplEventService } from './../../shared/services/xhr/ipl-event.service';

export const BOOT_ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
		{
			path: "",
			loadChildren: () => import('src/app/site/home/ipl-event/ipl-event.module').then(m => m.IplEventModule),
          	runGuardsAndResolvers: 'always'
		},
        {
          path: 'match',
          loadChildren: () => import('src/app/site/home/match-detail/match-detail.module').then(m => m.MatchDetailModule),
          runGuardsAndResolvers: 'always'
        },
        {
          path: 'seat-booking/:match_number/:slug_id',
          loadChildren: () => import('src/app/site/home/seat-booking/seat-booking.module').then(m => m.SeatBookingModule),
          runGuardsAndResolvers: 'always'
        },
        {
          path: 'ticket',
          loadChildren: () => import('src/app/site/home/ticket-confirmation/ticket-confirmation.module').then(m => m.TicketConfirmationModule),
          runGuardsAndResolvers: 'always'
        }
    ]
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
  providers:[ IplEventService ]
})

export class HomeModule { }
 