import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {LoggingService} from './logging.service';

describe('LoggingService', () => {
  let httpTestingController: HttpTestingController;
  let loggingService: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoggingService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    loggingService = TestBed.get(LoggingService);
  });

  it('should be created', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    expect(service).toBeTruthy();
  });
});
