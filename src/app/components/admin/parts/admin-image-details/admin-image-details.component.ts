import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

import {Exhibit} from '../../../../models/exhibit'
import {ExhibitService} from '../../../../services/exhibit.service'
import {Exposition} from '../../../../models/exposition'
import {ExpositionService} from '../../../../services/exposition.service'
import {FileService} from '../../../../services/file.service'
import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

@Component({
    selector: 'app-admin-image-details',
    templateUrl: './admin-image-details.component.html',
    styleUrls: ['./admin-image-details.component.css']
})
export class AdminImageDetailsComponent implements OnInit {

    exhibit: Exhibit
    exposition: Exposition
    museum: Museum
    index: number
    lang: string
    logo: boolean // if museum: show logo or image

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
            this.updateExposition()
        } else if (this.exhibit) {
            this.updateExhibit()
        } else if (this.museum) {
            this.updateMuseum()
        }
    }

    handleDelete() {
        if (this.exposition) {
            this.deleteExpositionImage()
        } else if (this.exhibit) {
            this.deleteExhibitImage()
        } else if (this.museum && this.logo) {
            this.deleteMuseumLogo()
        } else if (this.museum && !this.logo) {
            this.deleteMuseumImage()
        }
    }

    updateMuseum() {
        this.museumService.updateMuseum(this.museum).subscribe(
            result => {
                console.log(result)
                this.modal.close()
            }
        )
    }

    deleteMuseumLogo() {
        this.fileService.deleteFile(this.museum._id, this.museum.getContent(this.locale).logo.filename).subscribe(() => {
            this.museum.getContent(this.locale).logo = null
            this.updateMuseum()
        })
    }

    deleteMuseumImage() {
        this.fileService.deleteFile(this.museum._id, this.museum.getContent(this.locale).image.filename).subscribe(() => {
            this.museum.getContent(this.locale).image = null
            this.updateMuseum()
        })
    }

    updateExhibit() {
        this.exhibitService.updateExhibit(this.exhibit).subscribe(
            result => {
                console.log(result)
                this.modal.close()
            }
        )
    }

    deleteExhibitImage() {
        this.fileService.deleteFile(this.exhibit._id, this.exhibit.getContent(this.lang).images[this.index].filename).subscribe(() => {
            this.exhibit.getContent(this.lang).images.splice(this.index, 1)
            this.updateExhibit()
        })
    }


    updateExposition() {
        this.expositionService.updateExposition(this.exposition).subscribe(
            res => {
                console.log(res)
                this.modal.close()
            }
        )
    }

    deleteExpositionImage() {
        this.fileService.deleteFile(this.exposition._id, this.exposition.logo.filename).subscribe(() => {
            this.exposition.logo = null
            this.updateExposition()
        })
    }
}
