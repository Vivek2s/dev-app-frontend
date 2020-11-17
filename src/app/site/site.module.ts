import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'

import { SiteComponent } from './site.component';
import { CookieService } from '../shared/services/cookie.service';
import { ScriptService } from '../shared/services/script.service';

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
  providers:[,CookieService,ScriptService]
})
export class SiteModule { }