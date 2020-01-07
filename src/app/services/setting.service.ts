import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
    private http: HttpClient,
    private auth: AuthenticationService,
    private loggingService: LoggingService) {
  }

  public getSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.url).pipe(
      tap((readSettings: Setting[]) => this.loggingService.logInfo(`Read settings. (settings = ${JSON.stringify(readSettings)})`)),
      catchError(this.handleError('getSettings()', []))
    );
  }

  public createSetting(setting: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.url, setting, this.auth.getAuthorizationHeader()).pipe(
      tap((createdSetting: Setting) => this.loggingService.logInfo(`Created setting. (created = ${JSON.stringify(createdSetting)})`)),
      catchError(this.handleError<Setting>(`createSetting(setting = ${JSON.stringify(setting)})`))
    );
  }

  public getSetting(_id: string): Observable<Setting> {
    return this.http.get<Setting>(`${this.url}/${_id}`).pipe(
      tap((readSetting: Setting) => this.loggingService.logInfo(`Read setting. (setting = ${JSON.stringify(readSetting)})`)),
      catchError(this.handleError<Setting>(`getSetting(_id = ${_id})`))
    );
  }

  public updateSetting(setting: Setting): Observable<Setting> {
    return this.http.patch<Setting>(`${this.url}/${setting._id}`, setting, this.auth.getAuthorizationHeader()).pipe(
      tap((updatedSetting: Setting) => this.loggingService.logInfo(`Updated setting. (setting = ${JSON.stringify(updatedSetting)})`)),
      catchError(this.handleError<Setting>(`updateSetting(setting = ${JSON.stringify(setting)})`))
    );
  }

  public deleteSetting(setting: Setting): Observable<Setting> {
    const _id = (typeof setting === 'number') ? setting : setting._id;
    return this.http.delete<Setting>(`${this.url}/${setting._id}`, this.auth.getAuthorizationHeader()).pipe(
      tap((deletedSetting: Setting) => this.loggingService.logInfo(`Deleted setting. (setting = ${JSON.stringify(deletedSetting)})`)),
      catchError(this.handleError<Setting>(`deleteSetting(setting = ${JSON.stringify(setting)})`))
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
