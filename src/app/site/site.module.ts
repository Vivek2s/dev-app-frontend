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
        loadChildren: () => import('src/app/site/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/site/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('src/app/site/auth/signup/signup.module').then(m => m.SignupModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('src/app/site/auth/login/login.module').then(m => m.LoginModule),
        canActivate: [LoginGuard]
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