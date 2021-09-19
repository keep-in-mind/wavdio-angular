import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'app-admin-alert',
    templateUrl: './admin-alert.component.html',
    styleUrls: ['./admin-alert.component.css']
})
export class AdminAlertComponent implements OnInit {

    alertTypes = [
        'success',
        'info',
        'warning',
        'danger',
        'primary',
        'secondary',
        'light',
        'dark'
    ]

    constructor() {
    }

    @Input() alertType: number
    @Input() alertMessage: string
    @Input() alertTimeout: number

    ngOnInit(): void {
    }

}
