import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonBuilderComponent } from './lesson-builder.component';

describe('LessonBuilderComponent', () => {
  let component: LessonBuilderComponent;
  let fixture: ComponentFixture<LessonBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
