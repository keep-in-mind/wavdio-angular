import {Location} from '@angular/common';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';

@Component({
  selector: 'app-user-exposition-fullscreen',
  templateUrl: './user-exposition-fullscreen.component.html',
  styleUrls: ['./user-exposition-fullscreen.component.css']
})
export class UserExpositionFullscreenComponent implements OnInit {

  exposition: Exposition;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private activatedRoute: ActivatedRoute,
    private expositionService: ExpositionService,
    public location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const expositionId = params.id;

      this.expositionService.getExposition(expositionId).subscribe(exposition => {
        this.exposition = exposition;
      });
    });
  }
}
