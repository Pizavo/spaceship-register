import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipClearancesComponent} from './spaceship-clearances.component';

describe('SpaceshipClearancesComponent', () => {
  let component: SpaceshipClearancesComponent;
  let fixture: ComponentFixture<SpaceshipClearancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipClearancesComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipClearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
