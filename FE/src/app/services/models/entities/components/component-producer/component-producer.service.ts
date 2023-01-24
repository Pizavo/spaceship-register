import {Injectable} from '@angular/core';
import {ComponentProducer} from '../../../../../models/entities/components/component-producer';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class ComponentProducerService extends BaseService<ComponentProducer> {
  constructor() {
    super('/component-producer');
  }
}
