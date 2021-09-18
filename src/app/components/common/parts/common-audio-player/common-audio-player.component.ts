import {Component, ElementRef, Inject, Input, LOCALE_ID, OnInit, ViewChild} from '@angular/core';

import {Exhibit} from '../../../../models/exhibit';
import {MediaplayerService} from '../../../../services/mediaplayer.service';

@Component({
  selector: 'app-common-audio-player',
  templateUrl: './common-audio-player.component.html',
  styleUrls: ['./common-audio-player.component.css'],
  providers: [MediaplayerService]
})
export class CommonAudioPlayerComponent implements OnInit {

  @Input() exhibit: Exhibit;
  @Input() selectedLanguage;

  @ViewChild('audioplayer') set content5(content: ElementRef) {
    this.audioplayer = content;
  }

  @ViewChild('timeAudio') set content7(content: ElementRef) {
    this.timeAudio = content;
  }

  @ViewChild('progressAudio') set content8(content: ElementRef) {
    this.progressAudio = content;
  }

  audioplayer: ElementRef;
  audioPlaying = false;
  timeAudio: ElementRef;
  progressAudio: ElementRef;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private mediaplayerService: MediaplayerService) {
  }

  ngOnInit() {
  }

  playPauseAudio() {
    this.mediaplayerService.playPausePlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  stopItAudio() {
    this.mediaplayerService.stopPlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  rewindAudio() {
    this.mediaplayerService.rewindPlayer(this.audioplayer);
  }

  forwardAudio() {
    this.mediaplayerService.forwardPlayer(this.audioplayer, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }

  updateTimeAudio() {
    this.mediaplayerService.timeUpdate(this.audioplayer,
      this.timeAudio, this.progressAudio, false);
    this.audioPlaying = this.mediaplayerService.audioPlaying;
  }
}
