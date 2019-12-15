import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Exposition} from '../../models/exposition';
import {ExpositionService} from '../../services/exposition.service';
import {LoggingService} from '../../services/logging.service';
import {Comment} from '../../models/comment';
import {Exhibit} from '../../models/exhibit';
import {ExhibitService} from '../../services/exhibit.service';

import {CookielawService} from '../../services/cookielaw.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  descCommentLabel = 'Kommentar eingeben:';

  comment: string;

  exposition: Exposition;
  exhibit: Exhibit;

  constructor(
    public modal: NgbActiveModal,
    private expositionService: ExpositionService,
    private exhibitService: ExhibitService,
    public cookieLawService: CookielawService,
    private loggingService: LoggingService,
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
      this.loggingService.logInfo('comment.component.ts - on Submit(): Neither exhibit nor exposition were given. This is a bug.');
    }
    this.modal.close();
  }
}
