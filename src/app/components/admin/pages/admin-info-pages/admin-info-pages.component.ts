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

@Component({
  selector: 'app-admin-info-pages',
  templateUrl: './admin-info-pages.component.html',
  styleUrls: ['./admin-info-pages.component.css']
})
export class AdminInfoPagesComponent implements OnInit {

  infoPages: InfoPage[];
  museum: Museum;

  languages = ['de', 'en', 'es', 'fr'];
  selectedLanguage = this.locale;

  breadcrumbs = [
    new Breadcrumb('Infoseiten')
  ];

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infoPageService: InfoPageService,
    private museumService: MuseumService,
    private router: Router,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService,
    private modalService: NgbModal,
    private fileService: FileService) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else {
      this.infoPageService.getInfoPages().subscribe(
        infoPages => this.infoPages = infoPages
      );

      this.museumService.getMuseums().subscribe(
        museums => {
          this.museum = museums[0];
        }
      );
    }
  }

  onSitePlanChanged(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    const file = inputElement.files[0];
    const randomFilename = FileService.randomizeFilename(file.name);

    // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
    inputElement.value = '';

    const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      const mapname = this.selectedLanguage === 'de' ? 'Karte' : 'map';
      this.museum.getContent(this.selectedLanguage).sitePlan = new Image(randomFilename, mapname);
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
