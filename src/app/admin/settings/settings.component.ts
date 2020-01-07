import {Component, OnInit} from '@angular/core';
import {CookielawService} from '../../services/cookielaw.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    public cookieLawService: CookielawService) {
  }

  ngOnInit() {
  }
}
