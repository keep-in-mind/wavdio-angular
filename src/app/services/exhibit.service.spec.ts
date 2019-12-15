import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ExhibitService} from './exhibit.service';
import {Exhibit} from '../models/exhibit';
import {Like} from '../models/like';
import {View} from '../models/view';
import {Comment} from '../models/comment';
import {ExhibitContent} from '../models/exhibit-content';
import {Image} from '../models/image';
import {Audio} from '../models/audio';
import {Video} from '../models/video';

const monaLisa = new Exhibit(
  '',
  true,
  100,
  'note',
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
    new ExhibitContent(
      'en',
      'Mona Lisa',
      'One of the most popular artworks in the world',
      null,
      [
        new Image('mona_lisa_1_en.jpg', 'alt'),
        new Image('mona_lisa_2_en.jpg', 'alt')
      ],
      [
        new Audio('mona_lisa_en.mp3', 'audio/mpeg'),
        new Audio('mona_lisa_en.wav', 'audio/wav')
      ],
      [
        new Video('mona_lisa_en.mp4', 'video/mp4', 'video transcript'),
        new Video('mona_lisa_en.ogg', 'video/ogg', 'video transcript')
      ]
    ),
    new ExhibitContent(
      'de',
      'Mona Lisa',
      'Eines der berühmtesten Kunstwerke der Welt',
      null,
      [
        new Image('mona_lisa_1_de.jpg', 'alt'),
        new Image('mona_lisa_2_de.jpg', 'alt')
      ],
      [
        new Audio('mona_lisa_de.mp3', 'audio/mpeg'),
        new Audio('mona_lisa_de.wav', 'audio/wav')
      ],
      [
        new Video('mona_lisa_de.mp4', 'video/mp4', 'video transcript'),
        new Video('mona_lisa_de.ogg', 'video/ogg', 'video transcript')
      ]
    )
  ]
);

const thePersistenceOfMemory = new Exhibit(
  '',
  true,
  200,
  'note',
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
    new ExhibitContent(
      'en',
      'The Persistence of Memory',
      'One of the most popular artworks in the world',
      null,
      [
        new Image('the_persistence_of_memory_1_en.jpg', 'alt'),
        new Image('the_persistence_of_memory_2_en.jpg', 'alt')
      ],
      [
        new Audio('the_persistence_of_memory_en.mp3', 'audio/mpeg'),
        new Audio('the_persistence_of_memory_en.wav', 'audio/wav')
      ],
      [
        new Video('the_persistence_of_memory_en.mp4', 'video/mp4', 'video transcript'),
        new Video('the_persistence_of_memory_en.ogg', 'video/ogg', 'video transcript')
      ]
    ),
    new ExhibitContent(
      'de',
      'Die Beständigkeit der Erinnerung',
      'Eines der berühmtesten Kunstwerke der Welt',
      null,
      [
        new Image('the_persistence_of_memory_1_de.jpg', 'alt'),
        new Image('the_persistence_of_memory_2_de.jpg', 'alt')
      ],
      [
        new Audio('the_persistence_of_memory_de.mp3', 'audio/mpeg'),
        new Audio('the_persistence_of_memory_de.wav', 'audio/wav')
      ],
      [
        new Video('the_persistence_of_memory_de.mp4', 'video/mp4', 'video transcript'),
        new Video('the_persistence_of_memory_de.ogg', 'video/ogg', 'video transcript')
      ]
    )
  ]
);

describe('ExhibitService', () => {
  let httpTestingController: HttpTestingController;
  let exhibitService: ExhibitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExhibitService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    exhibitService = TestBed.get(ExhibitService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ExhibitService = TestBed.get(ExhibitService);
    expect(service).toBeTruthy();
  });

  describe('#getExhibits', () => {
    beforeEach(() => {
      exhibitService = TestBed.get(ExhibitService);
    });

    it('should return expected exhibits (called once)', () => {
      const expectedExhibits = [monaLisa, thePersistenceOfMemory];

      exhibitService.getExhibits().subscribe(
        exhibits => expect(exhibits).toEqual(expectedExhibits),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exhibit');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedExhibits);
    });

    it('should be OK returning no exhibits', () => {
      exhibitService.getExhibits().subscribe(
        exhibits => expect(exhibits.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exhibit');

      req.flush([]);
    });

    it('should turn 404 into an empty exhibits result', () => {
      exhibitService.getExhibits().subscribe(
        exhibits => expect(exhibits.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne('/api/v2/exhibit');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected exhibits (called multiple times)', () => {
      const expectedExhibits = [monaLisa, thePersistenceOfMemory];

      exhibitService.getExhibits().subscribe();
      exhibitService.getExhibits().subscribe();
      exhibitService.getExhibits().subscribe(
        exhibits => expect(exhibits).toEqual(expectedExhibits),
        fail
      );

      const requests = httpTestingController.match('/api/v2/exhibit');
      expect(requests.length).toEqual(3);

      requests[0].flush([]);
      requests[1].flush(monaLisa);
      requests[2].flush(expectedExhibits);
    });
  });
});
