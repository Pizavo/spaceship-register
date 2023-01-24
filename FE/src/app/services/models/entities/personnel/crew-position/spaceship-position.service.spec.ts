import {TestBed} from '@angular/core/testing';

import {SpaceshipPositionService} from './spaceship-position.service';

describe('SpaceshipPositionService', () => {
  let service: SpaceshipPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceshipPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
