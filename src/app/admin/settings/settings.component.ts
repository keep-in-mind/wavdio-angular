import {Component, OnInit} from '@angular/core';
import {CookielawService} from '../../services/cookielaw.service';
import {SettingService} from '../../services/setting.service';
import {AuthenticationService} from '../../services/authentification.service';
import {Router} from '@angular/router';
import {Setting} from '../../models/setting';
import {Breadcrumb} from "../../models/breadcrumb";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  setting: Setting;

  descHeader = 'Einstellungen';

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
    console.log(this.setting)
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
