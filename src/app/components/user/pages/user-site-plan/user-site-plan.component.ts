import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

import {Museum} from '../../../../models/museum';
import {MuseumService} from '../../../../services/museum.service';

@Component({
  selector: 'app-user-site-plan',
  templateUrl: './user-site-plan.component.html',
  styleUrls: ['./user-site-plan.component.css']
})
export class UserSitePlanComponent implements OnInit {

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService) {
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
  }
}
