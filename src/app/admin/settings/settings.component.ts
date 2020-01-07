import {Component, OnInit} from '@angular/core';
import {CookielawService} from '../../services/cookielaw.service';
import {SettingService} from '../../services/setting.service';
import {AuthenticationService} from '../../services/authentification.service';
import {Router} from '@angular/router';
import {Setting} from '../../models/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  setting: Setting;

  descHeader = 'Einstellungen';

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
}
