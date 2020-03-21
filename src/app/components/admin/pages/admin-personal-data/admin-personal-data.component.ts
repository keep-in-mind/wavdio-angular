import {HttpClient} from '@angular/common/http';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminImageDetailsComponent} from '../../parts/admin-part-image-details/admin-image-details.component';
import {AdminSpinnerComponent} from '../../parts/admin-part-spinner/admin-spinner.component';
import {AuthenticationService, TokenPayloadUpdate} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {FileService} from '../../../../services/file.service';
import {Image} from '../../../../models/image';
import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

@Component({
  selector: 'app-admin-personal-data',
  templateUrl: './admin-personal-data.component.html',
  styleUrls: ['./admin-personal-data.component.css']
})
export class AdminPersonalDataComponent implements OnInit {

  user: TokenPayloadUpdate = {
    username: '',
    password: '',
    newUsername: '',
    newPassword: ''
  };
  museum: Museum;

  languages = ['de', 'en', 'es', 'fr'];
  selectedLanguage = this.locale;
  newPasswordRepeat: string;

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

  breadcrumbs: Breadcrumb[] = [new Breadcrumb('Persönlicher Bereich')];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService,
    private fileService: FileService) {
  }

  updateUser() {
    if (this.user.newPassword === this.newPasswordRepeat) {
      this.auth.update(this.user).subscribe();
      this.router.navigate(['/admin/home']);
    }
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {

      this.museumService.getMuseums().subscribe(
        museums => {
          this.museum = museums[0];
        }
      );
    }
  }

  openLogoBigView() {
    const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true});
    modal.componentInstance.museum = this.museum;
    modal.componentInstance.logo = true;
  }

  openImageBigView() {
    const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true});
    modal.componentInstance.museum = this.museum;
    modal.componentInstance.logo = false;
  }

  updateMuseum() {
    if (!this.getMuseumContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5, 'Der Name des Museums darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.getMuseumContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Der Name des Museums darf keine vorangestellten Leerzeichen beinhalten.' +
        ' Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    this.museumService.updateMuseum(this.museum).subscribe(
      museum => {
        console.log(museum);
        if (this.museumService.errorCode === 500) {
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

  onLogoChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      this.getMuseumContent(this.locale).logo = new Image(randomFilename, 'alt');
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  onImageChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      this.getMuseumContent(this.locale).image = new Image(randomFilename, 'alt');
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  deleteLogo() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.locale).logo.filename).subscribe(() => {
      this.getMuseumContent(this.locale).logo = null;
      this.museumService.updateMuseum(this.museum).subscribe();
    });
  }

  deleteImage() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.locale).image.filename).subscribe(() => {
      this.getMuseumContent(this.locale).image = null;
      this.museumService.updateMuseum(this.museum).subscribe();
    });
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.showAlert = false, seconds * 1000);
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
}
