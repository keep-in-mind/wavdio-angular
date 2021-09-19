import {Location} from '@angular/common'
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-museum-fullscreen',
    templateUrl: './user-museum-fullscreen.component.html',
    styleUrls: ['./user-museum-fullscreen.component.css']
})
export class UserMuseumFullscreenComponent implements OnInit {

    museum: Museum

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private activatedRoute: ActivatedRoute,
        private museumService: MuseumService,
        public location: Location) {
    }

    ngOnInit() {
        this.museumService.getMuseums().subscribe(museums => {
            this.museum = museums[0]
        })
    }
}
