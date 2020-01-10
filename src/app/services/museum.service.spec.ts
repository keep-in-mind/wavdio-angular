import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {MuseumService} from './museum.service';
import {Image} from '../models/image';
import {Museum} from '../models/museum';
import {MuseumContent} from '../models/museum-content';

const louvre = new Museum(
  [
    new MuseumContent(
      'en',
      'Louvre',
      'The Louvre was built in ...',
      'Welcome to the Louvre!',
      'terms of use...',
      'privacy terms...',
      new Image('louvre_logo_en.jpg', 'Louvre Logo'),
      new Image('louvre_image_de.jpg', 'Louvre Image'),
      new Image('site_plan_en.png', 'Site Plan')
    ),
    new MuseumContent(
      'de',
      'Louvre',
      'Willkommen im Louvre!',
      'Das Louvre wurde im Jahre ...',
      'Nutzungsbedingungen...',
      'Datenschutzrichtlinien...',
      new Image('louvre_logo_de.png', 'Louvre Logo'),
      new Image('louvre_image_de.png', 'Louvre Bild'),
      new Image('site_plan_de.png', 'Lageplan'),
    )
  ]
);

const germanMuseum = new Museum(
  [
    new MuseumContent(
      'en',
      'German Museum',
      'The German Museum was built in ...',
      'Welcome to the German Museum!',
      'terms of use...',
      'privacy terms...',
      new Image('german_museum_logo_en.jpg', 'German Museum Logo'),
      new Image('german_museum_image_de.jpg', 'German Museum Image'),
      new Image('site_plan_en.png', 'Site Plan')
    ),
    new MuseumContent(
      'de',
      'Deutsches Museum',
      'Willkommen im Deutschen Museum!',
      'Das Deutsche Museum wurde im Jahre ...',
      'Nutzungsbedingungen...',
      'Datenschutzrichtlinien...',
      new Image('german_museum_logo_de.png', 'Deutsches Museum Logo'),
      new Image('german_museum_image_de.png', 'Deutsches Museum Bild'),
      new Image('site_plan_de.png', 'Lageplan'),
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
