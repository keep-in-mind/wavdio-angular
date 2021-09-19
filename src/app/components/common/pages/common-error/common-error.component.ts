import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    selector: 'app-common-error',
    templateUrl: './common-error.component.html',
    styleUrls: ['./common-error.component.css']
})
export class CommonErrorComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    backHome() {
        this.router.navigate([''])
    }
}
