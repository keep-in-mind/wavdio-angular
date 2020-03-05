import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

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
      tap((readExhibits: Exhibit[]) =>
        this.logger.trace('getExhibits().next(readExhibits: Exhibit[])', readExhibits)),
      catchError(this.handleError('getExhibits()', []))
    );
  }

  public createExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('createExhibit(exhibit: Exhibit)', exhibit);

    return this.http.post<Exhibit>(this.url, exhibit, this.auth.getAuthorizationHeader()).pipe(
      tap((createdExhibit: Exhibit) =>
        this.logger.trace('createExhibits().next(createdExhibit: Exhibit)', createdExhibit)),
      catchError(this.handleError<Exhibit>('createExhibit(exhibit: Exhibit)'))
    );
  }

  public getExhibit(_id: string): Observable<Exhibit> {
    this.logger.trace('getExhibit(_id: string)', _id);

    return this.http.get<Exhibit>(`${this.url}/${_id}`).pipe(
      tap((readExhibit: Exhibit) =>
        this.logger.trace('getExhibit().next(readExhibit: Exhibit)', readExhibit)),
      catchError(this.handleError<Exhibit>('getExhibit(_id: string)'))
    );
  }

  public updateExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('updateExhibit(exhibit: Exhibit)', exhibit);

    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}`, exhibit, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExhibit: Exhibit) =>
        this.logger.trace('updateExhibit().next(updatedExhibit: Exhibit)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('updateExhibit(exhibit: Exhibit)'))
    );
  }

  public createExhibitLike(exhibit: Exhibit, like: Like): Observable<Exhibit> {
    this.logger.trace('createExhibitLike(exhibit: Exhibit, like: Like)', exhibit, like);

    return this.http.post<Exhibit>(`${this.url}/${exhibit._id}/like`, like).pipe(
      tap((updatedExhibit: Exhibit) =>
        this.logger.trace('createExhibitLike().next(updatedExhibit: Exhibit)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('createExhibitLike(exhibit: Exhibit, like: Like)'))
    );
  }

  public deleteExhibitLike(exhibit: Exhibit, like: Like): Observable<Exhibit> {
    this.logger.trace('deleteExhibitLike(exhibit: Exhibit, like: Like)', exhibit, like);

    return this.http.delete<Exhibit>(`${this.url}/${exhibit._id}/like/${like._id}`).pipe(
      tap((updatedExhibit: Exhibit) =>
        this.logger.trace('deleteExhibitLike().next(updatedExhibit: Exhibit)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('deleteExhibitLike(exhibit: Exhibit, like: Like)'))
    );
  }

  public updateExhibitCommentLike(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('updateExhibitCommentLike(exhibit: Exhibit)', exhibit);

    return this.http.patch<Exhibit>(`${this.url}/${exhibit._id}/comment_like`, exhibit).pipe(
      tap((updatedExhibit: Exhibit) =>
        this.logger.trace('updateExhibitCommentLike().next(updatedExhibit: Exhibit)', updatedExhibit)),
      catchError(this.handleError<Exhibit>('updateExhibitCommentLike(exhibit: Exhibit)'))
    );
  }

  public deleteExhibit(exhibit: Exhibit): Observable<Exhibit> {
    this.logger.trace('deleteExhibit(exhibit: Exhibit)', exhibit);

    return this.http.delete<Exhibit>(`${this.url}/${exhibit._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedExhibit: Exhibit) =>
        this.logger.trace('deleteExhibit().next(deletedExhibit: Exhibit)', deletedExhibit)),
      catchError(this.handleError<Exhibit>('deleteExhibit(exhibit: Exhibit)'))
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
