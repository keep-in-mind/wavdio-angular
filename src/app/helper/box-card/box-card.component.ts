import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.css']
})
export class BoxCardComponent implements OnInit {

  @Input() descHeader: string;

  constructor() { }

  ngOnInit() {
  }

}
