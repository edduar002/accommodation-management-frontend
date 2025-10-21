import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAccommodationsComponent } from './management-accommodations.component';

describe('ManagementAccommodationsComponent', () => {
  let component: ManagementAccommodationsComponent;
  let fixture: ComponentFixture<ManagementAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementAccommodationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
