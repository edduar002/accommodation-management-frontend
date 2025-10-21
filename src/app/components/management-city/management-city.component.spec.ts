import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCityComponent } from './management-city.component';

describe('ManagementCityComponent', () => {
  let component: ManagementCityComponent;
  let fixture: ComponentFixture<ManagementCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
