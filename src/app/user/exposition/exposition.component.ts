import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {CommentComponent} from '../comment/comment.component';
import {Exhibit} from '../../models/exhibit';
import {Exposition} from '../../models/exposition';
import {ExpositionContent} from '../../models/exposition-content';
import {Infopage} from '../../models/infopage';
import {Like} from '../../models/like';
import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';
import {CookielawService} from '../../services/cookielaw.service';
import {ExhibitService} from '../../services/exhibit.service';
import {ExpositionService} from '../../services/exposition.service';
import {InfopageService} from '../../services/infopage.service';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-exposition',
  templateUrl: './exposition.component.html',
  styleUrls: ['./exposition.component.css']
})
export class ExpositionComponent implements OnInit {
  private _success = new Subject<string>();
  alertMessage: string;

  filterNumber: number;
  likedFlag = false;

  exposition: Exposition;
  exhibits: Exhibit[];
  infopages: Infopage[];

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private cookieService: CookieService,
    private modalService: NgbModal,
    public router: Router,
    private museumService: MuseumService,
    private activatedRoute: ActivatedRoute,
    private exhibitService: ExhibitService,
    private expositionService: ExpositionService,
    private infopageService: InfopageService,
    public cookieLawService: CookielawService) {
  }

  ngOnInit() {
    if (this.cookieLawService.acceptedTermsOfUse()) {
      this.router.navigate(['/']);
    } else {
      this._success.subscribe((message) => this.alertMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.alertMessage = null);

      this.infopageService.getInfopages().subscribe(
        infopages => this.infopages = infopages
      );

      this.activatedRoute.params.subscribe(
        params => {
          const expositionId = params.id;

          this.expositionService.getExposition(expositionId).subscribe(
            exposition => {
              this.exposition = exposition;
              this.likedFlag = this.cookieService.get(`exposition${this.exposition._id}`) !== '';
              this.exhibitService.getExhibits().subscribe(
                exhibits => this.exhibits = exhibits.filter(exhibit => exhibit.active && exhibit.parent === exposition._id)
              );
            }
          );
        });

      this.museumService.getMuseums().subscribe(
        museums => {
          this.museum = museums[0];
        }
      );
    }
  }

  manualSelect() {
    for (const exhibit of this.exhibits) {
      if (exhibit.code === this.filterNumber) {
        this.router.navigate([`/exhibit/`, exhibit._id]);
        return;
      }
    }
    this._success.next('Falsche Nummer');
  }

  openComment() {
    const modal = this.modalService.open(CommentComponent, {centered: true});
    modal.componentInstance.exposition = this.exposition;
  }

  likeExposition() {
    if (!this.likedFlag) {
      this.exposition.likes.push(new Like(new Date()));
      this.expositionService.updateExpositionCommentLike(this.exposition).subscribe(
        exposition => {
          this.likedFlag = true;
          const like = exposition.likes[exposition.likes.length - 1];
          this.cookieService.set(`exposition${this.exposition._id}`, `${like._id}`);
        }
      );
    }
  }

  getExpositionContent(lang: String): ExpositionContent {

    /* return localized content */

    for (const content of this.exposition.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? fall back to German */

    console.warn('No localized content available for locale ' + lang);

    for (const content of this.exposition.contents) {
      if (content.lang === 'de') {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exposition */

    console.error('No German fallback content available');
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
