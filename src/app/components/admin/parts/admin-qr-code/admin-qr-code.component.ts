import {Component, OnInit} from '@angular/core';

import {Exhibit} from '../../../../models/exhibit';

@Component({
  selector: 'app-admin-qr-code',
  templateUrl: './admin-qr-code.component.html',
  styleUrls: ['./admin-qr-code.component.css']
})
export class AdminQrCodeComponent implements OnInit {

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
}
