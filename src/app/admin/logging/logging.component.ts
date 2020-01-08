import {Component, OnInit} from '@angular/core';

import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  descHeader = 'Serverlogs';
  applicationLog: String;
  apiLog: String;

  constructor(private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.loggingService.getLog('express').subscribe(
      log => this.apiLog = log
    );
    this.loggingService.getLog('application').subscribe(
      log => this.applicationLog = log
    );
  }
}
