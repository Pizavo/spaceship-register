import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipOverviewComponent} from './spaceship-overview.component';

describe('SpaceshipOverviewComponent', () => {
  let component: SpaceshipOverviewComponent;
  let fixture: ComponentFixture<SpaceshipOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipOverviewComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
