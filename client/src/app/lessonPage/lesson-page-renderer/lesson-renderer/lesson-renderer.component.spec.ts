import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonRendererComponent } from './lesson-renderer.component';

describe('LessonRendererComponent', () => {
  let component: LessonRendererComponent;
  let fixture: ComponentFixture<LessonRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
