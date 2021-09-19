import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'

import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-imprint',
    templateUrl: './user-imprint.component.html',
    styleUrls: ['./user-imprint.component.css']
})
export class UserImprintComponent implements OnInit {

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
