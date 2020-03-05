import {Component, Input, OnInit} from '@angular/core';

import {Image} from '../../models/image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() id: string;
  @Input() images: Image[];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    prevArrow: '#prevB',
    nextArrow: '#nextB',
  };

  constructor() {
  }

  ngOnInit() {
  }
}
