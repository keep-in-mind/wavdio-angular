import {Image} from './image';
import {MuseumContent} from './museum-content';

export class Museum {

  _id: string;
  logo: Image;
  contents: MuseumContent[];

  constructor(logo: Image, contents: MuseumContent[]) {
    this.logo = logo;
    this.contents = contents;
  }
}
