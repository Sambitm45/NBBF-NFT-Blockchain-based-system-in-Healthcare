import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordComponent } from './view-record.component';

describe('ViewRecordComponent', () => {
  let component: ViewRecordComponent;
  let fixture: ComponentFixture<ViewRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecordComponent]
    });
    fixture = TestBed.createComponent(ViewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
