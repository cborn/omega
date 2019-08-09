import { TestBed } from '@angular/core/testing';

import { AuthenticatedHttpServiceService } from './authenticated-http-service.service';

describe('AuthenticatedHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticatedHttpServiceService = TestBed.get(AuthenticatedHttpServiceService);
    expect(service).toBeTruthy();
  });
});
