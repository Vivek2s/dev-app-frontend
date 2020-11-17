import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/site/site.module').then(m => m.SiteModule)
    }
]