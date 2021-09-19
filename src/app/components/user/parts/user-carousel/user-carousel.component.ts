import {Component, Input, OnInit} from '@angular/core'

import {Image} from '../../../../models/image'

@Component({
    selector: 'app-user-carousel',
    templateUrl: './user-carousel.component.html',
    styleUrls: ['./user-carousel.component.css']
})
export class UserCarouselComponent implements OnInit {

    @Input() id: string
    @Input() images: Image[]

    slideConfig = {
        dots: false,
        prevArrow: '#prevSlide',
        nextArrow: '#nextSlide',
    }

    constructor() {
    }

    ngOnInit() {
    }
}
