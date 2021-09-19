import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {AdminImageDetailsComponent} from '../../parts/admin-image-details/admin-image-details.component'
import {AdminSpinnerComponent} from '../../parts/admin-spinner/admin-spinner.component'
import {AuthenticationService} from '../../../../services/authentification.service'
import {Breadcrumb} from '../../../../models/breadcrumb'
import {FileService} from '../../../../services/file.service'
import {Image} from '../../../../models/image'
import {Museum} from '../../../../models/museum'
import {MuseumService} from '../../../../services/museum.service'

import {utils} from '../../../../utils/utils'

@Component({
    selector: 'app-admin-museum',
    templateUrl: './admin-museum.component.html',
    styleUrls: ['./admin-museum.component.css']
})
export class AdminMuseumComponent implements OnInit {

    museum: Museum

    selectedLanguage = this.locale

    alertType: number
    alertMessage: string
    showAlert: boolean

    placeholder = utils.placeholder

    breadcrumbs: Breadcrumb[] = [
        new Breadcrumb('Museum')
    ]

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
            this.router.navigate(['/admin'])
            return
        }

        this.museumService.getMuseums().subscribe(museums => {
            this.museum = museums[0]
        })
    }

    updateMuseum() {
        if (!this.museum.getContent(this.selectedLanguage).name) {
            this.showAlertMessage(3, 5,
                'Das Titelfeld darf nicht leer sein. Bitte korrigieren Sie Ihre Eingabe.')
            return
        }

        if (this.museum.getContent(this.selectedLanguage).name.startsWith(' ')) {
            this.showAlertMessage(3, 5,
                'Das Titelfeld darf keine vorangestellten Leerzeichen beinhalten. ' +
                'Bitte korrigieren Sie Ihre Eingabe.')
            return
        }

        this.museumService.updateMuseum(this.museum).subscribe(res => {
                if (this.museumService.errorCode === 500) {
                    this.showAlertMessage(3, 5, 'Es ist ein Fehler aufgetreten. ' +
                        'Mehr Informationen finden Sie in den Serverlogs.')
                } else {
                    this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen')
                }
            }
        )
    }

    onImageChanged(event: Event) {
        const inputElement = <HTMLInputElement>event.target
        const file = inputElement.files[0]
        const randomFilename = FileService.randomizeFilename(file.name)

        // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
        inputElement.value = ''

        const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false})
        this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
            this.museum.getContent(this.selectedLanguage).image = new Image(randomFilename, 'alt')
            this.museumService.updateMuseum(this.museum).subscribe()
            spinner.close()
        })
    }

    deleteImage() {
        this.fileService.deleteFile(this.museum._id, this.museum.getContent(this.selectedLanguage).image.filename).subscribe(() => {
            this.museum.getContent(this.selectedLanguage).image = null
            this.museumService.updateMuseum(this.museum).subscribe()
        })
    }

    openImageBigView() {
        const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true})
        modal.componentInstance.museum = this.museum
        modal.componentInstance.image = true
    }

    private showAlertMessage(type: number, seconds: number, message: string) {
        this.showAlert = true
        this.alertType = type
        this.alertMessage = message

        setTimeout(() => this.showAlert = false, seconds * 1000)
    }
}
