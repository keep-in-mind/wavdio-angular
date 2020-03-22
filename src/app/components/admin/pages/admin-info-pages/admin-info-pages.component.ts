import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminSpinnerComponent} from '../../parts/admin-spinner/admin-spinner.component';
import {AuthenticationService} from '../../../../services/authentification.service';
import {Breadcrumb} from '../../../../models/breadcrumb';
import {CookielawService} from '../../../../services/cookielaw.service';
import {FileService} from '../../../../services/file.service';
import {Image} from '../../../../models/image';
import {InfoPage} from '../../../../models/info-page';
import {InfoPageService} from '../../../../services/info-page.service';
import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

import {utils} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-info-pages',
  templateUrl: './admin-info-pages.component.html',
  styleUrls: ['./admin-info-pages.component.css']
})
export class AdminInfoPagesComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb('Infoseiten')
  ];

  selectedLanguage = this.locale;

  alertType: number;
  alertMessage: string;
  showAlert: boolean;

  museum: Museum;
  infoPages: InfoPage[];

  placeholder = utils.placeholder;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private auth: AuthenticationService,
    private router: Router,
    private museumService: MuseumService,
    private infoPageService: InfoPageService,
    private modalService: NgbModal,
    private fileService: FileService,
    public cookieLawService: CookielawService,
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

    this.infoPageService.getInfoPages().subscribe(infoPages => {
      this.infoPages = infoPages;
    });
  }

  uploadSitePlan(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      this.museum.getContent(this.selectedLanguage).sitePlan = new Image(randomFilename, null);
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  deleteSitePlan() {
    this.fileService.deleteFile(this.museum._id, this.museum.getContent(this.selectedLanguage).sitePlan.filename).subscribe(() => {
      this.museum.getContent(this.selectedLanguage).sitePlan = null;
      this.museumService.updateMuseum(this.museum).subscribe();
    });
  }
}
