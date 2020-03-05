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
    dots: true,
    prevArrow: '#prevSlide',
    nextArrow: '#nextSlide',
  };

  constructor() {
  }

  ngOnInit() {
  }
}
