import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {Breadcrumb} from '../../models/breadcrumb';
import {Setting} from '../../models/setting';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() breadcrumbs: Breadcrumb[];
  @Output() languageSelected: EventEmitter<string> = new EventEmitter<string>();

  setting: Setting;
  selectedLanguage: string = this.locale;

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

  onLanguageSelected(lang: string) {
    this.selectedLanguage = lang;
    this.languageSelected.emit(lang);
  }
}
