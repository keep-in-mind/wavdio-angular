import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {InfoPage} from '../../../../models/info-page';
import {InfoPageService} from '../../../../services/info-page.service';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-info-page',
  templateUrl: './admin-info-page.component.html',
  styleUrls: ['./admin-info-page.component.css']
})
export class AdminInfoPageComponent implements OnInit {

  infoPage: InfoPage;

  languages = ['de', 'en', 'es', 'fr'];

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  placeholder = utils.placeholder;

  breadcrumbs = [
    new Breadcrumb('Infoseiten', '/admin/info-pages'),
    new Breadcrumb('Infoseite')
  ];

  constructor(
    private infoPageService: InfoPageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {

      this.activatedRoute.params.subscribe(
        params => {
          const infoPageId = params.id;

          this.infoPageService.getInfoPage(infoPageId).subscribe(
            infoPage => this.infoPage = infoPage
          );
        });
    }
  }

  updateInfoPage() {
    if (!this.infoPage.name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.infoPage.name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    this.infoPageService.updateInfoPage(this.infoPage).subscribe(
      infoPage => {
        console.log(infoPage);
        if (this.infoPageService.errorCode === 500) {
          this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
            'Mehr Informationen finden Sie in den Serverlogs.');
        } else {
          this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
        }
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteInfoPage() {
    if (confirm('Sind Sie sicher, dass Sie diese Infoseite unwiderruflich löschen möchten?')) {

      this.infoPageService.deleteInfoPage(this.infoPage).subscribe(
        () => this.router.navigate(['admin/info-pages/'])
      );
    }
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
