import {Injectable} from '@angular/core';
import {BaseService, ServiceOptions} from '../../base-service';
import {User} from '../../../../models/entities/user';
import {AuthenticationRequest} from '../../../../models/http/requests/authentication-request';
import {AuthenticationResponse} from '../../../../models/http/responses/authentication-response';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  })
export class UserService extends BaseService<User> {
  constructor() {
    super('/user');
  }

  public authenticate(authenticationRequest: AuthenticationRequest): void {
    const options: ServiceOptions = {
      errorMessages: {
        default: 'components.login.error.default',
        500: 'components.login.error.badCredentials',
      },
    };

    this.handleError(this.http.post<AuthenticationResponse>(`${this.url}/authenticate`, authenticationRequest), options).subscribe(
      (response) => {
        this.authService.token = response.token;
        this.router.navigate(['/overview']);
      });
  }

  public register(user: User): Observable<AuthenticationResponse> {
    const options: ServiceOptions = {
      errorMessages: {
        default: 'components.signup.error.default',
      },
    };

    return this.handleError(this.http.post<AuthenticationResponse>(`${this.url}/register`, user), options);
  }

  public logout() {
    this.authService.token = '';
    this.router.navigate(['/']);
  }
}
