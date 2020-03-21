import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {Exposition} from '../models/exposition';
import {Like} from '../models/like';

@Injectable({providedIn: 'root'})
export class ExpositionService {

  errorCode: number;
  private url = '/api/v2/exposition';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  public getExpositions(): Observable<Exposition[]> {
    this.logger.trace('getExpositions()');

    return this.http.get<Exposition[]>(this.url).pipe(
      map(jsonExpositions => jsonExpositions.map(jsonExposition => Exposition.fromJSON(jsonExposition))),
      tap(readExpositions => this.logger.trace('getExpositions(...)', readExpositions)),
      catchError(this.handleError('getExpositions(...)', []))
    );
  }

  public createExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('createExposition(exposition)', exposition);

    return this.http.post<Exposition>(this.url, exposition, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(createdExposition => this.logger.trace('createExposition(...)', createdExposition)),
      catchError(this.handleError<Exposition>('createExposition(...)'))
    );
  }

  public getExposition(_id: string): Observable<Exposition> {
    this.logger.trace('getExposition(_id)', _id);

    return this.http.get<Exposition>(`${this.url}/${_id}`).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(readExposition => this.logger.trace('getExposition(...)', readExposition)),
      catchError(this.handleError<Exposition>('getExposition(...)'))
    );
  }

  public updateExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('updateExposition(exposition)', exposition);

    return this.http.patch<Exposition>(`${this.url}/${exposition._id}`, exposition, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(updatedExposition => this.logger.trace('updateExposition(...)', updatedExposition)),
      catchError(this.handleError<Exposition>('updateExposition(...)'))
    );
  }

  public createExpositionLike(exposition: Exposition, like: Like): Observable<Exposition> {
    this.logger.trace('createExpositionLike(exposition, like)', exposition, like);

    return this.http.post<Exposition>(`${this.url}/${exposition._id}/like`, like).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(updatedExposition => this.logger.trace('createExpositionLike(...)', updatedExposition)),
      catchError(this.handleError<Exposition>('createExpositionLike(...)'))
    );
  }

  public deleteExpositionLike(exposition: Exposition, like: Like): Observable<Exposition> {
    this.logger.trace('deleteExpositionLike(exposition, like)', exposition, like);

    return this.http.delete<Exposition>(`${this.url}/${exposition._id}/like/${like._id}`).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(updatedExposition => this.logger.trace('deleteExpositionLike(...)', updatedExposition)),
      catchError(this.handleError<Exposition>('deleteExpositionLike(...)'))
    );
  }

  public updateExpositionCommentLike(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('updateExpositionCommentLike(exposition)', exposition);

    return this.http.patch<Exposition>(`${this.url}/${exposition._id}/comment_like`, exposition).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(updatedExposition => this.logger.trace('updateExpositionCommentLike(...)', updatedExposition)),
      catchError(this.handleError<Exposition>('updateExpositionCommentLike(...)'))
    );
  }

  public deleteExposition(exposition: Exposition): Observable<Exposition> {
    this.logger.trace('deleteExposition(exposition)', exposition);

    return this.http.delete<Exposition>(`${this.url}/${exposition._id}`, this.auth.getAuthorizationHeader()).pipe(
      map(jsonExposition => Exposition.fromJSON(jsonExposition)),
      tap(deletedExposition => this.logger.trace('deleteExposition(...)', deletedExposition)),
      catchError(this.handleError<Exposition>('deleteExposition(...)'))
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
