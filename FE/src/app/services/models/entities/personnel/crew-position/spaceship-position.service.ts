import {Injectable} from '@angular/core';
import {SpaceshipPosition} from '../../../../../models/entities/personnel/spaceship-position';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class SpaceshipPositionService extends BaseService<SpaceshipPosition> {
  constructor() {
    super('/spaceship-position');
  }
}
