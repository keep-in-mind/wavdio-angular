import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';

import {CookielawService} from '../../../../services/cookielaw.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';
import {Museum} from '../../../../models/museum';
import {MuseumContent} from '../../../../models/museum-content';
import {MuseumService} from '../../../../services/museum.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  data: any;
  termsOfUseFlag = false;

  expositions: Exposition[];
  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private expositionService: ExpositionService,
    private cookieService: CookieService,
    private museumService: MuseumService,
    public cookieLawService: CookielawService,
    public router: Router) {
  }

  ngOnInit() {
    this.termsOfUseFlag = this.cookieService.get('termsOfUseAccepted') === 'true';
    this.expositionService.getExpositions().subscribe(
      expositions => this.expositions = expositions.filter(exposition => exposition.active)
    );
    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
  }

  onTermsChange() {
    this.termsOfUseFlag = !this.termsOfUseFlag;
    this.cookieService.set('termsOfUseAccepted', this.termsOfUseFlag.toString());

    // Check amount of expositions. Case "1" redirect automatically
    if (this.expositions.length === 1 && this.termsOfUseFlag === true) {
      this.router.navigate(['/exposition', this.expositions[0]._id]);
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
