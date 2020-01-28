import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Infopage} from '../../models/infopage';
import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';
import {CookielawService} from '../../services/cookielaw.service';
import {InfopageService} from '../../services/infopage.service';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.css']
})
export class InfopageComponent implements OnInit {

  @Input() title: string;
  @Input() back_arrow_link: string;

  infopages: Infopage[];
  infopage: Infopage;
  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infopageService: InfopageService,
    private route: ActivatedRoute,
    private museumService: MuseumService,
    public cookieLawService: CookielawService,
    public router: Router) {
  }

  ngOnInit() {
    if (this.cookieLawService.acceptedTermsOfUse()) {
      this.router.navigate(['/']);
    } else {
      this.route.params.subscribe(params => {
        const infopageId = params.id;
        this.infopageService.getInfopages().subscribe(
          infopages => {
            this.infopages = infopages;
            for (const page of infopages) {
              if (page._id === infopageId) {
                this.infopage = page;
              }
            }
          }
        );
      });
      this.museumService.getMuseums().subscribe(
        museums => {
          this.museum = museums[0];
        }
      );
    }
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
