import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Exhibit} from '../../models/exhibit';
import {ExhibitService} from '../../services/exhibit.service';
import {Breadcrumb} from "../../models/breadcrumb";

@Component({
  selector: 'app-exhibit-statistics',
  templateUrl: './exhibit-statistics.component.html',
  styleUrls: ['./exhibit-statistics.component.css']
})
export class ExhibitStatisticsComponent implements OnInit {

  exhibit: Exhibit;

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
  selectedLanguage: string = this.locale;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private activatedRoute: ActivatedRoute,
    private exhibitService: ExhibitService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const exhibitId = params.id;

      /* get exhibit */

      this.exhibitService.getExhibit(exhibitId).subscribe(exhibit => {
        this.exhibit = exhibit;

        if (this.exhibit.parentModel === 'Museum') {
          this.breadcrumbs = [
            new Breadcrumb('Home', '/admin/home'),
            new Breadcrumb('Exponat', '/admin/exhibit' + this.exhibit._id),
            new Breadcrumb('Statistik')];
        } else {
          this.breadcrumbs = [
            new Breadcrumb('Home', '/admin/home'),
            new Breadcrumb('Ausstellung', '/admin/exposition/' + this.exhibit.parent),
            new Breadcrumb('Exponat', '/admin/exhibit/' + this.exhibit._id),
            new Breadcrumb('Statistik')];
        }

        /* accumulate exhibit likes over time
        *
        * likes: [{2019-03-11}, {2019-03-12}, {2019-03-14}]
        * ->
        * data: [{2019-03-11, 1}, {2019-03-12, 2}, {2019-03-14, 3}]
        */

        let accumulatedLikes = 0;
        const data = [];
        for (const like of exhibit.likes) {
          accumulatedLikes++;
          data.push({name: new Date(like.timestamp), value: accumulatedLikes});
        }

        this.multi = [{name: this.getExhibitContent(this.locale).name, series: data}];
      });
    });
  }

  getExhibitContent(locale: string) {
    for (const content of this.exhibit.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing exhibit
    console.error(`ExhibitContent missing for locale ${locale}`);
  }
}
