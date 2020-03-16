import {Location} from '@angular/common';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Exhibit} from '../../models/exhibit';
import {ExhibitContent} from '../../models/exhibit-content';
import {ExhibitService} from '../../services/exhibit.service';

@Component({
  selector: 'app-exhibit-fullscreen',
  templateUrl: './exhibit-fullscreen.component.html',
  styleUrls: ['./exhibit-fullscreen.component.css']
})
export class ExhibitFullscreenComponent implements OnInit {

  slideConfig = {
    infinite: true,
    initialSlide: 0,
    prevArrow: '#prevSlide',
    nextArrow: '#nextSlide',
  };

  exhibit: Exhibit;
  ready = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private exhibitService: ExhibitService,
    public location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const exhibitId = params.id;

      this.activatedRoute.queryParams.subscribe(queryParams => {
        let slide = null;
        if (queryParams.slide) {
          slide = Number(queryParams.slide);
        }

        this.exhibitService.getExhibit(exhibitId).subscribe(exhibit => {
            this.exhibit = exhibit;

            if (0 <= slide && slide < this.getExhibitContent(this.locale).images.length) {
              this.slideConfig.initialSlide = slide;
            }

            this.ready = true;
          }
        );
      });
    });
  }

  getExhibitContent(lang: String): ExhibitContent {

    /* return localized content */

    for (const content of this.exhibit.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exhibit */

    console.error(`No content available for ${lang}`);
  }
}
