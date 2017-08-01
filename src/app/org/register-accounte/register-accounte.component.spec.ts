import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAcounteComponent } from './register-accounte.component';

describe('CreateAcounteComponent', () => {
  let component: RegisterAcounteComponent;
  let fixture: ComponentFixture<RegisterAcounteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAcounteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAcounteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
