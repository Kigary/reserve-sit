import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcounteComponent } from './create-acounte.component';

describe('CreateAcounteComponent', () => {
  let component: CreateAcounteComponent;
  let fixture: ComponentFixture<CreateAcounteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcounteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcounteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
