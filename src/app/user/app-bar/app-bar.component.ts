import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';

import {Setting} from '../../models/setting';
import {SettingService} from '../../services/setting.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  @Input() back_arrow_link: string;
  @Input() title: string;

  setting: Setting;

  // Same alt texts used multiple times
  langAltTexts = {
    de: 'German Flag Icon',
    en: 'British Flag Icon',
    es: 'Spanish Flag Icon',
    fr: 'French Flag Icon'
  };

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public router: Router,
    private settingService: SettingService,
    public location: Location) {
  }

  ngOnInit() {
    this.settingService.getSettings().subscribe(
      settings => this.setting = settings[0]
    );
  }
}
