import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {Breadcrumb} from '../../../../models/breadcrumb';

@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb('Willkommen')
  ];

  selectedLanguage = this.locale;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit() {
  }
}
