import {Image} from './image';

export class MuseumContent {

  lang: string;

  name: string;
  info: string;
  welcomeText: string;
  termsOfUse: string;
  privacyTerms: string;

  logo: Image;
  image: Image;
  sitePlan: Image;

  constructor(
    lang: string,
    name: string,
    info: string,
    welcomeText: string,
    termsOfUse: string,
    privacyTerms: string,
    logo: Image,
    image: Image,
    sitePlan: Image) {

    this.lang = lang;
    this.name = name;
    this.info = info;
    this.welcomeText = welcomeText;
    this.termsOfUse = termsOfUse;
    this.privacyTerms = privacyTerms;
    this.logo = logo;
    this.image = image;
    this.sitePlan = sitePlan;
  }
}
