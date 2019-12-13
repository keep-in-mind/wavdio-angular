import {Image} from './image';
import {Like} from './like';
import {View} from './view';
import {Comment} from './comment';
import {ExpositionContent} from './exposition-content';

export class Exposition {

  _id: string;
  museum: string;

  active: boolean;
  code: number;
  note: string;
  logo: Image;

  likes: Like[];
  views: View[];
  comments: Comment[];

  contents: ExpositionContent[];

  constructor(
    museum: string,
    active: boolean,
    code: number,
    note: string,
    logo: Image,
    likes: Like[],
    views: View[],
    comments: Comment[],
    contents: ExpositionContent[]) {

    this.museum = museum;
    this.active = active;
    this.code = code;
    this.note = note;
    this.logo = logo;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.contents = contents;
  }
}
