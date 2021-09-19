import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'

import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-usage-terms',
    templateUrl: './user-usage-terms.component.html',
    styleUrls: ['./user-usage-terms.component.css']
})
export class UserUsageTermsComponent implements OnInit {

    museum: Museum

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private museumService: MuseumService) {

        this.museumService.getMuseums().subscribe(
            museum => this.museum = museum[0]
        )
    }

    ngOnInit() {
        this.museumService.getMuseums().subscribe(
            museum => this.museum = museum[0]
        )
    }
}
