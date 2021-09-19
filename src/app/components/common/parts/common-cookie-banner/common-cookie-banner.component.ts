import {Component, OnInit} from '@angular/core'

import {CookielawService} from '../../../../services/cookielaw.service'

@Component({
    selector: 'app-common-cookie-banner',
    templateUrl: './common-cookie-banner.component.html',
    styleUrls: ['./common-cookie-banner.component.css']
})
export class CommonCookieBannerComponent implements OnInit {

    constructor(public cookielawService: CookielawService) {
    }

    ngOnInit() {
    }
}
