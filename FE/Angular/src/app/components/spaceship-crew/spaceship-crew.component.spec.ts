import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipCrewComponent} from './spaceship-crew.component';

describe('SpaceshipCrewComponent', () => {
  let component: SpaceshipCrewComponent;
  let fixture: ComponentFixture<SpaceshipCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipCrewComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
