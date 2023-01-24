import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Injectable({
              providedIn: 'root',
            })
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/overview']);
    return false;
  }

}
