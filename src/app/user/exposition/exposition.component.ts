import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentComponent} from '../comment/comment.component';
import {Exhibit} from '../../models/exhibit';
import {Infopage} from '../../models/infopage';
import {ExhibitService} from '../../services/exhibit.service';
import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';
import {InfopageService} from '../../services/infopage.service';
import {Like} from '../../models/like';
import {ExpositionContent} from '../../models/exposition-content';

import {CookielawService} from '../../services/cookielaw.service';
import {MuseumContent} from '../../models/museum-content';
import {MuseumService} from '../../services/museum.service';
import {Museum} from '../../models/museum';

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

  ariaLabelFooterNavigation = 'Navigation für zurück, like und Kommentar';
  ariaLabelLikeExposition = 'Ausstellung liken';
  ariaLabelOpenComment = 'Kommentarfeld öffnen';

  exposition: Exposition;
  exhibits: Exhibit[];
  infopages: Infopage[];

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private cookieService: CookieService,
    private modalService: NgbModal,
    private router: Router,
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
              this.likedFlag = this.cookieService.get(`exposition${this.exposition._id}`) === 'true';
              this.exhibitService.getExhibits().subscribe(
                exhibits => this.exhibits = exhibits.filter(exhibit => exhibit.active && exhibit.exposition === exposition._id)
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
          this.cookieService.set(`exposition${this.exposition._id}`, 'true');
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
