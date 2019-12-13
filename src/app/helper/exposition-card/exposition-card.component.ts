import {Component, Input, OnInit} from '@angular/core';
import {Exposition} from '../../models/exposition';

@Component({
  selector: 'app-exposition-card',
  templateUrl: './exposition-card.component.html',
  styleUrls: ['./exposition-card.component.css']
})
export class ExpositionCardComponent implements OnInit {

  expositionAltTextNoImage = 'Kein Bild verfügbar';

  private _height: string;
  private _width: string;
  public _default_name: string;

  @Input() link: string;
  @Input() exposition: Exposition;
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
  }

  getExpositionContent(locale: string) {
    for (const content of this.exposition.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exposition
    console.error(`ExpositionContent missing for locale ${locale}`);
  }
}
