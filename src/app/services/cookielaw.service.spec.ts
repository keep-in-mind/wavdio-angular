import {TestBed} from '@angular/core/testing';

import {CookielawService} from './cookielaw.service';

describe('CookielawService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookielawService = TestBed.get(CookielawService);
    expect(service).toBeTruthy();
  });
});
