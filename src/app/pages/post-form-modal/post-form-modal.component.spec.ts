import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormModalComponent } from './post-form-modal.component';

describe('PostFormModalComponent', () => {
  let component: PostFormModalComponent;
  let fixture: ComponentFixture<PostFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFormModalComponent]
    });
    fixture = TestBed.createComponent(PostFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
