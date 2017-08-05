import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitDialogComponent } from './sit-dialog.component';

describe('SitDialogComponent', () => {
  let component: SitDialogComponent;
  let fixture: ComponentFixture<SitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
