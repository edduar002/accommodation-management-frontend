import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileHostComponent } from './edit-profile-host.component';

describe('EditProfileHostComponent', () => {
  let component: EditProfileHostComponent;
  let fixture: ComponentFixture<EditProfileHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
