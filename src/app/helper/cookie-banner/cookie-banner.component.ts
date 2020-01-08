import {Component, OnInit} from '@angular/core';

import {CookielawService} from '../../services/cookielaw.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {

  constructor(private cookielawService: CookielawService) {
  }

  ngOnInit() {
  }
}
