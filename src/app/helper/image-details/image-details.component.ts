import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Exhibit} from '../../models/exhibit';
import {Exposition} from '../../models/exposition';
import {Museum} from '../../models/museum';
import {MuseumContent} from '../../models/museum-content';
import {ExhibitService} from '../../services/exhibit.service';
import {ExpositionService} from '../../services/exposition.service';
import {FileService} from '../../services/file.service';
import {MuseumService} from '../../services/museum.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  exhibit: Exhibit;
  exposition: Exposition;
  museum: Museum;
  index: number;
  lang: string;
  logo: boolean; // if museum: show logo or image

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public modal: NgbActiveModal,
    private exhibitService: ExhibitService,
    private expositionService: ExpositionService,
    private museumService: MuseumService,
    private fileService: FileService
  ) {
  }

  ngOnInit() {

  }

  handleUpdate() {
    if (this.exposition) {
      this.updateExposition();
    } else if (this.exhibit) {
      this.updateExhibit();
    } else if (this.museum) {
      this.updateMuseum();
    }
  }

  handleDelete() {
    if (this.exposition) {
      this.deleteExpositionImage();
    } else if (this.exhibit) {
      this.deleteExhibitImage();
    } else if (this.museum && this.logo) {
      this.deleteMuseumLogo();
    } else if (this.museum && !this.logo) {
      this.deleteMuseumImage();
    }
  }

  updateMuseum() {
    this.museumService.updateMuseum(this.museum).subscribe(
      result => {
        console.log(result);
        this.modal.close();
      }
    );
  }

  deleteMuseumLogo() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.locale).logo.filename).subscribe(() => {
      this.getMuseumContent(this.locale).logo = null;
      this.updateMuseum();
    });
  }

  deleteMuseumImage() {
    this.fileService.deleteFile(this.museum._id, this.getMuseumContent(this.locale).image.filename).subscribe(() => {
      this.getMuseumContent(this.locale).image = null;
      this.updateMuseum();
    });
  }

  updateExhibit() {
    this.exhibitService.updateExhibit(this.exhibit).subscribe(
      result => {
        console.log(result);
        this.modal.close();
      }
    );
  }

  deleteExhibitImage() {
    this.fileService.deleteFile(this.exhibit._id, this.getExhibitContent(this.lang).images[this.index].filename).subscribe(() => {
      this.getExhibitContent(this.lang).images.splice(this.index, 1);
      this.updateExhibit();
    });
  }


  updateExposition() {
    this.expositionService.updateExposition(this.exposition).subscribe(
      res => {
        console.log(res);
        this.modal.close();
      }
    );
  }

  deleteExpositionImage() {
    this.fileService.deleteFile(this.exposition._id, this.exposition.logo.filename).subscribe(() => {
      this.exposition.logo = null;
      this.updateExposition();
    });
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

  getMuseumContent(lang: String): MuseumContent {

    /* return localized content */

    for (const content of this.museum.contents) {
      if (content.lang === lang) {
        return content;
      }
    }

    /* not available ? fall back to German */

    console.warn('No localized content available for locale ' + lang);

    for (const content of this.museum.contents) {
      if (content.lang === 'de') {
        return content;
      }
    }

    /* not available ? must not happen. has to be created when constructing exposition */

    console.error('No German fallback content available');
  }
}
