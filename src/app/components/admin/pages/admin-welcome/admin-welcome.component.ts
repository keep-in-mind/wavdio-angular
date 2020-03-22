import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb('Willkommen')
  ];

  selectedLanguage = this.locale;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  museum: Museum;

  placeholder = utils.placeholder;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private auth: AuthenticationService,
    private router: Router,
    private museumService: MuseumService,
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

  updateMuseum() {
    this.museumService.updateMuseum(this.museum).subscribe(updatedMuseum => {
      if (this.museumService.errorCode === 500) {
        this.showAlertMessage(3, 5,
          'Es ist ein Fehler aufgetreten. Mehr Informationen finden Sie in den Server-Logs.');
      } else {
        this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
      }
    });
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
