import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

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
