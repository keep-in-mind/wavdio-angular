import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private url = '/api/v2/logs/';

  constructor(
    private logger: NGXLogger,
    private http: HttpClient) { }

  public getLog(_type: string): Observable<String> {
    this.logger.trace('getLog(_type: string)', _type);

    return this.http.get<String>(this.url + _type).pipe(
      tap((readLogging: String) =>
        this.logger.trace('getLog().next(readLogging: String)', readLogging)),
      catchError(this.handleError<String>('getLog()'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
