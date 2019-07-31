import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAttendedComponent } from './queue.attended.component';

describe('QueueAttendedComponent', () => {
  let component: QueueAttendedComponent;
  let fixture: ComponentFixture<QueueAttendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueAttendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
