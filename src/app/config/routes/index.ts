import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SITE_ROUTES } from './site.route';
const routing: Routes = [ ...SITE_ROUTES ];

export const routes: ModuleWithProviders = RouterModule.forRoot(routing, { scrollPositionRestoration: 'enabled' });

export const APP_ROUTER_PROVIDERS = [];
