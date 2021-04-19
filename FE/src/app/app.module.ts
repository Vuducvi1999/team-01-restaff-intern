import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './lib/environments/environment';
import { AppConfig } from './lib/environments/config/appConfig';
import { FilesModule } from './components/files/files.module';
import { ActivatedRouteSnapshot } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'BASE_URL', useValue: environment.host },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfig],
      useFactory: (appConfigService: AppConfig) => () =>
        appConfigService.load(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
