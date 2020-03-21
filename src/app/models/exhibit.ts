import {Comment} from './comment';
import {ExhibitContent} from './exhibit-content';
import {Like} from './like';
import {View} from './view';

export class Exhibit {

  _id: string;
  parent: string;
  parentModel: string;

  active: boolean;
  code: number;
  note: string;

  likes: Like[];
  views: View[];
  comments: Comment[];

  contents: ExhibitContent[];

  constructor(
    _id: string = null,
    parent: string,
    parentModel: string,
    active: boolean,
    code: number,
    note: string,
    likes: Like[],
    views: View[],
    comments: Comment[], contents: ExhibitContent[]) {

    this._id = _id;
    this.parent = parent;
    this.parentModel = parentModel;
    this.active = active;
    this.code = code;
    this.note = note;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.contents = contents;
  }

  static fromJSON(json: any): Exhibit {
    return new this(
      json._id,
      json.parent,
      json.parentModel,
      json.active,
      json.code,
      json.note,
      json.likes,
      json.views,
      json.comments,
      json.contents);
  }

  getContent(locale: string): ExhibitContent {
    for (const content of this.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not found ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
    return null;
  }
}
