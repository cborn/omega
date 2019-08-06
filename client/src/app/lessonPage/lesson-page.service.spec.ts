import { TestBed } from '@angular/core/testing';

import { LessonPageService } from './lesson-page.service';

describe('LessonPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonPageService = TestBed.get(LessonPageService);
    expect(service).toBeTruthy();
  });
});
