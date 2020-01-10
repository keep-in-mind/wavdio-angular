import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {ExpositionService} from './exposition.service';
import {Comment} from '../models/comment';
import {Exposition} from '../models/exposition';
import {ExpositionContent} from '../models/exposition-content';
import {Image} from '../models/image';
import {Like} from '../models/like';
import {View} from '../models/view';

const bestOfLeonardoDaVinci = new Exposition(
  '',
  true,
  10,
  'note',
  new Image('best_of_leonardo_da_vinci.jpg', 'alt'),
  [
    new Like(new Date('2019-01-21T10:00:00.000Z')),
    new Like(new Date('2019-01-21T11:00:00.000Z')),
    new Like(new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new View(new Date('2019-01-21T10:00:00.000Z')),
    new View(new Date('2019-01-21T11:00:00.000Z')),
    new View(new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new Comment('Comment 1', new Date('2019-01-21T10:00:00.000Z')),
    new Comment('Comment 2', new Date('2019-01-21T11:00:00.000Z')),
    new Comment('Comment 3', new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new ExpositionContent(
      'en',
      'Best of Leonardo Da Vinci',
      'The most popular artworks of Lenoardo Da Vinci'),
    new ExpositionContent(
      'de',
      'Best of Leonardo Da Vinci',
      'Die berühmtesten Kunstwerke von Lenoardo Da Vinci')
  ]
);

const bestOfSalvadorDali = new Exposition(
  '',
  true,
  20,
  'note',
  new Image('best_of_salvador_dali.jpg', 'alt'),
  [
    new Like(new Date('2019-01-21T10:00:00.000Z')),
    new Like(new Date('2019-01-21T11:00:00.000Z')),
    new Like(new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new View(new Date('2019-01-21T10:00:00.000Z')),
    new View(new Date('2019-01-21T11:00:00.000Z')),
    new View(new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new Comment('Comment 1', new Date('2019-01-21T10:00:00.000Z')),
    new Comment('Comment 2', new Date('2019-01-21T11:00:00.000Z')),
    new Comment('Comment 3', new Date('2019-01-21T12:00:00.000Z'))
  ],
  [
    new ExpositionContent(
      'en',
      'Best of Salvador Dali',
      'The most popular artworks of Salvador Dali'),
    new ExpositionContent(
      'de',
      'Best of Salvador Dali',
      'Die berühmtesten Kunstwerke von Salvador Dali')
  ]
);

describe('ExpositionService', () => {
  let httpTestingController: HttpTestingController;
  let expositionService: ExpositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpositionService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    expositionService = TestBed.get(ExpositionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ExpositionService = TestBed.get(ExpositionService);
    expect(service).toBeTruthy();
  });

  describe('#getExpositions', () => {
    beforeEach(() => {
      expositionService = TestBed.get(ExpositionService);
    });

    it('should return expected heroes (called once)', () => {
      const expectedExpositions = [bestOfLeonardoDaVinci, bestOfSalvadorDali];

      expositionService.getExpositions().subscribe(
        expositions => expect(expositions).toEqual(expectedExpositions),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exposition');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedExpositions);
    });

    it('should be OK returning no expositions', () => {
      expositionService.getExpositions().subscribe(
        expositions => expect(expositions.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exposition');

      req.flush([]);
    });

    it('should turn 404 into an empty expositions result', () => {
      expositionService.getExpositions().subscribe(
        expositions => expect(expositions.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exposition');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected expositions (called multiple times)', () => {
      const expectedExpositions = [bestOfLeonardoDaVinci, bestOfSalvadorDali];

      expositionService.getExpositions().subscribe();
      expositionService.getExpositions().subscribe();
      expositionService.getExpositions().subscribe(
        expositions => expect(expositions).toEqual(expectedExpositions),
        fail
      );

      const requests = httpTestingController.match('/api/v2/exposition');
      expect(requests.length).toEqual(3);

      requests[0].flush([]);
      requests[1].flush(bestOfLeonardoDaVinci);
      requests[2].flush(expectedExpositions);
    });
  });
});
