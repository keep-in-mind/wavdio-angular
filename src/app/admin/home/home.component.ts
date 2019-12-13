import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';

import {AuthenticationService} from '../../services/authentification.service';
import {CookielawService} from '../../services/cookielaw.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  expositions: Exposition[];

  descHeader = 'wAVdio';
  descExpositionsHeader = 'Austellungen';

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private http: HttpClient,
    private expositionService: ExpositionService,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService) {
    this.cookieLawService = cookieLawService;

  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.expositionService.getExpositions().subscribe(
        expositions => this.expositions = expositions
      );
    }
  }
}
