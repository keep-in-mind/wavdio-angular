import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Exposition} from '../models/exposition';
import {LoggingService} from './logging.service';

import {AuthenticationService} from './authentification.service';


@Injectable({providedIn: 'root'})
export class ExpositionService {

  errorCode: number;
  private url = '/api/v2/exposition';

  public constructor(private http: HttpClient,
                     private loggingService: LoggingService,
                     private auth: AuthenticationService) {
  }

  public getExpositions(): Observable<Exposition[]> {
    return this.http.get<Exposition[]>(this.url).pipe(
      tap((readExpositions: Exposition[]) =>
        this.loggingService.logInfo(`Read expositions. (expositions = ${JSON.stringify(readExpositions)})`)),
      catchError(this.handleError('getExpositions()', []))
    );
  }

  public createExposition(exposition: Exposition): Observable<Exposition> {
    return this.http.post<Exposition>(this.url, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((createdExposition: Exposition) =>
        this.loggingService.logInfo(`Created exposition. (created = ${JSON.stringify(createdExposition)})`)),
      catchError(this.handleError<Exposition>(`createExposition(exposition = ${JSON.stringify(exposition)})`))
    );
  }

  public getExposition(_id: string): Observable<Exposition> {
    return this.http.get<Exposition>(`${this.url}/${_id}`).pipe(
      tap((readExposition: Exposition) =>
        this.loggingService.logInfo(`Read exposition. (exposition = ${JSON.stringify(readExposition)})`)),
      catchError(this.handleError<Exposition>(`getExposition(_id = ${_id})`))
    );
  }

  public updateExposition(exposition: Exposition): Observable<Exposition> {
    return this.http.patch<Exposition>(`${this.url}/${exposition._id}`, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExposition: Exposition) =>
        this.loggingService.logInfo(`Updated exposition. (exposition = ${JSON.stringify(updatedExposition)})`)),
      catchError(this.handleError<Exposition>(`updateExposition(exposition = ${JSON.stringify(exposition)})`))
    );
  }

  public updateExpositionCommentLike(exposition: Exposition): Observable<Exposition> {
    return this.http.patch<Exposition>(`${this.url}/${exposition._id}/comment_like`, exposition, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedExposition: Exposition) =>
        this.loggingService.logInfo(`Updated exposition comments/likes. (exposition = ${JSON.stringify(updatedExposition)})`)),
      catchError(this.handleError<Exposition>(`updateExpositionCommentLike(exposition = ${JSON.stringify(exposition)})`))
    );
  }

  public deleteExposition(exposition: Exposition): Observable<Exposition> {
    const _id = (typeof exposition === 'number') ? exposition : exposition._id;
    return this.http.delete<Exposition>(`${this.url}/${exposition._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedExposition: Exposition) =>
        this.loggingService.logInfo(`Deleted exposition. (exposition = ${JSON.stringify(deletedExposition)})`)),
      catchError(this.handleError<Exposition>(`deleteExposition(exposition = ${JSON.stringify(exposition)})`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.loggingService.logError(`${operation} failed: ${error.message}`);
      const errorString = JSON.stringify(error);
      const errorJson = JSON.parse(errorString);

      this.errorCode = errorJson.status;
      return of(result as T);
    };
  }
}
