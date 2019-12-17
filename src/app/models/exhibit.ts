import {Like} from './like';
import {View} from './view';
import {Comment} from './comment';
import {ExhibitContent} from './exhibit-content';

export class Exhibit {

  _id: string;
  parent: string;

  active: boolean;
  code: number;
  note: string;

  likes: Like[];
  views: View[];
  comments: Comment[];

  contents: ExhibitContent[];

  constructor(
    exposition: string,
    active: boolean,
    code: number,
    note: string,
    likes: Like[],
    views: View[],
    comments: Comment[],
    contents: ExhibitContent[]) {

    this.parent = exposition;
    this.active = active;
    this.code = code;
    this.note = note;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.contents = contents;
  }
}
