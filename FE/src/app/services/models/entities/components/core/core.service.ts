import {Injectable} from '@angular/core';
import {BaseService} from '../../../base-service';
import {Core} from '../../../../../models/entities/components/core';

@Injectable({
              providedIn: 'root',
            })
export class CoreService extends BaseService<Core> {
  constructor() {
    super('/core');
  }
}
