import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccommodationComponent } from './detail-accommodation.component';

describe('DetailAccommodationComponent', () => {
  let component: DetailAccommodationComponent;
  let fixture: ComponentFixture<DetailAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAccommodationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
