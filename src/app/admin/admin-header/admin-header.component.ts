import {Component, Input, OnInit} from '@angular/core';

class Breadcrumb {
  text: string;
  url: string;

  constructor(text: string, url: string) {
    this.text = text;
    this.url = url;
  }
}

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() breadcrumbs: Breadcrumb[];

  constructor() {
  }

  ngOnInit() {
  }
}
