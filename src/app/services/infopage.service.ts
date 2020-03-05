import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {LoggingService} from './logging.service';
import {Infopage} from '../models/infopage';

@Injectable({providedIn: 'root'})
export class InfopageService {

  errorCode: number;
  private url = '/api/v2/infopage';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService,
    private loggingService: LoggingService) {
  }

  public getInfopages(): Observable<Infopage[]> {
    this.logger.trace('getInfopages()');

    return this.http.get<Infopage[]>(this.url).pipe(
      tap((readInfopages: Infopage[]) =>
        this.logger.trace('getInfopages().next(readInfopages: Infopage[])', readInfopages)),
      catchError(this.handleError('getInfopages()', []))
    );
  }

  public createInfopage(infopage: Infopage): Observable<Infopage> {
    this.logger.trace('createInfopage(infopage: Infopage)', infopage);

    return this.http.post<Infopage>(this.url, infopage, this.auth.getAuthorizationHeader()).pipe(
      tap((createdInfopage: Infopage) =>
        this.logger.trace('createInfopage().next(createdInfopage: Infopage)', createdInfopage)),
      catchError(this.handleError<Infopage>('createInfopage()'))
    );
  }

  public getInfopage(_id: string): Observable<Infopage> {
    this.logger.trace('getInfopage(_id: string)', _id);

    return this.http.get<Infopage>(`${this.url}/${_id}`).pipe(
      tap((readInfopage: Infopage) =>
        this.logger.trace('getInfopage().next(readInfopage: Infopage)', readInfopage)),
      catchError(this.handleError<Infopage>('getInfopage()'))
    );
  }

  public updateInfopage(infopage: Infopage): Observable<Infopage> {
    this.logger.trace('updateInfopage(infopage: Infopage)', infopage);

    return this.http.patch<Infopage>(`${this.url}/${infopage._id}`, infopage, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedInfopage: Infopage) =>
        this.logger.trace('updateInfopage().next(updatedInfopage: Infopage)')),
      catchError(this.handleError<Infopage>('updateInfopage()'))
    );
  }

  public deleteInfopage(infopage: Infopage): Observable<Infopage> {
    this.logger.trace('deleteInfopage(infopage: Infopage)', infopage);

    return this.http.delete<Infopage>(`${this.url}/${infopage._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedInfopage: Infopage) =>
        this.logger.trace('deleteInfopage().next(deletedInfopage: Infopage)')),
      catchError(this.handleError<Infopage>('deleteInfopage()'))
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
