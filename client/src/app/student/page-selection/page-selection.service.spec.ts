import { TestBed } from '@angular/core/testing';

import { PageSelectionService } from './page-selection.service';

describe('CourseSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageSelectionService = TestBed.get(PageSelectionService);
    expect(service).toBeTruthy();
  });
});
