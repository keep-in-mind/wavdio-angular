import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {Exposition} from '../../../../models/exposition';
import {ExpositionContent} from '../../../../models/exposition-content';
import {ExpositionService} from '../../../../services/exposition.service';
import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

@Component({
  selector: 'app-admin-new-exposition',
  templateUrl: './admin-new-exposition.component.html',
  styleUrls: ['./admin-new-exposition.component.css']
})
export class AdminNewExpositionComponent implements OnInit {

  descHeader = 'Ausstellung anlegen';

  exposition: Exposition;
  museum: Museum;

  languages = ['de', 'en', 'es', 'fr'];
  selectedLanguage = this.locale;

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

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb('Home', '/admin/home'),
    new Breadcrumb('Neue Ausstellung')
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService,
    private expositionService: ExpositionService,
    private router: Router,
    private auth: AuthenticationService) {
  }

  ngOnInit() {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.museumService.getMuseums().subscribe(
        museums => {
          this.museum = museums[0];

          const germanContent = new ExpositionContent('de', '', '');
          const englishContent = new ExpositionContent('en', '', '');
          const spanishContent = new ExpositionContent('es', '', '');
          const frenchContent = new ExpositionContent('fr', '', '');
          this.exposition = new Exposition(
            this.museum._id,
            true,
            0,
            '',
            null,
            [],
            [],
            [],
            [germanContent, englishContent, spanishContent, frenchContent]);
        }
      );
    }
  }

  createExposition() {
    if (!this.getExpositionContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.getExpositionContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    this.expositionService.createExposition(this.exposition).subscribe(
      exposition => {
        this.router.navigate(['admin/exposition/', exposition._id]);
        if (this.expositionService.errorCode === 500) {
          this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
            'Mehr Informationen finden Sie in den Serverlogs.');
        } else {
          this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
        }
      }
    );
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.showAlert = false, seconds * 1000);
  }

  getExpositionContent(locale: string) {
    for (const content of this.exposition.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exposition
    console.error(`ExpositionContent missing for locale ${locale}`);
  }
}
