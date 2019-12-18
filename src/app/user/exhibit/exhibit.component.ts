import {Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Exhibit} from '../../models/exhibit';
import {ExhibitService} from '../../services/exhibit.service';
import {InfopageService} from '../../services/infopage.service';
import {Like} from '../../models/like';
import {CookieService} from 'ngx-cookie-service';
import {MediaplayerService} from '../../services/mediaplayer.service';
import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';
import {ExhibitContent} from '../../models/exhibit-content';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentComponent} from '../comment/comment.component';

import {CookielawService} from '../../services/cookielaw.service';
import {MuseumService} from '../../services/museum.service';
import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';

@Component({
  selector: 'app-exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.css'],
  providers: [MediaplayerService]
})
export class ExhibitComponent implements OnInit {

  isNavbarCollapsed = true;

  ariaLabelBurgerMenu = 'Menü öffnen';
  ariaLabelFooterNavigation = 'Navigation für zurück, like und Kommentar';
  ariaLabelLikeExhibit = 'Exponat liken';
  ariaLabelPrevExhibit = 'Zum vorherigen Exponat springen';
  ariaLabelSearchExhibit = 'Exponat mit eigegebener Nummer suchen';
  ariaLabelNextExhibit = 'Zum nächsten Exponat springen';
  ariaLabelOpenComment = 'Kommentarfeld öffnen';
  ariaLabelBackToExposition = 'Zurück zur Übersicht über die Ausstellung';
  ariaLabelInputExhibitnumber = 'Exponatnummer eingeben';
  ariaLabelPlayButton = 'Play';
  ariaLabelPauseButton = 'Pause';
  ariaLabelStopButton = 'Stopp';
  ariaLabelRwdButton = 'Vorspulen';
  ariaLabelFwdButton = 'Zurückspulen';

  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    infinite: true,
    dots: true
  };

  exhibits: Exhibit[];
  exhibit: Exhibit;
  exposition: Exposition;
  infopages = [];
  museum: Museum;

  likedFlag = false;
  filterNumber: number;

  videoplayer: ElementRef;
  time: ElementRef;
  progress: ElementRef;

  audioplayer: ElementRef;
  timeAudio: ElementRef;
  progressAudio: ElementRef;

  videoPlaying = false;
  audioPlaying = false;

  @ViewChild('videoplayer', {static: false}) set content(content: ElementRef) {
    this.videoplayer = content;
  }

  @ViewChild('time', {static: false}) set content3(content: ElementRef) {
    this.time = content;
  }

  @ViewChild('progress', {static: false}) set content4(content: ElementRef) {
    this.progress = content;
  }

  @ViewChild('audioplayer', {static: false}) set content5(content: ElementRef) {
    this.audioplayer = content;
  }

  @ViewChild('timeAudio', {static: false}) set content7(content: ElementRef) {
    this.timeAudio = content;
  }

  @ViewChild('progressAudio', {static: false}) set content8(content: ElementRef) {
    this.progressAudio = content;
  }

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private infopageService: InfopageService,
    private exhibitService: ExhibitService,
    private expositionService: ExpositionService,
    private museumService: MuseumService,
    private mediaplayerService: MediaplayerService,
    private router: Router,
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
      this.infopageService.getInfopages().subscribe(
        infopages => this.infopages = infopages
      );

      this.activatedRoute.params.subscribe(params => {
        const exhibitId = params.id;

        // this.exhibitService.getExhibit(exhibitId).subscribe(
        //   exhibit => {
        //     this.exhibit = exhibit;
        //     this.likedFlag = this.cookieService.get(`exhibit${this.exhibit._id}`) === 'true';
        //   }
        // );

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
            this.likedFlag = this.cookieService.get(`exhibit${this.exhibit._id}`) === 'true';
          }
        );
      });
    }
  }

  likeExhibit() {
    if (!this.likedFlag) {
      this.exhibit.likes.push(new Like(new Date()));
      this.exhibitService.updateExhibitCommentLike(this.exhibit).subscribe(
        exhibit => {
          this.likedFlag = true;
          this.cookieService.set(`exhibit${this.exhibit._id}`, 'true');
        }
      );
    }
  }

  openComment() {
    const modal = this.modalService.open(CommentComponent, {centered: true});
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

  /**
   * Media player controls
   */

  playPause() {
    this.mediaplayerService.playPausePlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  playPauseAudio() {
    this.mediaplayerService.playPausePlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  stopIt() {
    this.mediaplayerService.stopPlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  stopItAudio() {
    this.mediaplayerService.stopPlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  rewind() {
    this.mediaplayerService.rewindPlayer(this.videoplayer);
  }

  rewindAudio() {
    this.mediaplayerService.rewindPlayer(this.audioplayer);
  }

  forward() {
    this.mediaplayerService.forwardPlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  forwardAudio() {
    this.mediaplayerService.forwardPlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  updateTime() {
    this.mediaplayerService.timeUpdate(this.videoplayer,
      this.time, this.progress, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  updateTimeAudio() {
    this.mediaplayerService.timeUpdate(this.audioplayer,
      this.timeAudio, this.progressAudio, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  getExhibitContent(lang: String): ExhibitContent {

    /* return localized content */

    for (const content of this.exhibit.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? fall back to German */

    console.warn('No localized content available for locale ' + lang);

    for (const content of this.exhibit.contents) {
      if (content.lang === 'de') {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exhibit */

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
