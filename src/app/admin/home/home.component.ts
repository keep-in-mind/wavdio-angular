import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';

import {AuthenticationService} from '../../services/authentification.service';
import {CookielawService} from '../../services/cookielaw.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MuseumService} from '../../services/museum.service';
import {ExhibitService} from '../../services/exhibit.service';
import {Museum} from '../../models/museum';
import {Exhibit} from '../../models/exhibit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  museum: Museum;
  expositions: Exposition[];
  exhibits: Exhibit[];

  descHeader = 'wAVdio';
  descExpositionsHeader = 'Austellungen';

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
