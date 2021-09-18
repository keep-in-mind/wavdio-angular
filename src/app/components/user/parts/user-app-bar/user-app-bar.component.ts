import {Location} from '@angular/common';
import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Router} from '@angular/router';

import {Setting} from '../../../../models/setting';
import {SettingService} from '../../../../services/setting.service';

@Component({
  selector: 'app-user-app-bar',
  templateUrl: './user-app-bar.component.html',
  styleUrls: ['./user-app-bar.component.css']
})
export class UserAppBarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  @Input() backArrow: boolean;
  @Input() backUrl: string;
  @Input() title: string;

  setting: Setting;

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
