import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPageBuilderComponent } from './lesson-page-builder.component';

describe('LessonPageBuilderComponent', () => {
  let component: LessonPageBuilderComponent;
  let fixture: ComponentFixture<LessonPageBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPageBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
