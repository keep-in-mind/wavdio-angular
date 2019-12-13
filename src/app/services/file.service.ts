import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient) {
  }

  public static randomizeFilename(filename: string): string {
    const extension = filename.split('.').pop();
    const randomString = Math.random().toString(36).substring(2, 5);

    return randomString + '.' + extension;
  }

  uploadFile(id: string, file: File, uploadFilename: string): Observable<File> {
    const formData = new FormData();
    formData.append('file', file, uploadFilename);

    return this.http.post<File>(`/upload/${id}`, formData).pipe(
      tap(() => console.log(`Uploaded file ${uploadFilename} to /upload/${id}`)),
      catchError(this.handleError<File>('uploadFile'))
    );
  }

  deleteFile(id: string, uploadFilename: string): Observable<File> {
    return this.http.delete<File>(`/upload/${id}/${uploadFilename}`).pipe(
      tap(() => console.log(`Deleted file ${uploadFilename} from /upload/${id}`)),
      catchError(this.handleError<File>('deleteFile'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
