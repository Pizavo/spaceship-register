import {Injectable} from '@angular/core';
import {Person} from '../../../../../models/entities/personnel/person';
import {BaseService, ServiceOptions} from '../../../base-service';
import {Observable} from 'rxjs';

@Injectable({
              providedIn: 'root',
            })
export class PersonService extends BaseService<Person> {
  constructor() {
    super('/person');
  }

  public listFree(options: ServiceOptions): Observable<Person[]> {
    return this.handleError(this.http.get<Person[]>(`${this.url}/list/free`, {headers: this.getAuthorizationHeader()}), options);
  }
}
