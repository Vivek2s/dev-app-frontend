import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'

import { SiteComponent } from './site.component';
import { CookieService } from '../shared/services/cookie.service';
import { ScriptService } from '../shared/services/script.service';
import { SignupLoginService } from '../shared/services/signup-login.service';
import { LoginGuard } from '../shared/guards/login.guard';
import { AuthGuard } from './../shared/guards/auth.guard';

export const BOOT_ROUTES: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/site/home/home.module').then(m => m.HomeModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/site/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path:'**',
        redirectTo:'/'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(BOOT_ROUTES)
  ],
  declarations: [SiteComponent],
  providers:[SignupLoginService,CookieService,ScriptService]
})
export class SiteModule { }