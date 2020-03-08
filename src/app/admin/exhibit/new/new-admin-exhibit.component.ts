import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../../../services/authentification.service';
import {CookielawService} from '../../../services/cookielaw.service';
import {Exhibit} from '../../../models/exhibit';
import {ExhibitContent} from '../../../models/exhibit-content';
import {ExhibitService} from '../../../services/exhibit.service';
import {Museum} from '../../../models/museum';
import {MuseumService} from '../../../services/museum.service';

@Component({
  selector: 'app-new-admin-exhibit',
  templateUrl: './new-admin-exhibit.component.html',
  styleUrls: ['./new-admin-exhibit.component.css']
})
export class NewAdminExhibitComponent implements OnInit {

  descHeader = 'Ausstellungsstück anlegen';

  museum: Museum;
  exhibit: Exhibit;
  expositionId: string;

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

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService,
    private exhibitService: ExhibitService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService
  ) {
  }

  ngOnInit() {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {

      this.activatedRoute.params.subscribe(
        params => {
          this.expositionId = params.expo_id;

          this.museumService.getMuseums().subscribe(
            museums => {
              const museumId = museums[0]._id;

              const parentModel = this.expositionId === museumId ? 'Museum' : 'Exposition';

              this.exhibitService.getExhibits().subscribe(
                exhibits => {
                  let array = [];
                  for (let i = 100; i < 1000; i++) {
                    array.push(i);
                  }

                  exhibits.forEach(ex => array = array.filter(a => a !== ex.code));

                  const minCode = array.reduce((min, code) => code < min ? code : min, 999);

                  const germanContent = new ExhibitContent('de', '', '', null, [], [], []);
                  const englishContent = new ExhibitContent('en', '', '', null, [], [], []);
                  const spanishContent = new ExhibitContent('es', '', '', null, [], [], []);
                  const frenchContent = new ExhibitContent('fr', '', '', null, [], [], []);
                  this.exhibit = new Exhibit(
                    this.expositionId,
                    parentModel,
                    true,
                    minCode,
                    '',
                    [],
                    [],
                    [],
                    [germanContent, englishContent, spanishContent, frenchContent]);

                });
            });
        });
    }
  }

  createExhibit() {
    if (!this.getExhibitContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.getExhibitContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.exhibit.code < 100 || this.exhibit.code > 999) {
      this.showAlertMessage(3, 5, 'Der angegebene Code für das Ausstellungsstück ist ungültig. ' +
        'Bitte wählen Sie einen Code von 100 bis 999');
      return;
    }
    this.exhibitService.createExhibit(this.exhibit).subscribe(
      exhibit => {
        if (this.exhibitService.errorCode === 500) {
          this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
            'Mehr Informationen finden Sie in den Serverlogs.');
          this.exhibitService.errorCode = 0;
        } else if (this.exhibitService.errorCode === 13) {
          this.showAlertMessage(3, 5, 'Der angegebene Code ist bereits für ein anderes Ausstellungsstück vergeben. ' +
            'Bitte wählen Sie einen anderen Code.');
          this.exhibitService.errorCode = 0;

        } else if (this.exhibitService.errorCode === 0) {
          this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
          this.router.navigate(['admin/exhibit/', exhibit._id]);
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

  getExhibitContent(locale: string) {
    for (const content of this.exhibit.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
  }
}
