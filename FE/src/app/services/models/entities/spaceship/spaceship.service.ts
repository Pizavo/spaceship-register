import {Injectable} from '@angular/core';
import {Spaceship} from '../../../../models/entities/spaceship';
import {BaseService, ServiceOptions} from '../../base-service';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  })
export class SpaceshipService extends BaseService<Spaceship> {
  constructor() {
    super('/spaceship');
  }

  public listByOwner(): Observable<Spaceship[]> {
    const options: ServiceOptions = {
      errorMessages: {
        default: 'services.spaceship.error.spaceships.load',
      },
    };

    return this.handleError(this.http.get<Spaceship[]>(`${this.url}/list/user`, {headers: this.getAuthorizationHeader()}), options);
  }
}
