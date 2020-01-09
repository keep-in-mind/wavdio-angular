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
    parent: string,
    parentModel: string,
    active: boolean,
    code: number,
    note: string,
    likes: Like[],
    views: View[],
    comments: Comment[],
    contents: ExhibitContent[]) {

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
}
