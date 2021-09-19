import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {NGXLogger} from 'ngx-logger'
import {Observable, of} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private logger: NGXLogger,
        private http: HttpClient) {
    }

    public static randomizeFilename(filename: string): string {
        const extension = filename.split('.').pop()
        const randomString = Math.random().toString(36).substring(2, 5)

        return randomString + '.' + extension
    }

    public uploadFile(id: string, file: File, uploadFilename: string): Observable<File> {
        this.logger.trace('uploadFile(id, file, uploadFilename)', id, file, uploadFilename)

        const formData = new FormData()
        formData.append('file', file, uploadFilename)

        return this.http.post<File>(`/upload/${id}`, formData).pipe(
            tap(() => this.logger.trace('uploadFile(...)')),
            catchError(this.handleError<File>('uploadFile(...)'))
        )
    }

    public deleteFile(id: string, uploadFilename: string): Observable<File> {
        this.logger.trace('deleteFile(id, uploadFilename)', id, uploadFilename)

        return this.http.delete<File>(`/upload/${id}/${uploadFilename}`).pipe(
            tap(() => this.logger.trace('deleteFile(...)')),
            catchError(this.handleError<File>('deleteFile(...)'))
        )
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.logger.error(operation, error)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }
}
