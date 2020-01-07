export class Settings {

  _id: string;
  activeLangs: ActiveLangs;

  constructor(activeLangs: ActiveLangs) {
    this.activeLangs = activeLangs;
  }
}

class ActiveLangs {
  de: boolean;
  en: boolean;
  es: boolean;
  fr: boolean;
}
