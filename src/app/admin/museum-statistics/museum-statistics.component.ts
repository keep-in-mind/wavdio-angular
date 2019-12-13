import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {MuseumService} from '../../services/museum.service';
import {ExpositionService} from '../../services/exposition.service';
import {Museum} from '../../models/museum';
import {Exposition} from '../../models/exposition';

@Component({
  selector: 'app-statistics',
  templateUrl: './museum-statistics.component.html',
  styleUrls: ['./museum-statistics.component.css']
})
export class MuseumStatisticsComponent implements OnInit {

  expositions: Exposition[];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService,
    private expositionService: ExpositionService,
  ) {
  }

  ngOnInit() {

    /* get museum */

    this.museumService.getMuseums().subscribe(museums => {
      let museum: Museum;

      museum = museums[0];

      /* get all expositions from museum */

      this.expositionService.getExpositions().subscribe(expositions => {
        this.expositions = expositions.filter(exposition => exposition.museum === museum._id);
      });
    });
  }
}
