import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logout method', () => {
    expect(typeof component.logout).toBe('function');
  });

});
