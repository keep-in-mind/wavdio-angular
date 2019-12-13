import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {InfopageService} from './infopage.service';
import {Infopage} from '../models/infopage';

const infopage1 = new Infopage(
  'Infopage 1',
  'Content of infopage 1',
  'en'
);

const infopage2 = new Infopage(
  'Infopage 2',
  'Content of infopage 2',
  'en'
);

describe('InfopageService', () => {
  let httpTestingController: HttpTestingController;
  let infopageService: InfopageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfopageService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    infopageService = TestBed.get(InfopageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: InfopageService = TestBed.get(InfopageService);
    expect(service).toBeTruthy();
  });

  describe('#getInfopages', () => {
    beforeEach(() => {
      infopageService = TestBed.get(InfopageService);
    });

    it('should return expected heroes (called once)', () => {
      const expectedInfopages = [infopage1, infopage2];

      infopageService.getInfopages().subscribe(
        infopages => expect(infopages).toEqual(expectedInfopages),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/infopage');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedInfopages);
    });

    it('should be OK returning no infopages', () => {
      infopageService.getInfopages().subscribe(
        infopages => expect(infopages.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/infopage');

      req.flush([]);
    });

    it('should turn 404 into an empty infopages result', () => {
      infopageService.getInfopages().subscribe(
        infopages => expect(infopages.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/infopage');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected infopages (called multiple times)', () => {
      const expectedInfopages = [infopage1, infopage2];

      infopageService.getInfopages().subscribe();
      infopageService.getInfopages().subscribe();
      infopageService.getInfopages().subscribe(
        infopages => expect(infopages).toEqual(expectedInfopages),
        fail
      );

      const requests = httpTestingController.match('/api/v2/infopage');
      expect(requests.length).toEqual(3);

      requests[0].flush([]);
      requests[1].flush(infopage1);
      requests[2].flush(expectedInfopages);
    });
  });
});
