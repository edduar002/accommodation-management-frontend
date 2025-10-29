import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseCommentComponent } from './response-comment.component';

describe('ResponseCommentComponent', () => {
  let component: ResponseCommentComponent;
  let fixture: ComponentFixture<ResponseCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
