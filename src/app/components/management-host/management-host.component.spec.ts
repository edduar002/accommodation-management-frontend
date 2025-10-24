import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementHostComponent } from './management-host.component';

describe('ManagementHostComponent', () => {
  let component: ManagementHostComponent;
  let fixture: ComponentFixture<ManagementHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
