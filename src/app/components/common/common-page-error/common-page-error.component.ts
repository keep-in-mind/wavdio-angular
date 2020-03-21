import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-common-page-error',
  templateUrl: './common-page-error.component.html',
  styleUrls: ['./common-page-error.component.css']
})
export class CommonPageErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backHome() {
    this.router.navigate(['']);
  }
}
