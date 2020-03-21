import {Component, Input, OnInit} from '@angular/core';

import {Exposition} from '../../../../models/exposition';

@Component({
  selector: 'app-common-exposition-card',
  templateUrl: './common-exposition-card.component.html',
  styleUrls: ['./common-exposition-card.component.css']
})
export class CommonExpositionCardComponent implements OnInit {

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
}
