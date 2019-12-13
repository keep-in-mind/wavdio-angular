import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {Infopage} from '../../models/infopage';
import {InfopageService} from '../../services/infopage.service';
import {MuseumService} from '../../services/museum.service';
import {Museum} from '../../models/museum';
import {Image} from '../../models/image';

import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentification.service';
import {CookielawService} from '../../services/cookielaw.service';
import {FileService} from '../../services/file.service';
import {SpinnerComponent} from '../../helper/spinner/spinner.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-infopage-overwiev',
  templateUrl: './admin-infopages.component.html',
  styleUrls: ['./admin-infopages.component.css']
})
export class AdminInfopagesComponent implements OnInit {

  descHeader = 'Infoseiten';
  descInfopageBox = 'Infoseiten';
  descLageplan = 'Lageplan';

  infopages: Infopage[];
  museum: Museum;

  languages = ['de', 'en'];
  selectedLanguage = this.locale;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private infopageService: InfopageService,
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
      this.infopageService.getInfopages().subscribe(
        infopages => this.infopages = infopages
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

    const spinner = this.modalService.open(SpinnerComponent, {centered: true, backdrop: 'static', keyboard: false});
    this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
      const mapname = this.selectedLanguage === 'de' ? 'Karte' : 'map';
      this.getMuseumContent(this.selectedLanguage).sitePlan = new Image(randomFilename, mapname);
      this.museumService.updateMuseum(this.museum).subscribe();
      spinner.close();
    });
  }

  deleteSitePlan() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.selectedLanguage).sitePlan.filename).subscribe(() => {
      this.getMuseumContent(this.selectedLanguage).sitePlan = null;
      this.museumService.updateMuseum(this.museum).subscribe();
    });
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
