import {catchError, EMPTY, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {AppInjector} from '../appInjector';
import {AuthenticationService} from '../auth/authentication.service';
import {Router} from '@angular/router';

export class BaseService<T> {
  protected readonly http: HttpClient;
  protected readonly router: Router;
  protected readonly notifier: NotifierService;
  protected readonly translate: TranslateService;
  protected readonly authService: AuthenticationService;
  protected readonly url: string;

  constructor(
    url: string,
  ) {
    this.http = AppInjector.injector.get(HttpClient);
    this.router = AppInjector.injector.get(Router);
    this.notifier = AppInjector.injector.get(NotifierService);
    this.translate = AppInjector.injector.get(TranslateService);
    this.authService = AppInjector.injector.get(AuthenticationService);

    this.url = environment.api.url + url;
  }

  list(options?: ServiceOptions): Observable<T[]> {
    return this.handleError(this.http.get<T[]>(`${this.url}/list`, {headers: this.getAuthorizationHeader()}), options);
  }

  get(id: string, options?: ServiceOptions): Observable<T> {
    return this.handleError(this.http.get<T>(`${this.url}/${id}`, {headers: this.getAuthorizationHeader()}), options);
  }

  create(entity: T, options?: ServiceOptions): Observable<T> {
    return this.handleError(this.http.post<T>(this.url, entity, {headers: this.getAuthorizationHeader()}), options);
  }

  update(entity: T, options?: ServiceOptions): Observable<T> {
    return this.handleError(this.http.patch<T>(this.url, entity, {headers: this.getAuthorizationHeader()}), options);
  }

  delete(id: string, options?: ServiceOptions): Observable<T> {
    return this.handleError(this.http.delete<T>(`${this.url}/${id}`, {headers: this.getAuthorizationHeader()}), options);
  }

  protected handleError<R>(observable: Observable<R>, options?: ServiceOptions): Observable<R> {
    return observable.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.authService.token = '';
          this.router.navigate(['/']);
        }

        console.error(error);
        this.notifyError(error, options);

        return EMPTY;
      }));
  }

  protected getAuthorizationHeader(): HttpHeaders | undefined {
    if (!this.authService.isAuthenticated) {
      return undefined;
    }

    return new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
  }

  private async notifyError(error: HttpErrorResponse, options?: ServiceOptions): Promise<void> {
    const errorMessageId = options?.errorMessages?.[error.status as keyof ServiceOptions['errorMessages']]
      ?? options?.errorMessages?.default
      ?? `default.error.${error.status}`;

    this.translate.get(errorMessageId).subscribe((errorMessage: string) => {
      if (errorMessage.includes('default.error.')) {
        this.translate.get('default.error.default')
            .subscribe((errorMessage1: string) => this.notifier.notify('error', errorMessage1));
      } else {
        this.notifier.notify('error', errorMessage);
      }
    });
  }
}

export interface ServiceOptions {
  errorMessages?: {
    default?: string,
    500?: string,
    400?: string,
    401?: string,
  },
}
