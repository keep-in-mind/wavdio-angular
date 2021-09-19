import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'app-admin-box-card',
    templateUrl: './admin-box-card.component.html',
    styleUrls: ['./admin-box-card.component.css']
})
export class AdminBoxCardComponent implements OnInit {

    @Input() descHeader: string

    constructor() {
    }

    ngOnInit() {
    }

}
