import {Location} from '@angular/common'
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {Exhibit} from '../../../../models/exhibit'
import {ExhibitService} from '../../../../services/exhibit.service'

@Component({
    selector: 'app-user-exhibit-fullscreen',
    templateUrl: './user-exhibit-fullscreen.component.html',
    styleUrls: ['./user-exhibit-fullscreen.component.css']
})
export class UserExhibitFullscreenComponent implements OnInit {

    slideConfig = {
        infinite: true,
        initialSlide: 0,
        prevArrow: '#prevSlide',
        nextArrow: '#nextSlide',
    }

    exhibit: Exhibit
    ready = false

    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private activatedRoute: ActivatedRoute,
        private exhibitService: ExhibitService,
        public location: Location) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const exhibitId = params.id

            this.activatedRoute.queryParams.subscribe(queryParams => {
                let slide = null
                if (queryParams.slide) {
                    slide = Number(queryParams.slide)
                }

                this.exhibitService.getExhibit(exhibitId).subscribe(exhibit => {
                        this.exhibit = exhibit

                        if (0 <= slide && slide < this.exhibit.getContent(this.locale).images.length) {
                            this.slideConfig.initialSlide = slide
                        }

                        this.ready = true
                    }
                )
            })
        })
    }
}
