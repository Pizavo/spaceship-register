import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotifierModule} from 'angular-notifier';
import {MainComponent} from './components/main/main.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SpaceshipFormComponent} from './components/spaceship-form/spaceship-form.component';
import {SpaceshipOverviewComponent} from './components/spaceship-overview/spaceship-overview.component';
import {AppInjector} from './services/appInjector';
import {SpaceshipClearancesComponent} from './components/spaceship-clearances/spaceship-clearances.component';
import {SpaceshipPositionsComponent} from './components/spaceship-positions/spaceship-positions.component';
import {SpaceshipCrewComponent} from './components/spaceship-crew/spaceship-crew.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      MainComponent,
      NavbarComponent,
      LoginComponent,
      SignupComponent,
      PageNotFoundComponent,
      SpaceshipFormComponent,
      SpaceshipOverviewComponent,
      SpaceshipClearancesComponent,
      SpaceshipPositionsComponent,
      SpaceshipCrewComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      NotifierModule,
      ReactiveFormsModule,
      HttpClientModule,
      TranslateModule.forRoot(
        {
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

