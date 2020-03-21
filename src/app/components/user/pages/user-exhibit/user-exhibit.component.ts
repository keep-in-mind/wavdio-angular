import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';

import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitContent} from '../../../../models/exhibit-content';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';
import {InfoPageService} from '../../../../services/info-page.service';
import {Like} from '../../../../models/like';
import {Museum} from '../../../../models/museum';
import {MuseumContent} from '../../../../models/museum-content';
import {MuseumService} from '../../../../services/museum.service';
import {UserCommentComponent} from '../../parts/user-comment/user-comment.component';

@Component({
  selector: 'app-user-exhibit',
  templateUrl: './user-exhibit.component.html',
  styleUrls: ['./user-exhibit.component.css']
})
export class UserExhibitComponent implements OnInit {
  exhibits: Exhibit[];
  exhibit: Exhibit;
  exposition: Exposition;
  infoPages = [];
  museum: Museum;

  likedFlag = false;
  filterNumber: number;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private infoPageService: InfoPageService,
    private exhibitService: ExhibitService,
    private expositionService: ExpositionService,
    private museumService: MuseumService,
    public router: Router,
    private cookieService: CookieService,
    public cookieLawService: CookielawService) {

    // this code tricks the router to always reload
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // this code tricks the router to always reload
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    if (this.cookieLawService.acceptedTermsOfUse()) {
      this.router.navigate(['/']);
    } else {
      this.infoPageService.getInfoPages().subscribe(
        infoPages => this.infoPages = infoPages
      );

      this.activatedRoute.params.subscribe(params => {
        const exhibitId = params.id;

        this.museumService.getMuseums().subscribe(
          museums => {
            this.museum = museums[0];
          }
        );

        this.exhibitService.getExhibits().subscribe(
          exhibits => {
            this.exhibits = exhibits;
            this.exhibit = exhibits.filter(exhibit => exhibitId === exhibit._id)[0];
            if (this.exhibit.parentModel === 'Exposition') {
              this.expositionService.getExposition(this.exhibit.parent).subscribe(
                exposition => this.exposition = exposition
              );
            } else {
              this.exposition = null;
            }
            this.filterNumber = this.exhibit.code;
            this.likedFlag = this.cookieService.get(`exhibit${this.exhibit._id}`) !== '';
          }
        );
      });
    }
  }

  likeUnlikeExhibit() {
    if (!this.likedFlag) {

      /* Not liked yet -> Create exhibit like, wait for server, set cookie */

      const like = new Like(new Date());

      this.exhibitService.createExhibitLike(this.exhibit, like).subscribe(updatedExhibit => {
            this.exhibit = updatedExhibit;
            this.likedFlag = true;

            const createdLike = this.exhibit.likes[this.exhibit.likes.length - 1];
            this.cookieService.set(`exhibit${this.exhibit._id}`, `${createdLike._id}`);
          }
      );

    } else {

      /* Already like -> Get cookie, delete exhibit like, wait for server, delete cookie */

      const likeId = this.cookieService.get(`exhibit${this.exhibit._id}`);
      const like = this.exhibit.likes.find(obj => obj._id === likeId);

      this.exhibitService.deleteExhibitLike(this.exhibit, like).subscribe(updatedExhibit => {
        this.exhibit = updatedExhibit;
        this.likedFlag = false;

        this.cookieService.delete(`exhibit${updatedExhibit._id}`);
      });
    }
  }

  openComment() {
    const modal = this.modalService.open(UserCommentComponent, {centered: true});
    modal.componentInstance.exhibit = this.exhibit;
  }

  openTranscript(content) {
    this.modalService.open(content);
  }

  nextExhibit() {
    for (let i = this.exhibit.code + 1; i < 1000; i++) {
      for (const exhibit of this.exhibits) {
        if (exhibit.code === i && exhibit.active) {
          this.router.navigate([`/exhibit/`, exhibit._id]);
          return;
        }
      }
    }
  }
  isFirst() {
    for (const exhibit of this.exhibits) {
      if (exhibit.code < this.exhibit.code && exhibit.active) {
        return null;
      }
    }
    return true;
  }
  isLast() {
    for (const exhibit of this.exhibits) {
      if (exhibit.code > this.exhibit.code && exhibit.active) {
        return null;
      }
    }
    return true;
  }

  prevExhibit() {
    for (let i = this.exhibit.code - 1; i > 99; i--) {
      for (const exhibit of this.exhibits) {
        if (exhibit.code === i && exhibit.active) {
          this.router.navigate([`/exhibit/`, exhibit._id]);
          return;
        }
      }
    }
  }

  manualSelect() {
    for (const exhibit of this.exhibits) {
      if (exhibit.code === this.filterNumber) {
        this.router.navigate([`/exhibit/`, exhibit._id]);
        return;
      }
    }
  }

  getMuseumContent(lang: String): MuseumContent {

    /* return localized content */

    for (const content of this.museum.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? fall back to German */

    console.warn('No localized content available for locale ' + lang);

    for (const content of this.museum.contents) {
      if (content.lang === 'de') {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exposition */

    console.error('No German fallback content available');
  }
}
