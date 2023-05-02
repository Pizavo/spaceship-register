import {TestBed} from '@angular/core/testing';

import {ComponentProducerService} from './component-producer.service';

describe('ComponentProducerService', () => {
  let service: ComponentProducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentProducerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
