import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {Setting} from '../../../../models/setting';
import {SettingService} from '../../../../services/setting.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  setting: Setting;

  breadcrumbs: Breadcrumb[] = [new Breadcrumb('Einstellungen')];

  constructor(
    private router: Router,
    private settingService: SettingService,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.settingService.getSettings().subscribe(
        settings => this.setting = settings[0]
      );
    }
  }

  updateSetting() {
    console.log(this.setting);
    this.settingService.updateSetting(this.setting).subscribe(
      res => {
        console.log(res);
        // if (this.settingService.errorCode === 500) {
        //   this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
        //     'Mehr Informationen finden Sie in den Serverlogs.');
        // } else {
        //   this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
        // }
      }
    );
  }
}
