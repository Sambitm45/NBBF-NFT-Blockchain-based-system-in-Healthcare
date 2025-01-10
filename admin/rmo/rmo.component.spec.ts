import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmoComponent } from './rmo.component';

describe('RmoComponent', () => {
  let component: RmoComponent;
  let fixture: ComponentFixture<RmoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmoComponent]
    });
    fixture = TestBed.createComponent(RmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
