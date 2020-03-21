import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../models/user';
import {AuthenticationService, TokenPayload} from '../../services/authentification.service';
import {CookielawService} from '../../services/cookielaw.service';

@Component({
  selector: 'app-admin-page-login',
  templateUrl: './admin-page-login.component.html',
  styleUrls: ['./admin-page-login.component.css']
})

export class AdminPageLoginComponent implements OnInit {
  user: User;
  isIncorrect = false;
  credentials: TokenPayload = {
    username: '',
    password: ''
  };
  credentialsInit: TokenPayload = {
    username: 'admin',
    password: 'password'
  };

  constructor(private router: Router,
    private auth: AuthenticationService,
    public cookieLawService: CookielawService) {
  }


  login() {
    this.auth.logout();
    this.auth.login(this.credentials).subscribe(() => {
      this.isIncorrect = false;
      this.router.navigate(['/admin/home']);
    }, (err) => { this.isIncorrect = true; }
    );

  }


  ngOnInit() {
    // this.auth.register(this.credentialsInit).subscribe();
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin/home']);
    }
  }


}
