import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminImageDetailsComponent} from '../../parts/admin-image-details/admin-image-details.component';
import {AdminQrCodeComponent} from '../../parts/admin-qr-code/admin-qr-code.component';
import {AdminSpinnerComponent} from '../../parts/admin-spinner/admin-spinner.component';
import {Audio} from '../../../../models/audio';
import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitService} from '../../../../services/exhibit.service';
import {FileService} from '../../../../services/file.service';
import {Image} from '../../../../models/image';
import {Transcript} from '../../../../models/transcript';
import {Video} from '../../../../models/video';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-exhibit',
  templateUrl: './admin-exhibit.component.html',
  styleUrls: ['./admin-exhibit.component.css']
})
export class AdminExhibitComponent implements OnInit {

  exhibit: Exhibit;

  selectedLanguage = this.locale;

  placeholder = utils.placeholder;

  iconAudio: ElementRef;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  @ViewChild('iconAudio', {static: false}) set content6(content: ElementRef) {
    this.iconAudio = content;
  }

  breadcrumbs: Breadcrumb[] = null; // created when exhibit loaded

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private exhibitService: ExhibitService,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService,
    private config: NgbDropdownConfig,
    private fileService: FileService) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.activatedRoute.params.subscribe(
        params => {
          const exhibitId = params.id;

          this.exhibitService.getExhibit(exhibitId).subscribe(
            exhibit => {
              this.exhibit = exhibit;

              if (this.exhibit.parentModel === 'Museum') {
                this.breadcrumbs = [
                  new Breadcrumb('Exponate & Rundgänge', '/admin/exhibits-expositions'),
                  new Breadcrumb('Exponat')];
              } else {
                this.breadcrumbs = [
                  new Breadcrumb('Exponate & Rundgänge', '/admin/exhibits-expositions'),
                  new Breadcrumb('Ausstellung', '/admin/exposition/' + this.exhibit.parent),
                  new Breadcrumb('Exponat')];
              }
            }
          );
        }
      );
    }
  }

  openTranscript(content) {
    this.modalService.open(content);
  }

  openQRCode() {
    const modal = this.modalService.open(AdminQrCodeComponent, {centered: true});
    modal.componentInstance.exhibits.push(this.exhibit);
    modal.componentInstance.lang = this.selectedLanguage;
  }

  openImageBigView(index, lang) {
    const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true});
    modal.componentInstance.exhibit = this.exhibit;
    modal.componentInstance.index = index;
    modal.componentInstance.lang = lang;
  }

  deleteAudio(filename: string) {
    this.fileService.deleteFile(this.exhibit._id, filename).subscribe(() => {
      const audios = this.exhibit.getContent(this.selectedLanguage).audio;
      audios.splice(audios.findIndex(audio => audio.filename === filename), 1);
      this.updateExhibit();
    });
  }

  deleteVideo(filename: string) {
    this.fileService.deleteFile(this.exhibit._id, filename).subscribe(() => {
      const videos = this.exhibit.getContent(this.selectedLanguage).video;
      videos.splice(videos.findIndex(video => video.filename === filename), 1);
      this.updateExhibit();
    });
  }

  deleteTranscript(filename: string) {
    if (!confirm('Sind Sie sicher, dass Sie das Transkript unwiderruflich löschen möchten?')) {
      return;
    }
    this.fileService.deleteFile(this.exhibit._id, filename).subscribe(() => {
      this.exhibit.getContent(this.selectedLanguage).transcript = null;
      this.updateExhibit();
    });
  }

  deleteExhibit() {
    const parentModel = this.exhibit.parentModel;
    if (confirm('Sind Sie sicher, dass Sie dieses Ausstellungsstück unwiderruflich löschen möchten?')) {
      this.exhibitService.deleteExhibit(this.exhibit).subscribe(
        result => {
          if (parentModel === 'Museum') {
            this.router.navigate(['admin/exhibits-expositions']);
          } else {
            this.router.navigate(['admin/exposition/', this.exhibit.parent]);
          }
        }
      );
    }
  }

  onTranscriptChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];

    if (!(file.name.endsWith('.txt'))) {
      alert('Only text files (.txt) allowed.');
      return;
    }

    const randomFilename = FileService.randomizeFilename(file.name);
    const reader = new FileReader();
    reader.readAsText(file);
    let text;

    reader.onload = () => {
      text = reader.result;
      const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
      this.fileService.uploadFile(this.exhibit._id, file, randomFilename).subscribe(() => {
        this.exhibit.getContent(this.selectedLanguage).transcript = new Transcript(randomFilename, text);
        this.updateExhibit();
        spinner.close();
      });
    };
  }

  onImageChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.exhibit._id, file, randomFilename).subscribe(() => {
      this.exhibit.getContent(this.selectedLanguage).images.push(new Image(randomFilename, 'alt'));
      this.updateExhibit();
      spinner.close();
    });
  }

  onAudioChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    if (!(file.type.startsWith('Audio') || file.type.startsWith('audio') || file.type.startsWith('video/ogg'))) {
      alert('Only audio types allowed.');
      return;
    }

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.exhibit._id, file, file.name).subscribe(() => {
      this.exhibit.getContent(this.selectedLanguage).audio.push(new Audio(file.name, file.type));
      this.updateExhibit();
      spinner.close();
    });
  }

  onVideoChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    if (!(file.type.startsWith('video'))) {
      alert('Only video types allowed.');
      return;
    }

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.exhibit._id, file, file.name).subscribe(() => {
      this.exhibit.getContent(this.selectedLanguage).video.push(new Video(file.name, file.type, 'transcript'));
      this.updateExhibit();
      spinner.close();
    });
  }

  updateExhibit() {
    if (!this.exhibit.getContent(this.selectedLanguage).name) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.exhibit.getContent(this.selectedLanguage).name.startsWith(' ')) {
      this.showAlertMessage(3, 5, 'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
        'Bitte korrigieren Sie Ihre Eingabe.');
      return;
    }
    if (this.exhibit.code < 100 || this.exhibit.code > 999) {
      this.showAlertMessage(3, 5, 'Der angegebene Code für das Ausstellungsstück ist ungültig. ' +
        'Bitte wählen Sie einen Code von 100 bis 999');
      return;
    }
    this.exhibitService.updateExhibit(this.exhibit).subscribe(
      result => {
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
        }

      }, (err) => {
        console.log(err);
      }
    );
  }

  private showAlertMessage(type: number, seconds: number, message: string) {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.showAlert = false, seconds * 1000);
  }
}
