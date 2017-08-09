import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterAccountComponent } from './create-account.component';

describe('UserRegisterAccountComponent', () => {
  let component: UserRegisterAccountComponent;
  let fixture: ComponentFixture<UserRegisterAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
