import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Setting} from '../../models/setting';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.css']
})
export class LanguageSelectionComponent implements OnInit {

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
    this.settingService.getSettings().subscribe(
      settings => this.setting = settings[0]
    );
  }
}
