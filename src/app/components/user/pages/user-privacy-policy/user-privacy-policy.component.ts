import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'

import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-privacy-policy',
    templateUrl: './user-privacy-policy.component.html',
    styleUrls: ['./user-privacy-policy.component.css']
})
export class UserPrivacyPolicyComponent implements OnInit {

    museum: Museum

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private museumService: MuseumService) {
    }

    ngOnInit() {
        this.museumService.getMuseums().subscribe(
            museum => this.museum = museum[0]
        )
    }
}

