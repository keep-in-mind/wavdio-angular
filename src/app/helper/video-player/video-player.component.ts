import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {MediaplayerService} from '../../services/mediaplayer.service';
import {Exhibit} from "../../models/exhibit";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input() exhibit: Exhibit;
  @Input() selectedLanguage;

  @ViewChild('videoplayer', {static: false}) set content(content: ElementRef) {
    this.videoplayer = content;
  }

  @ViewChild('time', {static: false}) set content3(content: ElementRef) {
    this.time = content;
  }

  @ViewChild('progress', {static: false}) set content4(content: ElementRef) {
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

  getExhibitContent(locale: string) {
    for (const content of this.exhibit.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
  }
}
