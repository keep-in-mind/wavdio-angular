import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {Exhibit} from '../models/exhibit';
import {Like} from '../models/like';

@Injectable({providedIn: 'root'})
export class ExhibitService {

  errorCode = 0;
  private url = '/api/v2/exhibit';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  public getExhibits(): Observable<Exhibit[]> {
    this.logger.trace('getExhibits()');

    return this.http.get<Exhibit[]>(this.url).pipe(
      map(jsonExhibits => jsonExhibits.map(jsonExhibit => Exhibit.fromJSON(jsonExhibit))),
      tap(readExhibits => this.logger.trace('getExhibits(...)', readExhibits)),
      catchError(this.handleError('getExhibits(...)', []))
    );
  }

  public createExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('createExhibit(exhibit)', exhibit);

    return this.http.post<Exhibit>(this.url, exhibit, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(createdExhibit => this.logger.trace('createExhibit(...)', createdExhibit)),
      catchError(this.handleError<Exhibit>('createExhibit(...)'))
    );
  }

  public getExhibit(_id: string): Observable<Exhibit> {
    this.logger.trace('getExhibit(_id)', _id);

    return this.http.get<Exhibit>(`${this.url}/${_id}`).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(readExhibit => this.logger.trace('getExhibit(...)', readExhibit)),
      catchError(this.handleError<Exhibit>('getExhibit(...)'))
    );
  }

  public updateExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('updateExhibit(exhibit)', exhibit);

    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}`, exhibit, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(updatedExhibit => this.logger.trace('updateExhibit(...)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('updateExhibit(...)'))
    );
  }

  public createExhibitLike(exhibit: Exhibit, like: Like): Observable<Exhibit> {
    this.logger.trace('createExhibitLike(exhibit, like)', exhibit, like);

    return this.http.post<Exhibit>(`${this.url}/${exhibit._id}/like`, like).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(updatedExhibit => this.logger.trace('createExhibitLike(...)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('createExhibitLike(...)'))
    );
  }

  public deleteExhibitLike(exhibit: Exhibit, like: Like): Observable<Exhibit> {
    this.logger.trace('deleteExhibitLike(exhibit, like)', exhibit, like);

    return this.http.delete<Exhibit>(`${this.url}/${exhibit._id}/like/${like._id}`).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(updatedExhibit => this.logger.trace('deleteExhibitLike(...)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('deleteExhibitLike(...)'))
    );
  }

  public updateExhibitCommentLike(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('updateExhibitCommentLike(exhibit)', exhibit);

    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}/comment_like`, exhibit).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(updatedExhibit => this.logger.trace('updateExhibitCommentLike(...)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('updateExhibitCommentLike(...)'))
    );
  }

  public deleteExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('deleteExhibit(exhibit)', exhibit);

    return this.http.delete<Exhibit>(`${this.url}/${exhibit._id}`, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExhibit => Exhibit.fromJSON(jsonExhibit)),
      tap(deletedExhibit => this.logger.trace('deleteExhibit(...)', deletedExhibit)),
      catchError(this.handleError<Exhibit>('deleteExhibit(...)'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);

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
