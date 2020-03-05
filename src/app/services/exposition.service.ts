import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {LoggingService} from './logging.service';
import {Exposition} from '../models/exposition';
import {Like} from '../models/like';

@Injectable({providedIn: 'root'})
export class ExpositionService {

  errorCode: number;
  private url = '/api/v2/exposition';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private loggingService: LoggingService,
    private auth: AuthenticationService) {
  }

  public getExpositions(): Observable<Exposition[]> {
    this.logger.trace('getExpositions()');

    return this.http.get<Exposition[]>(this.url).pipe(
      tap((readExpositions: Exposition[]) =>
        this.logger.trace('getExpositions().next(readExpositions: Exposition[])', readExpositions)),
      catchError(this.handleError('getExpositions()', []))
    );
  }

  public createExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('createExposition(exposition: Exposition)', exposition);

    return this.http.post<Exposition>(this.url, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((createdExposition: Exposition) =>
        this.logger.trace('createExposition().next(createdExposition: Exposition)', createdExposition)),
      catchError(this.handleError<Exposition>('createExposition()'))
    );
  }

  public getExposition(_id: string): Observable<Exposition> {
    this.logger.trace('getExposition(_id: string)');

    return this.http.get<Exposition>(`${this.url}/${_id}`).pipe(
      tap((readExposition: Exposition) =>
        this.logger.trace('getExposition().next(readExposition: Exposition)', readExposition)),
      catchError(this.handleError<Exposition>('getExposition()'))
    );
  }

  public updateExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('updateExposition(exposition: Exposition)');

    return this.http.patch<Exposition>(`${this.url}/${exposition._id}`, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExposition: Exposition) =>
        this.logger.trace('updateExposition().next(updatedExposition: Exposition)', updatedExposition)),
      catchError(this.handleError<Exposition>('updateExposition()'))
    );
  }

  public createExpositionLike(exposition: Exposition, like: Like): Observable<Exposition> {
    this.logger.trace('createExpositionLike(exposition: Exposition, like: Like)');

    return this.http.post<Exposition>(`${this.url}/${exposition._id}/like`, like).pipe(
      tap((updatedExposition: Exposition) =>
        this.logger.trace('createExpositionLike().next(updatedExposition: Exposition)', updatedExposition)),
      catchError(this.handleError<Exposition>('createExpositionLike()'))
    );
  }

  public deleteExpositionLike(exposition: Exposition, like: Like): Observable<Exposition> {
    this.logger.trace('deleteExpositionLike(exposition: Exposition, like: Like)', exposition, like);

    return this.http.delete<Exposition>(`${this.url}/${exposition._id}/like/${like._id}`).pipe(
      tap((updatedExposition: Exposition) =>
        this.logger.trace('deleteExpositionLike().next(updatedExposition: Exposition)', updatedExposition)),
      catchError(this.handleError<Exposition>('deleteExpositionLike()'))
    );
  }

  public updateExpositionCommentLike(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('updateExpositionCommentLike(exposition: Exposition)', exposition);

    return this.http.patch<Exposition>(`${this.url}/${exposition._id}/comment_like`, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExposition: Exposition) =>
        this.logger.trace('updateExpositionCommentLike().next(updatedExposition: Exposition)', updatedExposition)),
      catchError(this.handleError<Exposition>('updateExpositionCommentLike()'))
    );
  }

  public deleteExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('deleteExposition(exposition: Exposition)', exposition);

    return this.http.delete<Exposition>(`${this.url}/${exposition._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedExposition: Exposition) =>
        this.logger.trace('deleteExposition().next(deletedExposition: Exposition)', deletedExposition)),
      catchError(this.handleError<Exposition>('deleteExposition()'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);

      const errorString = JSON.stringify(error);
      const errorJson = JSON.parse(errorString);

      this.errorCode = errorJson.status;
      return of(result as T);
    };
  }
}
