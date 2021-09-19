import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {CookieService} from 'ngx-cookie-service'

import {CookielawService} from '../../../../services/cookielaw.service'
import {Exposition} from '../../../../models/exposition'
import {ExpositionService} from '../../../../services/exposition.service'
import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-welcome',
    templateUrl: './user-welcome.component.html',
    styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

    data: any
    termsOfUseFlag = false

    expositions: Exposition[]
    museum: Museum

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private expositionService: ExpositionService,
        private cookieService: CookieService,
        private museumService: MuseumService,
        public cookieLawService: CookielawService,
        public router: Router) {
    }

    ngOnInit() {
        this.termsOfUseFlag = this.cookieService.get('termsOfUseAccepted') === 'true'
        this.expositionService.getExpositions().subscribe(
            expositions => this.expositions = expositions.filter(exposition => exposition.active)
        )
        this.museumService.getMuseums().subscribe(
            museum => this.museum = museum[0]
        )
    }

    onTermsChange() {
        this.termsOfUseFlag = !this.termsOfUseFlag
        this.cookieService.set('termsOfUseAccepted', this.termsOfUseFlag.toString())

        // Check amount of expositions. Case "1" redirect automatically
        if (this.expositions.length === 1 && this.termsOfUseFlag === true) {
            this.router.navigate(['/exposition', this.expositions[0]._id])
        }
    }
}
