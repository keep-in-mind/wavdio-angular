import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {NGXLogger} from 'ngx-logger'
import {Observable, of} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

import {AuthenticationService} from './authentification.service'
import {InfoPage} from '../models/info-page'

@Injectable({providedIn: 'root'})
export class InfoPageService {

    errorCode: number
    private url = '/api/v2/infopage'

    public constructor(
        private logger: NGXLogger,
        private http: HttpClient,
        private auth: AuthenticationService) {
    }

    public getInfoPages(): Observable<InfoPage[]> {
        this.logger.trace('getInfoPages()')

        return this.http.get<InfoPage[]>(this.url).pipe(
            tap(readInfoPages => this.logger.trace('getInfoPages(...)', readInfoPages)),
            catchError(this.handleError('getInfoPages(...)', []))
        )
    }

    public createInfoPage(infoPage: InfoPage): Observable<InfoPage> {
        this.logger.trace('createInfoPage(infoPage)', infoPage)

        return this.http.post<InfoPage>(this.url, infoPage, this.auth.getAuthorizationHeader()).pipe(
            tap(createdInfoPage => this.logger.trace('createInfoPage(...)', createdInfoPage)),
            catchError(this.handleError<InfoPage>('createInfoPage(...)'))
        )
    }

    public getInfoPage(_id: string): Observable<InfoPage> {
        this.logger.trace('getInfoPage(_id)', _id)

        return this.http.get<InfoPage>(`${this.url}/${_id}`).pipe(
            tap(readInfoPage => this.logger.trace('getInfoPage(...)', readInfoPage)),
            catchError(this.handleError<InfoPage>('getInfoPage(...)'))
        )
    }

    public updateInfoPage(infoPage: InfoPage): Observable<InfoPage> {
        this.logger.trace('updateInfoPage(infoPage)', infoPage)

        return this.http.patch<InfoPage>(`${this.url}/${infoPage._id}`, infoPage, this.auth.getAuthorizationHeader()).pipe(
            tap(updatedInfoPage => this.logger.trace('updateInfoPage(...)', updatedInfoPage)),
            catchError(this.handleError<InfoPage>('updateInfoPage(...)'))
        )
    }

    public deleteInfoPage(infoPage: InfoPage): Observable<InfoPage> {
        this.logger.trace('deleteInfoPage(infoPage)', infoPage)

        return this.http.delete<InfoPage>(`${this.url}/${infoPage._id}`, this.auth.getAuthorizationHeader()).pipe(
            tap(deletedInfoPage => this.logger.trace('deleteInfoPage(...)', deletedInfoPage)),
            catchError(this.handleError<InfoPage>('deleteInfoPage(...)'))
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
