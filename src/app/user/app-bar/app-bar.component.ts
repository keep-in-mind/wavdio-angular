import {Component, Inject, Input, LOCALE_ID, OnInit, Query} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  @Input() sidenav: MatSidenav;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public router: Router) {
  }

  ngOnInit() {
  }
}
