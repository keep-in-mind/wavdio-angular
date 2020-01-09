import {TestBed} from '@angular/core/testing';

import {MediaplayerService} from './mediaplayer.service';

describe('MediaplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaplayerService = TestBed.get(MediaplayerService);
    expect(service).toBeTruthy();
  });
});
