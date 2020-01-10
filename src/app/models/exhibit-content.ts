import {Audio} from './audio';
import {Image} from './image';
import {Transcript} from './transcript';
import {Video} from './video';

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
