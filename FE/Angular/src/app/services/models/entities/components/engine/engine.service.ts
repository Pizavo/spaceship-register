import {Injectable} from '@angular/core';
import {Engine} from '../../../../../models/entities/components/engine';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class EngineService extends BaseService<Engine> {
  constructor() {
    super('/engine');
  }
}
