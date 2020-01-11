import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  @Input() back_arrow_link: string;

  constructor() {
  }

  ngOnInit() {
  }
}
