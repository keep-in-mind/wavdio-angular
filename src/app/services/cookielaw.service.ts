import {Injectable} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookielawService {

  constructor(private cookieService: CookieService) {
  }

  public isAccepted() {
    if (this.cookieService.get('mean-cookies') === 'true') {
      return false;
    } else {
      return true;
    }
  }

  public accepted() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.cookieService.set('mean-cookies', 'true', date);
  }

  public acceptedTermsOfUse() {
    return this.cookieService.get('termsOfUseAccepted') ? false : true;
  }

}
