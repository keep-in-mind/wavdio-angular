import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitContent} from '../../../../models/exhibit-content';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-new-exhibit',
  templateUrl: './admin-new-exhibit.component.html',
  styleUrls: ['./admin-new-exhibit.component.css']
})
export class AdminNewExhibitComponent implements OnInit {

  museum: Museum;
  exhibit: Exhibit;
  expositionId: string;

  selectedLanguage = this.locale;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  placeholder = utils.placeholder;

  breadcrumbs: Breadcrumb[] = null; // created when exhibit loaded

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

              if (parentModel === 'Museum') {
                this.breadcrumbs = [
                  new Breadcrumb('Home', '/admin/home'),
                  new Breadcrumb('Neues Exponat')];
              } else {
                this.breadcrumbs = [
                  new Breadcrumb('Home', '/admin/home'),
                  new Breadcrumb('Ausstellung', '/admin/exposition/' + this.expositionId),
                  new Breadcrumb('Neues Exponat')];
              }

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
