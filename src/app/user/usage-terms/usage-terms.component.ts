import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {Museum} from '../../models/museum';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-usage-terms',
  templateUrl: './usage-terms.component.html',
  styleUrls: ['./usage-terms.component.css']
})
export class UsageTermsComponent implements OnInit {

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService) {

    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
  }

  getMuseumContent(locale: string) {
    for (const content of this.museum.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing museum
    console.error(`MuseumContent missing for locale ${locale}`);
  }
}
