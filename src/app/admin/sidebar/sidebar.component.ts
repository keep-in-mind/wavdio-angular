import { Component, OnInit } from '@angular/core';
import { ExpositionService } from 'src/app/services/exposition.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService} from '../../services/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private expositionService: ExpositionService, private router: Router,
    private cookieService: CookieService,
    private auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin']);
  }

}
