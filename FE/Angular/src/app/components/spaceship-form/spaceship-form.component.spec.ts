import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceshipFormComponent} from './spaceship-form.component';

describe('SpaceshipFormComponent', () => {
  let component: SpaceshipFormComponent;
  let fixture: ComponentFixture<SpaceshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           declarations: [SpaceshipFormComponent],
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(SpaceshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
