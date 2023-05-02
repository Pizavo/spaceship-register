import {Injectable} from '@angular/core';
import {LifeSupportUnit} from '../../../../../models/entities/components/life-support-unit';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class LifeSupportUnitService extends BaseService<LifeSupportUnit> {
  constructor() {
    super('/life-support-unit');
  }
}
