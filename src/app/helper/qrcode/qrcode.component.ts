import {Component, OnInit} from '@angular/core';

import {Exhibit} from '../../models/exhibit';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  host: string;
  port: string;

  exhibits: Exhibit[] = [];
  lang: string;

  constructor() {
  }

  ngOnInit() {
    this.host = window.location.hostname;
    this.port = window.location.port;
  }

  getExhibitContent(e: Exhibit, locale: string) {
    for (const content of e.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
  }
}
