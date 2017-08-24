import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatimepickerComponent } from './datatimepicker.component';

describe('DatatimepickerComponent', () => {
  let component: DatatimepickerComponent;
  let fixture: ComponentFixture<DatatimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
