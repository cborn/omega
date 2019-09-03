import { TestBed } from '@angular/core/testing';

import { LessonPageBuilderService} from './lesson-page-builder.service';

describe('LessonBuilderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonPageBuilderService = TestBed.get(LessonPageBuilderService);
    expect(service).toBeTruthy();
  });
});
