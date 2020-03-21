import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-part-box-card',
  templateUrl: './admin-part-box-card.component.html',
  styleUrls: ['./admin-part-box-card.component.css']
})
export class AdminPartBoxCardComponent implements OnInit {

  @Input() descHeader: string;

  constructor() { }

  ngOnInit() {
  }

}
