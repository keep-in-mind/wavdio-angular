import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AuthenticationService} from '../../../services/authentification.service';
import {Breadcrumb} from '../../../models/breadcrumb';
import {FileService} from '../../../services/file.service';
import {Image} from '../../../models/image';
import {ImageDetailsComponent} from '../../../helper/image-details/image-details.component';
import {Museum} from '../../../models/museum';
import {MuseumService} from '../../../services/museum.service';
import {SpinnerComponent} from '../../../helper/spinner/spinner.component';

@Component({
  selector: 'app-admin-page-museum',
  templateUrl: './admin-page-museum.component.html',
  styleUrls: ['./admin-page-museum.component.css']
})
export class AdminPageMuseumComponent implements OnInit {

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
    new Breadcrumb('Museum')
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private modalService: NgbModal,
    private fileService: FileService,
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

  updateExposition() {
    if (!this.getMuseumContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5,
        'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }

    if (this.getMuseumContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5,
        'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }

    this.museumService.updateMuseum(this.museum).subscribe(res => {
        if (this.museumService.errorCode === 500) {
          this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
            'Mehr Informationen finden Sie in den Serverlogs.');
        } else {
          this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
        }
      }
    );
  }

  deleteExposition() {
    if (confirm('Sind Sie sicher, dass Sie diese Ausstellung löschen möchten? ' +
      'Alle Ausstellungsstücke und die dazugehörigen Medien gehen dabei ebenfalls unwiderruflich verloren.')) {

      this.museumService.deleteMuseum(this.museum).subscribe(res => {
        this.router.navigate(['/admin/home']);
      }, (err) => {
        console.log(err);
        this.showAlertMessage(3, 5,
          'Da ist etwas schief gegangen. Prüfen Sie bitte erneut Ihre Eingabedaten.');
      });
    }
  }

  onImageChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(SpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      this.getMuseumContent(this.selectedLanguage).image = new Image(randomFilename, 'alt');
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  deleteImage() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.selectedLanguage).image.filename).subscribe(() => {
      this.getMuseumContent(this.selectedLanguage).image = null;
      this.museumService.updateMuseum(this.museum).subscribe();
    });
  }

  openImageBigView() {
    const modal = this.modalService.open(ImageDetailsComponent, {centered: true});
    modal.componentInstance.museum = this.museum;
    modal.componentInstance.image = true;
  }

  getMuseumContent(locale: string) {
    for (const content of this.museum.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing museum
    console.error(`MuseumContent missing for locale ${locale}`);
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
