import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthenticationService} from './authentification.service';
import {InfoPage} from '../models/info-page';

@Injectable({providedIn: 'root'})
export class InfoPageService {

  errorCode: number;
  private url = '/api/v2/infopage';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  public getInfoPages(): Observable<InfoPage[]> {
    this.logger.trace('getInfoPages()');

    return this.http.get<InfoPage[]>(this.url).pipe(
      tap((readInfoPages: InfoPage[]) =>
        this.logger.trace('getInfoPages().next(readInfoPages: InfoPage[])', readInfoPages)),
      catchError(this.handleError('getInfoPages()', []))
    );
  }

  public createInfoPage(infoPage: InfoPage): Observable<InfoPage> {
    this.logger.trace('createInfoPage(infoPage: InfoPage)', infoPage);

    return this.http.post<InfoPage>(this.url, infoPage, this.auth.getAuthorizationHeader()).pipe(
      tap((createdInfoPage: InfoPage) =>
        this.logger.trace('createInfoPage().next(createdInfoPage: InfoPage)', createdInfoPage)),
      catchError(this.handleError<InfoPage>('createInfoPage()'))
    );
  }

  public getInfoPage(_id: string): Observable<InfoPage> {
    this.logger.trace('getInfoPage(_id: string)', _id);

    return this.http.get<InfoPage>(`${this.url}/${_id}`).pipe(
      tap((readInfoPage: InfoPage) =>
        this.logger.trace('getInfoPage().next(readInfoPage: InfoPage)', readInfoPage)),
      catchError(this.handleError<InfoPage>('getInfoPage()'))
    );
  }

  public updateInfoPage(infoPage: InfoPage): Observable<InfoPage> {
    this.logger.trace('updateInfoPage(infoPage: InfoPage)', infoPage);

    return this.http.patch<InfoPage>(`${this.url}/${infoPage._id}`, infoPage, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedInfoPage: InfoPage) =>
        this.logger.trace('updateInfoPage().next(updatedInfoPage: InfoPage)', updatedInfoPage)),
      catchError(this.handleError<InfoPage>('updateInfoPage()'))
    );
  }

  public deleteInfoPage(infoPage: InfoPage): Observable<InfoPage> {
    this.logger.trace('deleteInfoPage(infoPage: InfoPage)', infoPage);

    return this.http.delete<InfoPage>(`${this.url}/${infoPage._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedInfoPage: InfoPage) =>
        this.logger.trace('deleteInfoPage().next(deletedInfoPage: InfoPage)', deletedInfoPage)),
      catchError(this.handleError<InfoPage>('deleteInfoPage()'))
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
