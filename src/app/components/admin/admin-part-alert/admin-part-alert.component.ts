import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin-part-alert',
    templateUrl: './admin-part-alert.component.html',
    styleUrls: ['./admin-part-alert.component.css']
})
export class AdminPartAlertComponent implements OnInit {

    alertTypes = [
        'success',
        'info',
        'warning',
        'danger',
        'primary',
        'secondary',
        'light',
        'dark'
    ];

    constructor() {
    }

    @Input() alertType: number;
    @Input() alertMessage: string;
    @Input() alertTimeout: number;

    ngOnInit(): void {
    }

}
