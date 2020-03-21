import {Location} from '@angular/common';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Museum} from '../../../../models/museum';
import {MuseumContent} from '../../../../models/museum-content';
import {MuseumService} from '../../../../services/museum.service';

@Component({
  selector: 'app-user-site-plan-fullscreen',
  templateUrl: './user-site-plan-fullscreen.component.html',
  styleUrls: ['./user-site-plan-fullscreen.component.css']
})
export class UserSitePlanFullscreenComponent implements OnInit {

  museum: Museum;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private museumService: MuseumService,
    public location: Location) {
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(museums => {
      this.museum = museums[0];
    });
  }
}
