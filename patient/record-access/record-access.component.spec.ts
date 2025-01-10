import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAccessComponent } from './record-access.component';

describe('RecordAccessComponent', () => {
  let component: RecordAccessComponent;
  let fixture: ComponentFixture<RecordAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordAccessComponent]
    });
    fixture = TestBed.createComponent(RecordAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
