import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueNotAttendedComponent } from './queue.notattended.component';

describe('QueueNotAttendedComponent', () => {
  let component: QueueNotAttendedComponent;
  let fixture: ComponentFixture<QueueNotAttendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueNotAttendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueNotAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
