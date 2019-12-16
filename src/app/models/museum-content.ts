import {Image} from './image';

export class MuseumContent {

  lang: string;

  name: string;
  info: string;
  welcomeText: string;
  sitePlan: Image;
  termsOfUse: string;
  privacyTerms: string;

  constructor(
    lang: string,
    name: string,
    welcomeText: string,
    sitePlan: Image,
    termsOfUse: string,
    privacyTerms: string) {

    this.lang = lang;
    this.name = name;
    this.welcomeText = welcomeText;
    this.sitePlan = sitePlan;
    this.termsOfUse = termsOfUse;
    this.privacyTerms = privacyTerms;
  }
}
