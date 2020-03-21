import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {Exposition} from '../../../../models/exposition';
import {Museum} from '../../../../models/museum';
import {ExpositionService} from '../../../../services/exposition.service';
import {MuseumService} from '../../../../services/museum.service';
import {Breadcrumb} from '../../../../models/breadcrumb';

@Component({
  selector: 'app-admin-museum-statistics',
  templateUrl: './admin-museum-statistics.component.html',
  styleUrls: ['./admin-museum-statistics.component.css']
})
export class AdminMuseumStatisticsComponent implements OnInit {

  expositions: Exposition[];

  breadcrumbs = [
    new Breadcrumb('Statistiken')
  ];

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
