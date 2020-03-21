import {HttpClient} from '@angular/common/http';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../services/authentification.service';
import {Breadcrumb} from '../../../models/breadcrumb';
import {CookielawService} from '../../../services/cookielaw.service';
import {Exhibit} from '../../../models/exhibit';
import {ExhibitService} from '../../../services/exhibit.service';
import {Exposition} from '../../../models/exposition';
import {ExpositionService} from '../../../services/exposition.service';
import {Museum} from '../../../models/museum';
import {MuseumService} from '../../../services/museum.service';

@Component({
  selector: 'app-admin-page-home',
  templateUrl: './admin-page-home.component.html',
  styleUrls: ['./admin-page-home.component.css']
})
export class AdminPageHomeComponent implements OnInit {

  museum: Museum;
  expositions: Exposition[];
  exhibits: Exhibit[];

  descHeader = 'wAVdio';
  descExpositionsHeader = 'Austellungen';

  breadcrumbs = [
    new Breadcrumb('Home')
  ];
  selectedLanguage: string = this.locale;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private http: HttpClient,
    private museumService: MuseumService,
    private expositionService: ExpositionService,
    private exhibitService: ExhibitService,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService) {
    this.cookieLawService = cookieLawService;

  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.museumService.getMuseums().subscribe(
        museums => this.museum = museums[0]
      );

      this.expositionService.getExpositions().subscribe(
        expositions => this.expositions = expositions
      );

      this.exhibitService.getExhibits().subscribe(
        exhibits => this.exhibits = exhibits
          .filter(exhibit => exhibit.parent === this.museum._id)
          .sort((e1, e2) => e1.code - e2.code)
      );
    }
  }
}
