import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Infopage} from '../../models/infopage';
import {CookielawService} from '../../services/cookielaw.service';
import {InfopageService} from '../../services/infopage.service';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.css']
})
export class InfopageComponent implements OnInit {

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
