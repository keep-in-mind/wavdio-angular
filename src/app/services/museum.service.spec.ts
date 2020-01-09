import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {MuseumService} from './museum.service';
import {Image} from '../models/image';
import {Museum} from '../models/museum';
import {MuseumContent} from '../models/museum-content';

const louvre = new Museum(
  new Image('louvre.jpg', 'Louvre'),
  [
    new MuseumContent(
      'en',
      'Louvre',
      'Welcome to the Louvre!',
      new Image('site_plan_en.png', 'Site Plan'),
      'terms of use...',
      'privacy terms...'
    ),
    new MuseumContent(
      'de',
      'Louvre',
      'Willkommen im Louvre!',
      new Image('site_plan_de.png', 'Lageplan'),
      'Nutzungsbedingungen...',
      'Datenschutzrichtlinien...'
    )
  ]
);

const germanMuseum = new Museum(
  new Image('german_museum.jpg', 'German Museum'),
  [
    new MuseumContent(
      'en',
      'German Museum',
      'Welcome to the German Museum!',
      new Image('site_plan_en.png', 'Site Plan'),
      'terms of use...',
      'privacy terms...'
    ),
    new MuseumContent(
      'de',
      'Deutsches Museum',
      'Willkommen im Deutschen Museum!',
      new Image('site_plan_de.png', 'Lageplan'),
      'Nutzungsbedingungen...',
      'Datenschutzrichtlinien...'
    )
  ]
);

describe('MuseumService', () => {
  let httpTestingController: HttpTestingController;
  let museumService: MuseumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MuseumService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    museumService = TestBed.get(MuseumService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: MuseumService = TestBed.get(MuseumService);
    expect(service).toBeTruthy();
  });

  describe('#getMuseums', () => {
    beforeEach(() => {
      museumService = TestBed.get(MuseumService);
    });

    it('should return expected heroes (called once)', () => {
      const expectedMuseums = [louvre, germanMuseum];

      museumService.getMuseums().subscribe(
        museums => expect(museums).toEqual(expectedMuseums),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/museum');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedMuseums);
    });

    it('should be OK returning no museums', () => {
      museumService.getMuseums().subscribe(
        museums => expect(museums.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/museum');

      req.flush([]);
    });

    it('should turn 404 into an empty museums result', () => {
      museumService.getMuseums().subscribe(
        museums => expect(museums.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/museum');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected museums (called multiple times)', () => {
      const expectedMuseums = [louvre, germanMuseum];

      museumService.getMuseums().subscribe();
      museumService.getMuseums().subscribe();
      museumService.getMuseums().subscribe(
        museums => expect(museums).toEqual(expectedMuseums),
        fail
      );

      const requests = httpTestingController.match('/api/v2/museum');
      expect(requests.length).toEqual(3);

      requests[0].flush([]);
      requests[1].flush(louvre);
      requests[2].flush(expectedMuseums);
    });
  });
});
