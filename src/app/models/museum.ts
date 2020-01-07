import {MuseumContent} from './museum-content';

export class Museum {

  _id: string;
  contents: MuseumContent[];

  constructor(contents: MuseumContent[]) {
    this.contents = contents;
  }
}
