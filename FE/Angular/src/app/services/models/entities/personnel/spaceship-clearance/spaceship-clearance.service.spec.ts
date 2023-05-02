import {TestBed} from '@angular/core/testing';

import {SpaceshipClearanceService} from './spaceship-clearance.service';

describe('SpaceshipClearanceService', () => {
  let service: SpaceshipClearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceshipClearanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
