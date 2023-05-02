import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipPositionsComponent} from './spaceship-positions.component';

describe('SpaceshipPositionsComponent', () => {
  let component: SpaceshipPositionsComponent;
  let fixture: ComponentFixture<SpaceshipPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipPositionsComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
