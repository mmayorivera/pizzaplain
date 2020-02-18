import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
@Injectable()
export class DataService {

  // Base url
  baseurl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // GET
  all(page: number, limit: number, model: string, search?: string): Observable<any> {
    return this.http.get<any>(this.baseurl + `/${model}?page=${page}&limit=${limit}&txt=${search}`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // GET
  in(idList: string, model: string): Observable<any> {
    return this.http.get<any>(this.baseurl + `/${model}/byIds?idList=${idList}`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }
  // POST
  create(data, model): Observable<any> {
    return this.http.post<any>(this.baseurl + `/${model}/add`, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // GET
  getById(id, model): Observable<any> {
    return this.http.get<any>(this.baseurl + `/${model}/` + id + '/get')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // PUT
  update(id, data, model): Observable<any> {
    return this.http.put<any>(this.baseurl + `/${model}/` + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // DELETE
  delete(id, model) {
    return this.http.delete<any>(this.baseurl + `/${model}/` + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
