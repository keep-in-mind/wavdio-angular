import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {Museum} from '../models/museum';

@Injectable({providedIn: 'root'})
export class MuseumService {

  errorCode: number;
  private url = '/api/v2/museum';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  public getMuseums(): Observable<Museum[]> {
    this.logger.trace('getMuseums()');

    return this.http.get<Museum[]>(this.url).pipe(
      tap((readMuseums: Museum[]) =>
        this.logger.trace('getMuseums().next(readMuseums: Museum[])', readMuseums)),
      catchError(this.handleError('getMuseums()', []))
    );
  }

  public createMuseum(museum: Museum): Observable<Museum> {
    this.logger.trace('createMuseum(museum: Museum)', museum);

    return this.http.post<Museum>(this.url, museum, this.auth.getAuthorizationHeader()).pipe(
      tap((createdMuseum: Museum) =>
        this.logger.trace('createMuseum().next(createdMuseum: Museum)', createdMuseum)),
      catchError(this.handleError<Museum>('createMuseum()'))
    );
  }

  public getMuseum(_id: string): Observable<Museum> {
    this.logger.trace('getMuseum(_id: string)', _id);

    return this.http.get<Museum>(`${this.url}/${_id}`).pipe(
      tap((readMuseum: Museum) =>
        this.logger.trace('getMuseum().next(readMuseum: Museum)', readMuseum)),
      catchError(this.handleError<Museum>('getMuseum()'))
    );
  }

  public updateMuseum(museum: Museum): Observable<Museum> {
    this.logger.trace('updateMuseum(museum: Museum)', museum);

    return this.http.patch<Museum>(`${this.url}/${museum._id}`, museum, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedMuseum: Museum) =>
        this.logger.trace('updateMuseum().next(updatedMuseum: Museum)', updatedMuseum)),
      catchError(this.handleError<Museum>('updateMuseum()'))
    );
  }

  public deleteMuseum(museum: Museum): Observable<Museum> {
    this.logger.trace('deleteMuseum(museum: Museum)', museum);

    return this.http.delete<Museum>(`${this.url}/${museum._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedMuseum: Museum) => this.logger.trace('deleteMuseum().next(deletedMuseum: Museum)', deletedMuseum)),
      catchError(this.handleError<Museum>('deleteMuseum()'))
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
