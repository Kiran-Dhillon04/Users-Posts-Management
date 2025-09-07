import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPerUserComponent } from './posts-per-user.component';

describe('PostsPerUserComponent', () => {
  let component: PostsPerUserComponent;
  let fixture: ComponentFixture<PostsPerUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsPerUserComponent]
    });
    fixture = TestBed.createComponent(PostsPerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
