import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CookielawService} from '../../../../services/cookielaw.service';
import {InfoPage} from '../../../../models/info-page';
import {InfoPageService} from '../../../../services/info-page.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  infoPage: InfoPage;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infoPageService: InfoPageService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieLawService: CookielawService) {
  }

  ngOnInit() {
    if (this.cookieLawService.acceptedTermsOfUse()) {
      this.router.navigate(['/']);
    } else {
      this.route.params.subscribe(params => {
        const infoPageId = params.id;
        this.infoPageService.getInfoPage(infoPageId).subscribe(
          infoPage => this.infoPage = infoPage
        );
      });
    }
  }
}
