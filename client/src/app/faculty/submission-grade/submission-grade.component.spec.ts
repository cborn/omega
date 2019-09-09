import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionGradeComponent } from './submission-grade.component';

describe('SubmissionGradeComponent', () => {
  let component: SubmissionGradeComponent;
  let fixture: ComponentFixture<SubmissionGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
