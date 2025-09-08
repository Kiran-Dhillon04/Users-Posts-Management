import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartsComponent } from './user-charts.component';

describe('UserChartsComponent', () => {
  let component: UserChartsComponent;
  let fixture: ComponentFixture<UserChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChartsComponent]
    });
    fixture = TestBed.createComponent(UserChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
