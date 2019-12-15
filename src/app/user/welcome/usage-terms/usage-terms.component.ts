import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MuseumService} from 'src/app/services/museum.service';
import {Museum} from 'src/app/models/museum';

@Component({
  selector: 'app-usage-terms',
  templateUrl: './usage-terms.component.html',
  styleUrls: ['./usage-terms.component.css']
})
export class UsageTermsComponent implements OnInit {

  usageTerms: String;
  museum: Museum;
  descHeader: String;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private museumService: MuseumService,
    private activatedRoute: ActivatedRoute) {
    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
  }

  ngOnInit() {
    this.museumService.getMuseums().subscribe(
      museum => this.museum = museum[0]
    );
    this.activatedRoute.params.subscribe(
      params => {
        this.usageTerms = params.terms;

        if (this.usageTerms === 'termsOfUse') {
          this.descHeader = 'Nutzungsbedingungen';
        } else {
          this.descHeader = 'Datenschutzerklärung';
        }
      });
  }

  getMuseumContent(locale: string) {
    for (const content of this.museum.contents) {
      if (content.lang === locale) {
        return content;
      }
    }

    // not available ? must not happen. has to be created when constructing museum
    console.error(`MuseumContent missing for locale ${locale}`);
  }
}

