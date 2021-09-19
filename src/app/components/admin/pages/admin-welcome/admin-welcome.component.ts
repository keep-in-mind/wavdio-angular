import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {Router} from '@angular/router'

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
    selector: 'app-admin-welcome',
    templateUrl: './admin-welcome.component.html',
    styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

    breadcrumbs: Breadcrumb[] = [
        new Breadcrumb('Willkommen')
    ]

    selectedLanguage = this.locale

    alertType: number
    alertMessage: string
    showAlert: boolean

    museum: Museum

    placeholder = utils.placeholder

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private auth: AuthenticationService,
        private router: Router,
        private museumService: MuseumService,
        private fileService: FileService,
        private modalService: NgbModal,
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
        this.museumService.updateMuseum(this.museum).subscribe(updatedMuseum => {
            if (this.museumService.errorCode === 500) {
                this.showAlertMessage(3, 5,
                    'Es ist ein Fehler aufgetreten. Mehr Informationen finden Sie in den Server-Logs.')
            } else {
                this.showAlertMessage(0, 5, 'Ihre Änderungen wurden erfolgreich übernommen')
            }
        })
    }

    uploadLogo(event: Event) {
        const inputElement = <HTMLInputElement>event.target
        const file = inputElement.files[0]
        const randomFilename = FileService.randomizeFilename(file.name)

        // reset invisible <input> for next, potentially identical file selection (ensure onChange() call)
        inputElement.value = ''

        const spinner = this.modalService.open(AdminSpinnerComponent, {centered: true, backdrop: 'static', keyboard: false})
        this.fileService.uploadFile(this.museum._id, file, randomFilename).subscribe(() => {
            this.museum.getContent(this.selectedLanguage).logo = new Image(randomFilename, 'alt')
            this.museumService.updateMuseum(this.museum).subscribe()
            spinner.close()
        })
    }

    deleteLogo() {
        this.fileService.deleteFile(this.museum._id, this.museum.getContent(this.selectedLanguage).logo.filename).subscribe(() => {
            this.museum.getContent(this.selectedLanguage).logo = null
            this.museumService.updateMuseum(this.museum).subscribe()
        })
    }

    openLogoBigView() {
        const modal = this.modalService.open(AdminImageDetailsComponent, {centered: true})
        modal.componentInstance.museum = this.museum
        modal.componentInstance.logo = true
    }

    private showAlertMessage(type: number, seconds: number, message: string) {
        this.showAlert = true
        this.alertType = type
        this.alertMessage = message

        setTimeout(() => this.showAlert = false, seconds * 1000)
    }
}
