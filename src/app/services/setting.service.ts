import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {NGXLogger} from 'ngx-logger'
import {Observable, of} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

import {AuthenticationService} from './authentification.service'
import {Setting} from '../models/setting'

@Injectable({providedIn: 'root'})
export class SettingService {

    errorCode: number
    private url = '/api/v2/setting'

    public constructor(
        private logger: NGXLogger,
        private http: HttpClient,
        private auth: AuthenticationService) {
    }

    public getSettings(): Observable<Setting[]> {
        this.logger.trace('getSettings()')

        return this.http.get<Setting[]>(this.url).pipe(
            tap(readSettings => this.logger.trace('getSettings(...)', readSettings)),
            catchError(this.handleError('getSettings(...)', []))
        )
    }

    public createSetting(setting: Setting): Observable<Setting> {
        this.logger.trace('createSetting(setting)', setting)

        return this.http.post<Setting>(this.url, setting, this.auth.getAuthorizationHeader()).pipe(
            tap(createdSetting => this.logger.trace('createSetting(...)', createdSetting)),
            catchError(this.handleError<Setting>('createSetting(...)'))
        )
    }

    public getSetting(_id: string): Observable<Setting> {
        this.logger.trace('getSetting(_id)', _id)

        return this.http.get<Setting>(`${this.url}/${_id}`).pipe(
            tap(readSetting => this.logger.trace('getSetting(...)', readSetting)),
            catchError(this.handleError<Setting>('getSetting(...)'))
        )
    }

    public updateSetting(setting: Setting): Observable<Setting> {
        this.logger.trace('updateSetting(setting)', setting)

        return this.http.patch<Setting>(`${this.url}/${setting._id}`, setting, this.auth.getAuthorizationHeader()).pipe(
            tap(updatedSetting => this.logger.trace('updateSetting(...)', updatedSetting)),
            catchError(this.handleError<Setting>('updateSetting(...)'))
        )
    }

    public deleteSetting(setting: Setting): Observable<Setting> {
        this.logger.trace('deleteSetting(setting)', setting)

        return this.http.delete<Setting>(`${this.url}/${setting._id}`, this.auth.getAuthorizationHeader()).pipe(
            tap(deletedSetting => this.logger.trace('deleteSetting(...)', deletedSetting)),
            catchError(this.handleError<Setting>('deleteSetting(...)'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.logger.error(operation, error)

            const errorString = JSON.stringify(error)
            const errorJson = JSON.parse(errorString)

            this.errorCode = errorJson.status
            return of(result as T)
        }
    }
}
