import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Setting} from '../models/setting';
import {LoggingService} from './logging.service';

import {AuthenticationService} from './authentification.service';

@Injectable({providedIn: 'root'})
export class SettingService {

  errorCode: number;
  private url = '/api/v2/setting';

  public constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private auth: AuthenticationService,
    private loggingService: LoggingService) {
  }

  public getSettings(): Observable<Setting[]> {
    this.logger.trace('getSettings()');

    return this.http.get<Setting[]>(this.url).pipe(
      tap((readSettings: Setting[]) =>
        this.logger.trace('getSettings().next(readSettings: Setting[])', readSettings)),
      catchError(this.handleError('getSettings()', []))
    );
  }

  public createSetting(setting: Setting): Observable<Setting> {
    this.logger.trace('createSetting(setting: Setting)', setting);

    return this.http.post<Setting>(this.url, setting, this.auth.getAuthorizationHeader()).pipe(
      tap((createdSetting: Setting) =>
        this.logger.trace('createSetting().next(createdSettings: Setting)', createdSetting)),
      catchError(this.handleError<Setting>('createSetting()'))
    );
  }

  public getSetting(_id: string): Observable<Setting> {
    this.logger.trace('getSetting(_id: string)', _id);

    return this.http.get<Setting>(`${this.url}/${_id}`).pipe(
      tap((readSetting: Setting) =>
        this.logger.trace('getSetting().next(readSetting: Setting)', readSetting)),
      catchError(this.handleError<Setting>('getSetting()'))
    );
  }

  public updateSetting(setting: Setting): Observable<Setting> {
    this.logger.trace('updateSetting(setting: Setting)', setting);

    return this.http.patch<Setting>(`${this.url}/${setting._id}`, setting, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedSetting: Setting) =>
        this.logger.trace('updateSetting().next(updatedSetting: Setting)', updatedSetting)),
      catchError(this.handleError<Setting>('updateSetting()'))
    );
  }

  public deleteSetting(setting: Setting): Observable<Setting> {
    this.logger.trace('deleteSetting(setting: Setting)', setting);

    return this.http.delete<Setting>(`${this.url}/${setting._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedSetting: Setting) =>
        this.logger.trace('deleteSetting().next(deletedSetting: Setting)', deletedSetting)),
      catchError(this.handleError<Setting>('deleteSetting()'))
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
