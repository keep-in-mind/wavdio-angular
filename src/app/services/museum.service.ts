import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Museum} from '../models/museum';
import {LoggingService} from './logging.service';

import {AuthenticationService} from './authentification.service';

@Injectable({providedIn: 'root'})
export class MuseumService {

  errorCode: number;
  private url = '/api/v2/museum';

  public constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private loggingService: LoggingService) {
  }

  public getMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url).pipe(
      tap((readMuseums: Museum[]) => this.loggingService.logInfo(`Read museums. (museums = ${JSON.stringify(readMuseums)})`)),
      catchError(this.handleError('getMuseums()', []))
    );
  }

  public createMuseum(museum: Museum): Observable<Museum> {
    return this.http.post<Museum>(this.url, museum, this.auth.getAuthorizationHeader()).pipe(
      tap((createdMuseum: Museum) => this.loggingService.logInfo(`Created museum. (created = ${JSON.stringify(createdMuseum)})`)),
      catchError(this.handleError<Museum>(`createMuseum(museum = ${JSON.stringify(museum)})`))
    );
  }

  public getMuseum(_id: string): Observable<Museum> {
    return this.http.get<Museum>(`${this.url}/${_id}`).pipe(
      tap((readMuseum: Museum) => this.loggingService.logInfo(`Read museum. (museum = ${JSON.stringify(readMuseum)})`)),
      catchError(this.handleError<Museum>(`getMuseum(_id = ${_id})`))
    );
  }

  public updateMuseum(museum: Museum): Observable<Museum> {
    return this.http.patch<Museum>(`${this.url}/${museum._id}`, museum, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedMuseum: Museum) => this.loggingService.logInfo(`Updated museum. (museum = ${JSON.stringify(updatedMuseum)})`)),
      catchError(this.handleError<Museum>(`updateMuseum(museum = ${JSON.stringify(museum)})`))
    );
  }

  public deleteMuseum(museum: Museum): Observable<Museum> {
    const _id = (typeof museum === 'number') ? museum : museum._id;
    return this.http.delete<Museum>(`${this.url}/${museum._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedMuseum: Museum) => this.loggingService.logInfo(`Deleted museum. (museum = ${JSON.stringify(deletedMuseum)})`)),
      catchError(this.handleError<Museum>(`deleteMuseum(museum = ${JSON.stringify(museum)})`))
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
