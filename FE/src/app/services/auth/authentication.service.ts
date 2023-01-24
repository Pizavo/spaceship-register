import {Injectable} from '@angular/core';

@Injectable({
              providedIn: 'root',
            })
export class AuthenticationService {
  constructor() {
    this._token = localStorage.getItem('token') ?? '';
  }

  private _token: string;

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;

    if (token === '') {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }
}
