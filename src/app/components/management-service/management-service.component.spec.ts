import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementServiceComponent } from './management-service.component';

describe('ManagementServiceComponent', () => {
  let component: ManagementServiceComponent;
  let fixture: ComponentFixture<ManagementServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
