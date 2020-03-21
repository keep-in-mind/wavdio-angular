import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CookielawService} from '../../../../services/cookielaw.service';
import {Infopage} from '../../../../models/infopage';
import {InfopageService} from '../../../../services/infopage.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  infopage: Infopage;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infopageService: InfopageService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieLawService: CookielawService) {
  }

  ngOnInit() {
    if (this.cookieLawService.acceptedTermsOfUse()) {
      this.router.navigate(['/']);
    } else {
      this.route.params.subscribe(params => {
        const infopageId = params.id;
        this.infopageService.getInfopage(infopageId).subscribe(
          infopage => this.infopage = infopage
        );
      });
    }
  }
}
