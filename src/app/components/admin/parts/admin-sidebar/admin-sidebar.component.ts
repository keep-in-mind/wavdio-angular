import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {CookieService} from 'ngx-cookie-service'

import {AuthenticationService} from '../../../../services/authentification.service'
import {ExpositionService} from '../../../../services/exposition.service'

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

    constructor(private expositionService: ExpositionService, private router: Router,
                private cookieService: CookieService,
                private auth: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/admin'])
    }

}
