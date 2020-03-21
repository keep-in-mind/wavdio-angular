import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionContent} from '../../../../models/exposition-content';
import {ExpositionService} from '../../../../services/exposition.service';
import {InfoPage} from '../../../../models/info-page';
import {InfoPageService} from '../../../../services/info-page.service';
import {Like} from '../../../../models/like';
import {Museum} from '../../../../models/museum';
import {MuseumContent} from '../../../../models/museum-content';
import {MuseumService} from '../../../../services/museum.service';
import {UserCommentComponent} from '../../parts/user-comment/user-comment.component';

@Component({
  selector: 'app-user-exposition',
  templateUrl: './user-exposition.component.html',
  styleUrls: ['./user-exposition.component.css']
})
export class UserExpositionComponent implements OnInit {
  private _success = new Subject<string>();
  alertMessage: string;

  filterNumber: number;
  likedFlag = false;

  exposition: Exposition;
  exhibits: Exhibit[];
  infoPages: InfoPage[];

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
    private infoPageService: InfoPageService,
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

      this.infoPageService.getInfoPages().subscribe(
        infoPages => this.infoPages = infoPages
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
    const modal = this.modalService.open(UserCommentComponent, {centered: true});
    modal.componentInstance.exposition = this.exposition;
  }

  likeUnlikeExposition() {
    if (!this.likedFlag) {

      /* Not liked yet -> Create exposition like, wait for server, set cookie */

      const like = new Like(new Date());

      this.expositionService.createExpositionLike(this.exposition, like).subscribe(updatedExposition => {
          this.exposition = updatedExposition;
          this.likedFlag = true;

          const createdLike = this.exposition.likes[this.exposition.likes.length - 1];
          this.cookieService.set(`exposition${this.exposition._id}`, `${createdLike._id}`);
        }
      );

    } else {

      /* Already like -> Get cookie, delete exposition like, wait for server, delete cookie */

      const likeId = this.cookieService.get(`exposition${this.exposition._id}`);
      const like = this.exposition.likes.find(obj => obj._id === likeId);

      this.expositionService.deleteExpositionLike(this.exposition, like).subscribe(updatedExposition => {
        this.exposition = updatedExposition;
        this.likedFlag = false;

        this.cookieService.delete(`exposition${updatedExposition._id}`);
      });
    }
  }
}
