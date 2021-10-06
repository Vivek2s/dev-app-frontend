import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SITE_ROUTES } from './site.route';


import { LoginGuard } from './../../shared/guards/login.guard';
import { AuthGuard } from './../../shared/guards/auth.guard';

const routing: Routes = [ ...SITE_ROUTES ];

export const routes: ModuleWithProviders = RouterModule.forRoot(routing, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' });

export const APP_ROUTER_PROVIDERS = [LoginGuard, AuthGuard];
