import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {NGXLogger} from 'ngx-logger'
import {Observable, of} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators'

import {AuthenticationService} from './authentification.service'
import {Museum} from '../models/museum'

@Injectable({providedIn: 'root'})
export class MuseumService {

    errorCode: number
    private url = '/api/v2/museum'

    public constructor(
        private logger: NGXLogger,
        private http: HttpClient,
        private auth: AuthenticationService) {
    }

    public getMuseums(): Observable<Museum[]> {
        this.logger.trace('getMuseums()')

        return this.http.get<Museum[]>(this.url).pipe(
            map(jsonMuseums => jsonMuseums.map(jsonMuseum => Museum.fromJSON(jsonMuseum))),
            tap(readMuseums => this.logger.trace('getMuseums(...)', readMuseums)),
            catchError(this.handleError('getMuseums(...)', []))
        )
    }

    public updateMuseum(museum: Museum): Observable<Museum> {
        this.logger.trace('updateMuseum(museum)', museum)

        return this.http.patch<Museum>(`${this.url}/${museum._id}`, museum, this.auth.getAuthorizationHeader()).pipe(
            map(jsonMuseum => Museum.fromJSON(jsonMuseum)),
            tap(updatedMuseum => this.logger.trace('updateMuseum(...)', updatedMuseum)),
            catchError(this.handleError<Museum>('updateMuseum(...)'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error)
            this.logger.error(operation, error)

            const errorString = JSON.stringify(error)
            const errorJson = JSON.parse(errorString)

            this.errorCode = errorJson.status
            return of(result as T)
        }
    }
}
