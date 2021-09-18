import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {Exhibit} from '../../../../models/exhibit';
import {MediaplayerService} from '../../../../services/mediaplayer.service';

@Component({
  selector: 'app-common-video-player',
  templateUrl: './common-video-player.component.html',
  styleUrls: ['./common-video-player.component.css']
})
export class CommonVideoPlayerComponent implements OnInit {

  @Input() exhibit: Exhibit;
  @Input() selectedLanguage;

  @ViewChild('videoplayer') set content(content: ElementRef) {
    this.videoplayer = content;
  }

  @ViewChild('time') set content3(content: ElementRef) {
    this.time = content;
  }

  @ViewChild('progress') set content4(content: ElementRef) {
    this.progress = content;
  }

  videoplayer: ElementRef;
  videoPlaying = false;
  time: ElementRef;
  progress: ElementRef;

  constructor(private mediaplayerService: MediaplayerService) {
  }

  ngOnInit() {
  }

  playPause() {
    this.mediaplayerService.playPausePlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  stopIt() {
    this.mediaplayerService.stopPlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  rewind() {
    this.mediaplayerService.rewindPlayer(this.videoplayer);
  }

  forward() {
    this.mediaplayerService.forwardPlayer(this.videoplayer, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }

  updateTime() {
    this.mediaplayerService.timeUpdate(this.videoplayer,
      this.time, this.progress, true);
    this.videoPlaying = this.mediaplayerService.videoPlaying;
  }
}
