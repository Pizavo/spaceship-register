import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SpaceshipFormComponent} from './components/spaceship-form/spaceship-form.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {SpaceshipOverviewComponent} from './components/spaceship-overview/spaceship-overview.component';
import {NoAuthGuard} from './guards/auth/no-auth.guard';
import {SpaceshipClearancesComponent} from './components/spaceship-clearances/spaceship-clearances.component';
import {SpaceshipPositionsComponent} from './components/spaceship-positions/spaceship-positions.component';
import {SpaceshipCrewComponent} from './components/spaceship-crew/spaceship-crew.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},
  {
    path: 'spaceship',
    children: [
      {path: '', component: SpaceshipFormComponent},
      {
        path: ':spaceship', children: [
          {path: '', component: SpaceshipFormComponent},
          {path: 'clearances', component: SpaceshipClearancesComponent},
          {path: 'clearance/:clearance', component: SpaceshipClearancesComponent},
          {path: 'positions', component: SpaceshipPositionsComponent},
          {path: 'position/:position', component: SpaceshipPositionsComponent},
          {path: 'crew', component: SpaceshipCrewComponent},
          {path: 'member/:member', component: SpaceshipCrewComponent},
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'overview',
    component: SpaceshipOverviewComponent,
    canActivate: [AuthGuard],
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule {}
