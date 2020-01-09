import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {LoggingService} from './logging.service';
import {Exhibit} from '../models/exhibit';

@Injectable({providedIn: 'root'})
export class ExhibitService {

  errorCode = 0;
  private url = '/api/v2/exhibit';

  public constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private loggingService: LoggingService) {
  }


  public getExhibits(): Observable<Exhibit[]> {
    return this.http.get<Exhibit[]>(this.url).pipe(
      tap((readExhibits: Exhibit[]) => this.loggingService.logInfo(`Read exhibits. (exhibits = ${JSON.stringify(readExhibits)})`)),
      catchError(this.handleError('getExhibits()', []))
    );
  }

  public createExhibit(exhibit: Exhibit): Observable<Exhibit> {
    return this.http.post<Exhibit>(this.url, exhibit, this.auth.getAuthorizationHeader()).pipe(
      tap((createdExhibit: Exhibit) => this.loggingService.logInfo(`Created exhibit. (created = ${JSON.stringify(createdExhibit)})`)),
      catchError(this.handleError<Exhibit>(`createExhibit(exhibit = ${JSON.stringify(exhibit)})`))
    );
  }

  public getExhibit(_id: string): Observable<Exhibit> {
    return this.http.get<Exhibit>(`${this.url}/${_id}`).pipe(
      tap((readExhibit: Exhibit) => this.loggingService.logInfo(`Read exhibit. (exhibit = ${JSON.stringify(readExhibit)})`)),
      catchError(this.handleError<Exhibit>(`getExhibit(_id = ${_id})`))
    );
  }

  public updateExhibit(exhibit: Exhibit): Observable<Exhibit> {
    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}`, exhibit, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExhibit: Exhibit) => this.loggingService.logInfo(`Updated exhibit. (exhibit = ${JSON.stringify(updatedExhibit)})`)),
      catchError(this.handleError<Exhibit>(`updateExhibit(exhibit = ${JSON.stringify(exhibit)})`))
    );
  }

  public updateExhibitCommentLike(exhibit: Exhibit): Observable<Exhibit> {
    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}/comment_like`, exhibit).pipe(
      tap((updatedExhibit: Exhibit) =>
        this.loggingService.logInfo(`Updated exhibit comments/likes. (exhibit = ${JSON.stringify(updatedExhibit)})`)),
      catchError(this.handleError<Exhibit>(`updateExhibitCommentLike(exhibit = ${JSON.stringify(exhibit)})`))
    );
  }

  public deleteExhibit(exhibit: Exhibit): Observable<Exhibit> {
    const _id = (typeof exhibit === 'number') ? exhibit : exhibit._id;
    return this.http.delete<Exhibit>(`${this.url}/${exhibit._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedExhibit: Exhibit) => this.loggingService.logInfo(`Deleted exhibit. (exhibit = ${JSON.stringify(deletedExhibit)})`)),
      catchError(this.handleError<Exhibit>(`deleteExhibit(exhibit = ${JSON.stringify(exhibit)})`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.loggingService.logError(`${operation} failed: ${error.message}`);
      const errorString = JSON.stringify(error);
      const errorJson = JSON.parse(errorString);

      if (errorJson.status === 500 && errorJson.error.error_code !== '13') {
        this.errorCode = 500;
        console.log('13!!!');
      } else if (errorJson.error.error_code === '13' && errorJson.status === 500) {
        this.errorCode = 13;
        console.log('500!!!');
      } else {
        this.errorCode = 0;

      }

      return of(result as T);
    };
  }
}
