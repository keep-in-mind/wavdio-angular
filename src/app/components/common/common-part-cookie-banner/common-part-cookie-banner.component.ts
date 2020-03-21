import {Component, OnInit} from '@angular/core';

import {CookielawService} from '../../../services/cookielaw.service';

@Component({
  selector: 'app-common-part-cookie-banner',
  templateUrl: './common-part-cookie-banner.component.html',
  styleUrls: ['./common-part-cookie-banner.component.css']
})
export class CommonPartCookieBannerComponent implements OnInit {

  constructor(public cookielawService: CookielawService) {
  }

  ngOnInit() {
  }
}
