import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentification.service';
import {Museum} from '../../models/museum';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-admin-museum',
  templateUrl: './admin-museum.component.html',
  styleUrls: ['./admin-museum.component.css']
})
export class AdminMuseumComponent implements OnInit {

  museum: Museum;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router,
    private museumService: MuseumService
  ) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
      return;
    }

    this.museumService.getMuseums().subscribe(museums => {
      this.museum = museums[0];
    });
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
