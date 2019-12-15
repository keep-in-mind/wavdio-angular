import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private url = 'http://localhost:3000/api/v2/logs/';

  constructor(private http: HttpClient) { }

  public getLog(_type: string): Observable<String> {
    return this.http.get<String>(this.url + _type).pipe(
      tap((readLogging: String) => this.logInfo(`Read logging. (logging = ${JSON.stringify(readLogging)})`)),
      catchError(this.handleError<String>(`readLogging(_id = ${_type})`))
    );
  }

  private postInfo(_mes: String): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<String>(this.url + 'info', JSON.stringify({log: _mes}), httpOptions)
    .pipe(
      catchError(this.handleError('postInfo', _mes))
    );
  }

  private postError(_mes: String): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<String>(this.url + 'error', JSON.stringify({log: _mes}), httpOptions)
    .pipe(
      catchError(this.handleError('postError', _mes))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Wenn es im Logger (hier) Fehler gibt, schreib es in den Log und
      // in die Konsole!
      this.logError(`${operation} failed: ${error.message}`);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public logInfo(mes: String) {
    this.postInfo(mes);
  }

  public logError(mes: String) {
    this.postError(mes);
  }

}
