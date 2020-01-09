import {HttpClient} from '@angular/common/http';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ImageDetailsComponent} from '../../helper/image-details/image-details.component';
import {SpinnerComponent} from '../../helper/spinner/spinner.component';
import {Image} from '../../models/image';
import {Museum} from '../../models/museum';
import {AuthenticationService, TokenPayloadUpdate} from '../../services/authentification.service';
import {CookielawService} from '../../services/cookielaw.service';
import {FileService} from '../../services/file.service';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  descHeader = 'Persönlicher Bereich';
  descLogo = 'Logo';

  user: TokenPayloadUpdate = {
    username: '',
    password: '',
    newUsername: '',
    newPassword: ''
  };
  museum: Museum;

  languages = ['de', 'en'];
  selectedLanguage = this.locale;
  newPasswordRepeat: string;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

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

  openImageBigView() {
    const modal = this.modalService.open(ImageDetailsComponent, {centered: true});
    modal.componentInstance.museum = this.museum;
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

    const spinner = this.modalService.open(SpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      this.museum.logo = new Image(randomFilename, 'alt');
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  deleteLogo() {
    this.fileService.deleteFile(this.museum._id, this.museum.logo.filename).subscribe(() => {
      this.museum.logo = null;
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
