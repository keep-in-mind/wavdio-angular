import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';

import {Infopage} from '../../models/infopage';
import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';
import {InfopageService} from '../../services/infopage.service';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() showBackArrow = false;

  museum: Museum;
  infopages: Infopage[];
  navbarCollapsed = true;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infopageService: InfopageService,
    private museumService: MuseumService
  ) {
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(
      museums => this.museum = museums[0]
    );

    this.infopageService.getInfopages().subscribe(
      infopages => this.infopages = infopages
    );
  }

  getMuseumContent(lang: String): MuseumContent {

    /* return localized content */

    for (const content of this.museum.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? fall back to German */

    console.warn('No localized content available for locale ' + lang);

    for (const content of this.museum.contents) {
      if (content.lang === 'de') {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exposition */

    console.error('No German fallback content available');
  }
}
