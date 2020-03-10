import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CookielawService} from '../../services/cookielaw.service';
import {Exhibit} from '../../models/exhibit';
import {ExhibitService} from '../../services/exhibit.service';
import {Image} from '../../models/image';
import {ExhibitContent} from "../../models/exhibit-content";

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent implements OnInit {

  slideConfig = {
    dots: true,
    prevArrow: '#prevSlide',
    nextArrow: '#nextSlide',
  };

  exhibit: Exhibit;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private exhibitService: ExhibitService,
    public router: Router,
    public cookieLawService: CookielawService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const exhibitId = params.id;

      this.exhibitService.getExhibit(exhibitId).subscribe(exhibit => {
          this.exhibit = exhibit;
        }
      );
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
