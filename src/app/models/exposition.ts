import {Comment} from './comment';
import {ExpositionContent} from './exposition-content';
import {Image} from './image';
import {Like} from './like';
import {View} from './view';

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
    _id: string = null,
    museum: string,
    active: boolean,
    code: number,
    note: string,
    logo: Image,
    likes: Like[],
    views: View[],
    comments: Comment[],
    contents: ExpositionContent[]) {

    this._id = _id;
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

  static fromJSON(json: any): Exposition {
    return new this(
      json._id,
      json.museum,
      json.active,
      json.code,
      json.note,
      json.logo,
      json.likes,
      json.views,
      json.comments,
      json.contents);
  }

  getContent(locale: string): ExpositionContent {
    for (const content of this.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not found ? must not happen. has to be created when constructing exposition
    console.error(`ExpositionContent missing for locale ${locale}`);
    return null;
  }
}
