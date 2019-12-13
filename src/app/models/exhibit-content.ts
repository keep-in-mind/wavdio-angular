import {Image} from './image';
import {Audio} from './audio';
import {Video} from './video';
import {Transcript} from './transcript';

export class ExhibitContent {

  lang: string;

  name: string;
  info: string;
  transcript: Transcript;

  images: Image[];
  audio: Audio[];
  video: Video[];

  constructor(
    lang: string,
    name: string,
    info: string,
    transcript: Transcript,
    images: Image[],
    audio: Audio[],
    video: Video[],
  ) {

    this.lang = lang;
    this.name = name;
    this.info = info;
    this.transcript = transcript;
    this.images = images;
    this.audio = audio;
    this.video = video;
  }
}
