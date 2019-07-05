import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonQuestionComponent } from './lesson-question.component';

describe('LessonQuestionComponent', () => {
  let component: LessonQuestionComponent;
  let fixture: ComponentFixture<LessonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
