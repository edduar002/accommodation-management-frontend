import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHostComponent } from './login-host.component';

describe('LoginHostComponent', () => {
  let component: LoginHostComponent;
  let fixture: ComponentFixture<LoginHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
