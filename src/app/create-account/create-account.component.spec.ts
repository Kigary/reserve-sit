import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistreAccountComponent } from './create-account.component';

describe('UserRegistreAccountComponent', () => {
  let component: UserRegistreAccountComponent;
  let fixture: ComponentFixture<UserRegistreAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistreAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
