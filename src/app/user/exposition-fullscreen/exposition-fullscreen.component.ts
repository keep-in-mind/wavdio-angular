import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';
import {ExhibitContent} from "../../models/exhibit-content";
import {ExpositionContent} from "../../models/exposition-content";

@Component({
  selector: 'app-exposition-fullscreen',
  templateUrl: './exposition-fullscreen.component.html',
  styleUrls: ['./exposition-fullscreen.component.css']
})
export class ExpositionFullscreenComponent implements OnInit {

  exposition: Exposition;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private expositionService: ExpositionService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const expositionId = params.id;

      this.expositionService.getExposition(expositionId).subscribe(exposition => {
        this.exposition = exposition;
      });
    });
  }

  getExpositionContent(lang: String): ExpositionContent {

    /* return localized content */

    for (const content of this.exposition.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exposition */

    console.error(`No content available for ${lang}`);
  }
}
