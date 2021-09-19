import {MediaMatcher} from '@angular/cdk/layout'
import {ChangeDetectorRef, Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {CookieService} from 'ngx-cookie-service'
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

import {CookielawService} from '../../../../services/cookielaw.service'
import {Exhibit} from '../../../../models/exhibit'
import {ExhibitService} from '../../../../services/exhibit.service'
import {Exposition} from '../../../../models/exposition'
import {ExpositionService} from '../../../../services/exposition.service'
import {InfoPage} from '../../../../models/info-page'
import {InfoPageService} from '../../../../services/info-page.service'
import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-user-museum',
    templateUrl: './user-museum.component.html',
    styleUrls: ['./user-museum.component.css']
})
export class UserMuseumComponent implements OnInit, OnDestroy {
    infoPages: InfoPage[]

    mobileQuery: MediaQueryList

    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`)

    private _mobileQueryListener: () => void

    private _success = new Subject<string>()
    alertMessage: string

    exposition: Exposition
    exhibits: Exhibit[]
    expositions: Exposition[]

    museum: Museum

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private cookieService: CookieService,
        private modalService: NgbModal,
        public router: Router,
        private museumService: MuseumService,
        private activatedRoute: ActivatedRoute,
        private exhibitService: ExhibitService,
        private expositionService: ExpositionService,
        public cookieLawService: CookielawService,
        private infoPageService: InfoPageService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)')
        this._mobileQueryListener = () => changeDetectorRef.detectChanges()
        this.mobileQuery.addListener(this._mobileQueryListener)
    }

    ngOnInit() {
        this.infoPageService.getInfoPages().subscribe(
            infoPages => this.infoPages = infoPages
        )

        if (this.cookieLawService.acceptedTermsOfUse()) {
            this.router.navigate(['/'])
        } else {
            this._success.subscribe((message) => this.alertMessage = message)
            this._success.pipe(
                debounceTime(5000)
            ).subscribe(() => this.alertMessage = null)

            this.museumService.getMuseums().subscribe(
                museums => {
                    this.museum = museums[0]

                    this.exhibitService.getExhibits().subscribe(
                        exhibits => this.exhibits = exhibits
                            .filter(exhibit => exhibit.active && exhibit.parent === this.museum._id)
                            .sort((e1, e2) => e1.code - e2.code)
                    )

                    this.expositionService.getExpositions().subscribe(
                        expositions => this.expositions = expositions.filter(exposition => exposition.active)
                    )
                }
            )
        }
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener)
    }
}
