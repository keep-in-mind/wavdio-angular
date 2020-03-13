import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-siteplan-fullscreen',
  templateUrl: './siteplan-fullscreen.component.html',
  styleUrls: ['./siteplan-fullscreen.component.css']
})
export class SiteplanFullscreenComponent implements OnInit {

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private museumService: MuseumService) {
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(museums => {
      this.museum = museums[0];
    });
  }

  getMuseumContent(lang: String): MuseumContent {

    /* return localized content */

    for (const content of this.museum.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing museum */

    console.error(`No content available for ${lang}`);
  }
}