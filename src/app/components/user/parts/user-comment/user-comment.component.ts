import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

import {Comment} from '../../../../models/comment';
import {CookielawService} from '../../../../services/cookielaw.service';
import {Exhibit} from '../../../../models/exhibit';
import {ExhibitService} from '../../../../services/exhibit.service';
import {Exposition} from '../../../../models/exposition';
import {ExpositionService} from '../../../../services/exposition.service';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit {

  descCommentLabel = 'Kommentar eingeben:';

  comment: string;

  exposition: Exposition;
  exhibit: Exhibit;

  constructor(
    private logger: NGXLogger,
    public modal: NgbActiveModal,
    private expositionService: ExpositionService,
    private exhibitService: ExhibitService,
    public cookieLawService: CookielawService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.exposition) {
      this.exposition.comments.push(new Comment(this.comment, new Date()));
      this.expositionService.updateExpositionCommentLike(this.exposition).subscribe();
      this.modal.close();
    } else if (this.exhibit) {
      this.exhibit.comments.push(new Comment(this.comment, new Date()));
      this.exhibitService.updateExhibitCommentLike(this.exhibit).subscribe();
    } else {
      this.logger.warn('user-comment.component.ts - on Submit(): Neither exhibit nor exposition were given. This is a bug.');
    }
    this.modal.close();
  }
}
