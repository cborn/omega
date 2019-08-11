import { TestBed } from '@angular/core/testing';

import { PageSelectionService } from './page-selection.service';

describe('PageSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageSelectionService = TestBed.get(PageSelectionService);
    expect(service).toBeTruthy();
  });
});
