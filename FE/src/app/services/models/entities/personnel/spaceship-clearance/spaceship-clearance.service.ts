import {Injectable} from '@angular/core';
import {SpaceshipClearance} from '../../../../../models/entities/personnel/spaceship-clearance';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class SpaceshipClearanceService extends BaseService<SpaceshipClearance> {
  constructor() {
    super('/spaceship-clearance');
  }
}
