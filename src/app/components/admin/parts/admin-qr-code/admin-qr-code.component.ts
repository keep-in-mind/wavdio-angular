import {Component, OnInit} from '@angular/core';

import {Exhibit} from '../../../../models/exhibit';
import {NgxQrcodeElementTypes} from 'ngx-qrcode2';

@Component({
  selector: 'app-admin-qr-code',
  templateUrl: './admin-qr-code.component.html',
  styleUrls: ['./admin-qr-code.component.css']
})
export class AdminQrCodeComponent implements OnInit {

  elementType: NgxQrcodeElementTypes.URL;
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
