import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Infopage} from '../../../models/infopage';
import {AuthenticationService} from '../../../services/authentification.service';
import {CookielawService} from '../../../services/cookielaw.service';
import {InfopageService} from '../../../services/infopage.service';
import {Breadcrumb} from '../../../models/breadcrumb';

@Component({
  selector: 'app-admin-page-info-page',
  templateUrl: './admin-page-info-page.component.html',
  styleUrls: ['./admin-page-info-page.component.css']
})
export class AdminPageInfoPageComponent implements OnInit {

  descHeader = 'Informationsseite bearbeiten';

  infopage: Infopage;

  languages = ['de', 'en', 'es', 'fr'];

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  placeholder =
    'Dieser Text kann mit Markdown formattiert werden.\n' +
    '\n' +
    'Leere Zeilen bewirken Absätze. Text kann *kursiv* oder **fett** gedruckt werden. ' +
    '[Links](www.google.de) auf externe Seiten sind ebenfalls möglich.\n' +
    '\n' +
    '### Unterkapitel\n' +
    '\n' +
    'Darüber hinaus sind viele weitere Formattierungen möglich (de.wikipedia.org/wiki/Markdown) wie zum Beispiel:\n' +
    '- Aufzählungen\n' +
    '- Tabellen\n' +
    '- Zitate';

  breadcrumbs = [
    new Breadcrumb('Infoseiten', '/admin/infopages'),
    new Breadcrumb('Infoseite')
  ];

  constructor(
    private infopageService: InfopageService,
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
          const infopageId = params.id;

          this.infopageService.getInfopage(infopageId).subscribe(
            infopage => this.infopage = infopage
          );
        });
    }
  }

  updateInfopage() {
    if (!this.infopage.name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.infopage.name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    this.infopageService.updateInfopage(this.infopage).subscribe(
      infopage => {
        console.log(infopage);
        if (this.infopageService.errorCode === 500) {
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

  deleteInfopage() {
    if (confirm('Sind Sie sicher, dass Sie diese Infoseite unwiderruflich löschen möchten?')) {

      this.infopageService.deleteInfopage(this.infopage).subscribe(
        () => this.router.navigate(['admin/infopages/'])
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
