import { TestBed } from '@angular/core/testing';

import { CourseSelectionService } from './course-selection.service';

describe('CourseSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseSelectionService = TestBed.get(CourseSelectionService);
    expect(service).toBeTruthy();
  });
});
