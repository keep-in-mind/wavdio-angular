import {Component, Input, OnInit} from '@angular/core';
import {Exhibit} from '../../models/exhibit';

@Component({
  selector: 'app-exhibit-card',
  templateUrl: './exhibit-card.component.html',
  styleUrls: ['./exhibit-card.component.css']
})
export class ExhibitCardComponent implements OnInit {

  exhibitAltTextNoImage = 'Kein Bild verfügbar';

  private _height: string;
  private _width: string;

  @Input() link: string;
  @Input() exhibit: Exhibit;
  @Input() selectedLanguage: string;

  @Input()
  set height(height: string) {
    this._height = height || '100px';
  }

  get height(): string { return this._height; }

  @Input()
  set width(width: string) {
    this._width = width || '100px';
  }

  get width(): string { return this._width; }

  constructor() { }

  ngOnInit() {
    if (null == this.exhibit) { throw new Error('Exhibit is required'); }
  }

  getExhibitContent(locale: string) {
    for (const content of this.exhibit.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
  }
}
