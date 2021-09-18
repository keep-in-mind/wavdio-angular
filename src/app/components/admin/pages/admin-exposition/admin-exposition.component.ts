import {HttpClient} from '@angular/common/http';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminImageDetailsComponent} from '../../parts/admin-image-details/admin-image-details.component';
// import {AdminQrCodeComponent} from '../../parts/admin-qr-code/admin-qr-code.component';
import {AdminSpinnerComponent} from '../../parts/admin-spinner/admin-spinner.component';
import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';
import {FileService} from '../../../../services/file.service';
import {Image} from '../../../../models/image';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-exposition',
  templateUrl: './admin-exposition.component.html',
  styleUrls: ['./admin-exposition.component.css']
})
export class AdminExpositionComponent implements OnInit {

  exposition: Exposition;
  exhibits: Exhibit[];

  selectedLanguage = this.locale;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  placeholder = utils.placeholder;

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb('Exponate & Rundgänge', '/admin/exhibits-expositions'),
    new Breadcrumb('Rundgang')
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private expositionService: ExpositionService,
    private exhibitService: ExhibitService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    public cookieLawService: CookielawService,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {

      this.activatedRoute.params.subscribe(
        params => {
          const expositionId = params.id;

          this.expositionService.getExposition(expositionId).subscribe(
            exposition => {
              this.exposition = exposition;

              this.exhibitService.getExhibits().subscribe(
                exhibits => {
                  this.exhibits = exhibits
                    .filter(exhibit => this.exposition._id === exhibit.parent)
                    .sort((e1, e2) => e1.code - e2.code);
                }
              );
            }
          );
        });
    }
  }

  updateExposition() {
    if (!this.exposition.getContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.exposition.getContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    this.expositionService.updateExposition(this.exposition).subscribe(
      res => {
        console.log(res);
        if (this.exhibitService.errorCode === 500) {
          this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
            'Mehr Informationen finden Sie in den Serverlogs.');
        } else {
          this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen');
        }
      }
    );
  }

  openImageBigView() {
    const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true});
    modal.componentInstance.exposition = this.exposition;
  }

  openQRCode() {
    // const modal = this.modalService.open(AdminQrCodeComponent, {centered: true});
    // modal.componentInstance.exhibits = this.exhibits;
    // modal.componentInstance.lang = this.selectedLanguage;
  }

  deleteExposition() {
    if (confirm('Sind Sie sicher, dass Sie diesen Rundgang löschen möchten? ' +
      'Alle Exponate und die dazugehörigen Medien gehen dabei ebenfalls unwiderruflich verloren.')) {

      this.expositionService.deleteExposition(this.exposition)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/admin/exhibits-expositions']);
        }, (err) => {
          console.log(err);
          this.showAlertMessage(3, 5, 'Da ist etwas schief gegangen. Prüfen Sie bitte erneut Ihre Eingabedaten.');
        });
    }
  }

  onLogoChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.exposition._id, file, randomFilename).subscribe(() => {
      this.exposition.logo = new Image(randomFilename, 'alt');
      this.expositionService.updateExposition(this.exposition).subscribe();
      spinner.close();
    });
  }

  deleteLogo() {
    this.fileService.deleteFile(this.exposition._id, this.exposition.logo.filename).subscribe(() => {
      this.exposition.logo = null;
      this.expositionService.updateExposition(this.exposition).subscribe();
    });
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
