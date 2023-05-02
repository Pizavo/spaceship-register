import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipComponentsOverviewComponent} from './spaceship-components-overview.component';

describe('SpaceshipComponentsOverviewComponent', () => {
  let component: SpaceshipComponentsOverviewComponent;
  let fixture: ComponentFixture<SpaceshipComponentsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipComponentsOverviewComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipComponentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
