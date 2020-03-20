import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Setting} from "../../models/setting";
import {Router} from "@angular/router";
import {SettingService} from "../../services/setting.service";

class Breadcrumb {
  text: string;
  url: string;

  constructor(text: string, url: string) {
    this.text = text;
    this.url = url;
  }
}

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() breadcrumbs: Breadcrumb[];

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
    private settingService: SettingService) {
  }

  ngOnInit() {
    this.settingService.getSettings().subscribe(settings => {
      console.log(settings);
      this.setting = settings[0];
    });
  }
}
