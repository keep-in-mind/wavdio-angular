import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoggingService} from './logging.service';

import {Infopage} from '../models/infopage';

import {AuthenticationService} from './authentification.service';

@Injectable({providedIn: 'root'})
export class InfopageService {

  errorCode: number;
  private url = 'http://localhost:3000/api/v2/infopage';

  public constructor(private http: HttpClient,
                     private auth: AuthenticationService,
                     private loggingService: LoggingService) {
  }

  public getInfopages(): Observable<Infopage[]> {
    return this.http.get<Infopage[]>(this.url).pipe(
      tap((readInfopages: Infopage[]) => this.loggingService.logInfo(`Read infopages. (infopages = ${JSON.stringify(readInfopages)})`)),
      catchError(this.handleError('getInfopages()', []))
    );
  }

  public createInfopage(infopage: Infopage): Observable<Infopage> {
    return this.http.post<Infopage>(this.url, infopage, this.auth.getAuthorizationHeader()).pipe(
      tap((createdInfopage: Infopage) => this.loggingService.logInfo(`Created infopage. (created = ${JSON.stringify(createdInfopage)})`)),
      catchError(this.handleError<Infopage>(`createInfopage(infopage = ${JSON.stringify(infopage)})`))
    );
  }

  public getInfopage(_id: string): Observable<Infopage> {
    return this.http.get<Infopage>(`${this.url}/${_id}`).pipe(
      tap((readInfopage: Infopage) => this.loggingService.logInfo(`Read infopage. (infopage = ${JSON.stringify(readInfopage)})`)),
      catchError(this.handleError<Infopage>(`getInfopage(_id = ${_id})`))
    );
  }

  public updateInfopage(infopage: Infopage): Observable<Infopage> {
    return this.http.patch<Infopage>(`${this.url}/${infopage._id}`, infopage, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedInfopage: Infopage) => this.loggingService.logInfo(`Updated infopage. (infopage = ${JSON.stringify(updatedInfopage)})`)),
      catchError(this.handleError<Infopage>(`updateInfopage(infopage = ${JSON.stringify(infopage)})`))
    );
  }

  public deleteInfopage(infopage: Infopage): Observable<Infopage> {
    const _id = (typeof infopage === 'number') ? infopage : infopage._id;
    return this.http.delete<Infopage>(`${this.url}/${infopage._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedInfopage: Infopage) => this.loggingService.logInfo(`Deleted infopage. (infopage = ${JSON.stringify(deletedInfopage)})`)),
      catchError(this.handleError<Infopage>(`deleteInfopage(infopage = ${JSON.stringify(infopage)})`))
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
