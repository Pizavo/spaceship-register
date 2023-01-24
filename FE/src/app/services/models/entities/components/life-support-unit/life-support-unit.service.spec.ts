import {TestBed} from '@angular/core/testing';

import {LifeSupportUnitService} from './life-support-unit.service';

describe('LifeSupportUnitService', () => {
  let service: LifeSupportUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeSupportUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
