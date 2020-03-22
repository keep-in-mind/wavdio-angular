import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Breadcrumb} from '../../../../models/breadcrumb';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';

@Component({
  selector: 'app-admin-exposition-stats',
  templateUrl: './admin-exposition-stats.component.html',
  styleUrls: ['./admin-exposition-stats.component.css']
})
export class AdminExpositionStatsComponent implements OnInit {

  exposition: Exposition;
  exhibits: Exhibit[];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Number';
  showYAxisLabel = false;
  yAxisLabel = 'Value';
  timeline = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line
  autoScale = true;

  multi = [
    {
      name: 'Test',
      series: [
        {
          name: new Date(2019, 2, 10, 10),
          value: 5
        },
        {
          name: new Date(2019, 2, 10, 10, 20),
          value: 10
        }
      ]
    }
  ];

  breadcrumbs: Breadcrumb[] = null; // created when exhibit loaded

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private activatedRoute: ActivatedRoute,
    private expositionService: ExpositionService,
    private exhibitService: ExhibitService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const expositionId = params.id;

      /* get exposition */

      this.expositionService.getExposition(expositionId).subscribe(exposition => {

        this.exposition = exposition;

        this.breadcrumbs = [
          new Breadcrumb('Exponate & Rundgänge', '/admin/exhibits-expositions'),
          new Breadcrumb('Rundgang', '/admin/exposition/' + this.exposition._id),
          new Breadcrumb('Statistik')];

        /* accumulate exposition likes over time
        *
        * likes: [{2019-03-11}, {2019-03-12}, {2019-03-14}]
        * ->
        * data: [{2019-03-11, 1}, {2019-03-12, 2}, {2019-03-14, 3}]
        */

        let accumulatedLikes = 0;
        const data = [];
        for (const like of exposition.likes) {
          accumulatedLikes++;
          data.push({name: new Date(like.timestamp), value: accumulatedLikes});
        }

        this.multi = [{name: this.exposition.getContent(this.locale).name, series: data}];

        /* get exhibits that belong to exposition */

        this.exhibitService.getExhibits().subscribe(exhibits => {
          this.exhibits = exhibits.filter(exhibit => exhibit.parent === expositionId);
        });
      });
    });
  }
}
