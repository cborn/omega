import { TestBed } from '@angular/core/testing';

import { LessonBuilderService} from './lesson-builder.service';

describe('LessonBuilderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonBuilderService = TestBed.get(LessonBuilderService);
    expect(service).toBeTruthy();
  });
});
