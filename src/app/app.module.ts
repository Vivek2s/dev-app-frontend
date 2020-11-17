import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { SiteModule } from './site/site.module';
import { routes, APP_ROUTER_PROVIDERS } from './config/routes/index';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule.forRoot(),
    SharedModule,
    routes,
    SiteModule
  ],
  providers: [ APP_ROUTER_PROVIDERS ],
  bootstrap: [AppComponent]
})
export class AppModule { }
