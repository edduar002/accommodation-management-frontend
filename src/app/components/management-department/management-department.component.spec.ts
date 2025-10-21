import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDepartmentComponent } from './management-department.component';

describe('ManagementDepartmentComponent', () => {
  let component: ManagementDepartmentComponent;
  let fixture: ComponentFixture<ManagementDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
