import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  @Input() back_arrow_link: string;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public router: Router) {
  }

  ngOnInit() {
  }
}
