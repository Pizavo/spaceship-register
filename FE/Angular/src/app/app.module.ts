import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotifierModule} from 'angular-notifier';
import {MainComponent} from './components/main/main.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  SpaceshipComponentsOverviewComponent,
} from './components/spaceship-components-overview/spaceship-components-overview.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
      SpaceshipComponentsOverviewComponent,
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
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      BrowserAnimationsModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      NgbModule,
    ],
    providers: [
      {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    ],
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

